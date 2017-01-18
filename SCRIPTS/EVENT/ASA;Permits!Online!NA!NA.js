//adding publicUser criteria check to execute scripts based on AA or ACA
if (!publicUser){
	include("PMT_FloodControlPermit");
	include("PMT_Parcel_51");
	include("PMT_CM_Gas_Electric");
	// added by Vance Smith (Mesa)
	include("PMT_AutopopulateASIFieldsFromGISAttributes"); // 109
}

include("PMT_OnlineCommercialPropertyType"); // Script 326

//if online user remove all fees first so not to duplicate fees
if(publicUser){
	removeAllFees(capId);
}

include("PMT_ONLFee030"); // Fee scripting 030
include("PMT_ONLFee060"); // Fee scripting 060
include("PMT_ONLFee010"); // Fee scripting 010
// include("PMT_ONLFeeUSF150"); // Fee Scripting USF150 for Online
include("PMT_ONLFeeTech"); // Note the Tech Fee needs to be called last of any other fee calc scripts.

