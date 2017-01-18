// ASA;Planning!Subdivision!NA!NA
//include("PLN_AutopopulateZoningClassification"); // Script 73  Moved to all planning records

if(!publicUser){
	// added by John Cheney (Mesa) 9/22/2016
	include("PLN_ExistingZoning");
}

//Final Plat and Subdivision Technical Review Fees
include("PLN_SubdivisionFees");