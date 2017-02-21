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

try {
	if (inspType == "After Hours Inspection – Immediately After Normal Work Hours") {
		if (feeExists("UTL060", "NEW", "INVOICED")){voidRemoveFee("UTL060");}
			addFee("UTL060", "ENG_NON-CITY UTILITES","FINAL", 1, "N");
	}

	if (inspType == "After Hours Inspection – Returning to Site") {
		if (feeExists("UTL070", "NEW", "INVOICED")){voidRemoveFee("UTL070");}
			addFee("UTL070", "ENG_NON-CITY UTILITES","FINAL", 1, "N");
	}

	if (inspType == "After Hours Inspection – Weekends and Holidays") {
		if (feeExists("UTL080", "NEW", "INVOICED")){voidRemoveFee("UTL080");}
			addFee("UTL080", "ENG_NON-CITY UTILITES","FINAL", 1, "N");
	}	
}	
	
catch (err) {
	aa.print("A JavaScript Error occurred: " + err.message);
}