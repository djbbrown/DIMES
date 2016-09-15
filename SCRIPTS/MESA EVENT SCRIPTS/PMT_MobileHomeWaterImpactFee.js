/*===================================================================
 Versions:
 9/15/2016-A	John Cheney			initial
 9/15/2016-B	John Cheney			fixed field Water/Wastewater Meter Size 1 (added space before 1)
 ---------------------------------------------------------------------
 Script Number: 335
 Script Name: PMT_MobileHomeWaterImpactFee.js
 Script Developer: John Cheney
 Script Agency: Mesa
 Script Description:
   
   Water Impact Fee for Mobile Home

 	When workflow task Permit Issuance is activated AND/OR – 
	 on ApplicationSpecificInfoUpdateAfter ONLY IF workflow task Permit Issuance is activated, 
	 then if ASI dropdown value for field “Water/Wastewater Meter Size x” (x = 1-4) = 
	 ‘Res Units’ and ASI Group Impact Fees, Field Name= “Classification”  = 
	 either “Manufactured Home (on platted lot)“ or “Mfg. Home/Park Model/RV (per space or lot)” 
	 then assess appropriate fee.  
	 This will result in cancelled fee if all the water meter quantities add up to 0.

Test records: PMT16-00606, PMT16-00483 

specs: https://portal.accelaops.com/projects/Mesa/Lists/Script%20Tracker/DispForm.aspx?ID=335&Source=https%3A%2F%2Fportal%2Eaccelaops%2Ecom%2Fprojects%2FMesa%2FLists%2FScript%2520Tracker%2Factive%2Easpx&ContentTypeId=0x010300D70AB462012E604593F2EB837FB5F3FD 

Script run events: WTUA
Script Parents:  WTUA;Permits!Residential!Mobile Home!NA

/*==================================================================*/

logDebug("---------- start  PMT_MobileHomeWaterImpactFee ----------");
try {
	var isActive = isTaskActive("Permit Issuance");

	if(isActive && isActive == true ){
		// permit issuance task exists and is active, so ok to continue
        var classification = AInfo["Classification"];

		if (classification){
			// classification was found, so ok to continue
			
			if (classification == "Manufactured Home (on platted lot)" 
				|| classification == "Mfg. Home/Park Model/RV (per space or lot)") {
				// found one of the two cases .. data collection is same for both

				var meterQtyTotal = 0;

				// check Meter 1
				var meterType = AInfo["Water/Wastewater Meter Size 1"]; 
				var meterQty = AInfo["Water Meter Qty 1"];
				if (meterType && meterType == "Res Units" && meterQty && Number(meterQty) > 0){
					meterQtyTotal = meterQtyTotal + Number(meterQty);
				}

				// check Meter 2
				meterType = AInfo["Water/Wastewater Meter Size 2"]; 
				meterQty = AInfo["Water Meter Qty 2"];
				if (meterType && meterType == "Res Units" && meterQty && Number(meterQty) > 0){
					meterQtyTotal = meterQtyTotal + Number(meterQty);
					logDebug("- meter2 inside.."); 
				}

				// check Meter 3
				meterType = AInfo["Water/Wastewater Meter Size 3"]; 
				meterQty = AInfo["Water Meter Qty 3"];
				if (meterType && meterType == "Res Units" && meterQty && Number(meterQty) > 0){
					meterQtyTotal = meterQtyTotal + Number(meterQty); 
				}

				// check Meter 4
				meterType = AInfo["Water/Wastewater Meter Size 4"]; 
				meterQty = AInfo["Water Meter Qty 4"];
				if (meterType && meterType == "Res Units" && meterQty && Number(meterQty) > 0){
					meterQtyTotal = meterQtyTotal + Number(meterQty); 
				}

				// feeCode is based on classification
				var feeCode = "RDIF040";
				if (classification == "Mfg. Home/Park Model/RV (per space or lot)"){feeCode = "RDIF050";}

				// cancel existing fee (if found)
				if (feeExists(feeCode, "NEW", "INVOICED")) voidRemoveFee(feeCode);

				// set new fee if there is a fee to assess
				if (meterQtyTotal > 0){
					addFee(feeCode, "PMT_RDIF", "FINAL", meterQtyTotal, "N");
				}

				logDebug("PMT_MobileHomeWaterImpactFee - Classification = " + classification + ", set fee with code = " + feeCode + " for meterQtyTotal = " + meterQtyTotal);
			} else {
				logDebug("PMT_MobileHomeWaterImpactFee - No Action - Classification does not match either condition.");	
			}

		} else {
			logDebug("PMT_MobileHomeWaterImpactFee - No Action - Classification is null.");
		}
	} else {
		logDebug("PMT_MobileHomeWaterImpactFee - No Action - Permit Issuance task is null or not active.");
	}
} catch (err) {
	logDebug("A JavaScript Error occured in PMT_MobileHomeWaterImpactFee: " + err.message);
	logDebug(err.stack);
}
logDebug("---------- end  PMT_MobileHomeWaterImpactFee ----------");