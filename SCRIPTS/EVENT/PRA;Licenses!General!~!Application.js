/*===================================================================
// Script Name: PRA;Licenses!General!~!Application.js
==================================================================*/

// sending debug email to see if firing from ACA
	var message = "Writing from PRA:Licenses!General!~!Application";
	var vEParams = aa.util.newHashtable(); 
	addParameter(vEParams,"$$capId$$",capId);
	addParameter(vEParams, "$$error$$", message);
	sendNotification("", "nalbert@accela.com", "", "ERROR TRAPPING", vEParams, null);
	
include("LIC_IssueLicenseOnFeePaymentACA"); // Added by Kevin Ford