/*===================================================================
// Script Number: 
// Script Name: Commercial Fees
// Script Developer: Kevin Ford
// Script Agency: Accela
// Script Description: 
// Script Run Event: Application Submit After
// Script Parents:
//		ASA;Permits!Commercial!~!~
//             
/*==================================================================*/

// COM010 Commercial Permit Deposit
var valuation = parseFloat(AInfo["Total Valuation"])|0;
if (feeExists("COM010", "NEW", "INVOICED")) voidRemoveFee("COM010");
if(valuation>0){addFee("COM010", "PMT_COM", "FINAL", valuation, "Y")};
//*/
var classification = AInfo["Classification Type"];

//COM400
if (classification && classification =='Night Watchmans Quarters') {
	if (feeExists("COM400", "NEW", "INVOICED")) voidRemoveFee("COM400");
	addFee("COM400", "PMT_COM", "FINAL", 1, "N");
}
if(classification && classification !='Night Watchmans Quarters' && feeExists("COM400", "NEW", "INVOICED")){
	voidRemoveFee("COM400");
}

// COM440
if (classification && classification =='Construction Trailer') {
	if (feeExists("COM440", "NEW", "INVOICED")) voidRemoveFee("COM440");
	addFee("COM440", "PMT_COM", "FINAL", 1, "N");
}
if(classification && classification !='Construction Trailer' && feeExists("COM440", "NEW", "INVOICED")){
	voidRemoveFee("COM440");
}

// COM380
if (classification && classification =='Holiday Lot') {
	if (feeExists("COM380", "NEW", "INVOICED")) voidRemoveFee("COM380");
	addFee("COM380", "PMT_COM", "FINAL", 1, "N");
}
if(classification && classification !='Construction Trailer' && feeExists("COM380", "NEW", "INVOICED")){
	voidRemoveFee("COM380");
}
// Deposit COM020
try {
	// Count up the sheets from the ASIT
	pRInfoTable = loadASITable("PLAN REVIEW INFORMATION");
	var totalSheets = 0;
	totalSheets += sumASITColumn(pRInfoTable, "Number of Civil Engineering Sheets");
	
	if (feeExists("COM020", "NEW", "INVOICED")) {
		voidRemoveFee("COM020");
	}
	if(totalSheets > 0 ){
		addFee("COM020", "PMT_COM","FINAL", totalSheets, "N");
	}
	if(!totalSheets > 0 && feeExists("COM020", "NEW", "INVOICED")){
		logDebug("")
		voidRemoveFee("COM020");
	}
}
catch (err) {
	aa.print("A JavaScript Error occurred: " + err.message);
}

// Deposits
try {
	// Expedite Fee
	if(AInfo["Expedite"]=="Expedite"){
		fTotal = getSubGrpFeeAmt("EDEP","","COM150");
		removeFee("COM150", "FINAL");
		// Add the extra fee for expedite
		updateFee("COM150", "PMT_COM", "FINAL", fTotal, "Y");
	}
	// Super Expedite Fee
	if(AInfo["Expedite"]=="Super Expedite"){
		fTotal = getSubGrpFeeAmt("SDEP","","COM160");
		removeFee("COM160", "FINAL");
		// Add the extra fee for expedite
		updateFee("COM160", "PMT_COM", "FINAL", fTotal, "Y");
	}
}
catch (err) {
	aa.print("A JavaScript Error occurred: " + err.message);
}//*/