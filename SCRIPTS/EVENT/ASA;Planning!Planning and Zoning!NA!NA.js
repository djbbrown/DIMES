if (matches,publicUserID,"PUBLICUSER94617") //KGURNEY - testing purposes
    {
                    //establish working
                    cancel=true; 
                    showMessage=true; //set to true to see comment()
                    showDebug = true; //set to true to see all ugly details      
                    comment("Does this darn thing work?");
    }
// include("PLN_ParcelNoAddress"); // Moved to all Planning Records
include("PLN_PlanningZoningFees"); // added by Bryan de Jesus

// added by Vance Smith
include("PLN_AutopopulateGeneralPlanDesignation");


// adding addtl parcel from additional parcels ASIT
if(publicUser){
	createAPOfromMultipleParcelsTable();
}