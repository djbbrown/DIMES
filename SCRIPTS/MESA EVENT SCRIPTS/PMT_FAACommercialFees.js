/*===================================================================
// Script Number: RES230
// Script Name: PMT_FAACommercialFees.js
// Script Developer: Kevin Ford
// Script Agency: Accela
// Script Description: 
// Script Run Event: FAA 
// Script Parents:
//            FAA;Permits/Commercial/NA/NA
===================================================================*/
//COM430
//==============================================
try {
	// If the fee item exists then we need to re-calc every time.
	if(feeExists("COM430", "NEW", "INVOICED")){
		fTotal = getSubGrpFeeAmt("USF","","COM430");
		updateFee("COM430", "PMT_COM", "FINAL", fTotal, "N");
	}
}
catch (err) {
	logDebug("Error assessing fee COM430")
	aa.print("A JavaScript Error occurred: " + err.message);
}

//==============================================
// Fee COM290
//==============================================
try {
	// If the fee item exists then we need to re-calc every time.
	if(feeExists("COM290", "NEW", "INVOICED")){
		fTotal = feeAmount("COM040","NEW","INVOICED");
		updateFee("COM290", "PMT_COM", "FINAL", fTotal, "N");
	}
}
catch (err) {
	logDebug("Error assessing fee COM290")
	aa.print("A JavaScript Error occurred: " + err.message);
}
//==============================================
// Fee COM280
//==============================================
try {
	// If the fee item exists then we need to re-calc every time.
	if(feeExists("COM280", "NEW", "INVOICED")){
		fTotal = feeAmount("COM040","NEW","INVOICED");
		updateFee("COM280", "PMT_COM", "FINAL", fTotal, "N");
	}
}
catch (err) {
	logDebug("Error assessing fee COM280")
	aa.print("A JavaScript Error occurred: " + err.message);
}
//==============================================
// COM110
//==============================================
try {
	// If the fee item exists then we need to re-calc every time.
	if(feeExists("COM110", "NEW", "INVOICED")){
		fTotal = getSubGrpFeeAmt("UC1","","COM110");
		updateFee("COM110", "PMT_COM", "FINAL", fTotal, "N");
	}
}
catch (err) {
	logDebug("Error assessing fee COM110")
	aa.print("A JavaScript Error occurred: " + err.message);
}
//==============================================
//COM115
//==============================================
try {
	// If the fee item exists then we need to re-calc every time.
	if(feeExists("COM115", "NEW", "INVOICED")){
		fTotal = getSubGrpFeeAmt("UC2","","COM115");
		updateFee("COM115", "PMT_COM", "FINAL", fTotal, "N");
	}
}
catch (err) {
	logDebug("Error assessing fee COM115")
	aa.print("A JavaScript Error occurred: " + err.message);
}
//==============================================
// COM140
//==============================================
try {
	if(feeExists("COM140", "NEW", "INVOICED")){
		totHours  = getWFHours(capId,"Planning Review","Building Review","Civil Engineering Review","DIS Review","Plans Coordination");
		updateFee("COM140", "PMT_COM", "FINAL", totHours, "N");
	}
}
catch (err) {
	logDebug("Error assessing fee COM140")
	aa.print("A JavaScript Error occurred: " + err.message);
}
//==============================================
//COM300
//==============================================
try {
	// If the fee item exists then we need to re-calc every time.
	if(feeExists("COM300", "NEW")){
		fTotalPBI = getSubGrpFeeAmt("PBI","","COM115");
		updateFee("COM300", "PMT_COM", "FINAL", fTotalPBI, "N");
	}
}
catch (err) {
	logDebug("Error assessing fee COM300")
	aa.print("A JavaScript Error occurred: " + err.message);
}