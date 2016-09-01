/*===================================================================
// Script Number: Magic Deposit Script
// Script Name: PMT_SignPermitDepositFee.js
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: At Application Submittal calculate and assess the Sign Permit Deposit Fee
// Script Run Event: ASA
// Script Parents:
//            ASA;Permits!Sign!NA!NA
/*==================================================================*/

	var totalSignValuation = AInfo["Total Sign Valuation"];
	var totalSignSqFt = AInfo["Total Sign Square Footage"];
	var totalFee = 0;
	totalFee = (102.4 + (0.03 * totalSignValuation) + (0.3 * totalSignSqFt));
	//logDebug("Total Fee: " + totalFee);
	var totalFee65pct = Math.ceil((totalFee * .65) * 100)/100;
	//logDebug("totalFee65pct = " + totalFee65pct);
	if (totalFee65pct > 0 ) {
		removeFee("SGN010", "FINAL");  //removing fee only for ACA in case user comes back to fee page.
		addFee("SGN010", "PMT_SIGNS", "FINAL", totalFee65pct, "N");
	} 