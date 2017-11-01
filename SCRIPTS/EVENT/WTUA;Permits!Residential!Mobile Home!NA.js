/*===================================================================
// Script Number: 131(CANCELLED), 214, 336, 335, 146
// Script Name: WTUA;Permits!Residential!Mobile Home!NA.js
==================================================================*/
include("PMT_Email_Workflow_Status_Change");
include("PMT_Water_Clearance_Email");

include("PMT_SetPermitIssuedDate");

// added by Vance Smith (Mesa)
include("PMT_SubmittalCycle");

if ((wfTask == "Application Submittal" && wfStatus == "Accepted - Plan Review Not Req") || (wfTask == "Plans Coordination" && wfStatus == "Ready to Issue")){
	// added by John Cheney (Mesa) 9/15/16
	include("PMT_MobileHomeWaterImpactFee");

	// added by John Cheney (Mesa) 9/15/16
	include("PMT_MobileHomeWasteWaterImpactFee");

	//added by Michael Kniskern (City of Mesa) 9/22/2016
	include("PMT_MobileHomePublicSafetyImpactFee");
	
	include("PMT_MobileHomeFireImpactFee");

	//added by Kevin Gurney (Accela)
	include("PMT_MobileHomeStormwaterImpactFee");

	//added by Kevin Gurney (Accela) 10/11/2016
	include("PMT_MobileHomeFees");

	//added by Kevin Gurney (Accela) 10/11/2016
	include("PMT_AssessTechFee");
	
	// Solid Waste
	include("PMT_MobileHomeSolidWasteImpactFee");
}


//Calculate total valuation on ready to issue WF change
if (wfTask.toUpperCase() == "PLANS COORDINATION" && wfStatus.toUpperCase() == "READY TO ISSUE"){
	include(PMT_TotalValuation);
}