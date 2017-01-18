//adding publicUser criteria check to execute scripts based on AA or ACA
if(publicUser){
	include("PMT_SignalButteTag");
	include("PMT_Parcel_51");
	include("PMT_CM_Gas_Electric");
	include("PMT_CMSW_Gas");
	include("PMT_Light_Rail");
}
