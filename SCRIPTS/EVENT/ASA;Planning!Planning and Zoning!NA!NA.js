// adding addtl parcel from additional parcels ASIT
if(publicUser){
	createAPOfromMultipleParcelsTable();
}

// include("PLN_ParcelNoAddress"); // Moved to all Planning Records
include("PLN_PlanningZoningFees"); // added by Bryan de Jesus

// added by Vance Smith
include("PLN_AutopopulateGeneralPlanDesignation");

