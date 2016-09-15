/*===================================================================
 Script Number: 340
 Script Name: PMT_ImpactFeesMultiResidence.js
 Script Developer: John Cheney
 Script Version: 9/14/2016-A
 Script Agency: Mesa
 Script Description:
   When Updating of IMPACT FEES ASI field "Classification" (a dropdown in ui) to 
   "Multiple-Family Residential (per dwelling unit)", add impact fees.	

   Add the fees when workflow task Permit Issuance is activated AND/OR – 
   on ApplicationSpecificInfoUpdateAfter ONLY IF workflow task Permit Issuance is activated.

   This script checks unit count and GIS coordinates, then removes / re-adds fees based on current values

Test records: BLD2015-06893, BLD2015-06384, BLD2015-05280, BLD2015-05278, BLD2015-05277
	(none of these have a Permit Issuance task and some have null for unit count .. otherwise were good for testing )


specs: https://portal.accelaops.com/projects/Mesa/Scripts%20Specs/340%20PMT%20Impact%20Fees%20–%20Multi-Residence.docx?web=1

Script run events: WTUA
Script Parents:  WTUA;Permits!Commercial!NA!NA

/*==================================================================*/

logDebug("---------- start  PMT_ImpactFeesMultiResidence ----------");
try {
	var isActive = isTaskActive("Permit Issuance");

	if(isActive && isActive == true ){
//	if(true == true ){

		// permit issuance task exists and is active, so ok to continue

        var classification = AInfo["Classification"];

        var hasWaterTag = false;
        var hasStormTag = false;
        var tagArray = getGISInfoArray("Accela/AccelaTAGS", "Accela_TAGS", "Accela_TAGS.TAG");
        if (tagArray && tagArray.length > 0) {
            for (tIndex in tagArray) {
                thisTag = tagArray[tIndex];
    //			logDebug(thisTag);
                if(matches(thisTag, "ASU", "ASUE", "AWCP")) hasWaterTag = true;
                if(matches(thisTag, "STOR")) hasStormTag = true;
            }
        }

        if (classification && classification == "Multiple-Family Residential (per dwelling unit)") {
			// correct classification..

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