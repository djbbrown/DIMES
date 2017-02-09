/*===================================================================
// Script Number: TBD
// Script Name: PMT_AddendaFeesDeposit.js
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
// Script Name: PMT_AddendaFeesDeposit.js
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

