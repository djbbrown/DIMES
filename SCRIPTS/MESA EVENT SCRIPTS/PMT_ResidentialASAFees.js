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
	// Count up the sheets from the ASIT
	pRInfoTable = loadASITable("PLAN REVIEW INFORMATION");
	var totalSheets = 0;
	totalSheets += sumASITColumn(pRInfoTable, "Number of Civil Engineering Sheets");
	
	if (feeExists("RES020", "NEW", "INVOICED")) {
		voidRemoveFee("RES020");
	}
	addFee("RES020", "PMT_RES","FINAL", totalSheets, "Y");
	if(!totalSheets > 0 && feeExists("RES020", "NEW", "INVOICED")){
		voidRemoveFee("RES020");
	}
}
catch (err) {
	aa.print("A JavaScript Error occurred: " + err.message);
}

//RES010
try {
	valuation = estValue|calcValue;
	if (feeExists("RES010", "NEW", "INVOICED")) {
		voidRemoveFee("RES010");
	}
	addFee("RES010", "PMT_RES","FINAL", valuation, "Y");
	if(!valuation > 0 && feeExists("RES010", "NEW", "INVOICED")){
		voidRemoveFee("RES010");
	}
}
catch (err) {
	aa.print("A JavaScript Error occurred: " + err.message);
}