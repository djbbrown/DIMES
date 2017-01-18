//Adding for differences in AA and ACA execution
if(publicUser){
	include("PMT_FloodControlPermit");
	// added by Vance Smith (Mesa)
	include("PMT_AutopopulateASIFieldsFromGISAttributes");
	include("PMT_CodeEnforcementNumber");
}
