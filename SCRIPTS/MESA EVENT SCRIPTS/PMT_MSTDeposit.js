/*===================================================================
// Script Number: 176
// Script Name: PMT_MSTDeposit.js
// Script Developer: Kevin Ford
// Script Agency: Accela
// Script Description: on ASA the script will add the deposit fee's to the record.
// Script Run Event: ASA, ASIUA
// Script Parents:
//            ASA;Permits!Master Plan!NA!NA
//            ASIUA;Permits!Master Plan!NA!NA
/*==================================================================*/

// Add the correct fee item.
if (AInfo["Expedite"] == "Expedite" && (!feeExists("MST070", "NEW", "INVOICED"))) {
	updateFee("MST070", "PMT_MST", "FINAL", 1, "N");
}
if (AInfo["Expedite"] == "Super Expedite" && (!feeExists("MST080", "NEW", "INVOICED"))) {
	updateFee("MST080", "PMT_MST", "FINAL", 1, "N");
}