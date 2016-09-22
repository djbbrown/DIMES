/*===================================================================
// Script Number: 170
// Script Name: WTUA;Permits!Sign!NA!NA.js
==================================================================*/
include("PMT_SignPermitFee");
include("PMT_SignFeesWorkflow");
include("PMT_AssessTechFee"); // must be run last
include("PMT_ElectricalFeeforSigns"); //

// added by Vance Smith (Mesa)
include("PMT_SubmittalCycle");