/*
 * File: app/view/SlideNavigationViewController.js
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

Ext.define('eLearning.view.SlideNavigationViewController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.slidenavigation',

	show: function(opts) {
		opts = Ext.applyIf(opts, {

		    callback: function(value) { console.warn('Please specify callback!', value); },
		    scope: this
		});

		var me = this,
		    refs = me.getReferences(),
		    view = me.getView();

		me._opts = opts;





		view.inheritedState.hidden = opts.hidden;


		if(opts.hidden){
		    view.hide();
		}else{
		    view.show();
		}


	},

	previousPage: function(button, e) {
		var me = this;
		me._opts.editSlidesController.prevSlide();
	},

	nextPage: function(button, e) {
		var me = this;
		me._opts.editSlidesController.nextSlide();
	},

	closeFullscreen: function(button, e) {
		var me = this,
			view = me.getView();

		view.hide();
		closeFullscreen();
	},

	closePreview: function(button, e) {
		var me = this;
		me.closeFullscreen();
		me._opts.editSlidesController.togglePreview();
	},

	onSlideNavigationBoxReady: function(component, width, height, eOpts) {

	}

});
