/*===================================================================
// Script Number: RES230
// Script Name: PMT_PermitByInspection.js
// Script Developer: Kevin Ford
// Script Agency: Accela
// Script Description: 
// Script Run Event: FAA 
// Script Parents:
//            FAA;Permits/Residential/NA/NA
===================================================================*/
try {
	//workflow = aa.workflow.getWorkflowHistory(capId, null).getOutput();
	//workflow = aa.workflow.getHistory(capId).getOutput();
	// If the fee item exists then we need to re-calc every time.
	if(feeExists("RES230", "NEW", "INVOICED")){
		fTotal = getSubGrpFeeAmt("PBI");
		updateFee("RES230", "PMT_RES", "FINAL", fTotal, "N");
	}
}
catch (err) {
	aa.print("A JavaScript Error occurred: " + err.message);
}
// RES150
try {
	//workflow = aa.workflow.getWorkflowHistory(capId, null).getOutput();
	//workflow = aa.workflow.getHistory(capId).getOutput();
	// If the fee item exists then we need to re-calc every time.
	if(feeExists("RES150", "NEW", "INVOICED")){
		fTotal = getSubGrpFeeAmt("UC2","","RES150");
		updateFee("RES150", "PMT_RES", "FINAL", fTotal, "N");
	}
}
catch (err) {
	aa.print("A JavaScript Error occurred: " + err.message);
}