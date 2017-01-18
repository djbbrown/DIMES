/*===================================================================
// Script Number: 001
// Script Name: CTRCA;Permits!Residential!NA!NA.js
==================================================================*/
//Adding for differences in AA and ACA execution
if(publicUser){
	include("PMT_FloodControlPermit");
	include("PMT_StapleyTag");
	// added by Vance Smith (Mesa)
	nclude("PMT_AutopopulateASIFieldsFromGISAttributes");
	include("PMT_CodeEnforcementNumber");
}


