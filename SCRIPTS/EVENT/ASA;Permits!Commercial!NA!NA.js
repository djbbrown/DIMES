//adding publicUser criteria check to execute scripts based on AA or ACA
if (!publicUser) {
	include("PMT_FloodControlPermit");
	include("PMT_StapleyTag");
	include("PMT_Parcel_51");
	include("PMT_CM_Gas_Electric");
	include("PMT_CMSW_Gas");
	include("PMT_Light_Rail");
	include("PMT_Communications_Towers");
	// added by Vance Smith (Mesa)
	include("PMT_AutopopulateASIFieldsFromGISAttributes");
	include("PMT_CodeEnforcementNumber");
	include("PMT_Email_Hazardmat_Received");	
}

//include("PMT_PlanningNumbValidate");
include("PMT_WaterMeterAdapterFee");
include("PMT_NoAddressAddAdHoc");
include("PMT_RelateToPlanningRecord");
