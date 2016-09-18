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

/* test with PMT16-00599 */

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
        var hasWaterTag = false; // parcel in ASU or AZ Water area? (i.e. has an 'ASU', 'ASUE', 'AWCP' tag)
        var hasStormTag = false;

        var tagArray = getGISInfoArray("Accela/AccelaTAGS", "Accela_TAGS", "Accela_TAGS.TAG");
        if (tagArray && tagArray.length > 0) {
            for (tIndex in tagArray) {
                thisTag = tagArray[tIndex];
                if(matches(thisTag, "ASU", "ASUE", "AWCP")) hasWaterTag = true;
                if(matches(thisTag, "STOR")) hasStormTag = true;
            }
        }

        if (classification && matches(classification, "Non-Residential (per sq ft)", "Hotels/Motels (per room)") {
			
			// my junk here
			
			//==========================================================
			// Commercial Fire, Public Safety and Stormwater Impact Fees
			//==========================================================
			
			//////////////////////////
			var fcv = ?????; // Fee Calc Variable - TBD?
			//////////////////////////
			
			/* Non-Residential (per sq ft) */
			if (nonRes) {
				if (fire && fire > 0) {
					// assess Fire fee.
					if (feeExists("RDIF207", "NEW", "INVOICED")) voidRemoveFee("RDIF207");
					addFee("RDIF207", "PMT_RDIF", "FINAL", fire * fcv, "N");
				}
				
				if (pubSaf && pubSaf > 0) {
					// assess Public Safety fee.
					if (feeExists("RDIF257", "NEW", "INVOICED")) voidRemoveFee("RDIF257");
					addFee("RDIF257", "PMT_RDIF", "FINAL",  pubSaf * fcv, "N");
				}
				
				if (hasStormTag && (storm && storm > 0)) {
					// assess Stormwater fee.
					if (feeExists("RDIF307", "NEW", "INVOICED")) voidRemoveFee("RDIF307");
					addFee("RDIF307", "PMT_RDIF", "FINAL",  storm * fcv, "N");
				}
			}
			
			/* Hotels/Motels (per room) */
			if (hotMot) {
				if (fire && fire > 0) {
					// assess Fire fee.
					if (feeExists("RDIF205", "NEW", "INVOICED")) voidRemoveFee("RDIF205");
					addFee("RDIF205", "PMT_RDIF", "FINAL",  fire * fcv, "N");
				}
				
				if (pubSaf && pubSaf > 0) {
					// assess Public Safety fee.
					if (feeExists("RDIF255", "NEW", "INVOICED")) voidRemoveFee("RDIF255");
					addFee("RDIF255", "PMT_RDIF", "FINAL",  pubSaf * fcv, "N");
				}
				
				if (hasStormTag && (storm && storm > 0)) {
					// assess Stormwater fee.
					if (feeExists("RDIF305", "NEW", "INVOICED")) voidRemoveFee("RDIF305");
					addFee("RDIF305", "PMT_RDIF", "FINAL",  storm * fcv, "N");
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
		
			/* Non-Residential (per sq ft) */
			if (nonRes && !hasWaterTag) {
				//if (matches(
			}
			
			/* Hotels/Motels (per room) */
			if (hotMot && !hasWaterTag) {
				if (wmq1 && wmq1 > 0) {
					switch("" + wwms1) {
						case "Com-3/4":
							// assess fee: "RDIF055", "Water - Hotel/Motel", wmq1 * 2220
							// assess fee: "RDIF105", "Waste Water - Hotel/Motel", wmq1 * 2659
							break;
						case "Com-1":
							// assess fee: "RDIF044
					}
			}
			
			
			
			
			
			
			
			
			
			
			//=========================
			// John's stuff below here.
			//=========================
			// fire impact fee = (RDIF180, PMT_RDIF) - remove existing if found and add correct fee
			if (feeExists("RDIF180", "NEW", "INVOICED")) voidRemoveFee("RDIF180");
			addFee("RDIF180", "PMT_RDIF", "FINAL", units, "N");
			
			// public safety fee = (RDIF230, PMT_RDIF)  - remove existing if found and add correct fee
			if (feeExists("RDIF230", "NEW", "INVOICED")) voidRemoveFee("RDIF230");
			addFee("RDIF230", "PMT_RDIF", "FINAL", units, "N");

			// solid waste fee = (RDIF330, PMT_RDIF)  - remove existing if found and add correct fee
			if (feeExists("RDIF330", "NEW", "INVOICED")) voidRemoveFee("RDIF330");
			addFee("RDIF330", "PMT_RDIF", "FINAL", units, "N");

			// waste water fee = (RDIF080, PMT_RDIF) - remove existing if found and add correct fee
			if (feeExists("RDIF080", "NEW", "INVOICED")) voidRemoveFee("RDIF080");
			addFee("RDIF080", "PMT_RDIF", "FINAL", units, "N");

			// water fee  = (RDIF030, PMT_RDIF) - remove existing if found and add correct fee if no waterTag found 
			if (feeExists("RDIF030", "NEW", "INVOICED")) voidRemoveFee("RDIF030");
			if(hasWaterTag == false){
				addFee("RDIF030", "PMT_RDIF", "FINAL", units, "N");
			}

			// stormWater fee = (RDIF280, PMT_RDIF) - remove existing if found and add correct fee if found stormTag
			if (feeExists("RDIF280", "NEW", "INVOICED")) voidRemoveFee("RDIF280");
			if(hasStormTag == true){
				addFee("RDIF280", "PMT_RDIF", "FINAL", units, "N");
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
 
function clobber(
 