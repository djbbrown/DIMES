/*===================================================================
// Script Number: 
// Script Name: 
// Script Developer: Kevin Ford
// Script Agency: Accela
// Script Description: Fee Scripting for Mobile Home
// Script Run Event: 
// Script Parents:
//		
===================================================================*/
// MH010
if((wfTask == 'Plans Coordination' && wfStatus == 'Ready to Issue') || (wfTask == 'Application Submittal' && wfStatus == 'Accepted - Plan Review Not Req')){
	if(AInfo["Type of Work"] == "New Park Model"){
		if (feeExists("MH010", "NEW")) voidRemoveFee("MH010");
		// add fee unless one exists with status INVOICED
		if (!feeExists("MH010","INVOICED")){
			addFee("MH010", "PMT_MOBILE HOME", "FINAL", 1, "N");
		}
	}
// MH020
	if(matches(AInfo["Type of Work"],"New Mobile Home","New Park Model")){
		if (feeExists("MH020", "NEW")) voidRemoveFee("MH020");
		// add fee unless one exists with status INVOICED
		if (!feeExists("MH020","INVOICED")){
			addFee("MH020", "PMT_MOBILE HOME", "FINAL", 1, "N");
		}
	}
// MH030
	if(AInfo["Type of Work"] == "RV Compliance"){
		if (feeExists("MH030", "NEW")) voidRemoveFee("MH030");
		// add fee unless one exists with status INVOICED
		if (!feeExists("MH030","INVOICED")){
			addFee("MH030", "PMT_MOBILE HOME", "FINAL", 1, "N");
		}
	}

//Expedited and Super Expedited Fees
	var totalFeeExp = getSubGrpFeeAmt("EXP");
	var totalFeeSupExp = (getSubGrpFeeAmt("SUPEXP") * 2);
	
	//logDebug("totalFeeExp = " + totalFeeExp);
	//logDebug("totalFeeSupExp = " + totalFeeSupExp);
			
	// Expedite Fee
	if(AInfo["Expedite"]=="Expedite" && !feeExists("MH190","INVOICED")){
		// Add the extra fee for expedite
		updateFee("MH190", "PMT_MOBILE HOME", "FINAL", totalFeeExp, "N");
	}
	// Super Expedite Fee
	if(AInfo["Expedite"]=="Super Expedite" && !feeExists("MH200","INVOICED")){
		// Add the extra fee for expedite
		updateFee("MH200", "PMT_MOBILE HOME", "FINAL", totalFeeSupExp, "N");
	}
}
