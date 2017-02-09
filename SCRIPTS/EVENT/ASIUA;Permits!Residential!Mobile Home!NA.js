/*===================================================================
// Script Number: 001
// Script Name: ASIUA;Permits!Residential!Mobile Home!NA.js
==================================================================*/
include("PMT_TotalSqFt");
include("PMT_assessFeeRDIF140OrRDIF150");
include("PMT_WaterMeterAdapterFee");
include("PMT_Stop_Work_Order");
//added by Bryan de Jesus (Woolpert)
//include("PMT_MobileHomeSolidWasteImpactFee");  //moved to WTUA event
include("PMT_TotalValuation");

// add by Brian O'Dell (Mesa)
// include("PMT_MobileHomeUtilityServiceFeeGasMeter"); // Turned off upon request on 20161027 vie email from Heather Basford
include("PMT_MobileHomeUtilityServiceFeeGasServiceOther");
include("PMT_RelateToPlanningRecord");
//include("PMT_MobileHomeFireImpactFee");  //moved to WTUA event
//include("PMT_MobileHomeStormwaterImpactFee");  //moved to WTUA event

include("PMT_R5AreaCalc_MobileHome");
include("PMT_R5NAreaCalc_MobileHome");

// added by Vance Smith (Mesa)
include("PMT_AutopopulateASIFieldsFromGISAttributes");
include("PMT_CodeEnforcementNumber");

//added by Michael Kniskern (City of Mesa)
//include("PMT_MobileHomePublicSafetyImpactFee"); //removed by Michaek Kniskern (City of Mesa) 9.27.2016

if(matches(AInfo["Expedite"],"Expedite","Super Expedite") && (!feeExists("MH190","NEW","INVOICED") || !feeExists("MH200","NEW","INVOICED"))) {
	include("PMT_ResidentialASADeposit");
}