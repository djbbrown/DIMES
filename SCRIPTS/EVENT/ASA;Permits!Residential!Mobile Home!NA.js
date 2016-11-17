include("PMT_assessFeeRDIF140OrRDIF150");
include("PMT_FloodControlPermit");
include("PMT_WaterMeterAdapterFee");

// added by Bryan de Jesus (Woolpert)
//include("PMT_MobileHomeSolidWasteImpactFee");  //moved to WTUA;Permits!Residential!Mobile Home!NA

// add by Brian O'Dell (Mesa)
// include("PMT_MobileHomeUtilityServiceFeeGasMeter"); // Turned off upon request on 20161027 vie email from Heather Basford
include("PMT_MobileHomeUtilityServiceFeeGasServiceOther");
include("PMT_RelateToPlanningRecord");
include("PMT_MobileHomeFireImpactFee");
include("PMT_R5AreaCalc_MobileHome");
include("PMT_R5NAreaCalc_MobileHome");

include("PMT_NoAddressAddAdHoc");

// added by Vance Smith (Mesa)
include("PMT_AutopopulateASIFieldsFromGISAttributes");
include("PMT_CodeEnforcementNumber");

//added by Michael Kniskern (City of Mesa) 
//removed by Michael Kniskern (City of Mesa) on 9/22/2016
//include("PMT_MobileHomePublicSafetyImpactFee");

include("PMT_MobileHomeDeposit");