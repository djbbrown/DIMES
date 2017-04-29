if (matches,publicUserID,"PUBLICUSER94617") //KGURNEY - testing purposes
    {
                    //establish working
                    cancel=true; 
                    showMessage=true; //set to true to see comment()
                    showDebug = true; //set to true to see all ugly details      
                    comment("Does this darn thing work?");
    }

// adding addtl parcel from additional parcels ASIT
if(publicUser){
	createAPOfromMultipleParcelsTable();
}
copyParcelGisObjects();
//adding publicUser criteria check to execute scripts based on AA or ACA
if (publicUser){
	include("PLN_ParcelNoAddress");
	include("PLN_AutopopulateZoningClassification");
}