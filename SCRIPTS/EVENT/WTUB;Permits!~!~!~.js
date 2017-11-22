/*===================================================================
// Script Number: 001
// Script Name: WTUB;Permits!~!~!~.js
==================================================================*/
include("PMT_preventIssuanceWithBalanceDue");
//include("PMT_AssessResidentialBuildingPermitFee");

//Prevent the inspection task to complete if there are
//inspection still Scheduled.
include("PMT_WorkflowTask_Inspections");