//adding publicUser criteria check to execute scripts based on AA or ACA
if (publicUser){
	include("PMT_FloodControlPermit");
	include("PMT_Parcel_51");
	include("PMT_CM_Gas_Electric");
	// added by Vance Smith (Mesa)
	include("PMT_AutopopulateASIFieldsFromGISAttributes"); // 109
	include("PMT_IssueOnlinePermitACA"); //Added Script 393 by Michael VanWie
}



