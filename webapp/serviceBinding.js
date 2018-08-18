function initModel() {
	var sUrl = "/ZHDB_SSSS_SRV/ZHDB_SSSS_SRV/Z_DB_SSSS_SRV.xsodata/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}