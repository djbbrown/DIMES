/*===================================================================
// Script Number: 001
// Script Name: CTRCA;Permits!Residential!NA!NA.js
==================================================================*/
//adding publicUser criteria check to execute scripts based on AA or ACA
if(publicUser){
	include("PMT_FloodControlPermit");
	include("PMT_StapleyTag");
	// added by Vance Smith (Mesa)
	nclude("PMT_AutopopulateASIFieldsFromGISAttributes");
	include("PMT_CodeEnforcementNumber");
}


