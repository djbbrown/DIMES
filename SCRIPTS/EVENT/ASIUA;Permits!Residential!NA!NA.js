/*===================================================================
// Script Number: 001
// Script Name: ASIUA;Permits!Residential!NA!NA.js
==================================================================*/
include("PMT_TotalSqFt");
//include("PMT_PlanningNumbValidate");
include("PMT_WaterMeterAdapterFee");
//include("PMT_ImpactFeesSingleResidence"); to be called from the WTUA event
include("PMT_TotalValuation");
// added by Brian O'Dell (Mesa)
include("PMT_R5AreaCalc");
include("PMT_R5NAreaCalc");
include("PMT_RelateToPlanningRecord");

// added by Vance Smith (Mesa)
include("PMT_AutopopulateASIFieldsFromGISAttributes");
include("PMT_CodeEnforcementNumber");

if(matches(AInfo["Expedite"],"Expedite","Super Expedite") && (!feeExists("RES180","NEW","INVOICED") || !feeExists("RES200","NEW","INVOICED")) {
	include("PMT_ResidentialASADeposit");
}