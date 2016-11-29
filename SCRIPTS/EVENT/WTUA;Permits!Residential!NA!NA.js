/*===================================================================
// Script Number: 001
// Script Name: WTUA;Permits!Residential!NA!NA.js
==================================================================*/
//include("PMT_ImpactFeeSingleResDetached");//disabled script and added GIS validation to 221
include("PMT_ImpactFeesSingleResidence");
include("PMT_Email_Workflow_Status_Change");
include("PMT_Water_Clearance_Email");
if (wfTask == "Plans Coordination" && wfStatus == "Ready to Issue") {
	include("PMT_ImpactFeesSingleResidence");
}
include("PMT_SetPermitIssuedDate");
// added by Vance Smith (Mesa)
include("PMT_SubmittalCycle");


include("PMT_AssessTechFee"); // must be run last