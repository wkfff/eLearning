/*
 * File: app/model/Slide.js
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

Ext.define('eLearning.model.Slide', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.field.String',
        'Ext.data.field.Integer'
    ],

    fields: [
        {
            type: 'string',
            name: 'id',
            unique: true
        },
        {
            type: 'string',
            name: 'title'
        },
        {
            type: 'string',
            name: 'content'
        },
        {
            type: 'int',
            name: 'sequence'
        },
        {
            type: 'int',
            name: 'category'
        }
    ]
});