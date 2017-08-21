/*===================================================================
// Script Number: 73
==================================================================*/
//include("PLN_AutopopulateZoningClassification")  //called at ASA:Planning branch

if (!publicUser){
	// added by John Cheney (Mesa) 9/22/2016
	include("PLN_ExistingZoning");
}

// added by Kevin Gurney (Accela)
include("PLN_AdministrativeReviewFees");
// added by Steve Allred
include("PLN_Communications_Towers");
