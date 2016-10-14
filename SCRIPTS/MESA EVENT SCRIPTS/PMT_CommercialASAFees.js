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

var classification = AInfo["Classification Type"];

//COM400
if (classification && classification =='Night Watchman’s Quarters') {
	if (feeExists("COM400", "NEW", "INVOICED")) voidRemoveFee("COM400");
	addFee("COM400", "PMT_COM", "FINAL", 1, "N");
}
if(classification && classification !='Construction Trailer' && feeExists("COM400", "NEW", "INVOICED")){
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
// Deposite COM020
try {
	// Count up the sheets from the ASIT
	pRInfoTable = loadASITable("PLAN REVIEW INFORMATION");
	var totalSheets = 0;
	totalSheets += sumASITColumn(pRInfoTable, "Number of Civil Engineering Sheets");
	
	if (feeExists("COM020", "NEW", "INVOICED")) {
		voidRemoveFee("COM020");
	}
	addFee("COM020", "PMT_COM","FINAL", totalSheets, "N");
	if(!totalSheets > 0 && feeExists("COM020", "NEW", "INVOICED")){
		logDebug("")
		voidRemoveFee("COM020");
	}
}
catch (err) {
	aa.print("A JavaScript Error occurred: " + err.message);
}