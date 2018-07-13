/*
 * File: app/controller/CApp.js
 *
 * This file was generated by Sencha Architect version 4.2.3.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 6.5.x Classic library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 6.5.x Classic. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('eLearning.controller.CApp', {
    extend: 'Ext.app.Controller',

    appLaunch: function() {
        App = this;

        // Config variable for using mockup data
        var MOCKUP = false;
        if (MOCKUP){
            console.warn("App is using mockup data.");
        }

        App = Ext.merge(App, {
            lookups: {},
            shared: {}
        });

        // BEFORE EVERY REQUEST

        Ext.Ajax.on("beforerequest", function(conn, options, eOpts) {
            if(options.url) {
                // check if url hasn't been modified yet
                if (options.url.split('/')[0] === ""){
                    if(MOCKUP) {
                        options.url = 'mockup' + options.url.split('?')[0] + '.json';
                    }
                    else{
                         options.url = 'MXP_App_ISAPI.dll' + options.url.split('?')[0];
                    }
                }
            }
        });

        var grid = Ext.create("eLearning.view.MainView");


    }

});