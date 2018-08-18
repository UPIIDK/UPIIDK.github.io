sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/core/util/Export",
	"sap/ui/core/util/ExportTypeCSV",
	"./utilities",
	"sap/ui/core/routing/History"
], function(BaseController, MessageBox, Export, ExportTypeCSV, Utilities, History) {
	"use strict";

	return BaseController.extend("com.sap.build.standard.dataManagement.controller.SsSearch", {
	
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
						context: oModel.getProperty("/" + sPath + "/SERVICESTATIONID"),
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
								context: oModel.getProperty("/" + sPath + "/SERVICESTATIONID"),
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

			var oBindingContext = oEvent.getParameter("listItem").getBindingContext("undefined");

			return new Promise(function(fnResolve) {
				this.doNavigate("SsDetail", oBindingContext, fnResolve, "");
			}.bind(this)).catch(function(err) {
				if (err !== undefined) {
					MessageBox.error(err.message);
				}
			});

		},
	
		onSearch : function (oEvt) {

			// add filter for search
			 this.aFilters=[];
			 var sQuery = oEvt.getSource().getValue(),
			    afilters = [new sap.ui.model.Filter("ALIAS", sap.ui.model.FilterOperator.Contains, sQuery),
							new sap.ui.model.Filter("G500ID", sap.ui.model.FilterOperator.Contains, sQuery),
							new sap.ui.model.Filter("PREVIOUSID", sap.ui.model.FilterOperator.Contains, sQuery)
							];
							
			if (sQuery && sQuery.length > 0) {
				
				var filter = new sap.ui.model.Filter(afilters,false);
				this.aFilters.push(filter);	
				
			}

			// update list binding
			var	binding = this.SearchTable.getBinding("items"),
			CountRows = this.byId("CountRowsTable");
			binding.filter(this.aFilters, "Application");
			CountRows.setText("("+ binding.getLength() +")");
			
		},
		
		onSort: function() {
			this.SearchTable.getBinding("items").sort(new sap.ui.model.Sorter("ALIAS",!this.oSortbDesc));
		},
		
		_onButtonRefresh: function() {
			this.SearchTable.getModel().refresh("true");
			},
			
		onOpenViewSettings: function () {
			if (!this._oViewSettingsDialog) {
				this._oViewSettingsDialog = sap.ui.xmlfragment("com.sap.build.standard.dataManagement.view.fragments.ViewSettingsDialog", this);
				this.getView().addDependent(this._oViewSettingsDialog);
				// forward compact/cozy style into Dialog
				//this._oViewSettingsDialog.addStyleClass(this.getOwnerComponent().getContentDensityClass());
			}
			this._oViewSettingsDialog.open();
		},
		
		onConfirmViewSettingsDialog: function (oEvent) {
			var aFilterItems = oEvent.getParameters().filterItems,
				aFilters = [],
				aCaptions = [];
			// update filter state:
			// combine the filter array and the filter string
			aFilterItems.forEach(function (oItem) {
				
				switch (oItem.getParent().getKey()) {
				
				case "BrandStatus":
							switch (oItem.getKey()) {
							case "Filter1":
								aFilters.push(new Filter("CONVERSIONSTATUS", FilterOperator.EQ, "Re-branded"));
								break;
							case "Filter2":
								aFilters.push(new Filter("CONVERSIONSTATUS", FilterOperator.EQ, "In Process"));
								break;
							case "Filter3":
								aFilters.push(new Filter("CONVERSIONSTATUS", FilterOperator.EQ, "Not initiated"));
								break;
							case "Filter4":
								aFilters.push(new Filter("CONVERSIONSTATUS", FilterOperator.EQ, "Assigned to supplier"));
								break;
							case "Filter5":
								aFilters.push(new Filter("CONVERSIONSTATUS", FilterOperator.EQ, "Budget+ImgProp"));
								break;
							case "Filter6":
								aFilters.push(new Filter("CONVERSIONSTATUS", FilterOperator.EQ, "Presented to Dealer"));
								break;
							case "Filter7":
								aFilters.push(new Filter("CONVERSIONSTATUS", FilterOperator.EQ, "Approved by Dealer"));
								break;
							default:
								break;
							}
							
					break;
				case "FactStartDate":
					aFilters.push(new Filter("FACTSTARTDATE", FilterOperator.EQ, oItem.getText()));
					break;
				case "FederalEntity":
					aFilters.push(new Filter("FEDERALSTATE", FilterOperator.EQ, oItem.getText()));
					break;
				
				}
				
				
				aCaptions.push(oItem.getText());
			});
			this._oListFilterState.aFilter = aFilters;
			this._updateFilterBar(aCaptions.join(", "));
			this._applyFilterSearch();
		},
			
			onDataExport: sap.m.Table.prototype.exportData || function(oEvent) {

			var column1 =  "ALIAS",
			 column2 = this.getView().getModel("i18n").getResourceBundle().getText("SSSearchBSName"),
			 column3 = this.getView().getModel("i18n").getResourceBundle().getText("SSSearchG500ID"),
			 column4 = this.getView().getModel("i18n").getResourceBundle().getText("SSSearchCREID"),
			 column5 = this.getView().getModel("i18n").getResourceBundle().getText("SSSearchPREVIOUSSIIC"),
			 column6 = this.getView().getModel("i18n").getResourceBundle().getText("SSSearchPREVIOUSID"),
			 column7 = this.getView().getModel("i18n").getResourceBundle().getText("SSSearchBPID");
			 
			var oExport = new Export({

				// Type that will be used to generate the content. Own ExportType's can be created to support other formats
				exportType: new ExportTypeCSV({
					separatorChar: ",",
					mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
					charset: "utf-8"
				}),

				// Pass in the model created above
				models: this.SearchTable.getModel("undefined"),

				// binding information for the rows aggregation
				rows: {
					path: "/d/results/",
					filters: this.aFilters
				},

				// column definitions with column name and binding info for the content

				columns: [{
					name: column1,
					template: {
						content: "{ALIAS}"
					}
				}, 
				{
					name: column2,
					template: {
						content: "{DEALER>/d/results/BUSINESSNAME}"
					}
				}, {
					name: column3,
					template: {
						content: "{G500ID}"
					}
					}, {
					name: column4,
					template: {
						content: "{CREID}"
					}
				}, {
					name: column5,
					template: {
						content: "{PREVIOUSSIIC}"
					}
				}, {
					name: column6,
					template: {
						content: "{PREVIOUSID}"
					}
				},
				{
					name: column7,
					template: {
						content: "{BUSINESSPARTNERID}"
					}
				}
				]
			});

			// download exported file
			oExport.saveFile(this.getView().getModel("i18n").getResourceBundle().getText("SSSearchFileName")).catch(function(oError) {
				MessageBox.error("Error when downloading data. Browser might not be supported!\n\n" + oError);
			}).then(function() {
				oExport.destroy();
			});

		},
			
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("SsSearch").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));
			
			//Views 
			this.SearchTable = this.byId("SearchTableSS");
			//Variables
			this.oSortbDesc = false;
			var oJsonModel = new sap.ui.model.json.JSONModel(),
			oTableData = this.getView().byId("SearchTableSS");
			oJsonModel.setSizeLimit(20000);
			oJsonModel.loadData("/ZHDB_SSSS_SRV/ZHDB_SSSS_SRV/Z_DB_SSSS_SRV.xsodata/SS?$format=json");
			oJsonModel.attachRequestCompleted(function(){
			oTableData.setModel(oJsonModel);	
			});
			
			var oJsonModelDealer = new sap.ui.model.json.JSONModel();
			oJsonModelDealer.loadData("/ZHDB_SSSS_SRV/ZHDB_SSSS_SRV/Z_DB_SSSS_SRV.xsodata/SSDEALER?$format=json");
			oJsonModelDealer.attachRequestCompleted(function(){
			oTableData.setModel(oJsonModelDealer,"DEALER");	
			});
			
		}
	});
}, /* bExport= */ true);