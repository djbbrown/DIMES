/*===================================================================
// Script Number: 221
// Script Name: PMT_ImpactFeesSingleResidence.js
// Script Developer: Bryan de Jesus
// Script Agency: Woolpert
// Script Description: Updating of ASI dropdown value:
// When value of "Single Residence Attached" chosen for ASI dropdown field "Classification"  
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
// 
// Notes: Added requirements from script 220 to check GIS on RDIF Detached Fees
/*==================================================================*/
try {
	if (isTaskActive("Permit Issuance")) {
	logDebug("Executing PMT_ImpactFeesSingleResidence.");
	var classification = AInfo["Classification"];
	var wmqGisTag = false;
	var swGisTag = false;
	tagFieldArray = getGISInfoArray("Accela/AccelaTAGS", "Accela_TAGS", "Accela_TAGS.TAG");
	if (tagFieldArray && tagFieldArray.length > 0) {
	   for (tIndex in tagFieldArray) {
			thisTag = tagFieldArray[tIndex];
//			logDebug(thisTag);
			if(matches(thisTag, "ASU", "ASUE", "AWCP")) wmqGisTag = true;
			if(matches(thisTag, "STOR")) swGisTag = true;
	   }
	}
	if (!classification) {
		logDebug("Classification not found. No impact fees assessed.");
		// remove any fees from previous classification
		if (feeExists("RDIF170", "NEW", "INVOICED")) voidRemoveFee("RDIF170");
		if (feeExists("RDIF220", "NEW", "INVOICED")) voidRemoveFee("RDIF220");
		if (feeExists("RDIF270", "NEW", "INVOICED")) voidRemoveFee("RDIF270");
		if (feeExists("RDIF320", "NEW", "INVOICED")) voidRemoveFee("RDIF320");
		if (feeExists("RDIF020", "NEW", "INVOICED")) voidRemoveFee("RDIF020");
		if (feeExists("RDIF070", "NEW", "INVOICED")) voidRemoveFee("RDIF070");
		if (feeExists("RDIF160", "NEW", "INVOICED")) voidRemoveFee("RDIF160");
		if (feeExists("RDIF210", "NEW", "INVOICED")) voidRemoveFee("RDIF210");
		if (feeExists("RDIF260", "NEW", "INVOICED")) voidRemoveFee("RDIF260");
		if (feeExists("RDIF310", "NEW", "INVOICED")) voidRemoveFee("RDIF310");
		if (feeExists("RDIF010", "NEW", "INVOICED")) voidRemoveFee("RDIF010");
		if (feeExists("RDIF060", "NEW", "INVOICED")) voidRemoveFee("RDIF060");
	}
	else{
		var fireQty = AInfo["Fire"];
		var resDevQty = AInfo["Solid Waste"];
		var waterQty = AInfo["Water Meter Qty"];
		var numberUnits = AInfo["Number of Units"];
		var publicSafetyQty = AInfo["Public Safety"];
		var stormWaterQty = AInfo["Stormwater"];
		var wasteWaterQty = AInfo["Waste Water Qty"]; 
		if (classification == "Single Family-Detached (per dwelling unit)"){
			// remove fees if GIS Tags change
			if (feeExists("RDIF260", "NEW", "INVOICED") && !swGisTag) voidRemoveFee("RDIF260");
			// remove any fees from previous classification
			if (feeExists("RDIF170", "NEW", "INVOICED")) voidRemoveFee("RDIF170");
			if (feeExists("RDIF220", "NEW", "INVOICED")) voidRemoveFee("RDIF220");
			if (feeExists("RDIF270", "NEW", "INVOICED")) voidRemoveFee("RDIF270");
			if (feeExists("RDIF320", "NEW", "INVOICED")) voidRemoveFee("RDIF320");
			
			if (feeExists("RDIF070", "NEW", "INVOICED")) voidRemoveFee("RDIF070");
			// if the fee qty has changed, void the fee
			if (feeExists("RDIF160", "NEW", "INVOICED") && (!fireQty || feeQty("RDIF160") != fireQty)) voidRemoveFee("RDIF160");
			if (feeExists("RDIF210", "NEW", "INVOICED") && (!publicSafetyQty || feeQty("RDIF210") != publicSafetyQty)) voidRemoveFee("RDIF210");
			if (feeExists("RDIF260", "NEW", "INVOICED") && (!stormWaterQty || feeQty("RDIF260") != stormWaterQty)) voidRemoveFee("RDIF260");
			if (feeExists("RDIF310", "NEW", "INVOICED") && (!resDevQty || feeQty("RDIF310") != resDevQty)) voidRemoveFee("RDIF310");
			
			if (feeExists("RDIF060", "NEW", "INVOICED") && (!wasteWaterQty || feeQty("RDIF060") != wasteWaterQty)) voidRemoveFee("RDIF060");
			// assess the fee
			if (!feeExists("RDIF160") && !!fireQty && fireQty > 0) addFee("RDIF160", "PMT_RDIF", "FINAL", fireQty, "N");
			if (!feeExists("RDIF210") && !!publicSafetyQty && publicSafetyQty > 0) addFee("RDIF210", "PMT_RDIF", "FINAL", publicSafetyQty, "N");
			if (!feeExists("RDIF260") && !!stormWaterQty && stormWaterQty > 0 && swGisTag ) addFee("RDIF260", "PMT_RDIF", "FINAL", stormWaterQty, "N");
			if (!feeExists("RDIF310") && !!resDevQty && resDevQty > 0) addFee("RDIF310", "PMT_RDIF", "FINAL", resDevQty, "N");
			
			if (!feeExists("RDIF060") && !!wasteWaterQty && wasteWaterQty > 0) addFee("RDIF060", "PMT_RDIF", "FINAL", wasteWaterQty, "N");
		}
		// Update for removing RDIF010 if it's not Singled Family Detached or Manufactured home.
		else if (classification == "Single Family-Detached (per dwelling unit)"
			|| classification == "Manufactured Home (on platted lot)"
		){
			if (feeExists("RDIF010", "NEW", "INVOICED") && wmqGisTag) voidRemoveFee("RDIF010");
			if (feeExists("RDIF010", "NEW", "INVOICED") && (!numberUnits || feeQty("RDIF010") != numberUnits)) voidRemoveFee("RDIF010");
			// Invoice/Add RDIF010 fee based on "Water Meter Qty"
			if (!feeExists("RDIF010") && !!numberUnits && numberUnits > 0 && !wmqGisTag) addFee("RDIF010", "PMT_RDIF", "FINAL", numberUnits, "N");
		}
		// Update for RDIF020 so that it can be multiple Classifications
		else if (classification == "Single Family-Attached (per dwelling unit)"
			|| classification == "Multiple-Family Residential (per dwelling unit)"
		){
			if (feeExists("RDIF020", "NEW", "INVOICED")) voidRemoveFee("RDIF020");
			if (feeExists("RDIF020", "NEW", "INVOICED") && (!numberUnits || feeQty("RDIF020") != numberUnits || wmqGisTag)) voidRemoveFee("RDIF020");
			if (!feeExists("RDIF020") && !!numberUnits && numberUnits > 0 && !wmqGisTag) addFee("RDIF020", "PMT_RDIF", "FINAL", numberUnits, "N");
		}
		// Update for removing RDIF040 if it's not Singled Family Detached or Manufactured home.
		else if (classification == "Single Family-Detached (per dwelling unit)"
			|| classification == "Manufactured Home (on platted lot)"
		){
			if (feeExists("RDIF040", "NEW", "INVOICED") && wmqGisTag) voidRemoveFee("RDIF040");
			if (feeExists("RDIF040", "NEW", "INVOICED") && (!numberUnits || feeQty("RDIF040") != numberUnits)) voidRemoveFee("RDIF040");
			// Invoice/Add RDIF010 fee based on "Water Meter Qty"
			if (!feeExists("RDIF040") && !!numberUnits && numberUnits > 0 && !wmqGisTag) addFee("RDIF040", "PMT_RDIF", "FINAL", numberUnits, "N");
		}
		else if (classification == "Single Family-Attached (per dwelling unit)"){
			// remove any fees from previous classification
			if (feeExists("RDIF160", "NEW", "INVOICED")) voidRemoveFee("RDIF160");
			if (feeExists("RDIF210", "NEW", "INVOICED")) voidRemoveFee("RDIF210");
			if (feeExists("RDIF260", "NEW", "INVOICED")) voidRemoveFee("RDIF260");
			if (feeExists("RDIF310", "NEW", "INVOICED")) voidRemoveFee("RDIF310");
			if (feeExists("RDIF060", "NEW", "INVOICED")) voidRemoveFee("RDIF060");			
			// if the fee qty has changed, void the fee
			if (feeExists("RDIF170", "NEW", "INVOICED") && (!fireQty || feeQty("RDIF170") != fireQty)) voidRemoveFee("RDIF170");
			if (feeExists("RDIF220", "NEW", "INVOICED") && (!publicSafetyQty || feeQty("RDIF220") != publicSafetyQty)) voidRemoveFee("RDIF220");
			if (feeExists("RDIF270", "NEW", "INVOICED") && (!stormWaterQty || feeQty("RDIF270") != stormWaterQty || !swGisTag)) voidRemoveFee("RDIF270");
			if (feeExists("RDIF320", "NEW", "INVOICED") && (!resDevQty || feeQty("RDIF320") != resDevQty)) voidRemoveFee("RDIF320");
			if (feeExists("RDIF070", "NEW", "INVOICED") && (!wasteWaterQty || feeQty("RDIF070") != wasteWaterQty)) voidRemoveFee("RDIF070");
			// assess the fee
			if (!feeExists("RDIF170") && !!fireQty && fireQty > 0) addFee("RDIF170", "PMT_RDIF", "FINAL", fireQty, "N");
			if (!feeExists("RDIF220") && !!publicSafetyQty && publicSafetyQty > 0) addFee("RDIF220", "PMT_RDIF", "FINAL", publicSafetyQty, "N");
			if (!feeExists("RDIF270") && !!stormWaterQty && stormWaterQty > 0 && swGisTag) addFee("RDIF270", "PMT_RDIF", "FINAL", stormWaterQty, "N");
			if (!feeExists("RDIF320") && !!resDevQty && resDevQty > 0) addFee("RDIF320", "PMT_RDIF", "FINAL", resDevQty, "N");
			if (!feeExists("RDIF070") && !!wasteWaterQty && wasteWaterQty > 0) addFee("RDIF070", "PMT_RDIF", "FINAL", wasteWaterQty, "N");
		} else {
			// remove any fees from previous classification
			if (feeExists("RDIF170", "NEW", "INVOICED")) voidRemoveFee("RDIF170");
			if (feeExists("RDIF220", "NEW", "INVOICED")) voidRemoveFee("RDIF220");
			if (feeExists("RDIF270", "NEW", "INVOICED")) voidRemoveFee("RDIF270");
			if (feeExists("RDIF320", "NEW", "INVOICED")) voidRemoveFee("RDIF320");
			if (feeExists("RDIF020", "NEW", "INVOICED")) voidRemoveFee("RDIF020");
			if (feeExists("RDIF070", "NEW", "INVOICED")) voidRemoveFee("RDIF070");
			if (feeExists("RDIF160", "NEW", "INVOICED")) voidRemoveFee("RDIF160");
			if (feeExists("RDIF210", "NEW", "INVOICED")) voidRemoveFee("RDIF210");
			if (feeExists("RDIF260", "NEW", "INVOICED")) voidRemoveFee("RDIF260");
			if (feeExists("RDIF310", "NEW", "INVOICED")) voidRemoveFee("RDIF310");
			if (feeExists("RDIF010", "NEW", "INVOICED")) voidRemoveFee("RDIF010");
			if (feeExists("RDIF060", "NEW", "INVOICED")) voidRemoveFee("RDIF060");
		}
	}
	}
} catch (err){
	logDebug("A JavaScript Error occured in PMT_ImpactFeesSingleResidence: " + err.message);
	logDebug(err.stack);
}