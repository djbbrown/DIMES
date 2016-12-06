/*===================================================================
// Script Number: TBD
// Script Name:Remove Fees ACA
//==================================================================*/
if(publicUser){
	removeAllFees(capId);
}

/*===================================================================
// Script Number: TBD
// Script Name: PLN_SubdivisionFees
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: If Application Type of Final Plat Review, Map of Dedication (MOD), Re-Plat is selected assess Final Plat fee
// Script Run Event: ASA
// Script Parents:
//            ASA;Planning!Subdivision!NA!NA 
/*==================================================================*/
try{
	if (matches(AInfo["Application Type"],"Final Plat Review","Map of Dedication (MOD)","Re-Plat") && AInfo["Total New Lots, Tracts, Parcels"] != null) {
		updateFee("SUBD010","PLN_SUBD","FINAL",AInfo["Total New Lots, Tracts, Parcels"],"N");
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
	if (AInfo["Application Type"] == "Subdivision Technical Review" && AInfo["Total New Lots, Tracts, Parcels"] != null) {
		updateFee("SUBD040","PLN_SUBD","FINAL",AInfo["Total New Lots, Tracts, Parcels"],"N");
	}
} catch (err){
	logDebug("A JavaScript Error occured: " + err.message);
}

/*===================================================================
// Script Number: TBD
// Script Name: PLN_SubdivisionFees
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: If any of the above fees assess then assess Tech Fee
// Script Run Event: ASA
// Script Parents:
//            ASA;Planning!Subdivision!NA!NA 
// NOTE: Tech Fee needs to be last fee assessed
/*==================================================================*/
try{
	if (matches(AInfo["Application Type"],"Subdivision Technical Review","Final Plat Review","Map of Dedication (MOD)","Re-Plat") && AInfo["Total New Lots, Tracts, Parcels"] != null) {
		updateFee("SUBD060","PLN_SUBD","FINAL",1,"N");
	}
} catch (err){
	logDebug("A JavaScript Error occured: " + err.message);
}
