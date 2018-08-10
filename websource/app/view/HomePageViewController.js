/*
 * File: app/view/HomePageViewController.js
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

Ext.define('eLearning.view.HomePageViewController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.homepage',

	requires: [
		'Ext.route.Route'
	],

	routes: {
		'training-programs': {
			name: 'routeTrainingPrograms',
			action: 'triggerTrainingPrograms'
		},
		'edit-pages': {
			name: 'routeEditPages',
			action: 'triggerEditPages'
		}
	},

	getAjax: function(url, params, name) {
		/*
				Ext.Ajax.request({
				    url: 'feed.json',
				}).then(function(response) {
				    // use response
				}).always(function() {
				   // clean-up logic, regardless the outcome
				}).otherwise(function(reason){
				   // handle failure
				});
				*/

		return new Ext.Promise(function (resolve, reject) {
			Ext.Ajax.request({
				url: url,
				params: params,
				success: function (response) {
					var rObj = Ext.decode(response.responseText || '{}');

					if(rObj.success) {
						resolve({
							name: name,
							data: rObj.data,
						});
					}
					else {
						reject(rObj.reason || 'Success false');
					}
				},
				failure: function (response) {
					reject(response.status);
				}
			});
		});
	},

	triggerTrainingPrograms: function() {
		this.getView().up('#mainView').setActiveItem('gridPrograms');
	},

	triggerEditPages: function() {
		var me = this;

		Ext.Promise.all([
		    me.getAjax('/Pub/Programs', {}, 'Programs')
		]).then(function(data) {

			if(data[0].data.length === 0){
				Ext.toast("No programs exist in database - go through training programs");
				return;
			}
			var returnedRec = data[0].data[0];


			var TEMP_ID = "{BA8780A3-9D57-40D5-8623-7033A31323D8}";
			TEMP_ID = returnedRec.id; // using returned records id

			var mainView = me.getView().up('#mainView');
			var newActiveItem = mainView.setActiveItem('editSlides');

			var localStorageData = Ext.decode(localStorage.getItem('mxp_elearning'));

			if(!localStorageData){
				localStorageData = {};
			}
			if(!localStorageData[TEMP_ID]){
				localStorageData[TEMP_ID] = {};
			}
			for (var key in localStorageData[TEMP_ID]) {
				if(!localStorageData[TEMP_ID][key]){
					localStorageData[TEMP_ID][key]={};
				}
			}
			localStorage.setItem('mxp_elearning', Ext.encode(localStorageData));
			/*newActiveItem.getController().load({ program :{
				data:{
					"active":true,
					"categoryId":30231143,
					"certificateFileName":"",
					"changed":"Y",
					"completionTime":60,
					"created":"2018-07-23T12:04:00",
					"createdAtId":5,
					"createdById":0,
					"description":"New Training Program Description",
					"id":TEMP_ID,
					"lastChangeLogId":191175066,
					"lastChanges":"2018-07-23T12:04:00",
					"maxAttemptsScoreMode":1000,
					"maxAttemptsTrainingMode":1000,
					"name":"First program",
					"passScore":2,
					"programId":50000026,
					"validFrom":"2018-07-23T00:00:00",
					"validTo":"2019-07-23T00:00:00"
				},
				id :TEMP_ID
			} }); // with programId
			*/

			newActiveItem.getController().load({ program :{
				data: returnedRec,
				id :TEMP_ID
			} }); // with programId


		});

	},

	showTrainingPrograms: function(button, e) {
		this.redirectTo('training-programs');
	},

	showEditPages: function(button, e) {
		this.redirectTo('edit-pages');
	}

});
