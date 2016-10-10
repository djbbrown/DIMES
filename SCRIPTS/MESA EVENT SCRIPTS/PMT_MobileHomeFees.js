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
if(
	(
		(wfTask == 'Plans Coordination' && wfStatus == 'Ready to Issue')
		|| (wfTask == 'Application Submittal' && wfStatus == 'Accepted - Plan Review Not Req')
	)
	&& AInfo["Type of Work"] == "New Park Model"  
){
	if (feeExists("MH010", "NEW")) voidRemoveFee("MH010");
	// add fee unless one exists with status INVOICED
	if (!feeExists("MH010","INVOICED")){
		addFee("MH010", "PMT_MOBILE HOME", "FINAL", units, "N");
		feeCount = feeCount + 1;
	}
}
// MH020
if(
	(
		(wfTask == 'Plans Coordination' && wfStatus == 'Ready to Issue')
		|| (wfTask == 'Application Submittal' && wfStatus == 'Accepted - Plan Review Not Req')
	)
	&& AInfo["Type of Work"] == "New Mobile Home"  
){
	if (feeExists("MH020", "NEW")) voidRemoveFee("MH020");
	// add fee unless one exists with status INVOICED
	if (!feeExists("MH020","INVOICED")){
		addFee("MH020", "PMT_MOBILE HOME", "FINAL", units, "N");
		feeCount = feeCount + 1;
	}
}
// MH030
if(
	(
		(wfTask == 'Plans Coordination' && wfStatus == 'Ready to Issue')
		|| (wfTask == 'Application Submittal' && wfStatus == 'Accepted - Plan Review Not Req')
	)
	&& AInfo["Type of Work"] == "New Mobile Home"  
){
	if (feeExists("MH030", "NEW")) voidRemoveFee("MH020");
	// add fee unless one exists with status INVOICED
	if (!feeExists("MH030","INVOICED")){
		addFee("MH030", "PMT_MOBILE HOME", "FINAL", units, "N");
		feeCount = feeCount + 1;
	}
}