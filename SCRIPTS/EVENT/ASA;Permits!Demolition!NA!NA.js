/*===================================================================
// Script Number: 001
// Script Name: ASA;Permits!Demolition!NA!NA.js
==================================================================*/
include("PMT_assessDemoTechFees");
//adding publicUser criteria check to execute scripts based on AA or ACA
if (!publicUser) { 
	include("PMT_SignalButteTag");
	include("PMT_FloodControlPermit");
	include("PMT_StapleyTag");
	include("PMT_Parcel_51");
	include("PMT_CM_Gas_Electric");
	include("PMT_CMSW_Gas");
	include("PMT_Light_Rail");
	// added by Vance Smith (Mesa)
	include("PMT_AutopopulateASIFieldsFromGISAttributes");
	include("PMT_CodeEnforcementNumber");
}

include("PMT_NoAddressAddAdHoc");


