/*===================================================================
// Script Number: 170
// Script Name: WTUA;Permits!Sign!NA!NA.js
==================================================================*/
include("PMT_SetPermitIssuedDate");
if ((wfTask == "Application Submittal" && wfStatus == "Accepted - Plan Review Not Req") || (wfTask == "Plans Coordination" && wfStatus == "Ready to Issue")) {
	include("PMT_SignPermitFee");
	include("PMT_SignFeesWorkflow");
	include("PMT_ElectricalFeeforSigns"); //
	
	// added by Vance Smith (Mesa)
	include("PMT_SubmittalCycle");

	include("PMT_AssessTechFee"); // must be run last
}

