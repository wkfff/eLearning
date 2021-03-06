/*
 * File: app/view/SourceViewViewController.js
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

Ext.define('eLearning.view.SourceViewViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sourceview',

    show: function(opts) {
        opts = Ext.applyIf(opts, {
            value: '',
            callback: function(value) { console.log('Please specify callback!', value); },
            scope: this
        });

        var me = this,
            refs = me.getReferences(),
            view = me.getView();

        me._opts = opts;

        view.refs.source.update('<pre class="code">' + opts.value + '</pre>');
        view.show();
    }

});
