unit MxDataWebForm;

interface

uses
  SysUtils, Classes, Forms, IdTCPClient, IdBaseComponent, IdComponent,
  IdTCPConnection, IdHTTP, IdCustomTCPServer, IdCustomHTTPServer, IdHTTPServer,
  IdContext, ActiveX, Controls, StdCtrls, Windows, Messages, AppEvnts,
  IdGlobalProtocols, IniFiles, ExtCtrls, SuperObject;

type
  TFHttpRest = class(TForm)
    hsRest: TIdHTTPServer;
    meLog: TMemo;
    chLog: TCheckBox;
    chResponse: TCheckBox;
    ApplicationEvents1: TApplicationEvents;
    procedure hsRestCommandGet(AContext: TIdContext;
      ARequestInfo: TIdHTTPRequestInfo; AResponseInfo: TIdHTTPResponseInfo);
    procedure FormCreate(Sender: TObject);
    procedure chLogClick(Sender: TObject);
    procedure FormClose(Sender: TObject; var Action: TCloseAction);
    procedure hsFilesCommandGet(AContext: TIdContext;
      ARequestInfo: TIdHTTPRequestInfo;
      AResponseInfo: TIdHTTPResponseInfo);
    procedure FormDestroy(Sender: TObject);
    procedure ApplicationEvents1Exception(Sender: TObject; E: Exception);
    procedure FormShow(Sender: TObject);
  private
    { Private declarations }
    FMIMETable: TIdMimeTable;
  public
    { Public declarations }
    procedure LoadSettings();
  end;

//  function LogHttp(e: exception; msg: string; lineNo: integer = -1): integer;

var
  FHttpRest: TFHttpRest;
  displayLog: boolean = true;
  displayResponse: boolean = false;

implementation

uses MxDataDllHand, StackTrace, mxDataCommon;

{$R *.dfm}

(*
function LogHttp(e: exception; msg: string; lineNo: integer = -1): integer;
begin
  result := -1;
  if gLogFileOpened then
  begin
    EnterCriticalSection(CritSectLogDll);
    try
      try
        inc(logLineNo);
        result := logLineNo;
        if lineNo = -1 then
          lineNo := result;

        if (not isRunningAsService)and(FHttpRest <> nil)and(FHttpRest.Visible)and(displayLog) then
        begin
          with FHttpRest do
          begin
            meLog.Lines.Add( '[' + inttostr(lineNo) + '] '+ msg);
            SendMessage(meLog.Handle, EM_SCROLLCARET, 0, 0);
          end;
        end;

        WriteLn(gLogFile, '[' + inttostr(lineNo) + '] ' + DateTimeToStr(now) + ' # ' + msg);
        if (e <> nil) then
          WriteLn(gLogFile, GetStackTrace);
        Flush(gLogFile);
      except
        // nowhere to log to :)
      end;
    finally
      LeaveCriticalSection(CritSectLogDll);
    end;
  end;
end;
       *)
procedure TFHttpRest.ApplicationEvents1Exception(Sender: TObject;
  E: Exception);
begin
  LogHttp(e, 'GLOBAL EXCEPTION: ' + e.message);
end;

procedure TFHttpRest.chLogClick(Sender: TObject);
begin
  displayLog := chLog.Checked;
  displayResponse := chResponse.Checked;
end;

procedure TFHttpRest.FormClose(Sender: TObject; var Action: TCloseAction);
begin
  LogHttp(nil, 'Service shutting down...');

  try
    hsRest.Active := false;
  except
  end;

  UnloadMxDatadll;
end;

procedure TFHttpRest.FormCreate(Sender: TObject);
begin
  LoadSettings;

  displayLog := chLog.Checked;
  displayResponse := chResponse.Checked;

  FMIMETable := TIdMimeTable.Create(False);
  FMIMETable.BuildCache;

  LoadMxDataDll;
end;

procedure TFHttpRest.FormDestroy(Sender: TObject);
begin
  try
    FMIMETable.Destroy;
  except
  end;
end;

procedure TFHttpRest.FormShow(Sender: TObject);
begin
  if (not isRunningAsService)and(FHttpRest <> nil)and(FHttpRest.Visible)and(displayLog) then
  begin
    with FHttpRest do
    begin
      meLog.Lines.Add('Running on: ' + gPort);
      meLog.Lines.Add('Connecting to: ' + gDatabase);
      meLog.Lines.Add('Serving: ' + gHttpFolder);
      SendMessage(meLog.Handle, EM_SCROLLCARET, 0, 0);
    end;
  end;
end;

procedure TFHttpRest.hsFilesCommandGet(AContext: TIdContext;
  ARequestInfo: TIdHTTPRequestInfo; AResponseInfo: TIdHTTPResponseInfo);
var
  //lineNo: integer;
  req, fileName: string;
  strRead: TFileStream;
  //sr: TSearchRec;
  attr: integer;
begin
  try
    req := String(ARequestInfo.Document); // "/GET/QuoteDetail/Quotes?start=0&limit=500&_dc=1263469395716&callback=stcCallback1014"
    if (req <> '') and (req[1] = '/') then
      Delete(req, 1, 1);

    if (req = '/') or (req = '') then
      fileName := gHttpFolder + '\index.html'
    else
    begin
      req := StringReplace(req, '..', '', [rfReplaceAll]);
      fileName := gHttpFolder + '\' + StringReplace(req, '/', '\', [rfReplaceAll]);
    end;

    fileName := GetAppPath + fileName;

    (*if ExtractFileExt(fileName) = '.*' then
    begin
      FindFirst(fileName, attr, sr);
      if sr.FindHandle <> INVALID_HANDLE_VALUE then
        fileName := ExtractFilePath(fileName) + sr.Name;
    end;*)

    if FileExists(fileName) then
    begin
      strRead := TFileStream.Create(fileName, fmOpenRead or fmShareDenyNone);
      try
        AResponseInfo.ContentType := FMIMETable.GetFileMIMEType(fileName);
        AResponseInfo.ContentStream := strRead;
        if (pos('\ext\', fileName) > 0) then
          AResponseInfo.CacheControl := 'max-age=604800, must-revalidate';  // 7 days
          //AResponseInfo.CacheControl := 'max-age=3600, must-revalidate';
      finally
        // strRead.Free; // auto free in Response, see source HttpApp.pas: TWebResponse.Destroy
      end;
    end
    else
      //AResponseInfo.ContentText := '<html><heading/><body>File not found: '+String(ARequestInfo.Document)+' file: '+fileName+'</body></html>';
      AResponseInfo.ContentText := '<html><heading/><body>File not found: '+String(ARequestInfo.Document)+'</body></html>';
  except
    on e: Exception do
    begin
      LogHttp(e, '['+ARequestInfo.RemoteIP+'] ' + 'ERROR FilesCommandGet: ' + e.Message);
      AResponseInfo.ContentText := '<html><heading/><body>Internal server error</body></html>';
    end;
  end;
end;

procedure TFHttpRest.hsRestCommandGet(AContext: TIdContext;
  ARequestInfo: TIdHTTPRequestInfo; AResponseInfo: TIdHTTPResponseInfo);
var
  req, query, callback, sParams, content, method, remoteIP, mSaveDir, mContentType, mFileName: WideString;
  npos: integer;
  dllRes: PWideChar;
  lineNo: integer;
  fs: TFileStream;
  contentStream, responseStream: TMemoryStream;
  dllContentStream: Pointer;
  dllStreamSize: integer;
  jParams: ISuperObject;

  ss: TSTringStream;
  contentType: String;
begin

  try
    dllContentStream := nil;
    dllStreamSize := 0;
	content := '';
    remoteIP := ARequestInfo.RemoteIP;
    lineNo := LogHttp(nil, ' ['+remoteIP+'] ' + ARequestInfo.Document);

    if (not isRunningAsService)and(FHttpRest <> nil)and(FHttpRest.Visible)and(displayLog) then
    begin
      with FHttpRest do
      begin
        meLog.Lines.Add( '[' + inttostr(logLineNo) + '] '+ ARequestInfo.Document);
        SendMessage(meLog.Handle, EM_SCROLLCARET, 0, 0);
      end;
    end;

    req := String(ARequestInfo.Document); // "/GET/QuoteDetail/Quotes?start=0&limit=500&_dc=1263469395716&callback=stcCallback1014"
    if (req <> '') and (req[1] = '/') then
      Delete(req, 1, 1);

    npos := pos(WideString('.dll/'), req);
    if (npos > 0) then
    begin
      req := copy(req, npos + 5);
      method := ARequestInfo.Command;    // if the method is not explicitly set in the URL, we use the browser http command method
    end
    else
    begin
      // method := ARequestInfo.Command;  // method is always GET since the ScriptTagProxy routes all requests through <script> tags
      npos := pos('/', req);
      method := copy(req, 1, npos - 1); // so we need to extract method from the url, which the Ext developer should provide
      req := copy(req, npos + 1, MaxInt);
    end;

    if (method = 'MW') then //or(not((method = 'GET')or(method = 'PUT')or(method = 'POST')or(method = 'DELETE')or(method = 'EXEC')or(method = 'UPLOAD')or(method = 'DOWNLOAD'))) then
      method := ARequestInfo.Command;    // if the method is not explicitly set in the URL, we use the browser http command method

    if (method = 'GET')or(method = 'PUT')or(method = 'POST')or(method = 'DELETE')or(method = 'EXEC')or(method = 'UPLOAD')or(method = 'DOWNLOAD') then
    begin          (*select - GET, update - PUT, insert - POST, delete - DELETE, get as stream - DOWNLOAD*)
      //if IncreaseRequestCount then  // wait until the update finishes and inc request count so the update waits until idle state
      try
        CoInitialize(nil);

        try
          callback := ARequestInfo.Params.Values['callback'];     // check if there is a callback defined for ScriptTagProxy in ExtJS
          mContentType := ARequestInfo.ContentType;

          if method = 'UPLOAD' then
          begin
            (*if pos(WideString('multipart/form-data'), mContentType) > 0 then
            begin
              mFileName := DecodeFormData(contentStream, ARequestInfo.QueryParams, mContentType, ARequestInfo.PostStream);
              mSaveDir := GetAppPath + gHttpFolder + '\upload\';
              Dest := TFileStream.Create(mSaveDir + mFileName, fmCreate);
              Dest.
              FreeAndNil(Dest);
              AResponseInfo.ContentText := '{"success":true,"image":"upload/'+mFileName+'"}';
              AResponseInfo.ContentType := 'text/html; charset=UTF-8;';
            end;*)
          end
          else
          begin
            if (gDEVICE_DEFAULTS <> nil)and(req = 'DefaultSettings') then
            begin
              //gDEVICE_DEFAULTS
              content := resultSuccess(ValuesToJSON(gDEVICE_DEFAULTS));
            end;

            dllRes := nil;
            try
              //sParams := ARequestInfo.Params.Text;  // indy 10 problem with utf-8

              sParams := decodeHTTPRequestParams(ARequestInfo.UnparsedParams);

              (*contentStream := TMemoryStream.Create;
              ss := TSTringStream.Create;
              ss.LoadFromFile('m:\outss.dat');
              mFileName := DecodeFormData(contentStream, sParams, ARequestInfo.QueryParams, ss);
              ss.Free;*)

              // decode an attachment if there is a FILE UPLOAD
              if pos(WideString('multipart/form-data'), mContentType) > 0 then
              begin
                contentStream := TMemoryStream.Create;

                // decode the uploaded file into stream (is a part of the form data MIME)
                mFileName := DecodeFormData(contentStream, sParams, ARequestInfo.QueryParams, ARequestInfo.PostStream);
                sParams := sParams + #13#10 + PARAM_FILENAME + '=' + mFileName;  // internal parameter for uploaded file name
                sParams := sParams + #13#10 + PARAM_FILESIZE + '=' + inttostr(contentStream.Size);  // internal parameter for uploaded file size

                dllContentStream := contentStream.Memory;
                dllStreamSize := contentStream.Size;
              end;
              sParams := sParams + #13#10 + PARAM_REMOTEIP + '=' + remoteIP;  // internal parameter for remote requestor IP

              if (pos(WideString('application/json'), mContentType) > 0) then
              begin
                jParams := DecodeJSONData(ARequestInfo.PostStream);
                if jParams.IsType(TSuperType.stObject) then
                begin
                  JSONtoParams(jParams, sParams);
                  jParams := nil;
                end;
              end;

              //sParams := sParams + #13#10 + PARAM_SESSIONID + '=' + ARequestInfo.Cookies.Items[0].CookieText;  // internal parameter for remote requestor IP
{$IFDEF VER210}
              if (ARequestInfo.Cookies.Cookie['SSID'] <> nil) then
                sParams := sParams + #13#10 + PARAM_SESSIONID + '=' + ARequestInfo.Cookies.Cookie['SSID'].Value;
{$ENDIF}
{$IFDEF VER220}
              if (ARequestInfo.Cookies.Cookie['SSID',''] <> nil) then
                sParams := sParams + #13#10 + PARAM_SESSIONID + '=' + ARequestInfo.Cookies.Cookie['SSID',''].Value;
{$ENDIF}

              // MAIN REQUEST HANDLER   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
              if content = '' then
                dllRes := DllHandleRequest(PWideChar(method), PWideChar(req), PWideChar(sParams), dllContentStream, dllStreamSize);

              if (dllRes <> nil) and (Pos('#MIME:', dllRes) = 1) then
                contentType := Copy(dllRes, 7, Length(dllRes) - 6);

              FreeAndNil(contentStream);
            except
              on e: exception do
              begin
                LogHttp(e, ' (ERROR: '+ e.Message + ')');
                AResponseInfo.ContentText := '{"success":false,"error":"DLL handle request error: ' + e.message + '"}';
                AResponseInfo.ContentLength := length(UTF8Encode(AResponseInfo.ContentText));  // count the length of the UTF8 string
              end;
            end;

            // result is a STREAM, copy it, assign it as a result and tell the dll to free it (also check if it's not the same stream we sent into)
            if (dllContentStream <> nil)and(dllStreamSize > 0)and((contentStream = nil)or(dllContentStream <> contentStream.Memory))then
            begin
              responseStream := TMemoryStream.Create;
              responseStream.Write(dllContentStream^, dllStreamSize);     // copy the memory from dll to our stream

              AResponseInfo.ContentText := '';

              //AResponseInfo.ContentType := aMIMEMap.GetFileMIMEType(req); // RD
              if contentType <> '' then
                AResponseInfo.ContentType := contentType
              else
                AResponseInfo.ContentType := 'application/octet-stream';

              //AResponseInfo.ContentType := 'application/octet-stream';
              AResponseInfo.ContentStream := responseStream; // the ResponseInfo will also free the stream

              DllFreeStream(dllContentStream);  // tell the dll to free the memory from the outgoing stream

              if Assigned(dllRes) then
                DllFreeString(dllRes);   // tell the dll to free the memory from the resulting string
            end
            else
            begin
              // copy the RESULT string JSON and tell the dll to free it
              if Assigned(dllRes) then
              begin
                content := dllRes;
                AResponseInfo.ContentText := content;
                DllFreeString(dllRes);   // tell the dll to free the memory from the resulting string
              end;

              // string response, probably as JSON
              AResponseInfo.ContentType := 'text/html; charset=UTF-8;';  //'text/x-json; charset=UTF-8;' image uploading result expected text/html...
              AResponseInfo.ContentText := content;

              if AResponseInfo.ContentText = '' then
                AResponseInfo.ContentText := '{"success":false,"error":"No response"}';

              // if a CALLBACK is defined, then prepand it to the resulting JSON
              if callback <> '' then
              begin  // fix the response to support the ScriptTagProxy in ExtJS for cross domain requests using the <script>
                AResponseInfo.ContentType := 'text/javascript; charset=UTF-8;';
                AResponseInfo.ContentText := callback + '(' + AResponseInfo.ContentText + ');';
              end
              else   // normal REST request result
                AResponseInfo.ContentType := 'text/html; charset=UTF-8;';  //'text/x-json; charset=UTF-8;' image uploading result expected text/html...

              AResponseInfo.ContentLength := length(UTF8Encode(AResponseInfo.ContentText));  // count the length of the UTF8 string
            end;
          end;

          if displayResponse then
            LogHttp(nil, ' -> '+ AResponseInfo.ContentText)
          else
            LogHttp(nil, ' -> Response size: '+ inttostr(AResponseInfo.ContentLength));
        except
          on e: exception do
          begin
            LogHttp(e, ' (ERROR: '+ e.Message + ')');
            AResponseInfo.ContentText := '{"success":false,"error": "'+e.Message+'"}';
            AResponseInfo.ContentLength := length(UTF8Encode(AResponseInfo.ContentText));  // count the length of the UTF8 string
          end;
        end;
        CoUnInitialize;
      finally
        //DecreaseRequestCount;   // explicitly defined in finally since it's important
        //CheckForUpdates();
      end;
    end
    else
      hsFilesCommandGet(AContext, ARequestInfo, AResponseInfo);
  except
    on e: Exception do
    begin
      LogHttp(e, '['+ARequestInfo.RemoteIP+'] ' + 'ERROR RestCommandGet: ' + e.Message);
      AResponseInfo.ContentText := '<html><heading/><body>Internal server error</body></html>';
    end;
  end;
end;

procedure TFHttpRest.LoadSettings();
var ini: TIniFile;
begin
  gAppPath := GetAppPath;

  try
    ini := TIniFile.Create(GetAppPath + gIniFileName);
    try
      gSrvName := ini.ReadString('SERVICE', 'SrvName', 'MXDataServ');
      MX_DLL_NAME := ini.ReadString('SERVICE', 'DllFileName', MX_DLL_NAME);
      MX_DLL_UPDATE := MX_DLL_NAME + '.upd';
      MX_DLL_BACKUP := MX_DLL_NAME + '.bck.';

      gHttpFolder := ini.ReadString('WEB', 'WebRoot', 'httpdocs');
      gPort := ini.ReadString('WEB', 'host', '0.0.0.0') + ':' + ini.ReadString('WEB', 'port', '88');
      gDatabase := ini.ReadString('WEB', 'DataSource', '');

      gLogFileName := ini.ReadString('WEB', 'LogFileName', gLogFileName);
      gLogFolder := ini.ReadString('WEB', 'LogFolder', '');

      gLogFileName := ChangeFileExt(gLogFileName, '') + '_DataServer' + ExtractFileExt(gLogFileName);
      if (gLogFolder <> '')and(gLogFolder[length(gLogFolder)] <> '\') then
        gLogFolder := gLogFolder + '\';

      if gDEVICE_DEFAULTS = nil then
        gDEVICE_DEFAULTS := TStringList.Create;
      ini.ReadSectionValues('DEVICE_DEFAULTS', gDEVICE_DEFAULTS);
      gDEVICE_DEFAULTS_MD5 := MD5(ValuesToJSONString(gDEVICE_DEFAULTS));
      gDEVICE_DEFAULTS.Add('MD5=' + gDEVICE_DEFAULTS_MD5);

      hsRest.Bindings.Clear;
      with hsRest.Bindings.Add do
      begin
        IP := ini.ReadString('WEB', 'host', '0.0.0.0');
        Port := ini.ReadInteger('WEB', 'port', 88);
      end;
      hsRest.Active := true;
    finally
      ini.Free;
    end;
  except
    on e: exception do
      LogHttp(e, 'ERROR LoadSettings: ' + e.Message);
  end;
end;

initialization

finalization

end.
