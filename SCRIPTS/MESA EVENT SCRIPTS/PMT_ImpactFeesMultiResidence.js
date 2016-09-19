/*===================================================================
 Versions:
 9/14/2016-A	John Cheney			initial
 9/19/2016-A	John Cheney			changed fee conditions, cancel only NEW, avoid changing if INVOICED
 ---------------------------------------------------------------------
 Script Number: 340
 Script Name: PMT_ImpactFeesMultiResidence.js
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

				/********* REV 1 *********** 
				// fire impact fee = (RDIF180, PMT_RDIF)
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
				************ END REV 1 **************/

				/************ REV 2 **************/

				var feeCount = 0;

				// fire impact fee = (RDIF180, PMT_RDIF)
				// remove existing fee with status NEW if found  
				if (feeExists("RDIF180", "NEW")) voidRemoveFee("RDIF180");
				// add fee unless one exists with status INVOICED
				if (!feeExists("RDIF180", "INVOICED")){
					addFee("RDIF180", "PMT_RDIF", "FINAL", units, "N");
					feeCount = feeCount + 1;
				} else {
					logDebug("PMT_ImpactFeesMultiResidence - Fee RDIF180 not set (a fee with status INVOICED already exists)");
				}
				
				
				// public safety fee = (RDIF230, PMT_RDIF) 
				// remove existing fee with status NEW if found
				if (feeExists("RDIF230", "NEW")) voidRemoveFee("RDIF230");
				// add fee unless one exists with status INVOICED
				if (!feeExists("RDIF230", "INVOICED")){
					addFee("RDIF230", "PMT_RDIF", "FINAL", units, "N");
					feeCount = feeCount + 1;
				} else {
					logDebug("PMT_ImpactFeesMultiResidence - Fee RDIF230 not set (a fee with status INVOICED already exists)");
				} 
				

				// solid waste fee = (RDIF330, PMT_RDIF)
				// remove existing fee with status NEW if found
				if (feeExists("RDIF330", "NEW")) voidRemoveFee("RDIF330");
				// add fee unless one exists with status INVOICED
				if (!feeExists("RDIF330", "INVOICED")){
					addFee("RDIF330", "PMT_RDIF", "FINAL", units, "N");
					feeCount = feeCount + 1;
				} else {
					logDebug("PMT_ImpactFeesMultiResidence - Fee RDIF330 not set (a fee with status INVOICED already exists)");
				}

				// waste water fee = (RDIF080, PMT_RDIF)
				// remove existing fee with status NEW if found
				if (feeExists("RDIF080", "NEW")) voidRemoveFee("RDIF080");
				// add fee unless one exists with status INVOICED
				if (!feeExists("RDIF080", "INVOICED")){
					addFee("RDIF080", "PMT_RDIF", "FINAL", units, "N");
					feeCount = feeCount + 1;
				} else {
					logDebug("PMT_ImpactFeesMultiResidence - Fee RDIF080 not set (a fee with status INVOICED already exists)");
				}

				// water fee  = (RDIF030, PMT_RDIF)
				// remove existing fee with status NEW if found
				if (feeExists("RDIF030", "NEW")) voidRemoveFee("RDIF030");
				// add fee if no water tag, and no fee exists with status INVOICED
				if(hasWaterTag == false && !feeExists("RDIF030", "INVOICED")){
					addFee("RDIF030", "PMT_RDIF", "FINAL", units, "N");
					feeCount = feeCount + 1;
				} else {
					logDebug("PMT_ImpactFeesMultiResidence - Fee RDIF030 not set - hasWaterTag = true or a fee with status INVOICED already exists");
				}

				// stormWater fee = (RDIF280, PMT_RDIF) 
				// remove existing fee with status NEW if found
				if (feeExists("RDIF280", "NEW")) voidRemoveFee("RDIF280");
				// add fee if have storm tag, and no fee exists with status INVOICED
				if(hasStormTag == true && !feeExists("RDIF280", "INVOICED")){
					addFee("RDIF280", "PMT_RDIF", "FINAL", units, "N");
					feeCount = feeCount + 1;
				} else {
					logDebug("PMT_ImpactFeesMultiResidence - Fee RDIF030 not set - hasStormTag = false or a fee with status INVOICED already exists");
				}

				logDebug("PMT_ImpactFeesMultiResidence - Set " + String(feeCount) + " fees.");
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