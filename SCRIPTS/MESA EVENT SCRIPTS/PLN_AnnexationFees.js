/*===================================================================
// Script Number: TBD
// Script Name: PMT_AnnexationFees.js
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