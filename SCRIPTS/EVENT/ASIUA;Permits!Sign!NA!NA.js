// include("PMT_ElectricalFeeforSigns");
include("PMT_SignFees");
include("PMT_RelateToPlanningRecord");

// added by Vance Smith (Mesa)
include("PMT_AutopopulateASIFieldsFromGISAttributes");
include("PMT_CodeEnforcementNumber");

if(matches(AInfo["Expedite"],"Expedite","Super Expedite") && (!feeExists("SGN130","NEW","INVOICED") || !feeExists("SGN150","NEW","INVOICED"))) {
	include("PMT_SignPermitDepositFee");
}