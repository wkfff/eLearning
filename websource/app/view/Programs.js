/*
 * File: app/view/Programs.js
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

Ext.define('eLearning.view.Programs', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.programs',

    requires: [
        'eLearning.view.ProgramsViewModel',
        'eLearning.view.ProgramsViewController',
        'Ext.view.Table',
        'Ext.form.field.ComboBox',
        'Ext.grid.column.Date',
        'Ext.form.field.Date',
        'Ext.grid.column.Number',
        'Ext.form.field.Number',
        'Ext.grid.column.Check',
        'Ext.form.field.Checkbox',
        'Ext.grid.plugin.RowEditing',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.toolbar.Separator',
        'Ext.panel.Tool'
    ],

    controller: 'programs',
    viewModel: {
        type: 'programs'
    },
    itemId: 'gridPrograms',
    title: 'Training Programs',

    bind: {
        store: '{StorePrograms}'
    },
    columns: [
        {
            xtype: 'gridcolumn',
            flex: 1,
            minWidth: 150,
            cellWrap: true,
            dataIndex: 'name',
            text: 'Name',
            editor: {
                xtype: 'textfield'
            }
        },
        {
            xtype: 'gridcolumn',
            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {

                return !value ? '' : App.lookups.ProgramCategories.filter(function(item) { return item.id == value; })[0].text;

            },
            minWidth: 150,
            cellWrap: true,
            dataIndex: 'categoryId',
            text: 'Category',
            editor: {
                xtype: 'combobox',
                queryMode: 'local',
                valueField: 'id',
                bind: {
                    store: '{StoreProgramCategories}'
                }
            }
        },
        {
            xtype: 'gridcolumn',
            flex: 2,
            minWidth: 200,
            cellWrap: true,
            dataIndex: 'description',
            text: 'Description',
            editor: {
                xtype: 'textfield'
            }
        },
        {
            xtype: 'datecolumn',
            minWidth: 150,
            dataIndex: 'validFrom',
            text: 'Valid From',
            format: 'm/j/Y',
            editor: {
                xtype: 'datefield'
            }
        },
        {
            xtype: 'datecolumn',
            minWidth: 150,
            dataIndex: 'validTo',
            text: 'Valid To',
            format: 'm/j/Y',
            editor: {
                xtype: 'datefield'
            }
        },
        {
            xtype: 'numbercolumn',
            minWidth: 150,
            dataIndex: 'completionTime',
            text: 'Completion Time',
            editor: {
                xtype: 'numberfield'
            }
        },
        {
            xtype: 'numbercolumn',
            dataIndex: 'maxAttemptsTrainingMode',
            text: 'Max Attempts Training Mode',
            format: '00',
            editor: {
                xtype: 'numberfield'
            }
        },
        {
            xtype: 'numbercolumn',
            dataIndex: 'maxAttemptsScoreMode',
            text: 'Max Attempts Score Mode',
            format: '00',
            editor: {
                xtype: 'numberfield'
            }
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'passScore',
            text: 'Pass Score',
            editor: {
                xtype: 'numberfield'
            }
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'certificateFileName',
            text: 'Certificate',
            editor: {
                xtype: 'textfield'
            }
        },
        {
            xtype: 'checkcolumn',
            dataIndex: 'active',
            text: 'Active',
            editor: {
                xtype: 'checkboxfield'
            }
        }
    ],
    plugins: [
        {
            ptype: 'rowediting',
            pluginId: 'rowEditing',
            listeners: {
                canceledit: 'onRowEditingCanceledit'
            }
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'button',
                    handler: 'add',
                    text: 'Add'
                },
                {
                    xtype: 'button',
                    handler: 'remove',
                    text: 'Remove'
                },
                {
                    xtype: 'button',
                    handler: 'duplicate',
                    text: 'Duplicate'
                },
                {
                    xtype: 'button',
                    handler: 'bookmark',
                    text: 'Bookmark'
                },
                {
                    xtype: 'tbseparator'
                },
                {
                    xtype: 'button',
                    handler: 'editSlides',
                    text: 'Edit Slides'
                }
            ]
        }
    ],
    tools: [
        {
            xtype: 'tool',
            callback: 'close',
            iconCls: 'x-fa fa-close'
        }
    ],
    listeners: {
        activate: 'onGridProgramsActivate'
    }

});