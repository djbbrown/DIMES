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
showDebug = true;
// constants
var FEE_CODES = {
		GRAND_OPENING_BANNER: "SGN050",
		SUBDIVISION: "SGN060",
		SUBDIVISION_WEEKEND: "SGN070",
		SUBDIVISION_DIRECTIONAL: "SGN080",
		DOWNTOWN_DIRECTIONAL_AFRAME: "SGN090"
};
var FEE_SCHEDULE = "PMT_SIGNS";
var FEE_PERIOD = "FINAL";
var QUANTITY_COLUMN_NAME = "Quantity";
var SIGN_TYPE_COLUMN_NAME = "Type of Work";
var SIGN_TYPES = {
		GRAND_OPENING_BANNER: "Grand Opening Banners",
		SUBDIVISION: "Subdivision Sign",
		SUBDIVISION_WEEKEND: "Subdivision Weekend Sign",
		SUBDIVISION_DIRECTIONAL: "Subdivision Directional Sign",
		DOWNTOWN_DIRECTIONAL_AFRAME: "Downtown Directional A-Frames"
};

// load ASIT
var t = loadASITable("SIGN INFO");
if (!!t){
	// loop through rows
	for (index in t){
		var row = t[index];
		logDebug("Assessing fees for " + row[QUANTITY_COLUMN_NAME] + " " + row[SIGN_TYPE_COLUMN_NAME]);
		
		// apply fee
		if (row[SIGN_TYPE_COLUMN_NAME] == SIGN_TYPES.GRAND_OPENING_BANNER){
			if (feeExists(FEE_CODES.GRAND_OPENING_BANNER, "INVOICED")) voidRemoveFee(FEE_CODES.GRAND_OPENING_BANNER);
			updateFee(FEE_CODES.GRAND_OPENING_BANNER, FEE_SCHEDULE, FEE_PERIOD, row[QUANTITY_COLUMN_NAME], "N");
		} else if (row[SIGN_TYPE_COLUMN_NAME] == SIGN_TYPES.SUBDIVISION){
			if (feeExists(FEE_CODES.SUBDIVISION, "INVOICED")) voidRemoveFee(FEE_CODES.SUBDIVISION);
			updateFee(FEE_CODES.SUBDIVISION, FEE_SCHEDULE, FEE_PERIOD, row[QUANTITY_COLUMN_NAME], "N");
		} else if (row[SIGN_TYPE_COLUMN_NAME] == SIGN_TYPES.SUBDIVISION_WEEKEND){
			if (feeExists(FEE_CODES.SUBDIVISION_WEEKEND, "INVOICED")) voidRemoveFee(FEE_CODES.SUBDIVISION_WEEKEND);
			updateFee(FEE_CODES.SUBDIVISION_WEEKEND, FEE_SCHEDULE, FEE_PERIOD, row[QUANTITY_COLUMN_NAME], "N");
		} else if (row[SIGN_TYPE_COLUMN_NAME] == SIGN_TYPES.SUBDIVISION_DIRECTIONAL){
			if (feeExists(FEE_CODES.SUBDIVISION_DIRECTIONAL, "INVOICED")) voidRemoveFee(FEE_CODES.SUBDIVISION_DIRECTIONAL);
			updateFee(FEE_CODES.SUBDIVISION_DIRECTIONAL, FEE_SCHEDULE, FEE_PERIOD, row[QUANTITY_COLUMN_NAME], "N");
		} else if (row[SIGN_TYPE_COLUMN_NAME] == SIGN_TYPES.DOWNTOWN_DIRECTIONAL_AFRAME){
			if (feeExists(FEE_CODES.DOWNTOWN_DIRECTIONAL_AFRAME, "INVOICED")) voidRemoveFee(FEE_CODES.DOWNTOWN_DIRECTIONAL_AFRAME);
			updateFee(FEE_CODES.DOWNTOWN_DIRECTIONAL_AFRAME, FEE_SCHEDULE, FEE_PERIOD, row[QUANTITY_COLUMN_NAME], "N");
		}
	}
	
} else {
	logDebug("Did not find table 'SIGN INFO'");
}