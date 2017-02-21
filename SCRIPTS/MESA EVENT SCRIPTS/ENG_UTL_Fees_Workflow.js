/*===================================================================
// Script Number: 372 
// Script Name: Engineering UTL Fees Workflow
// Script Developer: Steve Allred
// Script Agency: Accela
// Script Description: 
// Script Run Event: Workflow Task Update After
// Script Parents:
//		WTUA;Engineering!Utilities!~!~
//             
/*==================================================================*/
// Get the Type of Work
var typeOfWork = (AInfo["Type of Work"] != undefined) ? AInfo["Type of Work"] : "Type of work";

try {
	if(
		(wfTask == "Application Submittal" && wfStatus == "Accepted - Plan Review Not Req")
		|| (wfTask == "Application Submittal" && wfStatus == "Accepted - Plan Review Req")
	) 	{
			if (typeOfWork && typeOfWork =='Annual UTL Permit Only') {
				if (feeExists("UTL030", "NEW", "INVOICED")){voidRemoveFee("UTL030");}
				addFee("UTL030", "ENG_NON-CITY UTILITES","FINAL", 1, "N");
			
				if (feeExists("UTL040", "NEW", "INVOICED")){voidRemoveFee("UTL040");}
				addFee("UTL040", "ENG_NON-CITY UTILITES","FINAL", 1, "N");
			
				if (feeExists("UTL050", "NEW", "INVOICED")){voidRemoveFee("UTL050");}
				addFee("UTL050", "ENG_NON-CITY UTILITES","FINAL", 1, "N");
			
				if (feeExists("UTL0140", "NEW", "INVOICED")){voidRemoveFee("UTL0140");}
				addFee("UTL0140", "ENG_NON-CITY UTILITES","FINAL", 1, "N");
			
				if (feeExists("UTL0150", "NEW", "INVOICED")){voidRemoveFee("UTL0150");}
				addFee("UTL0150", "ENG_NON-CITY UTILITES","FINAL", 1, "N");
			}


			if (typeOfWork && typeOfWork =='Standard Project') {
				if (feeExists("UTL010", "NEW", "INVOICED")){voidRemoveFee("UTL010");}
				addFee("UTL010", "ENG_NON-CITY UTILITES","FINAL", 1, "N");
			
				if (feeExists("UTL020", "NEW", "INVOICED")){voidRemoveFee("UTL020");}
				addFee("UTL020", "ENG_NON-CITY UTILITES","FINAL", 1, "N");
			
				if (feeExists("UTL0140", "NEW", "INVOICED")){voidRemoveFee("UTL0140");}
				addFee("UTL0140", "ENG_NON-CITY UTILITES","FINAL", 1, "N");
			
				if (feeExists("UTL0150", "NEW", "INVOICED")){voidRemoveFee("UTL0150");}
				addFee("UTL0150", "ENG_NON-CITY UTILITES","FINAL", 1, "N");
			}
	}

	if	(wfTask == "Plans Coordination" && wfStatus == "Ready to Issue")
		{
			if (typeOfWork && typeOfWork =='Standard Project') {
				if (feeExists("UTL050", "NEW", "INVOICED")){voidRemoveFee("UTL050");}
				addFee("UTL050", "ENG_NON-CITY UTILITES","FINAL", 1, "N");
			
				if (feeExists("UTL0130", "NEW", "INVOICED")){voidRemoveFee("UTL0130");}
				addFee("UTL0130", "ENG_NON-CITY UTILITES","FINAL", 1, "N");
			}
	}
}

catch (err) {
	aa.print("A JavaScript Error occurred: " + err.message);
}


