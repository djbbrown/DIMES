/*===================================================================
// Script Number: 
// Script Name: Commercial Fees
// Script Developer: Kevin Ford
// Script Agency: Accela
// Script Description: 
// Script Run Event: Workflow Task Update After
// Script Parents:
//		WTUA;Permits!Commercial!NA!NA.js 
//      //WTUA;Permits!Commercial!Annual Facilities!NA.js  Removed on 5/11/2017 by Steve Allred       
//********************************************************************
//Version  Date      Engineer          Description
// 1.0               Kevin Ford        Initial Release
// 1.1     05/11/17  Steve Allred      Modified criteria for Annual Facilities child permit
/*==================================================================*/
// Get the Classification
var classOfWork = (AInfo["Classification Type"] != undefined) ? AInfo["Classification Type"] : AInfo["Classification Type"];
// Get the total number of inspections on the record.

//Walls/Fences
if(
		(wfTask == "Application Submittal" && wfStatus == "Accepted - Plan Review Not Req")
		|| (wfTask == "Plans Coordination" && wfStatus == "Ready to Issue")
) {
	if (classOfWork && classOfWork =='Walls/Fences') {
		if (feeExists("COM320", "NEW", "INVOICED")){voidRemoveFee("COM320");}
		addFee("COM320", "PMT_COM","FINAL", 1, "N");
	}
	if(classOfWork && classOfWork !='Walls/Fences' && feeExists("COM320", "NEW", "INVOICED")){
		voidRemoveFee("COM320");
	}
}

// Construction Storage Unit
// Get the Type of Work
//type of work ASI different naming between Online and Residential records 
if(
	(wfTask == "Application Submittal" && wfStatus == "Accepted - Plan Review Not Req")
	|| (wfTask == "Plans Coordination" && wfStatus == "Ready to Issue")
) {
	if (classOfWork && classOfWork =='Portable Storage Containers') {
		if (feeExists("COM570", "NEW", "INVOICED")){voidRemoveFee("COM570");}
		addFee("COM570", "PMT_COM","FINAL", 1, "N");
	}
	if(classOfWork && classOfWork !='Portable Storage Containers' && feeExists("COM570", "NEW", "INVOICED")){
		voidRemoveFee("COM570");
	}
}

// Annual Facilities permit child record which is a Permits/Commercial/NA/NA
if (parentCapId.customID != "undefined" && parentCapId.customID != null) { 

	if (parentCapId.customID.substring(0,3) == "AFP") {

		if (wfTask == "Inspections" && wfStatus == "Finaled - C of C Required") {

			// get inspection hours
			inspHours = totalInspHours();
			logDebug("Inpsection hours: "+inspHours);
			// add hourly fee 
			if (feeExists("COM270", "NEW", "INVOICED")) {voidRemoveFee("COM270");}

			if (inspHours > 0) {addFee("COM270", "PMT_COM","FINAL", inspHours, "N");}

			if (!inspHours && feeExists("COM270", "NEW", "INVOICED")) {voidRemoveFee("COM270");}

		}
	}
}

//Script for pages fee COM030
try {
	if(
		(wfTask == "Application Submittal" && wfStatus == "Accepted - Plan Review Not Req")
		|| (wfTask == "Plans Coordination" && wfStatus == "Ready to Issue")
	) {
		// Count up the sheets from the ASIT
		pRInfoTable = loadASITable("PLAN REVIEW INFORMATION");
		var totalSheets = 0;
		totalSheets += sumASITColumn(
			pRInfoTable, // Table that is going to be looked at
			"Number of Civil Engineering Sheets", // Column to be summed
			"INCLUDE", // Include the following
			"Type of Civil Engineering Sheets", // Look in this column for items to include.
			// List of items to include.
			"Onsite Landscaping Plans and Details",
			"Civil Cover Sheet",
			"Cover Sheets",
			"Single Public Utility Plan/Profiles",
			"Utility Plan/Profiles",
			"Grading/Site Plans and Details",
			"R-O-W Landscaping Plans and Details",
			"Street Lighting/Traffic Signal Plans and Details",
			"Street Improvement Plan/Profiles and Details",
			"Combination Street Improvement and Utility Plan/Profiles and Details",
			"Dual Public Utility Plan/Profiles and Details"
			);
		// Get the amount that had previously been charged.
		resSheetDep = feeAmount("COM020","NEW","INVOICED");
		
		// Multiply Actual Number of sheets by the fee 390 and subtract the resSheetDep
		feeLessDep = (totalSheets * 390) - resSheetDep;
		
		if (feeExists("COM030", "NEW", "INVOICED")) {
			voidRemoveFee("COM030");
		}
		if(feeLessDep > 0) {
			addFee("COM030", "PMT_COM","FINAL", feeLessDep, "N");
		}
		
		if(!totalSheets > 0 && feeExists("COM030", "NEW", "INVOICED")){
			voidRemoveFee("COM030");
		}
	}
}
catch (err) {
	aa.print("A JavaScript Error occurred: " + err.message);
}
// Script for pages fees COM033
try {
	if(
		(wfTask == "Application Submittal" && wfStatus == "Accepted - Plan Review Not Req")
		|| (wfTask == "Plans Coordination" && wfStatus == "Ready to Issue")
	) {
		// Count up the sheets from the ASIT
		pRInfoTable = loadASITable("PLAN REVIEW INFORMATION");
		var totalSheets = 0;
		totalSheets += sumASITColumn(
			pRInfoTable, // Table that is going to be looked at
			"Number of Civil Engineering Sheets", // Column to be summed
			"INCLUDE", // Include the following
			"Type of Civil Engineering Sheets", // Look in this column for items to include.
			// List of items to include.
			"Combination Street Improvement and Utility Plan/Profiles and Details"
			);
		// Get the amount that had previously been charged.
		//resSheetDep = feeAmount("RES020","NEW","INVOICED");
		
		// Multiply Actual Number of sheets by the fee 390 and subtract the resSheetDep
		// feeLessDep = (totalSheets * 390) - resSheetDep
		
		if (feeExists("COM033", "NEW", "INVOICED")) {
			voidRemoveFee("COM033");
		}
		addFee("COM033", "PMT_COM","FINAL", totalSheets, "N");
		
		if(!totalSheets > 0 && feeExists("COM033", "NEW", "INVOICED")){
			voidRemoveFee("COM033");
		}
	}
}
catch (err) {
	aa.print("A JavaScript Error occurred: " + err.message);
}
// Script for pages fees COM036
try {
	if(
		(wfTask == "Application Submittal" && wfStatus == "Accepted - Plan Review Not Req")
		|| (wfTask == "Plans Coordination" && wfStatus == "Ready to Issue")
	) {
		// Count up the sheets from the ASIT
		pRInfoTable = loadASITable("PLAN REVIEW INFORMATION");
		var totalSheets = 0;
		totalSheets += sumASITColumn(
			pRInfoTable, // Table that is going to be looked at
			"Number of Civil Engineering Sheets", // Column to be summed
			"INCLUDE", // Include the following
			"Type of Civil Engineering Sheets", // Look in this column for items to include.
			// List of items to include.
			"Civil Cover Sheet",
			"Cover Sheets",
			"Single Public Utility Plan/Profiles",
			"Utility Plan/Profiles",
			"Grading/Site Plans and Details",
			"R-O-W Landscaping Plans and Details",
			"Street Lighting/Traffic Signal Plans and Details",
			"Street Improvement Plan/Profiles and Details",
			"Dual Public Utility Plan/Profiles and Details",
			"Commercial Civil Without Drawings"
			);
		
		if (feeExists("COM036", "NEW", "INVOICED")) {
			voidRemoveFee("COM036");
		}
		addFee("COM036", "PMT_COM","FINAL", totalSheets, "N");
	
		if(!totalSheets > 0 && feeExists("COM036", "NEW", "INVOICED")){
			voidRemoveFee("COM036");
		}
	}
}
catch (err) {
	aa.print("A JavaScript Error occurred: " + err.message);
}

// COM040 Tenant Improvement
var valuation = 0;
if (
	appTypeArray[1] == 'Commercial' && AInfo["Property Type"] == "Tenant Improvement"
	&& (
		(wfTask == "Plans Coordination" && matches(wfStatus, "Ready to Issue","Self Certified")) 
		|| (wfTask == "Application Submittal" && matches(wfStatus, "Accepted - Plan Review Not Req"))
	)
){
	feeAmt = 0;
	// Get the value for the total number of inspections (ASI)
	// this could be one of two ASI values so we need to be careful about this.
	// tNumInsp += parseFloat(AInfo["Estimated Number of Inspections"]||0);
	// tNumInsp += parseFloat(AInfo["Required No. of Inspections"]||0);
	valuation = estValue; // Tenant Improvement uses the Job Value from the addtl info section
	// Get the Valuation as well (ASI)
	/*
	if(valuation <25000){
		feeAmt = 90; // Base Fee
		feeAmt = feeAmt + (90 * tNumInsp);
	}
	//*/
	if (valuation >= 25000 && valuation <=500000){
		feeAmt = 500;  // Base Fee
		tNumInsp = Math.ceil((valuation - 25000)/1000);
		feeAmt = feeAmt + (10*tNumInsp);
	}
	else if (valuation > 500000 && valuation <=1000000){
		feeAmt = 5250;  // Base Fee
		tNumInsp = Math.ceil((valuation - 500000)/1000);
		feeAmt = feeAmt + (5*tNumInsp);
	}
	else if (valuation > 1000000 && valuation <=5000000){
		feeAmt = 7750;  // Base Fee
		tNumInsp = Math.ceil((valuation - 1000000)/1000);
		feeAmt = feeAmt + (4*tNumInsp);
	}
	else if (valuation > 5000000 && valuation <=10000000){
		feeAmt = 23750;  // Base Fee
		tNumInsp = Math.ceil((valuation - 5000000)/1000);
		feeAmt = feeAmt + (2*tNumInsp);
	}
	else if (valuation > 10000000){
		feeAmt = 33750;  // Base Fee
		tNumInsp = Math.ceil((valuation - 10000000)/1000);
		feeAmt = feeAmt + (1*tNumInsp);
	}
	//==========================
	// Process Fees
	// Residential/NA/NA First
	// Before the amount for Residential/NA/NA can be fully calculated we must
	// get the amount that had been put on deposit and paid.
	if(
		feeAmt > 0
		&& appTypeArray[2]=='NA'
		//&& exists(typeOfWork,residential)
	){
		//addFee(fcode, fsched, fperiod, fqty, finvoice)
		var prePay = 0;
		// Get all feeitems on the record
		var feeResult=aa.fee.getFeeItems(capId);
		if (feeResult.getSuccess())
			{ var feeObjArr = feeResult.getOutput(); }
		else
			{ logDebug( "**ERROR: getting fee items: " + capContResult.getErrorMessage());}
		// Parse each fee item.
		for (i in feeObjArr){
			feeItem = feeObjArr[i];
			varFCod = feeItem.getFeeCod();
			varFSched = feeItem.getF4FeeItemModel().getFeeSchudle();
			varFAmnt = feeItem.getFee();
			varFStatus = feeItem.getFeeitemStatus();
			if(varFSched == "PMT_COM" && varFCod =="COM010" && varFStatus == "INVOICED"){
				prePay = prePay + varFAmnt;
			}
		}
		// Calculate the difference
		logDebug("Fee prior to reducing based on deposit: "+feeAmt);
		logDebug("Deposit: "+prePay);
		feeAmt = feeAmt - prePay;
		aa.print("Adding fee: "+feeAmt);
		updateFee("COM040","PMT_COM", "FINAL",feeAmt, "N");
	}
}

// COM040 Commercial
var valuationASI = 0;
if (
	appTypeArray[1] == 'Commercial' && AInfo["Property Type"] == "Commercial"
	&& (
		(wfTask == "Plans Coordination" && matches(wfStatus, "Ready to Issue","Self Certified")) 
		|| (wfTask == "Application Submittal" && matches(wfStatus, "Accepted - Plan Review Not Req"))
	)
){
	feeAmt = 0;
	// Get the value for the total number of inspections (ASI)
	// this could be one of two ASI values so we need to be careful about this.
	// tNumInsp += parseFloat(AInfo["Estimated Number of Inspections"]||0);
	// tNumInsp += parseFloat(AInfo["Required No. of Inspections"]||0);
	valuationASI = parseFloat(AInfo["Total Valuation"]||0); // This is on "Mobile Home" and "Residential/NA/NA"
	// Get the Valuation as well (ASI)
	/*
	if(valuationASI <25000){
		feeAmt = 90; // Base Fee
		feeAmt = feeAmt + (90 * tNumInsp);
	}
	//*/
	if (valuationASI >= 25000 && valuationASI <=500000){
		feeAmt = 500;  // Base Fee
		tNumInsp = Math.ceil((valuationASI - 25000)/1000);
		feeAmt = feeAmt + (10*tNumInsp);
	}
	else if (valuationASI > 500000 && valuationASI <=1000000){
		feeAmt = 5250;  // Base Fee
		tNumInsp = Math.ceil((valuationASI - 500000)/1000);
		feeAmt = feeAmt + (5*tNumInsp);
	}
	else if (valuationASI > 1000000 && valuationASI <=5000000){
		feeAmt = 7750;  // Base Fee
		tNumInsp = Math.ceil((valuationASI - 1000000)/1000);
		feeAmt = feeAmt + (4*tNumInsp);
	}
	else if (valuationASI > 5000000 && valuationASI <=10000000){
		feeAmt = 23750;  // Base Fee
		tNumInsp = Math.ceil((valuationASI - 5000000)/1000);
		feeAmt = feeAmt + (2*tNumInsp);
	}
	else if (valuationASI > 10000000){
		feeAmt = 33750;  // Base Fee
		tNumInsp = Math.ceil((valuationASI - 10000000)/1000);
		feeAmt = feeAmt + (1*tNumInsp);
	}
	//==========================
	// Process Fees
	// Residential/NA/NA First
	// Before the amount for Residential/NA/NA can be fully calculated we must
	// get the amount that had been put on deposit and paid.
	if(
		feeAmt > 0
		&& appTypeArray[2]=='NA'
		//&& exists(typeOfWork,residential)
	){
		//addFee(fcode, fsched, fperiod, fqty, finvoice)
		var prePay = 0;
		// Get all feeitems on the record
		var feeResult=aa.fee.getFeeItems(capId);
		if (feeResult.getSuccess())
			{ var feeObjArr = feeResult.getOutput(); }
		else
			{ logDebug( "**ERROR: getting fee items: " + capContResult.getErrorMessage());}
		// Parse each fee item.
		for (i in feeObjArr){
			feeItem = feeObjArr[i];
			varFCod = feeItem.getFeeCod();
			varFSched = feeItem.getF4FeeItemModel().getFeeSchudle();
			varFAmnt = feeItem.getFee();
			varFStatus = feeItem.getFeeitemStatus();
			if(varFSched == "PMT_COM" && varFCod =="COM010" && varFStatus == "INVOICED"){
				prePay = prePay + varFAmnt;
			}
		}
		// Calculate the difference
		logDebug("Fee prior to reducing based on deposit: "+feeAmt);
		logDebug("Deposit: "+prePay);
		feeAmt = feeAmt - prePay;
		aa.print("Adding fee: "+feeAmt);
		updateFee("COM040","PMT_COM", "FINAL",feeAmt, "N");
	}
}
//COM050 - Commercial Inspection Fee
try {
	var tNumInsp = 0;
	var valuationASI = 0;
	if(
		(wfTask == "Application Submittal" && wfStatus == "Accepted - Plan Review Not Req")
		|| (wfTask == "Plans Coordination" && wfStatus == "Ready to Issue")
	) {
		tNumInsp += parseFloat(AInfo["Estimated Number of Inspections"]||0);
		// tNumInsp += parseFloat(AInfo["Required No. of Inspections"]||0);
		logDebug(tNumInsp);
		valuationASI += parseFloat(AInfo["Total Valuation"]||0); // This is on "Mobile Home" and "Residential/NA/NA"
		// handle the Tenant Improvement
		if (AInfo['Property Type'] == 'Tenant Improvement'){
			valuationASI = estValue|calcValue;
		}
		if(valuationASI < 25000){
			if (feeExists("COM050", "NEW", "INVOICED")) {
				voidRemoveFee("COM050");
			}
			if (tNumInsp > 0){
				// Get the amount that had previously been charged.
				commDep = feeAmount("COM010","NEW","INVOICED");
				tNumInsp = 90+(tNumInsp*90) - commDep;
				addFee("COM050", "PMT_COM","FINAL", tNumInsp, "N");
			}
			if(!tNumInsp > 0 && feeExists("COM050", "NEW", "INVOICED")){
				voidRemoveFee("COM050");
			}
		}
	}
}
catch (err) {
	aa.print("A JavaScript Error occurred: " + err.message);
}
	
// COM120
if(
	(wfTask == "Application Submittal" && wfStatus == "Accepted - Plan Review Not Req")
	|| (wfTask == "Plans Coordination" && wfStatus == "Ready to Issue")
	|| (parentCapId.customID != "undefined" && parentCapId.customID != null && 
	    parentCapId.customID.substring(0,3) == "AFP" && wfTask == "Inspections" && 
		wfStatus == "Finaled - C of C Required")
) {
		if (feeExists("COM120", "NEW", "INVOICED")) voidRemoveFee("COM120");
		updateFee("COM120", "PMT_COM","FINAL", 1, "N");
}

if (
		(wfTask == "Plans Coordination" && matches(wfStatus, "Ready to Issue","Self Certified")) 
		|| (wfTask == "Application Submittal" && matches(wfStatus, "Accepted - Plan Review Not Req"))
){
	// Assess the Expedited Premium
	// Expedite Fee
	if(AInfo["Expedite"]=="Expedite"){
		// Get the amount that was on the deposit and then reduce the fee.
		prePay = feeAmount("COM150","NEW","INVOICED");
		fTotal = getSubGrpFeeAmt("EXP","","COM155") - prePay;
		removeFee("COM155", "FINAL");
		// Add the extra fee for expedite
		updateFee("COM155", "PMT_COM", "FINAL", fTotal, "N");
	}
	// Super Expedite Fee
	if(AInfo["Expedite"]=="Super Expedite"){
		// Get the amount that was on the deposit and then reduce the fee.
		prePay = feeAmount("COM160","NEW","INVOICED");
		fTotal = getSubGrpFeeAmt("SEXP","","COM165") - prePay;
		removeFee("COM165", "FINAL");
		// Add the extra fee for expedite
		updateFee("COM165", "PMT_COM", "FINAL", fTotal, "N");
	}
}