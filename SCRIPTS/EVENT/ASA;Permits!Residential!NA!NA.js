/*===================================================================
// Script Number: 001
// Script Name: ASA;Permits!Residential!NA!NA.js
==================================================================*/
//Adding for differences in AA and ACA execution
if(!publicUser){
	include("PMT_FloodControlPermit");
	include("PMT_StapleyTag");
	// added by Vance Smith (Mesa)
	include("PMT_AutopopulateASIFieldsFromGISAttributes");
	include("PMT_CodeEnforcementNumber");
}

//include("PMT_PlanningNumbValidate");
include("PMT_WaterMeterAdapterFee");
// added by Brian O'Dell (Mesa)
include("PMT_R5AreaCalc");
include("PMT_R5NAreaCalc");
include("PMT_NoAddressAddAdHoc");

include("PMT_R5AreaCalc_MasterPlanParent")
include("PMT_RelateToPlanningRecord");

