/*===================================================================
// Script Number: 001
// Script Name: ASIUA;Permits!Commercial!NA!NA.js
//
==================================================================*/
include("PMT_TotalSqFt");
//include("PMT_PlanningNumbValidate");
include("PMT_WaterMeterAdapterFee");
include("PMT_TotalValuation");
include("PMT_RelateToPlanningRecord");
include("PMT_Condition_Email");
// added by Vance Smith (Mesa)
include("PMT_AutopopulateASIFieldsFromGISAttributes");
include("PMT_CodeEnforcementNumber");
include("PMT_Stop_Work_Order");
//include("PMT_CommercialImpactFees"); // Script 337  -- Removed by Steve Allred on 4/24/2017

if(matches(AInfo["Expedite"],"Expedite","Super Expedite") && (!feeExists("COM150","NEW","INVOICED") || !feeExists("COM160","NEW","INVOICED"))) {
	include("PMT_CommercialASAFeesDeposit");
}