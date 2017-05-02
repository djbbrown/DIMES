//Adding for differences in AA and ACA execution
if (!publicUser) {
	include("PMT_ParcelWarning");
	include("PMT_Hold_Flags");
	include("PMT_PopulateGasServiceAndElectricService"); // Script 347
	// added by Vance Smith (Mesa)
	include("PMT_Issued_FloodCondition"); // 130
}

/*
*Summary: ACA Clear Previously Assessed Fees when returning to Fee Summary Page
*/
if (publicUser) {
	removeAllFees(capId);
}

include("PMT_ClearanceTo");
include("PMT_Initialize_Submittal_Cycle");  /* updates the Short Notes field, not the ASI field */
