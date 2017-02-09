/*===================================================================
// Script Number: 
// Script Name: Commercial Fees
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: 
// Script Run Event: Application Specific Info Update After
// Script Parents:
//		ASIUA;Permits!Commercial!~!~
//             
/*==================================================================*/


// Deposits
try {
	// Expedite Fee
	if(AInfo["Expedite"]=="Expedite"){
		fTotal = getSubGrpFeeAmt("EDEP","","COM150");
		// Add the extra fee for expedite
		updateFee("COM150", "PMT_COM", "FINAL", fTotal, "N");
	}
	// Super Expedite Fee
	if(AInfo["Expedite"]=="Super Expedite"){
		fTotal = getSubGrpFeeAmt("SDEP","","COM160");
		// Add the extra fee for expedite
		updateFee("COM160", "PMT_COM", "FINAL", fTotal, "N");
	}
}
catch (err) {
	aa.print("A JavaScript Error occurred: " + err.message);
}//*/