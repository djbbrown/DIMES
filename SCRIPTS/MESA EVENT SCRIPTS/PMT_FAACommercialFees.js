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

// Fee COM290
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

// Fee COM280
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
// COM110
try {
	// If the fee item exists then we need to re-calc every time.
	if(feeExists("COM110", "NEW", "INVOICED")){
		fTotal = getSubGrpFeeAmt("UC1","","COM110");
		updateFee("COM110", "PMT_COM", "FINAL", fTotal, "N");
	}
}