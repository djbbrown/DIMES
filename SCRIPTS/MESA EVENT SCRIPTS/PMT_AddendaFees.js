/*===================================================================
// Script Number: Remove fees for public user (ACA) so not duplicates
// in case the user returns to previous pages
===================================================================*/
if (publicUser) {
	removeAllFees(capId);
}

/*===================================================================
// Script Number: TBD
// Script Name: PMT_AddendaFees.js
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description:  Assess PMT Addenda Minimum fee if Type of Work = Addenda 
// Script Run Event: ASA
// Script Parents:
//         	ASA;Permits!Addenda or Deferred!NA!NA
===================================================================*/

if (matches(AInfo["Type of work"],"Commercial - Addenda","Residential - Addenda","Sign - Commercial Addenda","Master Plan - Residential - Addenda","Master Plan - Commercial - Addenda")){
	updateFee("PMT050", "PMT_ADD", "FINAL", 1, "Y");
}

/*===================================================================
// Script Number: TBD
// Script Name: PMT_AddendaFees.js
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description:  Assess PMT Expedite Premium Deposit fee if Expedite = Expedite 
// Script Run Event: ASA
// Script Parents:
//         	ASA;Permits!Addenda or Deferred!NA!NA
===================================================================*/

if (AInfo["Expedite"] == "Expedite"){
	updateFee("PMT090", "PMT_ADD", "FINAL", 1, "N");
}

/*===================================================================
// Script Number: TBD
// Script Name: PMT_AddendaFees.js
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description:  Assess PMT Super Expedite Premium Deposit fee if Expedite = Super Expedite 
// Script Run Event: ASA
// Script Parents:
//         	ASA;Permits!Addenda or Deferred!NA!NA
===================================================================*/

if (AInfo["Expedite"] == "Super Expedite"){
	updateFee("PMT100", "PMT_ADD", "FINAL", 1, "N");
}

/*===================================================================
// Script Number: TBD
// Script Name: PMT_AddendaFees.js
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description:  Assess PMT Code Modification fee if Type of Work = Code Modification 
// Script Run Event: ASA
// Script Parents:
//         	ASA;Permits!Addenda or Deferred!NA!NA
===================================================================*/

if (AInfo["Type of work"] == "Code Modification"){
	updateFee("PMT110", "PMT_ADD", "FINAL", 1, "Y");
}

/*===================================================================
//Script Number: TBD
//Script Name: PMT_AddendaFees.js
//Script Developer: Kevin Ford
//Script Agency: Accela
//Script Description: Technology Fees 
//Script Run Event: ASA
//Script Parents:
//      	ASA;Permits!Addenda or Deferred!NA!NA
===================================================================*/
/*
if (AInfo["Type of Work"] == "Code Modification"){
	updateFee("PMT070", "PMT_ADD", "FINAL", 1, "N");
}
--*/