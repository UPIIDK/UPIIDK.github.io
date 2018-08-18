sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History"
], function(BaseController, MessageBox, Utilities, History) {
	"use strict";

	return BaseController.extend("com.sap.build.standard.dataManagement.controller.DealerDetail", {
		
		handleRouteMatched: function(oEvent) {
			var oParams = {};

			if (oEvent.getParameter("data").context) {
				this.sContext = oEvent.getParameter("data").context;
				var oPath;
				if (this.sContext) {
					oPath = {
						path: "/" + this.sContext,
						parameters: oParams
					};
					//this.getView().bindObject(oPath);
				}
			}
				this.getDataDealer();
		},
		_onButtonPress: function(oEvent) {

			var oBindingContext = oEvent.getSource().getBindingContext();

			return new Promise(function(fnResolve) {

				this.doNavigate("DealerSearch", oBindingContext, fnResolve, "");
			}.bind(this)).catch(function(err) {
				if (err !== undefined) {
					MessageBox.error(err.message);
				}
			});

		},
		doNavigate: function(sRouteName, oBindingContext, fnPromiseResolve, sViaRelation) {
			var sPath = (oBindingContext) ? oBindingContext.getPath() : null;
			var oModel = (oBindingContext) ? oBindingContext.getModel() : null;

			var sEntityNameSet;
			if (sPath !== null && sPath !== "") {
				if (sPath.substring(0, 1) === "/") {
					sPath = sPath.substring(1);
				}
				sEntityNameSet = sPath.split("(")[0];
			}
			var sNavigationPropertyName;
			var sMasterContext = this.sMasterContext ? this.sMasterContext : sPath;

			if (sEntityNameSet !== null) {
				sNavigationPropertyName = sViaRelation || this.getOwnerComponent().getNavigationPropertyForNavigationWithContext(sEntityNameSet, sRouteName);
			}
			if (sNavigationPropertyName !== null && sNavigationPropertyName !== undefined) {
				if (sNavigationPropertyName === "") {
					this.oRouter.navTo(sRouteName, {
						context: sPath,
						masterContext: sMasterContext
					}, false);
				} else {
					oModel.createBindingContext(sNavigationPropertyName, oBindingContext, null, function(bindingContext) {
						if (bindingContext) {
							sPath = bindingContext.getPath();
							if (sPath.substring(0, 1) === "/") {
								sPath = sPath.substring(1);
							}
						} else {
							sPath = "undefined";
						}

						// If the navigation is a 1-n, sPath would be "undefined" as this is not supported in Build
						if (sPath === "undefined") {
							this.oRouter.navTo(sRouteName);
						} else {
							this.oRouter.navTo(sRouteName, {
								context: sPath,
								masterContext: sMasterContext
							}, false);
						}
					}.bind(this));
				}
			} else {
				this.oRouter.navTo(sRouteName);
			}

			if (typeof fnPromiseResolve === "function") {
				fnPromiseResolve();
			}

		},
		
		_onButtonPress1: function(oEvent) {

			var oBindingContext = oEvent.getSource().getBindingContext();

			return new Promise(function(fnResolve) {

				this.doNavigate("Home", oBindingContext, fnResolve, "");
			}.bind(this)).catch(function(err) {
				if (err !== undefined) {
					MessageBox.error(err.message);
				}
			});

		},
		getDataDealer: function (){
			
			var oJsonModelSS = new sap.ui.model.json.JSONModel(),
			oJsonModelDealer = new sap.ui.model.json.JSONModel(),
			oJsonModelSSContactsonSS = new sap.ui.model.json.JSONModel(),
			oJsonModelSSContacts = new sap.ui.model.json.JSONModel(),
			oJsonModelDealerAdd = new sap.ui.model.json.JSONModel(),
			oJsonModelDealerGrp = new sap.ui.model.json.JSONModel();
			
			//Model Dealer
			oJsonModelDealer.loadData("/ZHDB_SSSS_SRV/ZHDB_SSSS_SRV/Z_DB_SSSS_SRV.xsodata/SSDEALER('"+ this.sContext +"')?$format=json");
			oJsonModelDealer.attachRequestCompleted(function(){
			
				this.getView().setModel(oJsonModelDealer,"DEALER");	
				var DealerGroupId = oJsonModelDealer.getProperty("/d/FK_GROUPID");
	
				oJsonModelDealerGrp.loadData("/ZHDB_SSSS_SRV/ZHDB_SSSS_SRV/Z_DB_SSSS_SRV.xsodata/SSDealerGrp("+ DealerGroupId +")?$format=json");
				oJsonModelDealerGrp.attachRequestCompleted(function(){
					this.getView().setModel(oJsonModelDealerGrp,"DEALERGROUP");	
				},this);
				
			},this);
		
			oJsonModelDealerAdd.loadData("/ZHDB_SSSS_SRV/ZHDB_SSSS_SRV/Z_DB_SSSS_SRV.xsodata/SSDealerAddress('"+ this.sContext +"')?$format=json");
			oJsonModelDealerAdd.attachRequestCompleted(function(){
			this.getView().setModel(oJsonModelDealerAdd,"DEALERADDRESS");
			},this);
			
			//Model SSContacts
			
			/*oJsonModelSS.loadData("/ZHDB_SSSS_SRV/ZHDB_SSSS_SRV/Z_DB_SSSS_SRV.xsodata/SS?&filter=(FK_TAXID EQ '"+this.sContext +"')$format=json");
			oJsonModelSS.attachRequestCompleted(function(){
				oJsonModelSSContactsonSS.loadData("/ZHDB_SSSS_SRV/ZHDB_SSSS_SRV/Z_DB_SSSS_SRV.xsodata/SSContactsSS("+ +")?$format=json");
				oJsonModelSSContactsonSS.attachRequestCompleted(function(){
	
				var SSContactId = oJsonModelSSContacts.getProperty("/d/FK_SSCONTACTID");
			
					oJsonModelSSContacts.loadData("/ZHDB_SSSS_SRV/ZHDB_SSSS_SRV/Z_DB_SSSS_SRV.xsodata/SSContacts("+ SSContactId +")?$format=json");
					oJsonModelSSContacts.attachRequestCompleted(function(){
					this.getView().setModel(oJsonModelSSContacts,"SSCONTACT");	
					},this);
			
				
				},this);
			},this);*/
		},
		_onButtonRefresh: function() {
			this.getView().getModel().refresh(true);
		},
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("DealerDetail").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));

		}
	});
}, /* bExport= */ true);