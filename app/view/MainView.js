/*
 * File: app/view/MainView.js
 *
 * This file was generated by Sencha Architect version 4.2.2.
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

Ext.define('eLearning.view.MainView', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.mainview',

    requires: [
        'eLearning.view.MainViewViewModel',
        'eLearning.view.MainViewViewController',
        'Ext.toolbar.Toolbar',
        'Ext.menu.Menu',
        'Ext.toolbar.Separator',
        'Ext.toolbar.TextItem',
        'Ext.button.Cycle',
        'Ext.menu.CheckItem',
        'Ext.toolbar.Spacer',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.form.field.Text',
        'Ext.grid.column.Action',
        'Ext.view.Table',
        'Ext.grid.plugin.DragDrop',
        'Ext.util.Point',
        'Ext.grid.plugin.CellEditing'
    ],

    controller: 'mainview',
    viewModel: {
        type: 'mainview'
    },
    itemId: 'mainView',
    layout: 'border',

    items: [
        {
            xtype: 'panel',
            region: 'north',
            itemId: 'panelHeader',
            title: 'eLearning',
            dockedItems: [
                {
                    xtype: 'toolbar',
                    reference: 'toolbarEdit',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'btnNewSlide',
                            text: 'New slide',
                            menu: {
                                xtype: 'menu',
                                items: [
                                    {
                                        xtype: 'menuitem',
                                        handler: function(item, e) {
                                            this.up('#mainView').getController().newSlide();
                                        },
                                        text: 'New blank slide'
                                    },
                                    {
                                        xtype: 'menuitem',
                                        handler: function(item, e) {
                                            var me = this.up('#mainView').getController();

                                            me.newSlide();
                                            me.insertTitle();
                                            me.insertText();
                                            me.insertImage();
                                        },
                                        text: 'New slide from template'
                                    }
                                ]
                            }
                        },
                        {
                            xtype: 'button',
                            handler: function(button, e) {
                                this.up('#mainView').getController().deleteSlide();
                            },
                            itemId: 'btnDeleteSlide',
                            text: 'Delete slide'
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnSetBackground',
                            text: 'Set background',
                            menu: {
                                xtype: 'menu',
                                width: 120,
                                items: [
                                    {
                                        xtype: 'menuitem',
                                        handler: function(item, e) {
                                            Ext.getCmp('panelContent').setStyle('background', 'none');
                                        },
                                        text: 'Blank'
                                    },
                                    {
                                        xtype: 'menuitem',
                                        handler: function(item, e) {
                                            Ext.getCmp('panelContent').setStyle('background', 'url(resources/images/background-0.jpg)');
                                        },
                                        text: 'Background 0'
                                    },
                                    {
                                        xtype: 'menuitem',
                                        handler: function(item, e) {
                                            Ext.getCmp('panelContent').setStyle('background', 'url(resources/images/background-1.jpg)');
                                        },
                                        text: 'Background 1'
                                    },
                                    {
                                        xtype: 'menuitem',
                                        handler: function(item, e) {
                                            Ext.getCmp('panelContent').setStyle('background', 'url(resources/images/background-2.jpg)');
                                        },
                                        text: 'Background 2'
                                    },
                                    {
                                        xtype: 'menuitem',
                                        handler: function(item, e) {
                                            Ext.getCmp('panelContent').setStyle('background', 'url(resources/images/background-3.jpg)');
                                        },
                                        text: 'Background 3'
                                    },
                                    {
                                        xtype: 'menuitem',
                                        handler: function(item, e) {
                                            Ext.getCmp('panelContent').setStyle('background', 'url(resources/images/background-4.jpg)');
                                        },
                                        text: 'Background 4'
                                    },
                                    {
                                        xtype: 'menuitem',
                                        handler: function(item, e) {
                                            Ext.getCmp('panelContent').setStyle('background', 'url(resources/images/background-5.jpg)');
                                        },
                                        text: 'Background 5'
                                    }
                                ]
                            }
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                            xtype: 'tbtext',
                            html: 'Component'
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnAddComponent',
                            text: 'Add',
                            menu: {
                                xtype: 'menu',
                                items: [
                                    {
                                        xtype: 'menuitem',
                                        handler: function(item, e) {
                                            this.up('#mainView').getController().insertTitle();
                                        },
                                        text: 'Title'
                                    },
                                    {
                                        xtype: 'menuitem',
                                        handler: function(item, e) {
                                            this.up('#mainView').getController().insertText();
                                        },
                                        text: 'Text'
                                    },
                                    {
                                        xtype: 'menuitem',
                                        handler: function(item, e) {
                                            this.up('#mainView').getController().insertImage();
                                        },
                                        text: 'Image'
                                    },
                                    {
                                        xtype: 'menuitem',
                                        handler: function(item, e) {
                                            this.up('#mainView').getController().insertSelection({
                                                multi: false
                                            });
                                        },
                                        text: 'Single selection'
                                    },
                                    {
                                        xtype: 'menuitem',
                                        handler: function(item, e) {
                                            this.up('#mainView').getController().insertSelection({
                                                multi: true
                                            });
                                        },
                                        text: 'Multiple selection'
                                    },
                                    {
                                        xtype: 'menuitem',
                                        handler: function(item, e) {
                                            this.up('#mainView').getController().insertHTMLComponent();
                                        },
                                        text: 'HTML Component'
                                    }
                                ]
                            }
                        },
                        {
                            xtype: 'button',
                            handler: function(button, e) {
                                this.up('#mainView').getController().editComponent();
                            },
                            itemId: 'btnEditComponent',
                            text: 'Edit'
                        },
                        {
                            xtype: 'button',
                            handler: function(button, e) {
                                this.up('#mainView').getController().deleteComponent();
                            },
                            itemId: 'btnDeleteComponent',
                            text: 'Delete'
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                            xtype: 'tbtext',
                            html: 'Layout'
                        },
                        {
                            xtype: 'cycle',
                            itemId: 'btnLayout',
                            minWidth: 110,
                            showText: true,
                            menu: {
                                xtype: 'menu',
                                width: 120,
                                items: [
                                    {
                                        xtype: 'menucheckitem',
                                        text: 'Computer'
                                    },
                                    {
                                        xtype: 'menucheckitem',
                                        text: 'Tablet'
                                    },
                                    {
                                        xtype: 'menucheckitem',
                                        text: 'Phone'
                                    }
                                ]
                            }
                        },
                        {
                            xtype: 'button',
                            handler: function(button, e) {
                                var me = this.up('#mainView'),
                                    refs = me.getReferences(),
                                    wnd = me.add({
                                        xtype: 'sourceview'
                                    });

                                me.getController().saveState();

                                var data = Ext.clone(Ext.pluck2(refs.gridSlides.store.data.items, 'data'));

                                Ext.each(data, function(item) {
                                    item.content = Ext.decode(item.content);
                                });

                                wnd.getController().show({
                                    value: syntaxHighlight(JSON.stringify(data, null, 2))
                                });
                            },
                            itemId: 'btnViewSource',
                            text: 'View source'
                        },
                        {
                            xtype: 'tbspacer',
                            flex: 1
                        },
                        {
                            xtype: 'button',
                            handler: function(button, e) {
                                this.up('#mainView').getController().togglePreview(true);
                            },
                            itemId: 'btnPreview',
                            minWidth: 120,
                            text: 'Preview'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    reference: 'toolbarPreview',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            handler: function(button, e) {
                                this.up('#mainView').getController().prevSlide();
                            },
                            itemId: 'btnPrevSlide',
                            minWidth: 120,
                            text: 'Previous slide'
                        },
                        {
                            xtype: 'button',
                            handler: function(button, e) {
                                this.up('#mainView').getController().nextSlide();
                            },
                            itemId: 'btnNextSlide',
                            minWidth: 120,
                            text: 'Next slide'
                        },
                        {
                            xtype: 'tbspacer',
                            flex: 1
                        },
                        {
                            xtype: 'button',
                            handler: function(button, e) {
                                this.up('#mainView').getController().togglePreview(false);
                            },
                            itemId: 'btnClosePreview',
                            minWidth: 120,
                            text: 'Close preview'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'panel',
            region: 'west',
            split: true,
            reference: 'panelMenu',
            itemId: 'panelMenu',
            margin: '10 0 10 10',
            padding: 0,
            width: 300,
            collapseDirection: 'left',
            title: '',
            items: [
                {
                    xtype: 'gridpanel',
                    reference: 'gridSlides',
                    itemId: 'gridSlides',
                    padding: 10,
                    hideCollapseTool: true,
                    title: '',
                    emptyText: 'No slides to show.<br>Create new with button <i>New slide</i>.',
                    hideHeaders: true,
                    rowLines: false,
                    bind: {
                        store: '{StoreSlides}'
                    },
                    columns: [
                        {
                            xtype: 'rownumberer'
                        },
                        {
                            xtype: 'gridcolumn',
                            flex: 1,
                            dataIndex: 'title',
                            text: 'String',
                            editor: {
                                xtype: 'textfield'
                            }
                        },
                        {
                            xtype: 'actioncolumn',
                            width: 30,
                            align: 'center',
                            items: [
                                {
                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                        this.up('#mainView').getController().deleteSlide(record);
                                    },
                                    iconCls: 'x-fa fa-times',
                                    tooltip: 'Delete slide'
                                }
                            ]
                        }
                    ],
                    viewConfig: {
                        stripeRows: false,
                        plugins: [
                            {
                                ptype: 'gridviewdragdrop'
                            }
                        ]
                    },
                    plugins: [
                        {
                            ptype: 'cellediting'
                        }
                    ],
                    listeners: {
                        deselect: 'onGridSlidesDeselect',
                        select: 'onGridSlidesSelect'
                    }
                }
            ]
        },
        {
            xtype: 'panel',
            region: 'center',
            reference: 'panelSlide',
            itemId: 'panelSlide',
            margin: '10 10 10 0',
            layout: 'fit',
            title: '',
            items: [
                {
                    xtype: 'container',
                    reference: 'panelContent',
                    cls: [
                        'edit',
                        'slide'
                    ],
                    html: '<div id="html-slide"></div>',
                    id: 'panelContent',
                    itemId: 'panelContent'
                }
            ]
        }
    ],
    listeners: {
        boxready: 'onMainViewBoxReady'
    }

});