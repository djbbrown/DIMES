/*===================================================================
 Versions:
 9/15/2016-A	John Cheney			initial
 9/19/2016-A	John Cheney			changed fee conditions, cancel only NEW, avoid changing if INVOICED
 ---------------------------------------------------------------------
 Script Number: 336
 Script Name: PMT_MobileHomeWasteWaterImpactFee.js
 Script Developer: John Cheney
 Script Agency: Mesa
 Script Description:
    	
    Waste Water Impact Fee for Mobile Home

    When workflow task Permit Issuance is activated AND/OR – 
    on ApplicationSpecificInfoUpdateAfter ONLY IF workflow task Permit Issuance is activated, 
    then if ASI dropdown value for field “Water/Wastewater Meter Size x”  (x = 1-4) = ‘Res Units’ 
    and ASI Group Impact Fees, Field Name= “Classification”  = 
    either “Manufactured Home (on platted lot)“ or “Mfg. Home/Park Model/RV (per space or lot)” 
    then assess appropriate fee.

	This will result in cancelled fee if all the waste water meter quantities add up to 0.	

Test records: PMT16-00606, PMT16-00483


specs: https://portal.accelaops.com/projects/Mesa/Lists/Script%20Tracker/DispForm.aspx?ID=336&Source=https%3A%2F%2Fportal%2Eaccelaops%2Ecom%2Fprojects%2FMesa%2FLists%2FScript%2520Tracker%2Factive%2Easpx&ContentTypeId=0x010300D70AB462012E604593F2EB837FB5F3FD 

Script run events: WTUA
Script Parents:  WTUA;Permits!Residential!Mobile Home!NA

/*==================================================================*/

//logDebug("---------- start  PMT_MobileHomeWasteWaterImpactFee ----------");
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
				var meterQty = AInfo["Waste Water Qty 1"];
				if (meterType && meterType == "Res Units" && meterQty && Number(meterQty) > 0){
					meterQtyTotal = meterQtyTotal + Number(meterQty);
				}

				// check Meter 2
				meterType = AInfo["Water/Wastewater Meter Size 2"]; 
				meterQty = AInfo["Waste Water Qty 2"];
				if (meterType && meterType == "Res Units" && meterQty && Number(meterQty) > 0){
					meterQtyTotal = meterQtyTotal + Number(meterQty);
				}

				// check Meter 3
				meterType = AInfo["Water/Wastewater Meter Size 3"]; 
				meterQty = AInfo["Waste Water Qty 3"];
				if (meterType && meterType == "Res Units" && meterQty && Number(meterQty) > 0){
					meterQtyTotal = meterQtyTotal + Number(meterQty);
				}

				// check Meter 4
				meterType = AInfo["Water/Wastewater Meter Size 4"]; 
				meterQty = AInfo["Waste Water Qty 4"];
				if (meterType && meterType == "Res Units" && meterQty && Number(meterQty) > 0){
					meterQtyTotal = meterQtyTotal + Number(meterQty); 
				}

				// feeCode is based on classification
				var feeCode = "RDIF090";
				if (classification == "Mfg. Home/Park Model/RV (per space or lot)"){feeCode = "RDIF100";}

				// remove existing fee if found with status NEW
				if (feeExists(feeCode, "NEW")){
					voidRemoveFee(feeCode);
					logDebug("PMT_MobileHomeWaterImpactFee - Removed existing fee with status NEW");
				} 

				// any fee due?
				if(meterQtyTotal > 0){
					// yes, only add if an invoiced fee does not already exist 
					if (!feeExists(feeCode, "INVOICED") ){
						addFee(feeCode, "PMT_RDIF", "FINAL", meterQtyTotal, "N");
						logDebug("PMT_MobileHomeWaterImpactFee - Classification = " + classification + ".  Set fee with code = " + feeCode + " for meterQtyTotal = " + meterQtyTotal);
					} else {
						logDebug("PMT_MobileHomeWaterImpactFee - No Fee - Found an existing fee with status INVOICED");	
					}	
				} else {
					logDebug("PMT_MobileHomeWaterImpactFee - No Fee - meterQtyTotal = 0");		
				}
			} else {
				logDebug("PMT_MobileHomeWasteWaterImpactFee - No Action - Classification does not match criteria.");	
			}
		} else {
			logDebug("PMT_MobileHomeWasteWaterImpactFee - No Action - Classification is null.");
		}
	} else {
		logDebug("PMT_MobileHomeWasteWaterImpactFee - No Action - Permit Issuance task is null or not active.");
	}
} catch (err) {
	logDebug("A JavaScript Error occured in PMT_MobileHomeWasteWaterImpactFee: " + err.message);
	logDebug(err.stack);
}
//logDebug("---------- end  PMT_MobileHomeWasteWaterImpactFee ----------");