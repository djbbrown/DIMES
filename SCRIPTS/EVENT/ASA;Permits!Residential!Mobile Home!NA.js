include("PMT_assessFeeRDIF140OrRDIF150");
include("PMT_FloodControlPermit");
include("PMT_WaterMeterAdapterFee");

// added by Bryan de Jesus (Woolpert)
include("PMT_MobileHomeSolidWasteImpactFee");

// add by Brian O'Dell (Mesa)
include("PMT_MobileHomeUtilityServiceFeeGasMeter");
//include("PMT_MobileHomeUtilityServiceFeeGasServiceOther");  //recommended removal of this script
include("PMT_RelateToPlanningRecord");
include("PMT_MobileHomeFireImpactFee");
//include("PMT_MobileHomeStormwaterImpactFee");  // Fee Schedule has changed

include("PMT_R5AreaCalc_MobileHome");
include("PMT_R5NAreaCalc_MobileHome");

include("PMT_NoAddressAddAdHoc");

// added by Vance Smith (Mesa)
include("ENF_AutopopulateASIFieldsFromGISAttributes");

//added by Michael Kniskern (City of Mesa)
include("PMT_MobileHomePublicSafetyImpactFee");