/*===================================================================
// Script Number: 220
// Script Name: PMT Impact Fees – Single Residence Detached
// Script Developer: Chris Godwin
// Script Agency: Woolpert
// Script Description: When value of “Single Family-Detached (per dwelling unit)” chosen for ASIT dropdown field “Classification” in ASIT subgroup “IMPACT FEES” and a value > 0 is entered into ASIT fields listed below, assess the corresponding fees using the value in the ASIT field to calculate the correct fee value
// Script Run Event: WorkflowTaskUpdateAfter
// Script Parents:
//            WTUA;Permits!Residential!NA!NA
===================================================================*/

// Under this line create the function that will need to run at script runtime.
// the function will be called in the event ("WorkflowTaskUpdateAfter") major event.

if(AInfo["Classification"] == "Single Family-Detached (per dwelling unit)"){
	var wmqGisTag = false;
	var swGisTag = false;
	tagFieldArray = getGISInfoArray("Accela/AccelaTAGS", "Accela_TAGS", "Accela_TAGS.TAG");
	if (tagFieldArray && tagFieldArray.length > 0) {
	   for (tIndex in tagFieldArray) {
			thisTag = tagFieldArray[tIndex];
			logDebug(thisTag);
			if(matches(thisTag, "ASU", "ASUE", "AWCP")) wmqGisTag = true;
			if(matches(thisTag, "STOR")) swGisTag = true;
	   }
	}
	if(AInfo["Water Meter Qty"] > 0 && wmqGisTag == false){
		var aQty = AInfo["Water Meter Qty"];
		updateFee("RDIF010", "PMT_RDIF", "Final", aQty, "N");
	}else if(feeExists("RDIF010", "NEW", "INVOICED")) voidRemoveFee("RDIF010");
	if(AInfo["Waste Water Qty"] > 0){
		var aQty = AInfo["Waste Water Qty"];
		updateFee("RDIF060", "PMT_RDIF", "Final", aQty, "N");
	}else if(feeExists("RDIF060", "NEW", "INVOICED")) voidRemoveFee("RDIF060");
	if(AInfo["Fire"] > 0){
		var aQty = AInfo["Fire"];
		updateFee("RDIF160", "PMT_RDIF", "Final", aQty, "N");
	}else if(feeExists("RDIF160", "NEW", "INVOICED")) voidRemoveFee("RDIF160");
	if(AInfo["Public Safety"] > 0){
		var aQty = AInfo["Public Safety"];
		updateFee("RDIF210", "PMT_RDIF", "Final", aQty, "N");
	}else if(feeExists("RDIF210", "NEW", "INVOICED")) voidRemoveFee("RDIF210");
	if(AInfo["Stormwater"] > 0 && swGisTag == false){
		var aQty = AInfo["Stormwater"];
		updateFee("RDIF260", "PMT_RDIF", "Final", aQty, "N");
	}else if(feeExists("RDIF260", "NEW", "INVOICED")) voidRemoveFee("RDIF260");
	if(AInfo["Solid Waste"] > 0){
		var aQty = AInfo["Solid Waste"];
		updateFee("RDIF310", "PMT_RDIF", "Final", aQty, "N");
	}else if(feeExists("RDIF310", "NEW", "INVOICED")) voidRemoveFee("RDIF310");
}else if(AInfo["Classification"] != "Single Family-Detached (per dwelling unit)"){
	if(feeExists("RDIF010", "NEW", "INVOICED")) voidRemoveFee("RDIF010");
	if(feeExists("RDIF060", "NEW", "INVOICED")) voidRemoveFee("RDIF060");
	if(feeExists("RDIF160", "NEW", "INVOICED")) voidRemoveFee("RDIF160");
	if(feeExists("RDIF210", "NEW", "INVOICED")) voidRemoveFee("RDIF210");
	if(feeExists("RDIF260", "NEW", "INVOICED")) voidRemoveFee("RDIF260");
	if(feeExists("RDIF310", "NEW", "INVOICED")) voidRemoveFee("RDIF310");
}