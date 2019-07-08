/*
*----------------------------------------------------------------------*
*                     Delivery Accenture Mexico                        *
*----------------------------------------------------------------------*
* Proyecto             : UNIFIKT FASE II                               *
* Requerimiento        : FED_R001							           *
* Programa             : zabcadmingroup	                               *
* Creado por           : Ivan Contla          <p000018>     		   *
* Fecha de creacion    : 01/03/2019                                    *
* Descripcion          : Aplicación para la visualización de mosaicos  *
						 de reportes customizados.                     *
* Versión	           : 1.0			                               *
*----------------------------------------------------------------------*

*----------------------------------------------------------------------*
* Log de modificaciones                                                *
*----------------------------------------------------------------------*
* Modified by      : Ivan Contla		                               *
* Requerimiento    : FED_R001							               *
* Modificado por   : Ivan Contla          P000018		               *
* Fecha            :			                                       *
* Descripcion      : Modificación de textos de nombres de reportes     *
* Versión	       : 1.1			                                   *
*----------------------------------------------------------------------*
*/
sap.ui.define([
	"sap/ui/model/Filter",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	'sap/m/MessageBox'
], function (Filter, Controller, JSONModel, MessageBox) {
	"use strict";

	return Controller.extend("com.ZAdminTiles.controller.Main", {
		onInit: function (oEvent) {
			//Global 
			this.TContainer = this.getView().byId("container");
			this.RolesSrv = this.getOwnerComponent().getModel("Roles");
			//****Roles Usuario
			if(this.getOwnerComponent().getModel("UData").getProperty("/login_name")){
			this._getUserandP();
			}else{
			this.getOwnerComponent().getModel("UData").attachRequestCompleted(this._getUserandP ,this);	
			}
		},
		
		_getUserandP: function () {
		
			var User = this.getOwnerComponent().getModel("UData").getProperty("/login_name"),
				RolFilter = [new Filter("XiUser", sap.ui.model.FilterOperator.EQ, User)];
				this._getService(this.RolesSrv, "/ROLESSet", "?$filter=XiUser eq '" + User + "'", RolFilter, {});
		},
		
		onActive: function (_bActive) {
			var Intflag = 0;
			//this._getRoleUser().arrayRole.forEach(function (value, index) {
			this.getView().getModel("ROLESSet").getData().results.forEach(function (value, index) {
				if(value.ToDat >= new Date()){
				switch (value.AgrName) {
	                    
	                    case "ZSS4_MDGDP_ADMIN_DUPLIC_M_0000": //Rol 20 Administración de duplicados
	                    		this.TContainer.getAggregation("tiles")[2].setVisible(_bActive);
	                           Intflag++;
	                            break;  
	                    case "ZSS4_MDGDP_ADMIN_REPORT_V_0000": //Rol 19 Administrador de Reportes
	                    		this.TContainer.getAggregation("tiles")[0].setVisible(_bActive);
	                             this.TContainer.getAggregation("tiles")[1].setVisible(_bActive);
	                             Intflag++;
	                             break; 
	                    case "ZCS4_MDGDP_ADMIN_TECN_M_0000": //Rol 21 Administración Técnica
	                    	this.TContainer.getAggregation("tiles").forEach(function(Tile){
		                            	Tile.setVisible(_bActive);
		                           },this);
	                           Intflag++;                                                                                                     
	                         break;    
						case "ZSS4_MDGDP_FORM_PEN_ENV_V_0000": //Rol 22 Administrador Formatos Pendientes
							this.TContainer.getAggregation("tiles")[3].setVisible(_bActive);
	                           Intflag++;
							break;
					}
				}
			}.bind(this));
			
			if(Intflag === 0){
				MessageBox.error("Usted no cuenta con permisos para utilizar esta aplicación.");
			}

		},
		
		onPressTile: function (oEvent){
			var Tile = oEvent.getSource(),
				oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
			
			if(Tile.getTitle().search("creados") > 0)
			{
					
								
							  oCrossAppNavigator.toExternal({
							  target: {
							  shellHash: "#ZFREPORTS-create"
							  }
							  });
							
					
			}	else if(Tile.getTitle().search("Modificaciones") === 0)
				{
							
						oCrossAppNavigator.toExternal({
							  target: {
							  shellHash: "#ZFREPORTS-change"
							  }
							  });
							
				}	else if(Tile.getTitle().search("duplicados") > 0)
					{
							  
							if(location.host.search("jy8gofo5yo") > 1){ //Dev
			
							  window.open("https://system2abcs4conne1552275728383-jy8gofo5yo.dispatcher.us3.hana.ondemand.com/sap/bc/gui/sap/its/webgui;?" + 
											"sap-language=ES" + "&~transaction=ZMDG_DUPLICADOS" + 
											"&~webgui_icon_toolbar=2&~webgui_simple_toolbar=2048&~nosplash=1&~SINGLETRANSACTION=1");
							}else if (location.host.search("bydbx42diy") > 1){ //Calidad
						
								window.open( //&sap-user=USPSUPOP&sap-password=UsPlwer.
								"https://system2abcs4conne1558647997844-bydbx42diy.dispatcher.us3.hana.ondemand.com/sap/bc/gui/sap/its/webgui;?" + 
								"sap-language=ES" + "&~transaction=ZMDG_DUPLICADOS" + 
								"&~webgui_icon_toolbar=2&~webgui_simple_toolbar=2048&~nosplash=1&~SINGLETRANSACTION=1"
							);
							
						}else if (location.host.search("r09rhljo4f") > 1){ //Productivo
						
								window.open( //&sap-user=USPSUPOP&sap-password=UsPlwer.
								"https://system2abcs4conne1558645993870-r09rhljo4f.dispatcher.us3.hana.ondemand.com/sap/bc/gui/sap/its/webgui;?" + 
								"sap-language=ES" + "&~transaction=ZMDG_DUPLICADOS" + 
								"&~webgui_icon_toolbar=2&~webgui_simple_toolbar=2048&~nosplash=1&~SINGLETRANSACTION=1"
							);
					
						}
					}else if(Tile.getTitle().search("formato") > 0)
					{
						oCrossAppNavigator.toExternal({
							  target: {
							  shellHash: "#ZFREPORTS-formats"
							  }
							  });
					}
		},
		
		_getService: function (Model, Entity, Filters, aFilters, uParams) {
			
			const oModelReading = new sap.ui.model.json.JSONModel();
			
			Model.read(Entity + Filters, {
				urlParameters: uParams,
				filters: aFilters,
				success: function (oData, oResponse) {
					var _Entity = Entity.replace("/", "");
					if (!oData.results) {
						var customData = {
							results: [oData]
						};
						oModelReading.setData(customData);
					} else {
						oModelReading.setData(oData);
					}
					this.getView().setModel(oModelReading, _Entity);

					switch (_Entity) {

					case 'ROLESSet':
						//Define, que vistas, estaran activas.
						this.onActive(true);
						break;

					}

					//	resolve(oData);
				}.bind(this),
				error: function (oData, oResponse) {
					//		reject(oResponse);
					var _Entity = Entity.replace("/", "");

					 if (oData.responseText.search("exception") >= 104 && _Entity === "ROLESSet") {
						this.handleMessageBox("Usted no cuenta con permisos para utilizar esta aplicación.", "error");
					} 
				}.bind(this)
			}, this);
			//}.bind(this));
		}
	});
});