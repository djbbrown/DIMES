copyParcelGisObjects();
//adding publicUser criteria check to execute scripts based on AA or ACA
if (publicUser){
	include("PLN_ParcelNoAddress");
	include("PLN_AutopopulateZoningClassification");
}