/*===================================================================
// Script Number: 
// Script Name: PMT_ResidentialFees.js
// Script Developer: Kevin Ford
// Script Agency: Accela
// Script Description: Residential Fees 
// Script Run Event: Application Submit After
// Script Parents:
//		WTUA;Permits!Residential!~!~
//             
/*==================================================================*/

var typeOfWork = (AInfo["Type of Work"] != undefined) ? AInfo["Type of Work"] : AInfo["Type of work"]

//RES380 -- Charged at Stauts
if (wfTask == "Plans Coordination" && wfStatus == "Ready to Issue") {
	if (typeOfWork && typeOfWork =='Model Home Complex') {
		if (feeExists("RES380", "NEW", "INVOICED")) voidRemoveFee("RES380");
		addFee("RES380", "PMT_RES","FINAL", 1, "N");
	}
	if(typeOfWork && typeOfWork !='Construction Trailer' && feeExists("RES380", "NEW", "INVOICED")){
		voidRemoveFee("RES380");
	}
}
// Pool
if (wfTask == "Plans Coordination" && wfStatus == "Ready to Issue") {
	if (typeOfWork && typeOfWork =='Swimming Pool') {
		if (feeExists("RES270", "NEW", "INVOICED")) voidRemoveFee("RES270");
		addFee("RES270", "PMT_RES","FINAL", 1, "N");
	}
	if(typeOfWork && typeOfWork !='Swimming Pool' && feeExists("RES270", "NEW", "INVOICED")){
		voidRemoveFee("RES270");
	}
}
// Spa
if (wfTask == "Plans Coordination" && wfStatus == "Ready to Issue")
 {
	if (typeOfWork && typeOfWork =='SPA') {
		if (feeExists("RES280", "NEW", "INVOICED")) voidRemoveFee("RES280");
		addFee("RES280", "PMT_RES","FINAL", 1, "N");
	}
	if(typeOfWork && typeOfWork !='SPA' && feeExists("RES280", "NEW", "INVOICED")){
		voidRemoveFee("RES280");
	}
}
// Moving/Relocating
if (wfTask == "Plans Coordination" && wfStatus == "Ready to Issue")
 {
	if (typeOfWork && typeOfWork =='Moving/Relocating') {
		if (feeExists("RES290", "NEW", "INVOICED")) voidRemoveFee("RES290");
		addFee("RES290", "PMT_RES","FINAL", 1, "N");
	}
	if(typeOfWork && typeOfWork !='Moving/Relocating' && feeExists("RES290", "NEW", "INVOICED")){
		voidRemoveFee("RES290");
	}
}
// Walls/Fences
if( wfTask == "Plans Coordination" && wfStatus == "Ready to Issue")
 {
	if (typeOfWork && typeOfWork =='Walls/Fences') {
		if (feeExists("RES310", "NEW", "INVOICED")) voidRemoveFee("RES310");
		addFee("RES310", "PMT_RES","FINAL", 1, "N");
	}
	if(typeOfWork && typeOfWork !='Moving/Relocating' && feeExists("RES310", "NEW", "INVOICED")){
		voidRemoveFee("RES310");
	}
}
// Script for pages fee RES030
try {
		if(wfTask == "Plans Coordination" && wfStatus == "Ready to Issue")
		 {
		// Count up the sheets from the ASIT
		pRInfoTable = loadASITable("PLAN REVIEW INFORMATION");
		var totalSheets = 0;
		totalSheets += sumASITColumn(
			pRInfoTable, // Table that is going to be looked at
			"Number of Civil Engineering Sheets", // Column to be summed
			"INCLUDE", // Include the following
			"Type of Civil Engineering Sheets", // Look in this column for items to include.
			// List of items to include.
			"Civil Cover Sheet",
			"Cover Sheets",			
			"Onsite Landscaping Plans and Details",
			"Single Public Utility Plan/Profiles",
			"Grading/Site Plans and Details",
			"R-O-W Landscaping Plans and Details",
			"Street Lighting/Traffic Signal Plans and Details",
			"Street Improvement Plan/Profiles and Details",
			"Combination Street Improvement and Utility Plan/Profiles and Details",
			"Dual Public Utility Plan/Profiles and Details"
			);
		// Get the amount that had previously been charged.
		resSheetDep = feeAmount("RES020","NEW","INVOICED");
		
		// Multiply Actual Number of sheets by the fee 390 and subtract the resSheetDep
		feeLessDep = (totalSheets * 390) - resSheetDep;
		
		if (feeExists("RES030", "NEW", "INVOICED")) {
			voidRemoveFee("RES030");
		}
		addFee("RES030", "PMT_RES","FINAL", feeLessDep, "N");
		
		if(!totalSheets > 0 && feeExists("RES030", "NEW", "INVOICED")){
			voidRemoveFee("RES030");
		}
	}
}
catch (err) {
	aa.print("A JavaScript Error occurred: " + err.message);
}
// Script for pages fees RES040
try {
		if(wfTask == "Plans Coordination" && wfStatus == "Ready to Issue")
		{
		// Count up the sheets from the ASIT
		pRInfoTable = loadASITable("PLAN REVIEW INFORMATION");
		var totalSheets = 0;
		totalSheets += sumASITColumn(
			pRInfoTable, // Table that is going to be looked at
			"Number of Civil Engineering Sheets", // Column to be summed
			"INCLUDE", // Include the following
			"Type of Civil Engineering Sheets", // Look in this column for items to include.
			// List of items to include.
			"Combination Street Improvement and Utility Plan/Profiles and Details"
			);
		// Get the amount that had previously been charged.
		//resSheetDep = feeAmount("RES020","NEW","INVOICED");
		
		// Multiply Actual Number of sheets by the fee 390 and subtract the resSheetDep
		// feeLessDep = (totalSheets * 390) - resSheetDep
		
		if (feeExists("RES040", "NEW", "INVOICED")) {
			voidRemoveFee("RES040");
		}
		addFee("RES040", "PMT_RES","FINAL", totalSheets, "N");
		
		if(!totalSheets > 0 && feeExists("RES040", "NEW", "INVOICED")){
			voidRemoveFee("RES040");
		}
	}
}
catch (err) {
	aa.print("A JavaScript Error occurred: " + err.message);
}
// Script for pages fees RES050
try {
		if((wfTask == "Plans Coordination" && wfStatus == "Ready to Issue")
		) {
		// Count up the sheets from the ASIT
		pRInfoTable = loadASITable("PLAN REVIEW INFORMATION");
		var totalSheets = 0;
		totalSheets += sumASITColumn(
			pRInfoTable, // Table that is going to be looked at
			"Number of Civil Engineering Sheets", // Column to be summed
			"INCLUDE", // Include the following
			"Type of Civil Engineering Sheets", // Look in this column for items to include.
			// List of items to include.
			"Civil Cover Sheet",
			"Single Public Utility Plan/Profiles",
			"Grading/Site Plans and Details",
			"R-O-W Landscaping Plans and Details",
			"Street Lighting/Traffic Signal Plans and Details",
			"Street Improvement Plan/Profiles and Details",
			"Dual Public Utility Plan/Profiles and Details"
			);
		
		if (feeExists("RES050", "NEW", "INVOICED")) {
			voidRemoveFee("RES050");
		}
		addFee("RES050", "PMT_RES","FINAL", totalSheets, "N");
	
		if(!totalSheets > 0 && feeExists("RES050", "NEW", "INVOICED")){
			voidRemoveFee("RES050");
		}
	}
}
catch (err) {
	aa.print("A JavaScript Error occurred: " + err.message);
}

// RES070
try {
	var tNumInsp = 0;
	var valuationASI = 0;
	if (wfTask == "Plans Coordination" && wfStatus == "Ready to Issue")
	 {
		tNumInsp += parseFloat(AInfo["Estimated Number of Inspections"]||AInfo["Estimated Number of Inspections"]||0);
		// tNumInsp += parseFloat(AInfo["Required No. of Inspections"]||0);
		valuationASI += parseFloat(AInfo["Total Valuation"]||0); // This is on "Mobile Home" and "Residential/NA/NA"
		if(valuationASI < 25000){
			if (feeExists("RES070", "NEW", "INVOICED")) {
				voidRemoveFee("RES070");
			}
			if (tNumInsp > 0){
				// Get the amount that had previously been charged.
				resDep = feeAmount("RES010","NEW","INVOICED");
				tNumInsp = 90+(tNumInsp*90) - resDep;
				addFee("RES070", "PMT_RES","FINAL", tNumInsp, "N");
				
				if(AInfo["Expedite"]=="Expedite" && appTypeArray[2]=='NA'){
					fTotal = feeAmount("RES070","NEW","INVOICED");
					updateFee("RES190", "PMT_RES", "FINAL", fTotal, "N");
				}
				
			}
			if(!tNumInsp > 0 && feeExists("RES070", "NEW", "INVOICED")){
				voidRemoveFee("RES070");
			}
		}
	}
}
catch (err) {
	aa.print("A JavaScript Error occurred: " + err.message);
}