//adding publicUser criteria check to execute scripts based on AA or ACA
if(publicUser){
	include("PMT_FloodControlPermit");
	// added by Vance Smith (Mesa)
	include("PMT_AutopopulateASIFieldsFromGISAttributes");
	include("PMT_CodeEnforcementNumber");
}
