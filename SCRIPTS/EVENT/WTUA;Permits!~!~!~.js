// WTUA;Permits!~!~!~.js
include("PMT_PenaltyDate");

// added by Vance Smith (Mesa)
include("PMT_PermitExpirationDate"); // 92

// added by Kevin Gurney (Accela)
if (wfTask == "Plans Coordination" && wfStatus == "Ready to Issue"){
	include("PMT_UtilityServiceFees");
}