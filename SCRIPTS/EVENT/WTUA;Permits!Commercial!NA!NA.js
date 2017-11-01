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
// added by Steve Allred  
include("PMT_AFP_Inspectors_Email");
// added by John Cheney  (Mesa)
include("PMT_ImpactFeesMultiResidence");
// added by Steve Allred (Mesa)  
include("PMT_ImpactFeesSingleResidence"); //added to commercial because sometimes a group of SFRs are commercial.
include("PMT_BlueCard");

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

//Moved from ASA and condition added
if(wfTask == "Plans Coordination" && wfStatus == "Ready to Issue") 
	include("PMT_Fire_CD_Condition");


//Calculate total valuation on ready to issue WF change
if (wfTask.toUpperCase() == "PLANS COORDINATION" && wfStatus.toUpperCase() == "READY TO ISSUE"){
	include(PMT_TotalValuation);
}