/*===================================================================
// Script Number: 400 
// Script Name: Engineering UTL Fees Inspection
// Script Developer: Steve Allred
// Script Agency: Accela
// Script Description: 
// Script Run Event: Inspection Schedule After
// Script Parents:
//		ISA;Engineering!Utilities!~!~
//             
/*==================================================================*/
comment("Start of ENG_UTL_Fees_Inspection");
comment("Inspection = " + inspType);
try {
	if (inspType == "After Hours Inspection - Immediately After Normal Work Hours") {
		if (feeExists("UTL060", "NEW", "INVOICED")){voidRemoveFee("UTL060");}
			addFee("UTL060", "ENG_NON-CITY UTILITES","FINAL", 1, "N");
			comment("Attempting to add fee UTL060");
	}

	if (inspType == "After Hours Inspection - Returning to Site") {
		if (feeExists("UTL070", "NEW", "INVOICED")){voidRemoveFee("UTL070");}
			addFee("UTL070", "ENG_NON-CITY UTILITES","FINAL", 1, "N");
			comment("Attempting to add fee UTL070");
	}

	if (inspType == "After Hours Inspection - Weekends and Holidays") {
		if (feeExists("UTL080", "NEW", "INVOICED")){voidRemoveFee("UTL080");}
			addFee("UTL080", "ENG_NON-CITY UTILITES","FINAL", 1, "N");
			comment("Attempting to add fee UTL080");
	}	
}	
	
catch (err) {
	aa.print("A JavaScript Error occurred: " + err.message);
}