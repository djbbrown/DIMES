/*===================================================================
// Script Name: PRA;Licenses!General!~!Application.js
==================================================================*/

// populating field to try to determine if PRA is firing from ACA
if (appTypeArray[0] == "Licenses" && appTypeArray[1] == "General" && appTypeArray[2] == "MassageEstablishment" && appTypeArray[3] == "Application"){
	editAppSpecific("Types of Massage", "executed PRA");
}

// sending debug email to see if firing from ACA
	var message = "Writing from PRA:Licenses!General!~!Application";
	var vEParams = aa.util.newHashtable(); 
	addParameter(vEParams,"$$capId$$",capId);
	addParameter(vEParams, "$$error$$", message);
	sendNotification("", "nalbert@accela.com", "", "ERROR TRAPPING", vEParams, null, capId);
	
include("LIC_IssueLicenseOnFeePaymentACA"); // Added by Kevin Ford