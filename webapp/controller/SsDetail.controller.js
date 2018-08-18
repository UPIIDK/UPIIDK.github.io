sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./utilities",
	"sap/m/Dialog",
	"sap/m/Button",
	"sap/ui/core/routing/History"
], function (BaseController, MessageBox, Utilities, Dialog, Button, History) {
	"use strict";

	return BaseController.extend("com.sap.build.standard.dataManagement.controller.SsDetail", {

		handleRouteMatched: function (oEvent) {
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
			this.getDataSS();
		},
		_onButtonPress: function (oEvent) {

			var oBindingContext = oEvent.getSource().getBindingContext();

			return new Promise(function (fnResolve) {

				this.doNavigate("SsSearch", oBindingContext, fnResolve, "");
			}.bind(this)).catch(function (err) {
				if (err !== undefined) {
					MessageBox.error(err.message);
				}
			});

		},
		doNavigate: function (sRouteName, oBindingContext, fnPromiseResolve, sViaRelation) {
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
				sNavigationPropertyName = sViaRelation || this.getOwnerComponent().getNavigationPropertyForNavigationWithContext(sEntityNameSet,
					sRouteName);
			}
			if (sNavigationPropertyName !== null && sNavigationPropertyName !== undefined) {
				if (sNavigationPropertyName === "") {
					this.oRouter.navTo(sRouteName, {
						context: sPath,
						masterContext: sMasterContext
					}, false);
				} else {
					oModel.createBindingContext(sNavigationPropertyName, oBindingContext, null, function (bindingContext) {
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
		_onButtonPress1: function (oEvent) {

			var oBindingContext = oEvent.getSource().getBindingContext();

			return new Promise(function (fnResolve) {

				this.doNavigate("Home", oBindingContext, fnResolve, "");
			}.bind(this)).catch(function (err) {
				if (err !== undefined) {
					MessageBox.error(err.message);
				}
			});

		},

		getDataSS: function () {

			var oJsonModelSS = new sap.ui.model.json.JSONModel(),
				oJsonModelSSContactsonSS = new sap.ui.model.json.JSONModel(),
				oJsonModelSSContactsRole = new sap.ui.model.json.JSONModel(),
				oJsonModelSSContacts = new sap.ui.model.json.JSONModel(),
				oJsonModelSSSupplierCat = new sap.ui.model.json.JSONModel(),
				oJsonModelSSLoc = new sap.ui.model.json.JSONModel(),
				oJsonModelSSConfig = new sap.ui.model.json.JSONModel(),
				oJsonModelSSSupplierOnSS = new sap.ui.model.json.JSONModel(),
				oJsonModelSSSupplier = new sap.ui.model.json.JSONModel(),
				oJsonModelSSTank = new sap.ui.model.json.JSONModel(),
				oJsonModelSSPumpTank = new sap.ui.model.json.JSONModel(),
				oJsonModelSSPump = new sap.ui.model.json.JSONModel(),
				oJsonModelSSDelSpec = new sap.ui.model.json.JSONModel(),
				oJsonModelSSCommRelaShip = new sap.ui.model.json.JSONModel(),
				oJsonModelSSBrand = new sap.ui.model.json.JSONModel(),
				oJsonModelSSDealer = new sap.ui.model.json.JSONModel(),
				oJsonModelSSDealerGrp = new sap.ui.model.json.JSONModel(),
				oJsonModelSSConversion = new sap.ui.model.json.JSONModel();
			//Model SS
			oJsonModelSS.loadData("/ZHDB_SSSS_SRV/ZHDB_SSSS_SRV/Z_DB_SSSS_SRV.xsodata/SS(" + this.sContext + ")?$format=json");
			oJsonModelSS.attachRequestCompleted(function () {
				this.getView().setModel(oJsonModelSS, "SERVICESTATION");
				var SSBrandId = oJsonModelSS.getProperty("/d/FK_BRAND"),
					SSCommRelShipId = oJsonModelSS.getProperty("/d/FK_COMMERCIALRELATIONSHIP"),
					SSTaxId = oJsonModelSS.getProperty("/d/FK_TAXID");
				//Model SS Brand	
				oJsonModelSSBrand.loadData("/ZHDB_SSSS_SRV/ZHDB_SSSS_SRV/Z_DB_SSSS_SRV.xsodata/SSBrand(" + SSBrandId + ")?$format=json");
				oJsonModelSSBrand.attachRequestCompleted(function () {
					this.getView().setModel(oJsonModelSSBrand, "SSBRAND");
				}, this);
				//Model SS CommRelationShip
				oJsonModelSSCommRelaShip.loadData("/ZHDB_SSSS_SRV/ZHDB_SSSS_SRV/Z_DB_SSSS_SRV.xsodata/SSComerRelation(" + SSCommRelShipId +
					")?$format=json");
				oJsonModelSSCommRelaShip.attachRequestCompleted(function () {
					this.getView().setModel(oJsonModelSSCommRelaShip, "SSCOMMERCIALRELATIONSHIP");
				}, this);
				//Model Dealer
				oJsonModelSSDealer.loadData("/ZHDB_SSSS_SRV/ZHDB_SSSS_SRV/Z_DB_SSSS_SRV.xsodata/SSDEALER('" + SSTaxId + "')?$format=json");
				oJsonModelSSDealer.attachRequestCompleted(function () {

					this.getView().setModel(oJsonModelSSDealer, "DEALER");
					var SSDealerGrpId = oJsonModelSSDealer.getProperty("/d/FK_GROUPID");

					oJsonModelSSDealerGrp.loadData("/ZHDB_SSSS_SRV/ZHDB_SSSS_SRV/Z_DB_SSSS_SRV.xsodata/SSDealerGrp(" + SSDealerGrpId +
						")?$format=json");
					oJsonModelSSDealerGrp.attachRequestCompleted(function () {
						this.getView().setModel(oJsonModelSSDealerGrp, "DEALERGROUP");
					}, this);

				}, this);

			}, this);

			//Model SSLOC
			oJsonModelSSLoc.loadData("/ZHDB_SSSS_SRV/ZHDB_SSSS_SRV/Z_DB_SSSS_SRV.xsodata/SSAddress(" + this.sContext + ")?$format=json");
			oJsonModelSSLoc.attachRequestCompleted(function () {
				this.getView().setModel(oJsonModelSSLoc, "SSLOCATION");

			}, this);

			//Model SSContacts
			$.get("/ZHDB_SSSS_SRV/ZHDB_SSSS_SRV/Z_DB_SSSS_SRV.xsodata/SSContacts/$count",function (count) {
					this.ConteoTotalContactos = count;
				}.bind(this));
			/*oJsonModelSSContactsonSS.loadData("/ZHDB_SSSS_SRV/ZHDB_SSSS_SRV/Z_DB_SSSS_SRV.xsodata/SSContactsSS("+ this.sContext +")?$format=json");
			oJsonModelSSContactsonSS.attachRequestCompleted(function(){
			
			var SSContactId = oJsonModelSSContactsonSS.getProperty("/d/FK_SSCONTACTID"),
		SSContactRoleId = oJsonModelSSContactsonSS.getProperty("/d/FK_CONTACTROLEID");
			
				oJsonModelSSContactsRole.loadData("/ZHDB_SSSS_SRV/ZHDB_SSSS_SRV/Z_DB_SSSS_SRV.xsodata/SSContactsRole("+ SSContactRoleId +")?$format=json");
				oJsonModelSSContactsRole.attachRequestCompleted(function(){
				this.getView().setModel(oJsonModelSSContactsRole,"SSCONTACTROLE");	
				},this);
			
				oJsonModelSSContacts.loadData("/ZHDB_SSSS_SRV/ZHDB_SSSS_SRV/Z_DB_SSSS_SRV.xsodata/SSContacts("+ SSContactId +")?$format=json");
				oJsonModelSSContacts.attachRequestCompleted(function(){
				this.getView().setModel(oJsonModelSSContacts,"SSCONTACT");	
				},this);
			
				
			},this);*/

			oJsonModelSSContacts.loadData(
				"/ZHDB_SSSS_SRV/ZHDB_SSSS_SRV/Z_CV_SS_SRV.xsodata/ContactsonSS/?$format=json&$filter=FK_SERVICESTATIONID eq " + this.sContext +
				"M");
			oJsonModelSSContacts.attachRequestCompleted(function () {
				this.TablaContactos.setModel(oJsonModelSSContacts, "SSCONTACT");
				this.getView().byId("CountContactos").setTitle("CONTACTOS (" + oJsonModelSSContacts.getData().d.results.length + ")");
			}, this);
			
			oJsonModelSSContactsRole.loadData("/ZHDB_SSSS_SRV/ZHDB_SSSS_SRV/Z_DB_SSSS_SRV.xsodata/SSContactsRole/?$format=json");
				oJsonModelSSContactsRole.attachRequestCompleted(function(){
				this.getView().setModel(oJsonModelSSContactsRole,"SSCONTACTROLE");	
				},this);

			//Model Delivery Specific
			oJsonModelSSDelSpec.loadData("/ZHDB_SSSS_SRV/ZHDB_SSSS_SRV/Z_DB_SSSS_SRV.xsodata/SSDelSpecif(" + this.sContext + ")?$format=json");
			oJsonModelSSDelSpec.attachRequestCompleted(function () {
				this.getView().setModel(oJsonModelSSDelSpec, "DELIVERYSPECIFICATION");
			}, this);

			//Model Config Service Station
			oJsonModelSSConfig.loadData("/ZHDB_SSSS_SRV/ZHDB_SSSS_SRV/Z_DB_SSSS_SRV.xsodata/SSConfig(" + this.sContext + ")?$format=json");
			oJsonModelSSConfig.attachRequestCompleted(function () {
				this.getView().setModel(oJsonModelSSConfig, "SSCONFIGURATION");
			}, this);

			//Model Suppliers on Service Station
			$.get("/ZHDB_SSSS_SRV/ZHDB_SSSS_SRV/Z_DB_SSSS_SRV.xsodata/SSVendors/$count", function (count) {
				this.ConteoTotalSuppliers = count;
			}.bind(this));
			/*oJsonModelSSSupplierOnSS.loadData("/ZHDB_SSSS_SRV/ZHDB_SSSS_SRV/Z_DB_SSSS_SRV.xsodata/SSVendorsSS/?$format=json&$filter=FK_SERVICESTATIONID eq "+ this.sContext +"M");
			oJsonModelSSSupplierOnSS.attachRequestCompleted(function(){
			
			var SupplierCategoryId = oJsonModelSSSupplierOnSS.getProperty("/d/FK_SSSUPPLIERCATEGORYID"),
				SupplierId = oJsonModelSSSupplierOnSS.getProperty("/d/FK_SSSUPPLIERID");
				
				oJsonModelSSSupplierCat.loadData("/ZHDB_SSSS_SRV/ZHDB_SSSS_SRV/Z_DB_SSSS_SRV.xsodata/SSVendorsCat("+ SupplierCategoryId +")?$format=json");
				oJsonModelSSSupplierCat.attachRequestCompleted(function(){
					this.getView().setModel(oJsonModelSSSupplierCat,"SSSUPPLIERCAT");
				},this);
				
				oJsonModelSSSupplier.loadData("/ZHDB_SSSS_SRV/ZHDB_SSSS_SRV/Z_DB_SSSS_SRV.xsodata/SSVendors("+ SupplierId +")?$format=json");
				oJsonModelSSSupplier.attachRequestCompleted(function(){
					this.getView().setModel(oJsonModelSSSupplier,"SSSUPPLIER");
				},this);
				
			},this);*/

			oJsonModelSSSupplier.loadData(
				"/ZHDB_SSSS_SRV/ZHDB_SSSS_SRV/Z_CV_SS_SRV.xsodata/SuppliersonSS?$format=json&$filter=FK_SERVICESTATIONID eq " + this.sContext +
				"M");
			oJsonModelSSSupplier.attachRequestCompleted(function () {
				this.getView().setModel(oJsonModelSSSupplier, "SSSUPPLIER");
				this.SupplierCount.setTitle("PROVEEDORES ("+ oJsonModelSSSupplier.getData().d.results.length +")");
			}, this);
			
			oJsonModelSSSupplierCat.loadData("/ZHDB_SSSS_SRV/ZHDB_SSSS_SRV/Z_DB_SSSS_SRV.xsodata/SSVendorsCat/?$format=json");
				oJsonModelSSSupplierCat.attachRequestCompleted(function(){
					this.getView().setModel(oJsonModelSSSupplierCat,"SSSUPPLIERCAT");
				},this);

			//Model Tanks on Service Station
			oJsonModelSSTank.loadData("/ZHDB_SSSS_SRV/ZHDB_SSSS_SRV/Z_DB_SSSS_SRV.xsodata/SSTANK/?$format=json&$filter=FK_SERVICESTATIONID eq " +
				this.sContext + "M");
			oJsonModelSSTank.attachRequestCompleted(function () {
				this.getView().byId("TitleTanks").setTitle("Tanques (" + oJsonModelSSTank.getData().d.results.length + ")");
				this.getView().setModel(oJsonModelSSTank, "TANK");

				var PumpTankId = oJsonModelSSTank.getProperty("/d/results/TANKID");

				oJsonModelSSPumpTank.loadData(
					"/ZHDB_SSSS_SRV/ZHDB_SSSS_SRV/Z_DB_SSSS_SRV.xsodata/SSPUMPTANK/?$format=json&$filter=FK_TANKID eq " + PumpTankId[0] + "M");
				oJsonModelSSPumpTank.attachRequestCompleted(function () {
					var PumpId = oJsonModelSSPumpTank.getProperty("/d/results/FK_PUMPID");
					oJsonModelSSPump.loadData("/ZHDB_SSSS_SRV/ZHDB_SSSS_SRV/Z_DB_SSSS_SRV.xsodata/SSPUMP(" + PumpId + ")?$format=json");
					this.getView().setModel(oJsonModelSSPump, "PUMP");
				}, this);

			}, this);

			//Model SSConversion on Service Station
			/*oJsonModelSSConversion.loadData(
				"/ZHDB_SSSS_SRV/ZHDB_SSSS_SRV/Z_DB_SSSS_SRV.xsodata/SSConversionStat/?$format=json&$filter=FK_SERVICESTATIONID eq " + this.sContext +
				"");*/
			oJsonModelSSConversion.loadData(
				"/ZHDB_SSSS_SRV/ZHDB_SSSS_SRV/Z_CV_SS_SRV.xsodata/SSCONVERSION("+ this.sContext +")/?$format=json");	
			oJsonModelSSConversion.attachRequestCompleted(function () {
				this.formatDateDisplay(oJsonModelSSConversion.getProperty("/d/"));
				oJsonModelSSConversion.refresh(true);
				this.getView().setModel(oJsonModelSSConversion, "SSCONVERSION");
				}, this);

		},
		formatDateDisplay: function (aModel) {
			for(var i=0;i<aModel.length;i++){
				aModel[i].FINCAMBIO = this.retrieveJSONDate(aModel[i].FINCAMBIO);
				aModel[i].INICIOCAMBIO = this.retrieveJSONDate(aModel[i].INICIOCAMBIO);
			}
		},
		retrieveJSONDate: function (_sDate) {
			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
				pattern: "dd/MM/yyyy"
			});
			
			if (typeof _sDate == "string") {
				if (_sDate.indexOf("/Date(") >= 0) {
					var sDate;
					sDate = _sDate.replace("/Date(", "").replace(")/", "");
					return oDateFormat.format(new Date(parseInt(sDate)));
				}
			} else {
				return oDateFormat.format(_sDate);
			}
		},
		_onButtonRefresh: function () {
			this.getDataSS();
			this.tablaContactos.getModel().refresh(true);
			this.getView().getModel().refresh(true);
		},
		_onButtonAddContact: function () {

			var DialogTitle = this.getView().getModel("i18n").getResourceBundle().getText("SSDetailAddContact"),
				Close = this.getView().getModel("i18n").getResourceBundle().getText("Close"),
				Save = this.getView().getModel("i18n").getResourceBundle().getText("Create"),
				//AddContactDialogContent = sap.ui.xmlfragment("com.sap.build.standard.dataManagement.view.fragments.AddContactDialog",this);
				
				AddContactDialogContent = new sap.m.VBox({
					items: [
						new sap.m.Table({
							columns: [
								new sap.m.Column({
									header: [
										new sap.m.Text({
											text: "Rol"
										})
									]
								}),
								new sap.m.Column({
									header: [
										new sap.m.Text({
											text: "Nombre"
										})
									]
								}), new sap.m.Column({
									header: [
										new sap.m.Text({
											text: "Apellido Paterno"
										})
									]
								}), new sap.m.Column({
									header: [
										new sap.m.Text({
											text: "Apellido Materno"
										})
									]
								}), new sap.m.Column({
									header: [
										new sap.m.Text({
											text: "Teléfono 1"
										})
									]
								}),
								new sap.m.Column({
									header: [
										new sap.m.Text({
											text: "E-mail 1"
										})
									]
								})
							],
							items: [
								new sap.m.ColumnListItem({
									cells: [
										this.Rol = new sap.m.ComboBox({
											id: "AddRol",
											items: [
												new sap.ui.core.Item({
													key: "1",
													text: "Rol 1"
												}),
												new sap.ui.core.Item({
													key: "2",
													text: "Rol 2"
												}),
												new sap.ui.core.Item({
													key: "3",
													text: "Rebranding"
												}),
												new sap.ui.core.Item({
													key: "4",
													text: "SS Invoicing"
												})
											]
										}),
										this.Nombre = new sap.m.Input({
											id: "AddNombre"
										}),
										this.Apellido1 = new sap.m.Input({
											id: "AddApellido1"
										}),
										this.Apellido2 = new sap.m.Input({
											id: "AddApellido2"
										}),
										this.Telefono1 = new sap.m.Input({
											id: "AddTelefono1"
										}), this.Email1 = new sap.m.Input({
											id: "AddEmail1"
										})
									]
								})
							]
						}, this),
						new sap.m.Table({

							columns: [
								new sap.m.Column({
									header: [
										new sap.m.Text({
											text: "Teléfono 2"
										})
									]
								}),
								new sap.m.Column({
									header: [
										new sap.m.Text({
											text: "Teléfono 3"
										})
									]
								}),
								new sap.m.Column({
									header: [
										new sap.m.Text({
											text: "E-mail 2"
										})
									]
								}),
								new sap.m.Column({
									header: [
										new sap.m.Text({
											text: "E-mail 3"
										})
									]
								})
							],
							items: [
								new sap.m.ColumnListItem({
									cells: [
										this.Telefono2 = new sap.m.Input({
											id: "AddTelefono2"
										}),
										this.Telefono3 = new sap.m.Input({
											id: "AddTelefono3"
										}),
										this.Email2 = new sap.m.Input({
											id: "AddEmail2"
										}),
										this.Email3 = new sap.m.Input({
											id: "AddEmail3"
										})
									]
								})
							]
						}, this)
					]
				}, this);

			var AddContactDialog = new Dialog({
				title: DialogTitle,
				contentWidth: "auto",
				contentHeight: "auto",
				resizable: true,
				draggable: true,
				content: AddContactDialogContent,
				beginButton: new Button({
					text: Close,
					press: function (oEvent) {
						AddContactDialog.close();
					}
				}, this),
				endButton: new Button({
					text: Save,
					press: function (oEvent) {
						this.ConteoTotalContactos++;
						var JModel1 = this.onCreateoJModel("Contactos");
						this.onSaveData(JModel1, "/SSContacts", "POST", "1");
						AddContactDialog.close();
						
					}.bind(this)
				}),
				afterClose: function () {

					AddContactDialog.destroy();

				}
			});
			//to get access to the global model
			this.getView().addDependent(AddContactDialog);

			AddContactDialog.open();
		},
		_onButtonAddSupplier: function () {

			var DialogTitle = this.getView().getModel("i18n").getResourceBundle().getText("SSDetailAddSupplier"),
				Close = this.getView().getModel("i18n").getResourceBundle().getText("Close"),
				Save = this.getView().getModel("i18n").getResourceBundle().getText("Create"),
				//AddSupplierDialogContent = sap.ui.xmlfragment("com.sap.build.standard.dataManagement.view.fragments.AddSupplierDialog",this);
			
				AddSupplierDialogContent = new sap.m.VBox({
					items: [
						new sap.m.Table({

							columns: [
								new sap.m.Column({
									header: [
										new sap.m.Text({
											text: "Nombre"
										})
									]
								}),
								new sap.m.Column({
									header: [
										new sap.m.Text({
											text: "Categoria"
										})
									]
								}), new sap.m.Column({
									header: [
										new sap.m.Text({
											text: "E-mail 1"
										})
									]
								}), new sap.m.Column({
									header: [
										new sap.m.Text({
											text: "Teléfono 1"
										})
									]
								})
							],
							items: [
								new sap.m.ColumnListItem({
									cells: [
										
										this.NombreS = new sap.m.Input({
											id: "AddNombreS"
										}),
										this.Categoria = new sap.m.ComboBox({
											id: "AddCategoria",
											items: [
												new sap.ui.core.Item({
													key: "1",
													text: "Categoría1deProveedor"
												}),
												new sap.ui.core.Item({
													key: "2",
													text: "Categoría2deProveedor"
												})
											]
										}),
										this.Email1S = new sap.m.Input({
											id: "AddEmail1S"
										}),
										this.Telefono1S = new sap.m.Input({
											id: "AddTelefono1S"
										})
									]
								})
							]
						}, this),
						new sap.m.Table({

							columns: [
								new sap.m.Column({
									header: [
										new sap.m.Text({
											text: "E-mail 2"
										})
									]
								}), new sap.m.Column({
									header: [
										new sap.m.Text({
											text: "E-mail 3"
										})
									]
								}), new sap.m.Column({
									header: [
										new sap.m.Text({
											text: "Teléfono 2"
										})
									]
								}),
								new sap.m.Column({
									header: [
										new sap.m.Text({
											text: "Teléfono 3"
										})
									]
								})
							],
							items: [
								new sap.m.ColumnListItem({
									cells: [
										this.Email2S = new sap.m.Input({
											id: "AddEmail2S"
											
										}),
										this.Email3S = new sap.m.Input({
											id: "AddEmail3S"
										}),
										this.Telefono2S = new sap.m.Input({
											id: "AddTelefono2S"
										}),
										this.Telefono3S = new sap.m.Input({
											id: "AddTelefono3S"
										})

									]
								})
							]
						}, this)
					]
				}, this);

			var AddSupplierDialog = new Dialog({
				title: DialogTitle,
				contentWidth: "600px",
				contentHeight: "480px",
				resizable: true,
				draggable: true,
				content: AddSupplierDialogContent,
				beginButton: new Button({
					text: Close,
					press: function (oEvent) {
						AddSupplierDialog.close();
					}
				}, this),
				endButton: new Button({
					text: Save,
					press: function (oEvent) {
						this.ConteoTotalSuppliers++;
						var JModelSupp = this.onCreateoJModel("Suppliers");
						this.onSaveData(JModelSupp, "/SSVendors", "POST", "1");
						AddSupplierDialog.close();
					}.bind(this)
				},this),
				afterClose: function () {

					AddSupplierDialog.destroy();

				}
			});
			//to get access to the global model
			this.getView().addDependent(AddSupplierDialog);

			AddSupplierDialog.open();

		},
		
		onEditableStatus: function (oEvent){
			
			var DialogTitle = this.getView().getModel("i18n").getResourceBundle().getText("SSDetailUpdateStatus"),
				Close = this.getView().getModel("i18n").getResourceBundle().getText("Close"),
				Update = this.getView().getModel("i18n").getResourceBundle().getText("Update"),
				//AddSupplierDialogContent = sap.ui.xmlfragment("com.sap.build.standard.dataManagement.view.fragments.AddSupplierDialog",this);
			
				UpdateConversionDialogContent = new sap.m.VBox({
					items: [
					 new sap.m.Table({
							columns: [
								new sap.m.Column({
									header: [
										new sap.m.Text({
											text: "RTM"
										})
									]
								}),
								new sap.m.Column({
									header: [
										new sap.m.Text({
											text: "Vencimiento Pemex"
										})
									]
								}), new sap.m.Column({
									header: [
										new sap.m.Text({
											text: "Inicio Rebranding"
										})
									]
								}), new sap.m.Column({
									header: [
										new sap.m.Text({
											text: "Fin Rebranding"
										})
									]
								})
							],
							items: [
								new sap.m.ColumnListItem({
									cells: [
										
										this.RTM = new sap.m.Text({
											id: "UpdateRTM",
											text: this.getView().byId("SSCONVERSION_RTM").getText()
										}),
										this.VencPemex = new sap.m.DatePicker({
											id:"UpdateVencPemex", 
											value : "{VENCPEMEX}",  
											enabled:true}),
										this.InitBrand = new sap.m.DatePicker({
											id:"UpdateInicioBrand", 
											value : "{INICIOCAMBIO}",  
											enabled:true}),
										this.EndBrand = new sap.m.DatePicker({
											id:"UpdateEndBrand", 
											value : "{FINCAMBIO}",  
											enabled:true})
									]
								})
							]
						}, this),new sap.m.Table({
							columns: [
								new sap.m.Column({
									header: [
										new sap.m.Text({
											text: "Status"
										})
									]
								}),
								new sap.m.Column({
									header: [
										new sap.m.Text({
											text: "Status Forecast"
										})
									]
								}), new sap.m.Column({
									header: [
										new sap.m.Text({
											text: "Comentarios"
										})
									]
								})
							],
							items: [
								new sap.m.ColumnListItem({
									cells: [
										
										this.Status = new sap.m.Input({
											id:"UpdateStatus", 
											value : this.getView().byId("SSCONVERSION_Status").getText(),  
											enabled:true}),
										this.Forecast = new sap.m.Input({
											id:"UpdateForecast", 
											value : this.getView().byId("SSCONVERSION_Forecast").getText(),  
											enabled:true}),
										this.Comment = new sap.m.Input({
											id:"UpdateComments", 
											value : this.getView().byId("SSCONVERSION_Comments").getText(),  
											enabled:true})
									]
								})
							]
						}, this)
					]
				}, this);

			var UpdateConversionDialog = new Dialog({
				title: DialogTitle,
				contentWidth: "auto",
				contentHeight: "auto",
				resizable: true,
				draggable: true,
				content: UpdateConversionDialogContent,
				beginButton: new Button({
					text: Close,
					press: function (oEvent) {
						UpdateConversionDialog.close();
					}
				}, this),
				endButton: new Button({
					text: Update,
					press: function (oEvent) {
						var JModelConversion = this.onCreateoJModel("Conversion");
						this.onSaveData(JModelConversion, "/SSConversionstat", "UPDATE", parseInt(this.getView().getModel("SSCONVERSION").getProperty("/d/results/0/SSCONVERSIONID")));
						UpdateConversionDialog.close();
					}.bind(this)
				},this),
				afterClose: function () {

					UpdateConversionDialog.destroy();

				}
			});
			//to get access to the global model
			this.getView().addDependent(UpdateConversionDialog);

			UpdateConversionDialog.open();
			
		},

		onCreateoJModel: function (Table) {

			var JModel;
			switch (Table) {
			case "Contactos":

				JModel = {
					"SSCONTACTID": this.ConteoTotalContactos,
					"NAME": this.Nombre.getValue(),
					"MIDDLENAME": this.Apellido1.getValue(),
					"LASTNAME": this.Apellido2.getValue(),
					"EMAIL1": this.Email1.getValue(),
					"EMAIL2": this.Email2.getValue(),
					"EMAIL3": this.Email3.getValue(),
					"TELEPHONE1": this.Telefono1.getValue(),
					"TELEPHONE2": this.Telefono2.getValue(),
					"TELEPHONE3": this.Telefono3.getValue(),
					"STATUS": "Activo"
				};

				break;

			case "onSS":

				JModel = {
					"SSCONTACTID": this.ConteoTotalContactos,
					"FK_CONTACTROLEID": parseInt(this.Rol.getSelectedKey()),
					"FK_SERVICESTATIONID": parseInt(this.sContext),
					"FK_SSCONTACTID": this.ConteoTotalContactos};
				break;

			case "Suppliers":

				JModel = {
					"SSSUPPLIERID": this.ConteoTotalSuppliers,
					"BUSINESSNAME": this.NombreS.getValue(),
					"EMAIL1": this.Email1S.getValue(),
					"EMAIL2": this.Email2S.getValue(),
					"EMAIL3": this.Email3S.getValue(),
					"TELEPHONE1": this.Telefono1S.getValue(),
					"TELEPHONE2": this.Telefono2S.getValue(),
					"TELEPHONE3": this.Telefono3S.getValue()
				};

				break;

			case "SupponSS":

				JModel = {
					"SSSUPPLIERONSSID": this.ConteoTotalSuppliers,
					"FK_SSSUPPLIERID": this.ConteoTotalSuppliers,
					"FK_SSSUPPLIERCATEGORYID": parseInt(this.Categoria.getSelectedKey()),
					"FK_SERVICESTATIONID": parseInt(this.sContext)
				};

				break;
				
				case "Conversion":
					
					JModel = {
					"SSCONVERSIONID" : parseInt(this.getView().getModel("SSCONVERSION").getProperty("/d/results/0/SSCONVERSIONID")),
					"FK_SERVICESTATIONID": parseInt(this.sContext),
					"RTM": this.getView().byId("SSCONVERSION_RTM").getText(),
					"INICIOCAMBIO": this.InitBrand.getValue(),
					"FINCAMBIO": this.EndBrand.getValue(),
					"CONVERSIONSTATUS": this.Status.getValue(),
					"VENCPEMEX": this.VencPemex.getValue(),
					"COMMENTS": this.Comment.getValue(),
					"STATUSFORECAST": this.Forecast.getValue()
					
				};
					
				break;
			}

			return JModel;
		},

		onSaveData: function (oModel, oEntity, sOperation, updateKey) {
			//this.showBusyIndicator(1000, 0);
			var oModelRequest = new sap.ui.model.odata.v2.ODataModel(
				"/ZHDB_SSSS_SRV/ZHDB_SSSS_SRV/Z_DB_SSSS_SRV.xsodata/", {
					json: true
				}, "", ""
			);
			// Set POST request header using the X-CSRF token
			oModelRequest.setHeaders({
				"Content-Type": "application/json",
				"charset": "utf-8"
			});

			// Call the create request	
			if (sOperation === "POST") {
				oModelRequest.create(oEntity, oModel, {
					method: sOperation,
					success: function (data) {
						if(oEntity === "/SSContacts"){
						var JModel2= this.onCreateoJModel("onSS");
						this.onSaveData(JModel2,"/SSContactsSS","POST","1");
						}else if (oEntity === "/SSVendors")
						{
						var JModelSuppSS = this.onCreateoJModel("SupponSS");
						this.onSaveData(JModelSuppSS, "/SSVendorsSS", "POST", "1");
						}else{
							sap.m.MessageToast.show("Creado Satisfactoriamente");
						}
					}.bind(this),
					error: function () {
						sap.m.MessageToast.show("Falla en la creación - repetir operacion");
						this.getDataSS();
						}.bind(this)
				}, this);
			} else {
				oModelRequest.update(oEntity + "(" + updateKey + ")", oModel, {
					success: function (data) {
							sap.m.MessageToast.show("Actualizado correctamente");
					},
					error: function (data) {
							sap.m.MessageToast.show("Fallo Actualización - intentar nuevamente");
					}
				});
			}
		},
		
		onInit: function () {

			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("SsDetail").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));

			var oGeoMap = this.getView().byId("GeoMap");
			var oMapConfig = {
				"MapProvider": [{
					"name": "HEREMAPS",
					"type": "",
					"description": "",
					"tileX": "256",
					"tileY": "256",
					"maxLOD": "20",
					"copyright": "G500 Maps",
					"Source": [{
						"id": "s1",
						"url": "https://mt.google.com/vt/x={X}&y={Y}&z={LOD}"
					}]
				}],
				"MapLayerStacks": [{
					"name": "DEFAULT",
					"MapLayer": {
						"name": "layer1",
						"refMapProvider": "HEREMAPS",
						"opacity": "1.0",
						"colBkgnd": "RGB(059,139,189)"
					}
				}]
			};
			oGeoMap.setMapConfiguration(oMapConfig);
			oGeoMap.setRefMapLayerStack("DEFAULT");

			//views
			this.TablaContactos = this.getView().byId("TablaContactos");
			this.SupplierCount = this.getView().byId("SupplierCount");

		}
	});
}, /* bExport= */ true);