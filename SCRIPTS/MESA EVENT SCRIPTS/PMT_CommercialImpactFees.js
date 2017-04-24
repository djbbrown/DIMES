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

/* test with PMT16-01042, PMT16-01084, PMT16-01128 */

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
					if (feeExists("RDIF207", "NEW", "INVOICED")) voidRemoveFee("RDIF207");
					addFee("RDIF207", "PMT_RDIF", "FINAL", fire, "N");
				}
				
				if (pubSaf && pubSaf > 0) {
					// assess Public Safety fee.
					if (feeExists("RDIF257", "NEW", "INVOICED")) voidRemoveFee("RDIF257");
					addFee("RDIF257", "PMT_RDIF", "FINAL",  pubSaf, "N");
				}
				
				if (hasStormTag && (storm && storm > 0)) {
					// assess Stormwater fee.
					if (feeExists("RDIF307", "NEW", "INVOICED")) voidRemoveFee("RDIF307");
					addFee("RDIF307", "PMT_RDIF", "FINAL",  storm, "N");
				}
			}
			
			/* Hotels/Motels (per room) */
			if (hotMot) {
				if (fire && fire > 0) {
					// assess Fire fee.
					if (feeExists("RDIF205", "NEW", "INVOICED")) voidRemoveFee("RDIF205");
					addFee("RDIF205", "PMT_RDIF", "FINAL",  fire, "N");
				}
				
				if (pubSaf && pubSaf > 0) {
					// assess Public Safety fee.
					if (feeExists("RDIF255", "NEW", "INVOICED")) voidRemoveFee("RDIF255");
					addFee("RDIF255", "PMT_RDIF", "FINAL",  pubSaf, "N");
				}
				
				if (hasStormTag && (storm && storm > 0)) {
					// assess Stormwater fee.
					if (feeExists("RDIF305", "NEW", "INVOICED")) voidRemoveFee("RDIF305");
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
			
			var wwmq1 = getAppSpecific("Waste Water Qty 1");
			var wwmq2 = getAppSpecific("Waste Water Qty 2");
			var wwmq3 = getAppSpecific("Waste Water Qty 3");
			var wwmq4 = getAppSpecific("Waste Water Qty 4");
			
			// if nulls or empty strings, change quantities to zeros for proper calculations
			if (!wmq1) { wmq1 = 0; }
			if (!wmq2) { wmq2 = 0; }
			if (!wmq3) { wmq3 = 0; }
			if (!wmq4) { wmq4 = 0; }
			
			if (!wwmq1) { wwmq1 = 0; }
			if (!wwmq2) { wwmq2 = 0; }
			if (!wwmq3) { wwmq3 = 0; }
			if (!wwmq4) { wwmq4 = 0; }
			
			
/*
			logDebug("wmq1: " + wmq1);
			logDebug("wmq2: " + wmq2);
			logDebug("wmq3: " + wmq3);
			logDebug("wmq4: " + wmq4);
			logDebug("wwmq1: " + wwmq1);
			logDebug("wwmq2: " + wwmq2);
			logDebug("wwmq3: " + wwmq3);
			logDebug("wwmq4: " + wwmq4);
*/			
			var wwms1 = getAppSpecific("Water/Wastewater Meter Size 1");
			var wwms2 = getAppSpecific("Water/Wastewater Meter Size 2");
			var wwms3 = getAppSpecific("Water/Wastewater Meter Size 3");
			var wwms4 = getAppSpecific("Water/Wastewater Meter Size 4");
			
			/* fix wonky unicode 'right double quotes' in valve size values
			 * (i.e. replace them with the kind of double quote that we
			 * can actually type on our keyboards, so we're able to match
			 * against valve sizes in our switch statements when a double
			 * quote is used to represent the 'inch' portion of the size).
			*/
			if (wwms1) { wwms1 = wwms1.replace("\u201D", '"'); }
			if (wwms2) { wwms2 = wwms2.replace("\u201D", '"'); }
			if (wwms3) { wwms3 = wwms3.replace("\u201D", '"'); }
			if (wwms4) { wwms4 = wwms4.replace("\u201D", '"'); }

			// see the following for more info (plus Mike's email from W, 9/28/2016, 9:53 A.M.:
			// http://stackoverflow.com/questions/18735921/are-there-different-types-of-double-quotes-in-utf-8-php-str-replace
			// http://unicode.org/cldr/utility/confusables.jsp?a=%22&r=None
			// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt
			
/*			
			logDebug("wwms1: " + wwms1);
			logDebug("wwms2: " + wwms2);
			logDebug("wwms3: " + wwms3);
			logDebug("wwms4: " + wwms4);
*/			
			
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
			//logDebug("nonRes: " + nonRes + " && !inAsuOrWaterArea: " + !inAsuOrWaterArea);
			if (nonRes && !inAsuOrWaterArea) {
				if (wwms1) {
					switch("" + wwms1) { // 
						case 'Com-3/4"':
							waterNonResTotal += wmq1 * wtrThreeQuarterInch;
							wasteWaterNonResTotal += wwmq1 * swrThreeQuarterInch;
							break;
						case 'Com-1"':
							waterNonResTotal += wmq1 * wtrOneInch;
							wasteWaterNonResTotal += wwmq1 * swrOneInch;
							break;
						case 'Com-1.5"':
							waterNonResTotal += wmq1 * wtrOneAndOneHalfInch;
							wasteWaterNonResTotal += wwmq1 * swrOneAndOneHalfInch;
							break;
						case 'Com-2"':
							waterNonResTotal += wmq1 * wtrTwoInch;
							wasteWaterNonResTotal += wwmq1 * swrTwoInch;
							break;
						case 'Com-3"':
							waterNonResTotal += wmq1 * wtrThreeInch;
							wasteWaterNonResTotal += wwmq1 * swrThreeInch;
							break;
						case 'Com-4"':
							waterNonResTotal += wmq1 * wtrFourInch;
							wasteWaterNonResTotal += wwmq1 * swrFourInch;
							break;
						case 'Com-6"':
							waterNonResTotal += wmq1 * wtrSixInch;
							wasteWaterNonResTotal += wwmq1 * swrSixInch;
							break;
						case 'Com-8"':
							waterNonResTotal += wmq1 * wtrEightInch;
							wasteWaterNonResTotal += wwmq1 * swrEightInch;
							break;
						default:
							// do nothing
					}
				}

				if (wwms2) {
					switch("" + wwms2) {
						case 'Com-3/4"':
							waterNonResTotal += wmq2 * wtrThreeQuarterInch;
							wasteWaterNonResTotal += wwmq2 * swrThreeQuarterInch;
							break;
						case 'Com-1"':
							waterNonResTotal += wmq2 * wtrOneInch;
							wasteWaterNonResTotal += wwmq2 * swrOneInch;
							break;
						case 'Com-1.5"':
							waterNonResTotal += wmq2 * wtrOneAndOneHalfInch;
							wasteWaterNonResTotal += wwmq2 * swrOneAndOneHalfInch;
							break;
						case 'Com-2"':
							waterNonResTotal += wmq2 * wtrTwoInch;
							wasteWaterNonResTotal += wwmq2 * swrTwoInch;
							break;
						case 'Com-3"':
							waterNonResTotal += wmq2 * wtrThreeInch;
							wasteWaterNonResTotal += wwmq2 * swrThreeInch;
							break;
						case 'Com-4"':
							waterNonResTotal += wmq2 * wtrFourInch;
							wasteWaterNonResTotal += wwmq2 * swrFourInch;
							break;
						case 'Com-6"':
							waterNonResTotal += wmq2 * wtrSixInch;
							wasteWaterNonResTotal += wwmq2 * swrSixInch;
							break;
						case 'Com-8"':
							waterNonResTotal += wmq2 * wtrEightInch;
							wasteWaterNonResTotal += wwmq2 * swrEightInch;
							break;
						default:
							// do nothing
					}
				}

				if (wwms3) {
					switch("" + wwms3) {
						case 'Com-3/4"':
							waterNonResTotal += wmq3 * wtrThreeQuarterInch;
							wasteWaterNonResTotal += wwmq3 * swrThreeQuarterInch;
							break;
						case 'Com-1"':
							waterNonResTotal += wmq3 * wtrOneInch;
							wasteWaterNonResTotal += wwmq3 * swrOneInch;
							break;
						case 'Com-1.5"':
							waterNonResTotal += wmq3 * wtrOneAndOneHalfInch;
							wasteWaterNonResTotal += wwmq3 * swrOneAndOneHalfInch;
							break;
						case 'Com-2"':
							waterNonResTotal += wmq3 * wtrTwoInch;
							wasteWaterNonResTotal += wwmq3 * swrTwoInch;
							break;
						case 'Com-3"':
							waterNonResTotal += wmq3 * wtrThreeInch;
							wasteWaterNonResTotal += wwmq3 * swrThreeInch;
							break;
						case 'Com-4"':
							waterNonResTotal += wmq3 * wtrFourInch;
							wasteWaterNonResTotal += wwmq3 * swrFourInch;
							break;
						case 'Com-6"':
							waterNonResTotal += wmq3 * wtrSixInch;
							wasteWaterNonResTotal += wwmq3 * swrSixInch;
							break;
						case 'Com-8"':
							waterNonResTotal += wmq3 * wtrEightInch;
							wasteWaterNonResTotal += wwmq3 * swrEightInch;
							break;
						default:
							// do nothing
					}
				}
				
				if (wwms4) {
					switch("" + wwms4) {
						case 'Com-3/4"':
							waterNonResTotal += wmq4 * wtrThreeQuarterInch;
							wasteWaterNonResTotal += wwmq4 * swrThreeQuarterInch;
							break;
						case 'Com-1"':
							waterNonResTotal += wmq4 * wtrOneInch;
							wasteWaterNonResTotal += wwmq4 * swrOneInch;
							break;
						case 'Com-1.5"':
							waterNonResTotal += wmq4 * wtrOneAndOneHalfInch;
							wasteWaterNonResTotal += wwmq4 * swrOneAndOneHalfInch;
							break;
						case 'Com-2"':
							waterNonResTotal += wmq4 * wtrTwoInch;
							wasteWaterNonResTotal += wwmq4 * swrTwoInch;
							break;
						case 'Com-3"':
							waterNonResTotal += wmq4 * wtrThreeInch;
							wasteWaterNonResTotal += wwmq4 * swrThreeInch;
							break;
						case 'Com-4"':
							waterNonResTotal += wmq4 * wtrFourInch;
							wasteWaterNonResTotal += wwmq4 * swrFourInch;
							break;
						case 'Com-6"':
							waterNonResTotal += wmq4 * wtrSixInch;
							wasteWaterNonResTotal += wwmq4 * swrSixInch;
							break;
						case 'Com-8"':
							waterNonResTotal += wmq4 * wtrEightInch;
							wasteWaterNonResTotal += wwmq4 * swrEightInch;
							break;
						default:
							// do nothing
					}
				}
			}
			
			/* Hotels/Motels (per room) */
			if (hotMot && !inAsuOrWaterArea) {
				if (wwms1) {
					switch("" + wwms1) {
						case 'Com-3/4"':
							waterHotMotTotal += wmq1 * wtrThreeQuarterInch;
							wasteWaterHotMotTotal += wwmq1 * swrThreeQuarterInch;
							break;
						case 'Com-1"':
							waterHotMotTotal += wmq1 * wtrOneInch;
							wasteWaterHotMotTotal += wwmq1 * swrOneInch;
							break;
						case 'Com-1.5"':
							waterHotMotTotal += wmq1 * wtrOneAndOneHalfInch;
							wasteWaterHotMotTotal += wwmq1 * swrOneAndOneHalfInch;
							break;
						case 'Com-2"':
							waterHotMotTotal += wmq1 * wtrTwoInch;
							wasteWaterHotMotTotal += wwmq1 * swrTwoInch;
							break;
						case 'Com-3"':
							waterHotMotTotal += wmq1 * wtrThreeInch;
							wasteWaterHotMotTotal += wwmq1 * swrThreeInch;
							break;
						case 'Com-4"':
							waterHotMotTotal += wmq1 * wtrFourInch;
							wasteWaterHotMotTotal += wwmq1 * swrFourInch;
							break;
						case 'Com-6"':
							waterHotMotTotal += wmq1 * wtrSixInch;
							wasteWaterHotMotTotal += wwmq1 * swrSixInch;
							break;
						case 'Com-8"':
							waterHotMotTotal += wmq1 * wtrEightInch;
							wasteWaterHotMotTotal += wwmq1 * swrEightInch;
							break;
						default:
							// do nothing
					}
				}
				
				if (wwms2) {
					switch("" + wwms2) {
						case 'Com-3/4"':
							waterHotMotTotal += wmq2 * wtrThreeQuarterInch;
							wasteWaterHotMotTotal += wwmq2 * swrThreeQuarterInch;
							break;
						case 'Com-1"':
							waterHotMotTotal += wmq2 * wtrOneInch;
							wasteWaterHotMotTotal += wwmq2 * swrOneInch;
							break;
						case 'Com-1.5"':
							waterHotMotTotal += wmq2 * wtrOneAndOneHalfInch;
							wasteWaterHotMotTotal += wwmq2 * swrOneAndOneHalfInch;
							break;
						case 'Com-2"':
							waterHotMotTotal += wmq2 * wtrTwoInch;
							wasteWaterHotMotTotal += wwmq2 * swrTwoInch;
							break;
						case 'Com-3"':
							waterHotMotTotal += wmq2 * wtrThreeInch;
							wasteWaterHotMotTotal += wwmq2 * swrThreeInch;
							break;
						case 'Com-4"':
							waterHotMotTotal += wmq2 * wtrFourInch;
							wasteWaterHotMotTotal += wwmq2 * swrFourInch;
							break;
						case 'Com-6"':
							waterHotMotTotal += wmq2 * wtrSixInch;
							wasteWaterHotMotTotal += wwmq2 * swrSixInch;
							break;
						case 'Com-8"':
							waterHotMotTotal += wmq2 * wtrEightInch;
							wasteWaterHotMotTotal += wwmq2 * swrEightInch;
							break;
						default:
							// do nothing
					}
				}
				
				if (wwms3) {
					switch("" + wwms3) {
						case 'Com-3/4"':
							waterHotMotTotal += wmq3 * wtrThreeQuarterInch;
							wasteWaterHotMotTotal += wwmq3 * swrThreeQuarterInch;
							break;
						case 'Com-1"':
							waterHotMotTotal += wmq3 * wtrOneInch;
							wasteWaterHotMotTotal += wwmq3 * swrOneInch;
							break;
						case 'Com-1.5"':
							waterHotMotTotal += wmq3 * wtrOneAndOneHalfInch;
							wasteWaterHotMotTotal += wwmq3 * swrOneAndOneHalfInch;
							break;
						case 'Com-2"':
							waterHotMotTotal += wmq3 * wtrTwoInch;
							wasteWaterHotMotTotal += wwmq3 * swrTwoInch;
							break;
						case 'Com-3"':
							waterHotMotTotal += wmq3 * wtrThreeInch;
							wasteWaterHotMotTotal += wwmq3 * swrThreeInch;
							break;
						case 'Com-4"':
							waterHotMotTotal += wmq3 * wtrFourInch;
							wasteWaterHotMotTotal += wwmq3 * swrFourInch;
							break;
						case 'Com-6"':
							waterHotMotTotal += wmq3 * wtrSixInch;
							wasteWaterHotMotTotal += wwmq3 * swrSixInch;
							break;
						case 'Com-8"':
							waterHotMotTotal += wmq3 * wtrEightInch;
							wasteWaterHotMotTotal += wwmq3 * swrEightInch;
							break;
						default:
							// do nothing
					}
				}
				
				if (wwms4) {
					switch("" + wwms4) {
						case 'Com-3/4"':
							waterHotMotTotal += wmq4 * wtrThreeQuarterInch;
							wasteWaterHotMotTotal += wwmq4 * swrThreeQuarterInch;
							break;
						case 'Com-1"':
							waterHotMotTotal += wmq4 * wtrOneInch;
							wasteWaterHotMotTotal += wwmq4 * swrOneInch;
							break;
						case 'Com-1.5"':
							waterHotMotTotal += wmq4 * wtrOneAndOneHalfInch;
							wasteWaterHotMotTotal += wwmq4 * swrOneAndOneHalfInch;
							break;
						case 'Com-2"':
							waterHotMotTotal += wmq4 * wtrTwoInch;
							wasteWaterHotMotTotal += wwmq4 * swrTwoInch;
							break;
						case 'Com-3"':
							waterHotMotTotal += wmq4 * wtrThreeInch;
							wasteWaterHotMotTotal += wwmq4 * swrThreeInch;
							break;
						case 'Com-4"':
							waterHotMotTotal += wmq4 * wtrFourInch;
							wasteWaterHotMotTotal += wwmq4 * swrFourInch;
							break;
						case 'Com-6"':
							waterHotMotTotal += wmq4 * wtrSixInch;
							wasteWaterHotMotTotal += wwmq4 * swrSixInch;
							break;
						case 'Com-8"':
							waterHotMotTotal += wmq4 * wtrEightInch;
							wasteWaterHotMotTotal += wwmq4 * swrEightInch;
							break;
						default:
							// do nothing
					}
				}
			}
			
			//============
			// log totals:
			//============
/*			
			logDebug("RDIF057: Water (Non-Residential) total: " + waterNonResTotal);
			logDebug("RDIF107: Wastewater (Non-Residential) total: " + wasteWaterNonResTotal);
			logDebug("RDIF055: Water (Hotel/Motel) total: " + waterHotMotTotal);
			logDebug("RDIF105: Water (Hotel/Motel) total: " + wasteWaterHotMotTotal);
*/			
			//===================================================================
			// All fee totals should be calculated by now - add them if necessary
			//===================================================================
			
			if (nonRes && !inAsuOrWaterArea) {			
				// Water - Non-Residential
				if (waterNonResTotal && waterNonResTotal > 0) {
					if (feeExists("RDIF057", "NEW", "INVOICED")) voidRemoveFee("RDIF057");
					addFee("RDIF057", "PMT_RDIF", "FINAL",  waterNonResTotal, "N");
				}
				// Waste Water - Non-Residential
				if (wasteWaterNonResTotal && wasteWaterNonResTotal > 0) {
					if (feeExists("RDIF107", "NEW", "INVOICED")) voidRemoveFee("RDIF107");
					addFee("RDIF107", "PMT_RDIF", "FINAL",  wasteWaterNonResTotal, "N");
				}
			}
			
			if (hotMot && !inAsuOrWaterArea) {
				// Water - Hotel/Motel
				if (waterHotMotTotal && waterHotMotTotal > 0) {
					if (feeExists("RDIF055", "NEW", "INVOICED")) voidRemoveFee("RDIF055");
					addFee("RDIF055", "PMT_RDIF", "FINAL",  waterHotMotTotal, "N");
				}
				// Waste Water - Hotel/Motel
				if (wasteWaterHotMotTotal && wasteWaterHotMotTotal) {
					if (feeExists("RDIF105", "NEW", "INVOICED")) voidRemoveFee("RDIF105");
					addFee("RDIF105", "PMT_RDIF", "FINAL",  wasteWaterHotMotTotal, "N");
				}
			}
			
			//logDebug("PMT_CommercialImpactFees - Fees successfully set!");
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
 