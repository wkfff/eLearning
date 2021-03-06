/*
 * File: app/view/Settings.js
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

Ext.define('eLearning.view.Settings', {
    extend: 'Ext.window.Window',
    alias: 'widget.settings',

    requires: [
        'eLearning.view.SettingsViewModel',
        'eLearning.view.SettingsViewController',
        'Ext.grid.property.Grid'
    ],

    controller: 'settings',
    viewModel: {
        type: 'settings'
    },
    modal: true,
    width: 500,
    layout: 'fit',
    title: 'Settings',

    items: [
        {
            xtype: 'propertygrid',
            reference: 'pageSetup',
            padding: 20,
            title: 'Page Setup',
            source: {
                'Property 1': 'String',
                'Property 2': true,
                'Property 3': '2018-03-08T14:09:40',
                'Property 4': 123
            }
        }
    ]

});