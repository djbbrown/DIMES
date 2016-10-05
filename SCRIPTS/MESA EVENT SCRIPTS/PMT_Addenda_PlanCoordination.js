/*===================================================================
// Script Number: TBD
// Script Name: PMT_Addenda_PlanCoordination.js
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description:  Assess PMT Addenda Minimum fee if Type of Work = Addenda 
// Script Run Event: ASA
// Script Parents:
//         	ASA;Permits!Addenda or Deferred!NA!NA
===================================================================*/

if ((wfTask == "Application Submittal" && wfStatus == "Accepted-Plan Review Not Reqd") || (wfTask == "Plans Coordination" && wfStatus == "Ready to Issue")){
	if (matches(AInfo["Type of Work"],"Commercial - Addenda","Residential - Addenda","Sign - Commercial Addenda","Master Plan - Residential - Addenda","Master Plan - Commercial - Addenda")){
		addFee("PMT060", "PMT_ADD", "FINAL", 1, "N");
	}
}

/*===================================================================
// Script Number: TBD
// Script Name: PMT_AddendaFees.js
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description:  Assess PMT Expedite Premium fee if Expedite = Expedite 
// Script Run Event: ASA
// Script Parents:
//         	ASA;Permits!Addenda or Deferred!NA!NA
===================================================================*/

if (wfTask == "Plans Coordination" && wfStatus == "Ready to Issue"){
	if (AInfo["Expedite"] == "Expedite"){
		updateFee("PMT010", "PMT_ADD", "FINAL", 1, "N");
	}
}

/*===================================================================
// Script Number: TBD
// Script Name: PMT_AddendaFees.js
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description:  Assess PMT Super Expedite Premium fee if Expedite = Super Expedite 
// Script Run Event: ASA
// Script Parents:
//         	ASA;Permits!Addenda or Deferred!NA!NA
===================================================================*/

if (wfTask == "Plans Coordination" && wfStatus == "Ready to Issue"){
	if (AInfo["Expedite"] == "Super Expedite"){
		updateFee("PMT020", "PMT_ADD", "FINAL", 1, "N");
	}
}

//add tech fee
addFee("PMT070", "PMT_ADD", "FINAL", 1, "N");
