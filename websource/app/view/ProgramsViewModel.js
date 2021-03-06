/*
 * File: app/view/ProgramsViewModel.js
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

Ext.define('eLearning.view.ProgramsViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.programs',

    requires: [
        'Ext.data.Store',
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json'
    ],

    stores: {
        StorePrograms: {
            autoSync: true,
            model: 'eLearning.model.Program',
            proxy: {
                type: 'rest',
                api: {
                    create: 'MXP_App_ISAPI.dll/POST/Pub/Programs',
                    read: 'MXP_App_ISAPI.dll/GET/Pub/Programs',
                    update: 'MXP_App_ISAPI.dll/POST/Pub/Programs',
                    destroy: 'MXP_App_ISAPI.dll/DELETE/Pub/Programs'
                },
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },
        StoreProgramCategories: {
            model: 'eLearning.model.Lookup'
        }
    }

});