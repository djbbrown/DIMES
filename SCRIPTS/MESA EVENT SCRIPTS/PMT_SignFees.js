/*===================================================================
// Script Number: 172
// Script Name: PMT_SignFees.js
// Script Developer: Bryan de Jesus
// Script Agency: Woolpert
// Script Description: SGN050 Banner Fee If Type of Work = “Grand Opening Banners”
// 	$110 per banner $110 * Quantity in ASIT where Type of Work = “Grand Opening Banners” Enter 1 TECH
// 	SGN060 Subdivision Sign If Type of Work = “Subdivision Sign”
//	$110 per sign $110 * Quantity in ASIT where Type of Work = “Subdivision Sign” Enter 1 TECH
// 	SGN070 Weekend Directional Sign Fee If Type of Work = “Subdivision Weekend Sign”
//
//	$550 per sign $550 * Quantity in ASIT where Type of Work = “Subdivision Weekend Sign” Enter 1 TECH
//	SGN080 Subdivision Directional Signs If Type of Work = “Subdivision Directional Sign”
//
//	$110 per sign $110 * Quantity in ASIT where Type of Work = “Subdivision Directional Sign” Enter 1 TECH
//	SGN090 Downtown Directional A-Frames If Type of Work = “Downtown Directional A-Frames”
//
//	$25 each $25 * Quantity in ASIT where Type of Work = “Downtown Directional A-Frames” Enter 1 TECH
// Script Run Event: ASA, ASIUA
// Script Parents:
//            ASA;Permits!Sign!NA!NA
//			  ASIUA;Permits!Sign!NA!NA
/*==================================================================*/
// load ASIT
var t = loadASITable("SIGN INFO");
var numberOfGrandOpeningBannerSigns = 0,
	numberOfSubdivisionSigns = 0,
	numberOfSubdivisionWeekendSigns = 0,
	numberOfSubdivisionDirectionalSigns = 0,
	numberOfDowntownDirectionalSigns = 0;

if (!!t){
	// loop through rows to get sign quantities - assuming duplicate types allowed in table
	for (index in t){
		var row = t[index];
		var	signType = row["Type of Work"];
		var	signQty = row["Quantity"];
		
		if (signType == "Grand Opening Banners") numberOfGrandOpeningBannerSigns += signQty;
		if (signType == "Subdivision Sign") numberOfSubdivisionSigns += signQty;
		if (signType == "Subdivision Weekend Sign") numberOfSubdivisionWeekendSigns += signQty;
		if (signType == "Subdivision Directional Sign") numberOfSubdivisionDirectionalSigns += signQty;
		if (signType == "Downtown Directional A-Frames") numberOfDowntownDirectionalSigns += signQty;
	}
	
	// apply fees
	// 050
	if (feeExists("SGN050", "INVOICED") && feeQty("SGN050") != numberOfGrandOpeningBannerSigns)
		voidRemoveFee("SGN050");
	if (feeExists("SGN050", "NEW") && numberOfGrandOpeningBannerSigns == 0)
		removeFee("SGN050");
	if (numberOfGrandOpeningBannerSigns > 0)
		updateFee("SGN050", "PMT_SIGNS", "FINAL", numberOfGrandOpeningBannerSigns, "N");
	/*
	// 060
	if (feeExists("SGN060", "INVOICED") && feeQty("SGN060") != numberOfSubdivisionSigns)
		voidRemoveFee("SGN060");
	if (feeExists("SGN060", "NEW") && numberOfSubdivisionSigns == 0)
		removeFee("SGN060");
	if (numberOfSubdivisionSigns > 0)
		updateFee("SGN060", "PMT_SIGNS", "FINAL", numberOfSubdivisionSigns, "N");
	// 070
	if (feeExists("SGN070", "INVOICED") && feeQty("SGN070") != numberOfSubdivisionWeekendSigns)
		voidRemoveFee("SGN070");
	if (feeExists("SGN070", "NEW") && numberOfSubdivisionWeekendSigns == 0)
		removeFee("SGN070");
	if (numberOfSubdivisionWeekendSigns > 0)
		updateFee("SGN070", "PMT_SIGNS", "FINAL", numberOfSubdivisionWeekendSigns, "N");
	// 080
	if (feeExists("SGN080", "INVOICED") && feeQty("SGN080") != numberOfSubdivisionDirectionalSigns)
		voidRemoveFee("SGN080");
	if (feeExists("SGN080", "NEW") && numberOfSubdivisionDirectionalSigns == 0)
		removeFee("SGN080");
	if (numberOfSubdivisionDirectionalSigns > 0)
		updateFee("SGN080", "PMT_SIGNS", "FINAL", numberOfSubdivisionDirectionalSigns, "N");
	// 090
	if (feeExists("SGN090", "INVOICED") && feeQty("SGN090") != numberOfDowntownDirectionalSigns)
		voidRemoveFee("SGN090");
	if (feeExists("SGN090", "NEW") && numberOfDowntownDirectionalSigns == 0)
		removeFee("SGN090");
	if (numberOfDowntownDirectionalSigns > 0)
		updateFee("SGN090", "PMT_SIGNS", "FINAL", numberOfDowntownDirectionalSigns, "N");
	//*/
} else {
	logDebug("Did not find table 'SIGN INFO'");
}