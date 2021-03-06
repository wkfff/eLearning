object Lookups: TLookups
  OldCreateOrder = False
  Height = 388
  Width = 596
  object ProgramPageCategories: TADOQueryMX
    Connection = ADOConnection1
    Parameters = <>
    SQL.Strings = (
      'SELECT '
      #9'SYS_LOOKUP_ID AS '#39'id'#39
      #9', SYS_LOOKUP_ITEM_NAME AS '#39'text'#39
      #9', SYS_LOOKUP_DISPLAY_CODE AS '#39'code'#39
      #9', SYS_LOOKUP_CATEGORY AS '#39'category'#39
      #9', SYS_LOOKUP_ACTIVE AS '#39'active'#39
      'FROM VTraining_Program_Page_Categories'
      'WHERE REC_DELETED = 0')
    InsertQuery.Connection = ADOConnection1
    InsertQuery.Parameters = <>
    DeleteQuery.Connection = ADOConnection1
    DeleteQuery.Parameters = <>
    UpdateQuery.Connection = ADOConnection1
    UpdateQuery.Parameters = <>
    Left = 168
    Top = 64
  end
  object ADOConnection1: TADOConnection
    ConnectionString = 
      'Provider=SQLOLEDB.1;Password=Wo$mXp2013;Persist Security Info=Tr' +
      'ue;User ID=MXPWOuser;Initial Catalog=MarineXProcurement;Data Sou' +
      'rce=sqlus2.mxp-intra.net\VOCSHIP'
    KeepConnection = False
    LoginPrompt = False
    Provider = 'SQLOLEDB.1'
    Left = 40
    Top = 8
  end
  object ProgramCategories: TADOQueryMX
    Connection = ADOConnection1
    Parameters = <>
    SQL.Strings = (
      'SELECT '
      #9'LOOKUP_ITEM_ID AS '#39'id'#39
      #9', DISPLAY_CODE AS '#39'code'#39
      #9', LOOKUP_ITEM_NAME AS '#39'text'#39
      #9', ACTIVE AS '#39'active'#39
      'FROM VTraining_Program_Categories'
      'WHERE REC_DELETED = 0')
    InsertQuery.Connection = ADOConnection1
    InsertQuery.Parameters = <>
    DeleteQuery.Connection = ADOConnection1
    DeleteQuery.Parameters = <>
    UpdateQuery.Connection = ADOConnection1
    UpdateQuery.Parameters = <>
    Left = 168
    Top = 16
  end
  object CoursesAndCertificates: TADOQueryMX
    Connection = ADOConnection1
    Parameters = <>
    SQL.Strings = (
      'SELECT '
      #9'LOOKUP_ITEM_ID AS '#39'id'#39
      #9', DISPLAY_CODE AS '#39'code'#39
      #9', LOOKUP_ITEM_NAME AS '#39'text'#39
      #9', ACTIVE AS '#39'active'#39
      #9', LOOKUP_EXTRA_INTEGER1 AS '#39'extraInt1'#39
      #9', CertificateAndCoursesParentName'
      #9', LOOKUP_EXTRA_INTEGER2 AS '#39'extraInt2'#39
      #9', CertificateAndCoursesCategoryName'
      #9', TRAINING_PROGRAM_ID'
      #9', TrainingCategoryAndProgramName'
      'FROM VCourses_and_Certificates'
      'WHERE REC_DELETED = 0')
    InsertQuery.Connection = ADOConnection1
    InsertQuery.Parameters = <>
    DeleteQuery.Connection = ADOConnection1
    DeleteQuery.Parameters = <>
    UpdateQuery.Connection = ADOConnection1
    UpdateQuery.Parameters = <>
    Left = 168
    Top = 112
  end
  object ProgramStatuses: TADOQueryMX
    Connection = ADOConnection1
    Parameters = <>
    SQL.Strings = (
      'SELECT '
      #9'SYS_LOOKUP_ID AS '#39'id'#39
      #9', SYS_LOOKUP_ITEM_NAME AS '#39'text'#39
      #9', SYS_LOOKUP_DISPLAY_CODE AS '#39'code'#39
      #9', SYS_LOOKUP_CATEGORY AS '#39'category'#39
      #9', SYS_LOOKUP_ACTIVE AS '#39'active'#39
      #9'FROM VTraining_Program_Status'
      'WHERE REC_DELETED = 0')
    InsertQuery.Connection = ADOConnection1
    InsertQuery.Parameters = <>
    DeleteQuery.Connection = ADOConnection1
    DeleteQuery.Parameters = <>
    UpdateQuery.Connection = ADOConnection1
    UpdateQuery.Parameters = <>
    Left = 168
    Top = 160
  end
end
