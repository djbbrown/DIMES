/*===================================================================
// Script Number: 337
// Script Name: PMT_CommercialImpactFees.js
// Script Developer: Jody Bearden (borrowed code from John's script 340)
// Script Agency: Mesa
// Script Description: 
// Script Run Event: ASIUA, WTUA
// Script Parents:
//		ASIUA;Permits!Commercial!NA!NA (but only when wfTask "Permit Issuance" is active).
//		WTUA;Permits!Commercial!NA!NA (only when wfTask "Permit Issuance" is active
//             
/*==================================================================*/

/* test with PMT16-01042 */

/* Run when workflow task Permit Issuance is activated AND/OR – on
 * ApplicationSpecificInfoUpdateAfter ONLY IF workflow task Permit
 * Issuance is activated.
 */
 
 /*
  * When value of “Non-Residential (per sq ft)” or “Hotels/Motels (per
  * room)” is chosen for ASIT dropdown field “Classification” in ASI
  * subgroup “IMPACT FEES” and a value > 0 is entered into ASI fields
  * listed below, assess the corresponding fees using the value in the
  * ASI field to calculate the correct fee value.
 */

try {
	var isActive = isTaskActive_Mesa("Permit Issuance");

	if(isActive && isActive == true ){

		// permit issuance task exists and is active, so ok to continue

		// get ASI vars
        var classification = getAppSpecific("Classification");
		var nonRes = (classification == "Non-Residential (per sq ft)");
		var hotMot = (classification == "Hotels/Motels (per room)");
		var fire = getAppSpecific("Fire");
		var pubSaf = getAppSpecific("Public Safety");
		var storm = getAppSpecific("Stormwater");
        var inAsuOrWaterArea = false; // parcel in ASU or AZ Water area? (i.e. has an 'ASU', 'ASUE', 'AWCP' tag)
        var hasStormTag = false;

        var tagArray = getGISInfoArray("Accela/AccelaTAGS", "Accela_TAGS", "Accela_TAGS.TAG");
        if (tagArray && tagArray.length > 0) {
            for (tIndex in tagArray) {
                thisTag = tagArray[tIndex];
                if(matches(thisTag, "ASU", "ASUE", "AWCP")) inAsuOrWaterArea = true;
                if(matches(thisTag, "STOR")) hasStormTag = true;
            }
        }

        if (classification && matches(classification, "Non-Residential (per sq ft)", "Hotels/Motels (per room)")) {
			
			//==========================================================
			// Commercial Fire, Public Safety and Stormwater Impact Fees
			//==========================================================
			
			/* Non-Residential (per sq ft) */
			if (nonRes) {
				if (fire && fire > 0) {
					// assess Fire fee.
					if (feeExists("RDIF207", "NEW")) voidRemoveFee("RDIF207");
					addFee("RDIF207", "PMT_RDIF", "FINAL", fire, "N");
				}
				
				if (pubSaf && pubSaf > 0) {
					// assess Public Safety fee.
					if (feeExists("RDIF257", "NEW")) voidRemoveFee("RDIF257");
					addFee("RDIF257", "PMT_RDIF", "FINAL",  pubSaf, "N");
				}
				
				if (hasStormTag && (storm && storm > 0)) {
					// assess Stormwater fee.
					if (feeExists("RDIF307", "NEW")) voidRemoveFee("RDIF307");
					addFee("RDIF307", "PMT_RDIF", "FINAL",  storm, "N");
				}
			}
			
			/* Hotels/Motels (per room) */
			if (hotMot) {
				if (fire && fire > 0) {
					// assess Fire fee.
					if (feeExists("RDIF205", "NEW")) voidRemoveFee("RDIF205");
					addFee("RDIF205", "PMT_RDIF", "FINAL",  fire, "N");
				}
				
				if (pubSaf && pubSaf > 0) {
					// assess Public Safety fee.
					if (feeExists("RDIF255", "NEW")) voidRemoveFee("RDIF255");
					addFee("RDIF255", "PMT_RDIF", "FINAL",  pubSaf, "N");
				}
				
				if (hasStormTag && (storm && storm > 0)) {
					// assess Stormwater fee.
					if (feeExists("RDIF305", "NEW")) voidRemoveFee("RDIF305");
					addFee("RDIF305", "PMT_RDIF", "FINAL",  storm, "N");
				}
			}
			
			//==============================================
			// Commercial Water and Waster Water Impact Fees
			//==============================================
			var wmq1 = getAppSpecific("Water Meter Qty 1");
			var wmq2 = getAppSpecific("Water Meter Qty 2");
			var wmq3 = getAppSpecific("Water Meter Qty 3");
			var wmq4 = getAppSpecific("Water Meter Qty 4");
			
			var wwms1 = getAppSpecific("Water/Wastewater Meter Size 1");
			var wwms2 = getAppSpecific("Water/Wastewater Meter Size 2");
			var wwms3 = getAppSpecific("Water/Wastewater Meter Size 3");
			var wwms4 = getAppSpecific("Water/Wastewater Meter Size 4");
			
			var waterNonResTotal = 0; // Water - Non-Residential (RDIF057)
			var wasteWaterNonResTotal = 0; // Waste Water - Non-Residential (RDIF107)
			var waterHotMotTotal = 0; // Water - Hotel/Motels (RDIF055)
			var wasteWaterHotMotTotal = 0; // Waste Water - Hotel/Motel (RDIF105)
			
			
			// lookup standard choice values for each meter size
			/* water */
			var wtrThreeQuarterInch = Number(lookup("PMT_IMPACT_FEE_RATES_WATER", 'Com-3/4"'));
			var wtrOneInch =  Number(lookup("PMT_IMPACT_FEE_RATES_WATER", 'Com-1"'));
			var wtrOneAndOneHalfInch = Number(lookup("PMT_IMPACT_FEE_RATES_WATER", 'Com-1.5"'));
			var wtrTwoInch = Number(lookup("PMT_IMPACT_FEE_RATES_WATER", 'Com-2"'));
			var wtrThreeInch = Number(lookup("PMT_IMPACT_FEE_RATES_WATER", 'Com-3"'));
			var wtrFourInch = Number(lookup("PMT_IMPACT_FEE_RATES_WATER", 'Com-4"'));
			var wtrSixInch = Number(lookup("PMT_IMPACT_FEE_RATES_WATER", 'Com-6"'));
			var wtrEightInch = Number(lookup("PMT_IMPACT_FEE_RATES_WATER", 'Com-8"'));
			
			/* sewer/waste water */
			var swrThreeQuarterInch = Number(lookup("PMT_IMPACT_FEE_RATES_WASTE_WATER", 'Com-3/4"'));
			var swrOneInch = Number(lookup("PMT_IMPACT_FEE_RATES_WASTE_WATER", 'Com-1"'));
			var swrOneAndOneHalfInch = Number(lookup("PMT_IMPACT_FEE_RATES_WASTE_WATER", 'Com-1.5"'));
			var swrTwoInch = Number(lookup("PMT_IMPACT_FEE_RATES_WASTE_WATER", 'Com-2"'));
			var swrThreeInch = Number(lookup("PMT_IMPACT_FEE_RATES_WASTE_WATER", 'Com-3"'));
			var swrFourInch = Number(lookup("PMT_IMPACT_FEE_RATES_WASTE_WATER", 'Com-4"'));
			var swrSixInch = Number(lookup("PMT_IMPACT_FEE_RATES_WASTE_WATER", 'Com-6"'));
			var swrEightInch = Number(lookup("PMT_IMPACT_FEE_RATES_WASTE_WATER", 'Com-8"'));

		
			/* Non-Residential (per sq ft) */
			if (nonRes && !inAsuOrWaterArea) {
				if (wmq1 && wmq1 > 0) {
					switch("" + wwms1) {
						case 'Com-3/4"':
							waterNonResTotal += wmq1 * wtrThreeQuarterInch;
							wasteWaterNonResTotal += wmq1 * swrThreeQuarterInch;
							break;
						case 'Com-1"':
							waterNonResTotal += wmq1 * wtrOneInch;
							wasteWaterNonResTotal += wmq1 * swrOneInch;
							break;
						case 'Com-1.5"':
							waterNonResTotal += wmq1 * wtrOneAndOneHalfInch;
							wasteWaterNonResTotal += wmq1 * swrOneAndOneHalfInch;
							break;
						case 'Com-2"':
							waterNonResTotal += wmq1 * wtrTwoInch;
							wasteWaterNonResTotal += wmq1 * swrTwoInch;
							break;
						case 'Com-3"':
							waterNonResTotal += wmq1 * wtrThreeInch;
							wasteWaterNonResTotal += wmq1 * swrThreeInch;
							break;
						case 'Com-4"':
							waterNonResTotal += wmq1 * wtrFourInch;
							wasteWaterNonResTotal += wmq1 * swrFourInch;
							break;
						case 'Com-6"':
							waterNonResTotal += wmq1 * wtrSixInch;
							wasteWaterNonResTotal += wmq1 * swrSixInch;
							break;
						case 'Com-8"':
							waterNonResTotal += wmq1 * wtrEightInch;
							wasteWaterNonResTotal += wmq1 * swrEightInch;
							break;
						default:
							// do nothing
					}
				}

				if (wmq2 && wmq2 > 0) {
					switch("" + wwms2) {
						case 'Com-3/4"':
							waterNonResTotal += wmq2 * wtrThreeQuarterInch;
							wasteWaterNonResTotal += wmq2 * swrThreeQuarterInch;
							break;
						case 'Com-1"':
							waterNonResTotal += wmq2 * wtrOneInch;
							wasteWaterNonResTotal += wmq2 * swrOneInch;
							break;
						case 'Com-1.5"':
							waterNonResTotal += wmq2 * wtrOneAndOneHalfInch;
							wasteWaterNonResTotal += wmq2 * swrOneAndOneHalfInch;
							break;
						case 'Com-2"':
							waterNonResTotal += wmq2 * wtrTwoInch;
							wasteWaterNonResTotal += wmq2 * swrTwoInch;
							break;
						case 'Com-3"':
							waterNonResTotal += wmq2 * wtrThreeInch;
							wasteWaterNonResTotal += wmq2 * swrThreeInch;
							break;
						case 'Com-4"':
							waterNonResTotal += wmq2 * wtrFourInch;
							wasteWaterNonResTotal += wmq2 * swrFourInch;
							break;
						case 'Com-6"':
							waterNonResTotal += wmq2 * wtrSixInch;
							wasteWaterNonResTotal += wmq2 * swrSixInch;
							break;
						case 'Com-8"':
							waterNonResTotal += wmq2 * wtrEightInch;
							wasteWaterNonResTotal += wmq2 * swrEightInch;
							break;
						default:
							// do nothing
					}
				}

				if (wmq3 && wmq3 > 0) {
					switch("" + wwms3) {
						case 'Com-3/4"':
							waterNonResTotal += wmq3 * wtrThreeQuarterInch;
							wasteWaterNonResTotal += wmq3 * swrThreeQuarterInch;
							break;
						case 'Com-1"':
							waterNonResTotal += wmq3 * wtrOneInch;
							wasteWaterNonResTotal += wmq3 * swrOneInch;
							break;
						case 'Com-1.5"':
							waterNonResTotal += wmq3 * wtrOneAndOneHalfInch;
							wasteWaterNonResTotal += wmq3 * swrOneAndOneHalfInch;
							break;
						case 'Com-2"':
							waterNonResTotal += wmq3 * wtrTwoInch;
							wasteWaterNonResTotal += wmq3 * swrTwoInch;
							break;
						case 'Com-3"':
							waterNonResTotal += wmq3 * wtrThreeInch;
							wasteWaterNonResTotal += wmq3 * swrThreeInch;
							break;
						case 'Com-4"':
							waterNonResTotal += wmq3 * wtrFourInch;
							wasteWaterNonResTotal += wmq3 * swrFourInch;
							break;
						case 'Com-6"':
							waterNonResTotal += wmq3 * wtrSixInch;
							wasteWaterNonResTotal += wmq3 * swrSixInch;
							break;
						case 'Com-8"':
							waterNonResTotal += wmq3 * wtrEightInch;
							wasteWaterNonResTotal += wmq3 * swrEightInch;
							break;
						default:
							// do nothing
					}
				}
				
				if (wmq4 && wmq4 > 0) {
					switch("" + wwms4) {
						case 'Com-3/4"':
							waterNonResTotal += wmq4 * wtrThreeQuarterInch;
							wasteWaterNonResTotal += wmq4 * swrThreeQuarterInch;
							break;
						case 'Com-1"':
							waterNonResTotal += wmq4 * wtrOneInch;
							wasteWaterNonResTotal += wmq4 * swrOneInch;
							break;
						case 'Com-1.5"':
							waterNonResTotal += wmq4 * wtrOneAndOneHalfInch;
							wasteWaterNonResTotal += wmq4 * swrOneAndOneHalfInch;
							break;
						case 'Com-2"':
							waterNonResTotal += wmq4 * wtrTwoInch;
							wasteWaterNonResTotal += wmq4 * swrTwoInch;
							break;
						case 'Com-3"':
							waterNonResTotal += wmq4 * wtrThreeInch;
							wasteWaterNonResTotal += wmq4 * swrThreeInch;
							break;
						case 'Com-4"':
							waterNonResTotal += wmq4 * wtrFourInch;
							wasteWaterNonResTotal += wmq4 * swrFourInch;
							break;
						case 'Com-6"':
							waterNonResTotal += wmq4 * wtrSixInch;
							wasteWaterNonResTotal += wmq4 * swrSixInch;
							break;
						case 'Com-8"':
							waterNonResTotal += wmq4 * wtrEightInch;
							wasteWaterNonResTotal += wmq4 * swrEightInch;
							break;
						default:
							// do nothing
					}
				}
			}
			
			/* Hotels/Motels (per room) */
			if (hotMot && !inAsuOrWaterArea) {
				if (wmq1 && wmq1 > 0) {
					switch("" + wwms1) {
						case 'Com-3/4"':
							waterHotMotTotal += wmq1 * wtrThreeQuarterInch;
							wasteWaterHotMotTotal += wmq1 * swrThreeQuarterInch;
							break;
						case 'Com-1"':
							waterHotMotTotal += wmq1 * wtrOneInch;
							wasteWaterHotMotTotal += wmq1 * swrOneInch;
							break;
						case 'Com-1.5"':
							waterHotMotTotal += wmq1 * wtrOneAndOneHalfInch;
							wasteWaterHotMotTotal += wmq1 * swrOneAndOneHalfInch;
							break;
						case 'Com-2"':
							waterHotMotTotal += wmq1 * wtrTwoInch;
							wasteWaterHotMotTotal += wmq1 * swrTwoInch;
							break;
						case 'Com-3"':
							waterHotMotTotal += wmq1 * wtrThreeInch;
							wasteWaterHotMotTotal += wmq1 * swrThreeInch;
							break;
						case 'Com-4"':
							waterHotMotTotal += wmq1 * wtrFourInch;
							wasteWaterHotMotTotal += wmq1 * swrFourInch;
							break;
						case 'Com-6"':
							waterHotMotTotal += wmq1 * wtrSixInch;
							wasteWaterHotMotTotal += wmq1 * swrSixInch;
							break;
						case 'Com-8"':
							waterHotMotTotal += wmq1 * wtrEightInch;
							wasteWaterHotMotTotal += wmq1 * swrEightInch;
							break;
						default:
							// do nothing
					}
				}
				
				if (wmq2 && wmq2 > 0) {
					switch("" + wwms2) {
						case 'Com-3/4"':
							waterHotMotTotal += wmq2 * wtrThreeQuarterInch;
							wasteWaterHotMotTotal += wmq2 * swrThreeQuarterInch;
							break;
						case 'Com-1"':
							waterHotMotTotal += wmq2 * wtrOneInch;
							wasteWaterHotMotTotal += wmq2 * swrOneInch;
							break;
						case 'Com-1.5"':
							waterHotMotTotal += wmq2 * wtrOneAndOneHalfInch;
							wasteWaterHotMotTotal += wmq2 * swrOneAndOneHalfInch;
							break;
						case 'Com-2"':
							waterHotMotTotal += wmq2 * wtrTwoInch;
							wasteWaterHotMotTotal += wmq2 * swrTwoInch;
							break;
						case 'Com-3"':
							waterHotMotTotal += wmq2 * wtrThreeInch;
							wasteWaterHotMotTotal += wmq2 * swrThreeInch;
							break;
						case 'Com-4"':
							waterHotMotTotal += wmq2 * wtrFourInch;
							wasteWaterHotMotTotal += wmq2 * swrFourInch;
							break;
						case 'Com-6"':
							waterHotMotTotal += wmq2 * wtrSixInch;
							wasteWaterHotMotTotal += wmq2 * swrSixInch;
							break;
						case 'Com-8"':
							waterHotMotTotal += wmq2 * wtrEightInch;
							wasteWaterHotMotTotal += wmq2 * swrEightInch;
							break;
						default:
							// do nothing
					}
				}
				
				if (wmq3 && wmq3 > 0) {
					switch("" + wwms3) {
						case 'Com-3/4"':
							waterHotMotTotal += wmq3 * wtrThreeQuarterInch;
							wasteWaterHotMotTotal += wmq3 * swrThreeQuarterInch;
							break;
						case 'Com-1"':
							waterHotMotTotal += wmq3 * wtrOneInch;
							wasteWaterHotMotTotal += wmq3 * swrOneInch;
							break;
						case 'Com-1.5"':
							waterHotMotTotal += wmq3 * wtrOneAndOneHalfInch;
							wasteWaterHotMotTotal += wmq3 * swrOneAndOneHalfInch;
							break;
						case 'Com-2"':
							waterHotMotTotal += wmq3 * wtrTwoInch;
							wasteWaterHotMotTotal += wmq3 * swrTwoInch;
							break;
						case 'Com-3"':
							waterHotMotTotal += wmq3 * wtrThreeInch;
							wasteWaterHotMotTotal += wmq3 * swrThreeInch;
							break;
						case 'Com-4"':
							waterHotMotTotal += wmq3 * wtrFourInch;
							wasteWaterHotMotTotal += wmq3 * swrFourInch;
							break;
						case 'Com-6"':
							waterHotMotTotal += wmq3 * wtrSixInch;
							wasteWaterHotMotTotal += wmq3 * swrSixInch;
							break;
						case 'Com-8"':
							waterHotMotTotal += wmq3 * wtrEightInch;
							wasteWaterHotMotTotal += wmq3 * swrEightInch;
							break;
						default:
							// do nothing
					}
				}
				
				if (wmq4 && wmq4 > 0) {
					switch("" + wwms4) {
						case 'Com-3/4"':
							waterHotMotTotal += wmq4 * wtrThreeQuarterInch;
							wasteWaterHotMotTotal += wmq4 * swrThreeQuarterInch;
							break;
						case 'Com-1"':
							waterHotMotTotal += wmq4 * wtrOneInch;
							wasteWaterHotMotTotal += wmq4 * swrOneInch;
							break;
						case 'Com-1.5"':
							waterHotMotTotal += wmq4 * wtrOneAndOneHalfInch;
							wasteWaterHotMotTotal += wmq4 * swrOneAndOneHalfInch;
							break;
						case 'Com-2"':
							waterHotMotTotal += wmq4 * wtrTwoInch;
							wasteWaterHotMotTotal += wmq4 * swrTwoInch;
							break;
						case 'Com-3"':
							waterHotMotTotal += wmq4 * wtrThreeInch;
							wasteWaterHotMotTotal += wmq4 * swrThreeInch;
							break;
						case 'Com-4"':
							waterHotMotTotal += wmq4 * wtrFourInch;
							wasteWaterHotMotTotal += wmq4 * swrFourInch;
							break;
						case 'Com-6"':
							waterHotMotTotal += wmq4 * wtrSixInch;
							wasteWaterHotMotTotal += wmq4 * swrSixInch;
							break;
						case 'Com-8"':
							waterHotMotTotal += wmq4 * wtrEightInch;
							wasteWaterHotMotTotal += wmq4 * swrEightInch;
							break;
						default:
							// do nothing
					}
				}
			}
			
			//============
			// log totals:
			//============
			logDebug("RDIF057: Water (Non-Residential) total: " + waterNonResTotal);
			logDebug("RDIF107: Wastewater (Non-Residential) total: " + wasteWaterNonResTotal);
			logDebug("RDIF055: Water (Hotel/Motel) total: " + waterHotMotTotal);
			logDebug("RDIF105: Water (Hotel/Motel) total: " + wasteWaterHotMotTotal);
			
			//===================================================================
			// All fee totals should be calculated by now - add them if necessary
			//===================================================================
			
			if (nonRes && !inAsuOrWaterArea) {			
				// Water - Non-Residential
				if (feeExists("RDIF057", "NEW")) voidRemoveFee("RDIF057");
				addFee("RDIF057", "PMT_RDIF", "FINAL",  waterNonResTotal, "N");
				// Waste Water - Non-Residential
				if (feeExists("RDIF107", "NEW")) voidRemoveFee("RDIF107");
				addFee("RDIF107", "PMT_RDIF", "FINAL",  wasteWaterNonResTotal, "N");
			}
			
			if (hotMot && !inAsuOrWaterArea) {
				// Water - Hotel/Motel
				if (feeExists("RDIF055", "NEW")) voidRemoveFee("RDIF055");
				addFee("RDIF055", "PMT_RDIF", "FINAL",  waterHotMotTotal, "N");
				// Waste Water - Hotel/Motel
				if (feeExists("RDIF105", "NEW")) voidRemoveFee("RDIF105");
				addFee("RDIF105", "PMT_RDIF", "FINAL",  wasteWaterHotMotTotal, "N");
			}
			
			logDebug("PMT_CommercialImpactFees - Fees successfully set!");
        }else {
            logDebug("PMT_CommercialImpactFees - No Action - Classification not found.");
        }
	} else {
		logDebug("PMT_CommercialImpactFees - No Action - Permit Issuance task is null or not active.");
	}

} catch (err) {
	logDebug("A JavaScript Error occured in PMT_CommercialImpactFees: " + err.message);
	logDebug(err.stack);
}
logDebug("---------- end  PMT_CommercialImpactFees ----------"); 
 