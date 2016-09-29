/*===================================================================
// Script Number: TBD
// Script Name: PLN_SubdivisionFees
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: If Application Type of Final Plat Review is selected assess Final Plat fee
// Script Run Event: ASA
// Script Parents:
//            ASA;Planning!Subdivision!NA!NA 
/*==================================================================*/
try{
	if (AInfo["Application Type"] == "Final Plat Review") {
		addFee("SUBD010","PLN_SUBD","FINAL",AInfo["Total New Lots, Tracts, Parcels"],"N");
	}
} catch (err){
	logDebug("A JavaScript Error occured: " + err.message);
}

/*===================================================================
// Script Number: TBD
// Script Name: PLN_SubdivisionFees
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: If Application Type of Subdivision Technical Review is selected assess Subdivision Technical Review
// Script Run Event: ASA
// Script Parents:
//            ASA;Planning!Subdivision!NA!NA 
/*==================================================================*/
try{
	if (AInfo["Application Type"] == "Subdivision Technical Review") {
		addFee("SUBD040","PLN_PZ","FINAL",AInfo["Total New Lots, Tracts, Parcels"],"N");
	}
} catch (err){
	logDebug("A JavaScript Error occured: " + err.message);
}
