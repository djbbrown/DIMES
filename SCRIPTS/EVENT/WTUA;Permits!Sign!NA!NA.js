/*===================================================================
// Script Number: 170
// Script Name: WTUA;Permits!Sign!NA!NA.js
==================================================================*/
if (wfTask == "Permit Issuance" && wfStatus == "Issued") {
	include("PMT_SetPermitIssuedDate");
}
include("PMT_Email_Workflow_Status_Change");
// added by Vance Smith (Mesa)
include("PMT_SubmittalCycle");

if ((wfTask == "Application Submittal" && wfStatus == "Accepted - Plan Review Not Req") || (wfTask == "Plans Coordination" && wfStatus == "Ready to Issue")) {
	include("PMT_SignPermitFee");
	include("PMT_SignFeesWorkflow");
	include("PMT_ElectricalFeeforSigns"); //

	include("PMT_AssessTechFee"); // must be run last
}

include ("PMT_ResubmittalFee");