//Adding for differences in AA and ACA execution
if(!publicUser){
	include("PMT_FloodControlPermit");
	include("PMT_SignalButteTag");
	include("PMT_StapleyTag");
	include("PMT_Parcel_51");
	include("PMT_CM_Gas_Electric");
	include("PMT_Light_Rail");
	// added by Vance Smith (Mesa)
	include("PMT_AutopopulateASIFieldsFromGISAttributes");
	include("PMT_CodeEnforcementNumber");
}
//include("PMT_ElectricalFeeforSigns");
//include("PMT_SignFees");  This is to be assessed at workflow task Plans Coordination

include("PMT_NoAddressAddAdHoc");
include("PMT_RelateToPlanningRecord");
include("PMT_SignPermitDepositFee");

