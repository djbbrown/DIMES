/*===================================================================
// Script Number: 001
// Script Name: ASIUA;Permits!Residential!Mobile Home!NA.js
==================================================================*/
include("PMT_TotalSqFt");
include("PMT_assessFeeRDIF140OrRDIF150");
include("PMT_WaterMeterAdapterFee");

//added by Bryan de Jesus (Woolpert)
include("PMT_MobileHomeSolidWasteImpactFee");
include("PMT_TotalValuation");

// add by Brian O'Dell (Mesa)
include("PMT_MobileHomeUtilityServiceFeeGasMeter");
//include("PMT_MobileHomeUtilityServiceFeeGasServiceOther");  // recommended removal of this script
include("PMT_RelateToPlanningRecord");

//include("PMT_MobileHomeFireImpactFee");  // Fee schedule has changed
//include("PMT_MobileHomeStormwaterImpactFee");  // Fee Schedule has changed

include("PMT_R5AreaCalc_MobileHome");
include("PMT_R5NAreaCalc_MobileHome");

// added by Vance Smith (Mesa)
include("ENF_AutopopulateASIFieldsFromGISAttributes");
include("PMT_CodeEnforcementNumber");
