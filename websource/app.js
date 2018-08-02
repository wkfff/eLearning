/*
 * File: app.js
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

// @require @packageOverrides
Ext.Loader.setConfig({

});


Ext.application({
	models: [
		'Slide',
		'Option',
		'Lookup',
		'Program',
		'Question',
		'PersonAnswers',
		'PersonPrograms'
	],
	views: [
		'MainView',
		'TextEditor',
		'SelectionEditor',
		'SourceView',
		'Settings',
		'Templates',
		'FileUpload',
		'Programs',
		'HomePage',
		'EditTools',
		'EditSlides',
		'SlideNavigation'
	],
	controllers: [
		'CApp'
	],
	name: 'eLearning',

	requires: [
		'Ext.Loader'
	],

	launch: function() {
		// All functions from Application were moved to controller CApp but they can be called as they are directly on Application
		// EXAMPLE: function App.CApp.mask() can be called App.mask()

		this.getController("CApp").appLaunch.call(this);


	}

});
