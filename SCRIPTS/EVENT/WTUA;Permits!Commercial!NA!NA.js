/*===================================================================
// Script Number: 001
// Script Name: WTUA;Permits!Commercial!NA!NA.js
==================================================================*/
include("PMT_Email_Workflow_Status_Change");
include("PMT_ResubmittalFee");
include("PMT_Water_Clearance_Email");
include("PMT_SetPermitIssuedDate");
// added by Vance Smith (Mesa)
include("PMT_SubmittalCycle");

// added by John Cheney  (Mesa)
include("PMT_ImpactFeesMultiResidence");

include("PMT_CommercialImpactFees"); // Script 337
include("PMT_ComDeferredSubmittal");
include("PMT_CommercialFees");
include("PMT_AssessTechFee"); // must be run last

//Script: PMT363
//Creates Env Enforcement if criteria is met
//Shared with WTUA:Permits/Commercial/NA/NA
if(wfTask == "Permit Issuance" && wfStatus == "Issued")
	cloneToEnvironmental(capId,wfDateMMDDYYYY);

include("PMT_OneTenthAcre_Conditions");