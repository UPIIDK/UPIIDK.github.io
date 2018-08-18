sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/core/util/Export",
	"sap/ui/core/util/ExportTypeCSV",
	"./utilities",
	"sap/ui/core/routing/History"
], function(BaseController, MessageBox, Export, ExportTypeCSV , Utilities, History) {
	"use strict";

	return BaseController.extend("com.sap.build.standard.dataManagement.controller.DealerSearch", {
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
					this.getView().bindObject(oPath);
				}
			}

		},
		_onButtonPress: function(oEvent) {

			var oBindingContext = oEvent.getSource().getBindingContext();

			return new Promise(function(fnResolve) {

				this.doNavigate("Home", oBindingContext, fnResolve, null);
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
				sNavigationPropertyName = sViaRelation && this.getOwnerComponent().getNavigationPropertyForNavigationWithContext(sEntityNameSet, sRouteName);
			}
			if (sNavigationPropertyName !== null && sNavigationPropertyName !== undefined) {
				if (sNavigationPropertyName === "") {
					this.oRouter.navTo(sRouteName, {
						context: oModel.getProperty("/" + sPath + "/TAXID"),
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
								context: oModel.getProperty("/" + sPath + "/TAXID"),
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
		_onTableItemPress: function(oEvent) {

			var oBindingContext = oEvent.getParameter("listItem").getBindingContext("DEALER");

			return new Promise(function(fnResolve) {
				this.doNavigate("DealerDetail", oBindingContext, fnResolve, "");
			}.bind(this)).catch(function(err) {
				if (err !== undefined) {
					MessageBox.error(err.message);
				}
			});

		},
		
		onSearch : function (oEvt) {

			// add filter for search
			var aFilters = [];
			var sQuery = oEvt.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new sap.ui.model.Filter("BUSINESSNAME", sap.ui.model.FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}

			// update list binding
			var	binding = this.SearchTable.getBinding("items"),
			CountRows = this.byId("CountRowsTable");
			binding.filter(aFilters, "Application");
			CountRows.setText(binding.getLength());
			
		},
		onSort: function() {
			this.SearchTable.getBinding("items").sort(new sap.ui.model.Sorter("BUSINESSNAME",!this.oSortbDesc));
		},	
		_onButtonRefresh: function() {
			this.SearchTable.getModel().refresh(true);
		},
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("DealerSearch").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));

			//Views 
			this.SearchTable = this.byId("SearchTableDealer");
			//Variables
			this.oSortbDesc = false;
			var oJsonModelDealer = new sap.ui.model.json.JSONModel(),
			oJsonModelDealerGrp = new sap.ui.model.json.JSONModel(),
			oTableData = this.getView().byId("SearchTableDealer");
			
			oJsonModelDealer.loadData("/ZHDB_SSSS_SRV/ZHDB_SSSS_SRV/Z_DB_SSSS_SRV.xsodata/SSDEALER?$format=json");
			oJsonModelDealer.attachRequestCompleted(function(){
			
			oTableData.setModel(oJsonModelDealer,"DEALER");
			
			oJsonModelDealerGrp.loadData("/ZHDB_SSSS_SRV/ZHDB_SSSS_SRV/Z_DB_SSSS_SRV.xsodata/SSDealerGrp?$format=json");
				oJsonModelDealerGrp.attachRequestCompleted(function(){
					oTableData.setModel(oJsonModelDealerGrp,"DEALERGROUP");	
				},this);
			
			/*var DealerGroupId = oJsonModelDealer.getData();
	
				oJsonModelDealerGrp.loadData("/ZHDB_SSSS_SRV/ZHDB_SSSS_SRV/Z_DB_SSSS_SRV.xsodata/SSDealerGrp("+ DealerGroupId +")?$format=json");
				oJsonModelDealerGrp.attachRequestCompleted(function(){
					this.getView().setModel(oJsonModelDealerGrp,"DEALERGROUP");	
				},this);*/
			},this);
		},
		
		onDataExport: sap.m.Table.prototype.exportData || function(oEvent) {

			var column1 =  this.getView().getModel("i18n").getResourceBundle().getText("DelearSearchTaxNo");
			var column2 = this.getView().getModel("i18n").getResourceBundle().getText("DelearSearchBusinessName");
			var column3 = this.getView().getModel("i18n").getResourceBundle().getText("DelearSearchGroup");

			var oExport = new Export({

				// Type that will be used to generate the content. Own ExportType's can be created to support other formats
				exportType: new ExportTypeCSV({
					separatorChar: ","
				}),

				// Pass in the model created above
				models: this.SearchTable.getModel("DEALER"),

				// binding information for the rows aggregation
				rows: {
					path: "DEALER>/d/results/"
				},

				// column definitions with column name and binding info for the content

				columns: [{
					name: column1,
					template: {
						content: "{DEALER>TAXID}"
					}
				}, {
					name: column2,
					template: {
						content: "{DEALER>BUSINESSNAME}"
					}
				}, {
					name: column3,
					template: {
						content: "{DEALERGROUP>/d/results/DESCRIPTION}"
					}
				}]
			});

			// download exported file
			oExport.saveFile(this.getView().getModel("i18n").getResourceBundle().getText("DealerSearchFileName")).catch(function(oError) {
				MessageBox.error("Error when downloading data. Browser might not be supported!\n\n" + oError);
			}).then(function() {
				oExport.destroy();
			});

		}
	});
}, /* bExport= */ true);