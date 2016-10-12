/*===================================================================
// Script Number: 
// Script Name: PMT_ResidentiaASAlFees.js
// Script Developer: Kevin Ford
// Script Agency: Accela
// Script Description: Residential Fees 
// Script Run Event: Application Submit After
// Script Parents:
//		ASA;Permits!Residential!~!~
//             
/*==================================================================*/
// RES020 - Civil Engineering Deposit
try {
	// Expedite Fee
	if(AInfo["Expedite"]=="Expedite"){
		fTotal = getSubGrpFeeAmt("EDEP","","RES180");
		removeFee("RES180", "FINAL");
		// Add the extra fee for expedite
		updateFee("RES180", "PMT_RES", "FINAL", fTotal, "N");
	}
	// Super Expedite Fee
	if(AInfo["Expedite"]=="Super Expedite"){
		fTotal = getSubGrpFeeAmt("SDEP","","RES200");
		removeFee("RES200", "FINAL");
		// Add the extra fee for expedite
		updateFee("RES200", "PMT_RES", "FINAL", fTotal, "N");
	}
}
catch (err) {
	aa.print("A JavaScript Error occurred: " + err.message);
}