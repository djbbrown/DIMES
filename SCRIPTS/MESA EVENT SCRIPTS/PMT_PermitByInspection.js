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
// RES230 Permit-by-Inspection Fee
try {
	// If the fee item exists then we need to re-calc every time.
	if(feeExists("RES230", "NEW", "INVOICED")){
		fTotal = getSubGrpFeeAmt("PBI");
		updateFee("RES230", "PMT_RES", "FINAL", fTotal, "N");
	}
}
catch (err) {
	aa.print("A JavaScript Error occurred: " + err.message);
}
// RES150 Unauthorized Work within the Right of Way without – 200%
try {
	// If the fee item exists then we need to re-calc every time.
	if(feeExists("RES150", "NEW", "INVOICED")){
		fTotal = getSubGrpFeeAmt("UC2","","RES150");
		updateFee("RES150", "PMT_RES", "FINAL", fTotal, "N");
	}
}
catch (err) {
	aa.print("A JavaScript Error occurred: " + err.message);
}
// RES140 Unauthorized Work - 100%
try {
	// If the fee item exists then we need to re-calc every time.
	if(feeExists("RES140", "NEW", "INVOICED")){
		fTotal = getSubGrpFeeAmt("UC1","","RES140");
		updateFee("RES140", "PMT_RES", "FINAL", fTotal, "N");
	}
}
catch (err) {
	aa.print("A JavaScript Error occurred: " + err.message);
}
//RES130 Unauthorized Construction Fees – 50%
try {
	// If the fee item exists then we need to re-calc every time.
	if(feeExists("RES130", "NEW", "INVOICED")){
		fTotal = getSubGrpFeeAmt("UC50","","RES130");
		updateFee("RES130", "PMT_RES", "FINAL", fTotal, "N");
	}
}
catch (err) {
	aa.print("A JavaScript Error occurred: " + err.message);
}
//RES120 Unauthorized Construction Fees – 25%
try {
	// If the fee item exists then we need to re-calc every time.
	if(feeExists("RES120", "NEW", "INVOICED")){
		fTotal = getSubGrpFeeAmt("UC25","","RES120");
		updateFee("RES120", "PMT_RES", "FINAL", fTotal, "N");
	}
}
catch (err) {
	aa.print("A JavaScript Error occurred: " + err.message);
}