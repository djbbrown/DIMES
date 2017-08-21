//
// include("PLN_ParcelNoAddress"); // Moved to all Planning Records

if (!publicUser){
	// added by Vance Smith
	include("PLN_AutopopulateGeneralPlanDesignation");
}

// added by Kevin Gurney (Accela)
include("PLN_BoardofAdjustmentFees");
// added by Steve Allred
include("PLN_Communications_Towers");