/*===================================================================
 Script Number: 340
 Script Name: PMT_ImpactFeesMultiResidence.js
 Script Developer: John Cheney
 Script Agency: Mesa
 Script Description:
   When Updating of IMPACT FEES ASI field "Classification" (a dropdown in ui) to 
   "Multiple-Family Residential (per dwelling unit)", add impact fees.	

specs: https://portal.accelaops.com/projects/Mesa/Scripts%20Specs/340%20PMT%20Impact%20Fees%20–%20Multi-Residence.docx?web=1

Script run event: ASIUA (ASA too?)
Script Parents:  ASIUA;Permits!Commercial!NA!NA  (ASA too?)

/*==================================================================*/

logDebug("---------- start  PMT_ImpactFeesMultiResidence ----------");
try {

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
            
            logDebug("Classification found!");

            var units = AInfo["Number of Units"];

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
            
        }else {
            logDebug("Classification not found.");
        }
	

    } catch (err){
	logDebug("A JavaScript Error occured in PMT_ImpactFeesMultiResidence: " + err.message);
	logDebug(err.stack);
}
logDebug("---------- end  PMT_ImpactFeesMultiResidence ----------");