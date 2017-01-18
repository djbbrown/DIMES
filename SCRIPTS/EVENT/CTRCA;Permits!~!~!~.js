copyParcelGisObjects();
//adding publicUser criteria check to execute scripts based on AA or ACA
if (publicUser) {
	include("PMT_ParcelWarning");
	include("PMT_Hold_Flags");
	include("PMT_PopulateGasServiceAndElectricService"); // Script 347
	// added by Vance Smith (Mesa)
	include("PMT_Issued_FloodCondition"); // 130
}
