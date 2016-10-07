/*===================================================================
// Script Number: TBD
// Script Name: PLN_DesignReviewFees.js
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: Assess the Design Review Application Fee when ASI Concurrent with Rezoning or Site Plan Review != CHECKED 
// Script Run Event: ASA
// Script Parents:
//            ASA;Planning!Design Review!NA!NA
/*==================================================================*/

if (AInfo["Concurrent with Rezoning or Site Plan Review"] != "CHECKED"){
	updateFee("DRB010","PLN_DRB","FINAL",1,"N");
}

/*===================================================================
// Script Number: TBD
// Script Name: PLN_DesignReviewFees.js
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: Assess the Design Review Application Submitted concurrently with a Rezoning or Site Plan Review Fee when ASI Concurrent with Rezoning or Site Plan Review != CHECKED 
// Script Run Event: ASA
// Script Parents:
//            ASA;Planning!Design Review!NA!NA
/*==================================================================*/

if (AInfo["Concurrent with Rezoning or Site Plan Review"] == "CHECKED"){
	updateFee("DRB020","PLN_DRB","FINAL",1,"N");
}


/*===================================================================
// Script Number: TBD
// Script Name: PLN_DesignReviewFees.js
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: Assess the Technology Fee 
// Script Run Event: ASA
// Script Parents:
//            ASA;Planning!Board of Adjustment!NA!NA
// NOTE:  THIS MUST BE THE LAST FEE ASSESSED
/*==================================================================*/

updateFee("DRB040","PLN_DRB","FINAL",1,"N");