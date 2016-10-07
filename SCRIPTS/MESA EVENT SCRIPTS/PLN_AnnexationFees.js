/*===================================================================
// Script Number: TBD
// Script Name: PLN_AnnexationFees.js
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: Assess the Annexation Fees using the ASI field Total Existing Lots 
// Script Run Event: ASA
// Script Parents:
//            ASA;Planning!Admin Review!NA!NA
/*==================================================================*/

if (AInfo["Total Existing Lots"] != null){
	updateFee("ANX010","PLN_ANX","FINAL",AInfo["Total Existing Lots"],"N");
}

/*===================================================================
// Script Number: TBD
// Script Name: PLN_AnnexationFees.js
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: Assess the Technology Fee 
// Script Run Event: ASA
// Script Parents:
//            ASA;Planning!Admin Review!NA!NA
// NOTE:  THIS MUST BE THE LAST FEE ASSESSED
/*==================================================================*/

updateFee("ANX030","PLN_ANX","FINAL",1,"N");