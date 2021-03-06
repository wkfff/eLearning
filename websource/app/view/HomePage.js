/*
 * File: app/view/HomePage.js
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

Ext.define('eLearning.view.HomePage', {
    extend: 'Ext.container.Container',
    alias: 'widget.homepage',

    requires: [
        'eLearning.view.HomePageViewModel',
        'eLearning.view.HomePageViewController',
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.form.Label'
    ],

    controller: 'homepage',
    viewModel: {
        type: 'homepage'
    },
    itemId: 'homePage',
    defaults: {
        width: 200,
        height: 50,
        margin: 5
    },

    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },
    items: [
        {
            xtype: 'button',
            handler: function(button, e) {
                this.up('#mainView').setActiveItem('gridPrograms');
            },
            text: 'Training Programs'
        },
        {
            xtype: 'button',
            handler: function(button, e) {

            },
            text: 'Help'
        },
        {
            xtype: 'container',
            height: 200,
            defaults: {
                flex: 1
            },
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'label',
                    flex: 0,
                    height: 20,
                    text: 'DEV / DEBUG / TEST'
                },
                {
                    xtype: 'button',
                    handler: function(button, e) {
                        this.up('#mainView').setActiveItem('editSlides');
                    },
                    text: 'Edit Slides'
                },
                {
                    xtype: 'button',
                    handler: function(button, e) {
                        Ext.toast('This is a toast message');
                    },
                    text: 'Test'
                }
            ]
        }
    ]

});