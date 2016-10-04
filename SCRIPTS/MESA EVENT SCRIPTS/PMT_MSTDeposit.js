/*===================================================================
// Script Number: 176
// Script Name: PMT_MSTDeposit.js
// Script Developer: Kevin Ford
// Script Agency: Accela
// Script Description: on ASA the script will add the deposit fee's to the record.
// Script Run Event: ASA
// Script Parents:
//            ASA;Permits!Master Plan!NA!NA
/*==================================================================*/
// Just in case the fees already exist they are going to be removed.
if (feeExists("MST070", "NEW", "INVOICED")) voidRemoveFee("MST070");
if (feeExists("MST080", "NEW", "INVOICED")) voidRemoveFee("MST080");
// Add the correct fee item.
if (AInfo["Expedite"] == "Expedite")
	updateFee("MST070", "PMT_MST", "FINAL", 1, "N");				
if (AInfo["Expedite"] == "Super Expedite")
	updateFee("MST080", "PMT_MST", "FINAL", 1, "N");