/*===================================================================
// Script Number: 221
// Script Name: PMT_ImpactFeesSingleResidence.js
// Script Developer: Bryan de Jesus
// Script Agency: Woolpert
// Script Description: Updating of ASI dropdown value:
// When value of “Single Residence Attached)” chosen for ASI dropdown field “Classification”  
// Assess Single Residence  Detached Fees listed below:
// Water Impact Fee – Single Residence  Attached
// Waste Water Impact Fee  - Single Residence  Attached
// Parks Impact Fee  - Single Residence  Attached
// Fire Impact Fee  - Single Residence  Attached
// Public Safety Impact Fee  - Single Residence  Attached Storm Water Impact Fee  - Single Residence  Attached 
// Residential Development Impact Fee – Single Residence  Attached
// Script Run Event: ASA, ASIUA
// Script Parents:
//            ASA;Residential!NA!NA
//            ASIUA;Residential!NA!NA
/*==================================================================*/
showDebug = true;
try {
	var classification = AInfo["Classification"];
	if (!classification) logDebug("Classification not found. No impact fees assessed");
	else{
		var fireQty = AInfo["Fire"];
		var resDevQty = AInfo["Res. Dev. Tax"];
		var waterQty = AInfo["Water Meter Qty"];
		var publicSafetyQty = AInfo["Public Safety"];
		var stormWaterQty = AInfo["Stormwater"];
		var wasteWaterQty = AInfo["Waste Water Qty"]; 
		if (classification == "Single Family-Detached (per dwelling unit)"){
			// remove any fees from previous classification
			if (feeExists("RDIF170", "NEW", "INVOICED")) voidRemoveFee("RDIF170");
			if (feeExists("RDIF220", "NEW", "INVOICED")) voidRemoveFee("RDIF220");
			if (feeExists("RDIF270", "NEW", "INVOICED")) voidRemoveFee("RDIF270");
			if (feeExists("RDIF320", "NEW", "INVOICED")) voidRemoveFee("RDIF320");
			if (feeExists("RDIF020", "NEW", "INVOICED")) voidRemoveFee("RDIF020");
			if (feeExists("RDIF070", "NEW", "INVOICED")) voidRemoveFee("RDIF070");
			// if the fee qty has changed, void the fee
			if (feeExists("RDIF160", "NEW", "INVOICED") && feeQty("RDIF160") != fireQty) voidRemoveFee("RDIF160");
			if (feeExists("RDIF210", "NEW", "INVOICED") && feeQty("RDIF210") != publicSafetyQty) voidRemoveFee("RDIF210");
			if (feeExists("RDIF260", "NEW", "INVOICED") && feeQty("RDIF260") != stormWaterQty) voidRemoveFee("RDIF260");
			if (feeExists("RDIF310", "NEW", "INVOICED") && feeQty("RDIF310") != resDevQty) voidRemoveFee("RDIF310");
			if (feeExists("RDIF010", "NEW", "INVOICED") && feeQty("RDIF010") != waterQty) voidRemoveFee("RDIF010");
			if (feeExists("RDIF060", "NEW", "INVOICED") && feeQty("RDIF060") != wasteWaterQty) voidRemoveFee("RDIF060");
			// assess the fee
			if (!feeExists("RDIF160") && fireQty > 0) addFee("RDIF160", "PMT_RDIF", "FINAL", fireQty, "N");
			if (!feeExists("RDIF210") && publicSafetyQty > 0) addFee("RDIF210", "PMT_RDIF", "FINAL", publicSafetyQty, "N");
			if (!feeExists("RDIF260") && stormWaterQty > 0) addFee("RDIF260", "PMT_RDIF", "FINAL", stormWaterQty, "N");
			if (!feeExists("RDIF310") && resDevQty > 0) addFee("RDIF310", "PMT_RDIF", "FINAL", resDevQty, "N");
			if (!feeExists("RDIF010") && waterQty > 0) addFee("RDIF010", "PMT_RDIF", "FINAL", waterQty, "N");
			if (!feeExists("RDIF060") && wasteWaterQty > 0) addFee("RDIF060", "PMT_RDIF", "FINAL", wasteWaterQty, "N");
		} else if (classification == "Single Family-Attached (per dwelling unit)"){
			// remove any fees from previous classification
			if (feeExists("RDIF160", "NEW", "INVOICED")) voidRemoveFee("RDIF160");
			if (feeExists("RDIF210", "NEW", "INVOICED")) voidRemoveFee("RDIF210");
			if (feeExists("RDIF260", "NEW", "INVOICED")) voidRemoveFee("RDIF260");
			if (feeExists("RDIF310", "NEW", "INVOICED")) voidRemoveFee("RDIF310");
			if (feeExists("RDIF010", "NEW", "INVOICED")) voidRemoveFee("RDIF010");
			if (feeExists("RDIF060", "NEW", "INVOICED")) voidRemoveFee("RDIF060");			
			// if the fee qty has changed, void the fee
			if (feeExists("RDIF170", "NEW", "INVOICED") && feeQty("RDIF170") != fireQty) voidRemoveFee("RDIF170");
			if (feeExists("RDIF220", "NEW", "INVOICED") && feeQty("RDIF220") != publicSafetyQty) voidRemoveFee("RDIF220");
			if (feeExists("RDIF270", "NEW", "INVOICED") && feeQty("RDIF270") != stormWaterQty) voidRemoveFee("RDIF270");
			if (feeExists("RDIF320", "NEW", "INVOICED") && feeQty("RDIF320") != resDevQty) voidRemoveFee("RDIF320");
			if (feeExists("RDIF020", "NEW", "INVOICED") && feeQty("RDIF020") != waterQty) voidRemoveFee("RDIF020");
			if (feeExists("RDIF070", "NEW", "INVOICED") && feeQty("RDIF070") != wasteWaterQty) voidRemoveFee("RDIF070");
			// assess the fee
			if (!feeExists("RDIF170") && fireQty > 0) addFee("RDIF170", "PMT_RDIF", "FINAL", fireQty, "N");
			if (!feeExists("RDIF220") && publicSafetyQty > 0) addFee("RDIF220", "PMT_RDIF", "FINAL", publicSafetyQty, "N");
			if (!feeExists("RDIF270") && stormWaterQty > 0) addFee("RDIF270", "PMT_RDIF", "FINAL", stormWaterQty, "N");
			if (!feeExists("RDIF320") && resDevQty > 0) addFee("RDIF320", "PMT_RDIF", "FINAL", resDevQty, "N");
			if (!feeExists("RDIF020") && waterQty > 0) addFee("RDIF020", "PMT_RDIF", "FINAL", waterQty, "N");
			if (!feeExists("RDIF070") && wasteWaterQty > 0) addFee("RDIF070", "PMT_RDIF", "FINAL", wasteWaterQty, "N");
		}
	}
} catch (err){
	logDebug("A JavaScript Error occured: " + err.message);
}