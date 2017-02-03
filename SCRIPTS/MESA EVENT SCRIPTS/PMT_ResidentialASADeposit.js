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
	if(AInfo["Expedite"]=="Expedite" && appTypeArray[2]=='NA'){
		fTotal = getSubGrpFeeAmt("EDEP","","RES180");
		// removeFee("RES180", "FINAL"); Not needed
		// Add the extra fee for expedite
		updateFee("RES180", "PMT_RES", "FINAL", fTotal, "Y");
	}
	
	if(AInfo["Expedite"]=="Expedite" && appTypeArray[2]=='Mobile Home'){
		fTotal = getSubGrpFeeAmt("EDEP","","MH190");
		// removeFee("RES180", "FINAL"); Not needed
		// Add the extra fee for expedite
		updateFee("MH190", "PMT_MOBILE HOME", "FINAL", fTotal, "Y");
	}
	
	// Super Expedite Fee
	if(AInfo["Expedite"]=="Super Expedite" && appTypeArray[2]=='NA'){
		fTotal = getSubGrpFeeAmt("SDEP","","RES200");
		//removeFee("RES200", "FINAL");
		// Add the extra fee for expedite
		updateFee("RES200", "PMT_RES", "FINAL", fTotal, "Y");
	}
	
	if(AInfo["Expedite"]=="Super Expedite" && appTypeArray[2]=='Mobile Home'){
		fTotal = getSubGrpFeeAmt("SDEP","","MH200");
		//removeFee("RES200", "FINAL");
		// Add the extra fee for expedite
		updateFee("MH200", "PMT_MOBILE HOME", "FINAL", fTotal, "Y");
	}
}
catch (err) {
	aa.print("A JavaScript Error occurred: " + err.message);
}