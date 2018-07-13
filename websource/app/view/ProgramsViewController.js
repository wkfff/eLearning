/*
 * File: app/view/ProgramsViewController.js
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

Ext.define('eLearning.view.ProgramsViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.programs',

    load: function() {
        var me = this,
            store = me.getStore('StorePrograms');

        me.getStore('StoreProgramCategories').setData(App.lookups.ProgramCategories);
        store.load();

        //me.loadState();
    },

    getCurrentState: function() {
        var me = this,
            refs = me.getReferences(),
            store = me.getStore('StorePrograms'),
            data = Ext.clone(Ext.pluck(store.getRange(), 'data'));

        return data;
    },

    loadState: function() {
        var me = this,
            refs = me.getReferences(),
            store = me.getStore('StorePrograms'),
            data = localStorage.getItem('mxp_elearning_programs');

        if(data) {
            data = Ext.decode(data);
            store.setData(data);
        }
    },

    saveState: function() {
        var me = this,
            refs = me.getReferences(),
            data = me.getCurrentState();

        localStorage.setItem('mxp_elearning_programs', Ext.encode(data));
    },

    onRowEditingCanceledit: function(editor, context, eOpts) {
        var me = this,
            refs = me.getReferences(),
            store = me.getStore('StorePrograms');

        // Canceling editing of a locally added, unsaved record: remove it
        if (context.record.phantom) {
            store.remove(context.record);
        }
    },

    add: function(button, e) {
        var me = this,
            refs = me.getReferences(),
            store = me.getStore('StorePrograms'),
            editor = me.getView().getPlugin('rowEditing'),
            data = {
                id: createGUID(),
                name: 'New Training Program',
                categoryId: null,
                description: 'New Training Program Description',
                validFrom: new Date(),
                validTo: Ext.Date.add(new Date(), Ext.Date.YEAR, 1),
                completionTime: 60,
                maxAttemptsTrainingMode: 1,
                maxAttemptsScoreMode: 1,
                passScore: 75,
                active: true
            };

        var rec = store.add(data)[0];

        rec.phantom = true;
        //store.sync();
        editor.startEdit(rec);

        //me.saveState();
    },

    remove: function(button, e) {
        var me = this;

        me.getStore('StorePrograms').remove(me.getView().getSelection()[0]);
        me.saveState();
    },

    duplicate: function(button, e) {
        console.log("Duplicate unsupported");
    },

    bookmark: function(button, e) {
        console.log("Bookmark unsupported");
    },

    editSlides: function(button, e) {
        var me = this,
            view = me.getView(),
            selection = view.getSelection()[0],
            mainView = view.up('#mainView');

        me.saveState();

        mainView.setActiveItem('editSlides');
        mainView.getController().load({ program: selection });
    },

    close: function(owner, tool, event) {
        this.getView().up('#mainView').setActiveItem('homePage');
    },

    onGridProgramsActivate: function(component, eOpts) {
        this.load();

    },

    onGridProgramsBoxReady: function(component, width, height, eOpts) {

        return;

        // TODO


        var online = null;
        function updateIndicator() {

            // Show a different icon based on offline/online

            online = navigator.onLine;
            console.log("changed online status", online);
        }

        // Update the online status icon based on connectivity
        window.addEventListener('online',  updateIndicator);
        window.addEventListener('offline', updateIndicator);
        updateIndicator();



        // TESTING Jernej Habjan 2018-07-11
        var me = this;

        //if(!online){
        //console.log("NOT ONLINE");

        //console.log("printing model", component.getStore().getModel());

        console.log("Todo - set model to proxy create");

        var proxy = Ext.create('Lib.data.proxy.IndexedDB',{
            model: 'Program',
            reader: 'json'
        });



        //proxy.setModel(component.getStore().getModel());

        component.getStore().setProxy(proxy);
        component.getStore().load();


        //}

    }

});
