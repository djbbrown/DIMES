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
	
	if(totalSheets > 0){
		addFee("RES020", "PMT_RES","FINAL", totalSheets, "Y");
	}
}
catch (err) {
	aa.print("A JavaScript Error occurred: " + err.message);
}

//RES010
try {
	var typeOfWork = AInfo["Type of work"];
	
	valuation = estValue|calcValue;
	
	if(valuation > 0 && appTypeArray[2]=='NA' && !matches(typeOfWork,'Swimming Pool','Spa','Moving/Relocating','Walls/Fences','Model Home Complex')){
		addFee("RES010", "PMT_RES","FINAL", valuation, "Y");
	}
	
}
catch (err) {
	aa.print("A JavaScript Error occurred: " + err.message);
}