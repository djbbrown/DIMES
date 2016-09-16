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

        var classification = AInfo["Classification"];

        var hasWaterTag = false;
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

            var units = AInfo["Number of Units"];

			if (units && units > 1){
				
				// two more more units.. can now get to work!

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

				logDebug("PMT_ImpactFeesMultiResidence - Fees successfully set!");
			} else{
				logDebug("PMT_ImpactFeesMultiResidence - No Action - Number of Units is null or < 2.");	
			}
        }else {
            logDebug("PMT_ImpactFeesMultiResidence - No Action - Classification not found.");
        }
	} else {
		logDebug("PMT_ImpactFeesMultiResidence - No Action - Permit Issuance task is null or not active.");
	}

} catch (err) {
	logDebug("A JavaScript Error occured in PMT_ImpactFeesMultiResidence: " + err.message);
	logDebug(err.stack);
}
logDebug("---------- end  PMT_ImpactFeesMultiResidence ----------");
 

 