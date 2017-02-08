/*===================================================================
// Script Number: 001
// Script Name: WTUA;Permits!Residential!NA!NA.js
==================================================================*/
//include("PMT_ImpactFeeSingleResDetached");//disabled script and added GIS validation to 221
include("PMT_Email_Workflow_Status_Change");
include("PMT_Water_Clearance_Email");
include("PMT_SetPermitIssuedDate");
// added by Vance Smith (Mesa)
include("PMT_SubmittalCycle");

// workflow branch because first task already has a branch.
if (wfTask == "Application Submittal" && wfStatus == "Accepted - Plan Review Not Req"){
	include("PMT_ResidentialBranchNoReview");
}
// ---------------------------
// This section of code must run after the above that taks care of moving the workflow forward.
if (
	(wfTask == "Plans Coordination" && wfStatus == "Ready to Issue")
	|| (wfTask == "Application Submittal" && wfStatus == "Accepted - Plan Review Not Req")
) {
		include("PMT_ImpactFeesSingleResidence");
}
//----------------------------
include("PMT_AssessTechFee"); // must be run last

// Script: PMT363
// Creates Env Enforcement if criteria is met
// Shared with WTUA:Permits/Commercial/NA/NA
if(wfTask == "Permit Issuance" && wfStatus == "Issued")
	cloneToEnvironmental(capId,wfDateMMDDYYYY);

include("PMT_OneTenthAcre_Conditions");