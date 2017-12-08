/*===================================================================
// Script Number: 096
// Script Name: PMT_AssessResidentialBuildingPermitFee
// Script Developer: Kevin Ford
// Script Agency: Accela
// Script Description: 
// Script Run Event: WTUA
// Script Parents:
// 	WUTA:Permits!Residential!~!~
// 	WTUA:Permits!Online!~!~
//
===================================================================*/

// Under this line create the function that will need to run at script runtime.
// the function will be called in the event ("AppSubmitAfter") major event.
var tNumInsp = 0;
var valuationASI = 0;
var feeAmt = 0;

//type of work ASI different naming between Online and Residential records 
var typeOfWork = (AInfo["Type of Work"] != undefined) ? AInfo["Type of Work"] : AInfo["Type of work"]

// Residential Type of Work Check
var residential = ["Single Family (Detached)", "Single Family (Attached)", "Two-Family Duplex", "Guesthouse",
                   "Remodeling With Addition", "Renovations/Remodels", "Additions", "Garage/Carport", "Non-Structural",
                   "Fire Sprinklers", "Fire Alarms", "Mechanical", "Plumbing", "Electrical", "Storage Shed/Barn"];
// Mobile Home Type of Work Check
var mobileHome = ["Mobile Home Other Addition", "Park Model Other Addition"];
// Online Type of Work Check.
var Online = ["Residential Electrical 200a or smaller", "Residential Electrical Repair (Like for Like)", "Residential Gas Pressure","Residential Gas Line Repair/Replace"];
if(appTypeArray[1]=='Online' && wfTask == "Application Submittal" && wfStatus == "Ready To Issue" && exists(typeOfWork,Online))
{
	// Get the value for the total number of inspections
	tNumInsp = parseFloat(AInfo["Required Number of Inspections"]);
	addFee("ONL010","PMT_ONL", "FINAL",  tNumInsp, "N");
}
else if (appTypeArray[1] == 'Residential' && ((wfTask == "Plans Coordination" && matches(wfStatus, "Ready to Issue","Self Certified")) 
		|| (wfTask == "Application Submittal" && matches(wfStatus, "Accepted - Plan Review Not Req")))){
	// Get the value for the total number of inspections (ASI)
	// this could be one of two ASI values so we need to be careful about this.
	// tNumInsp += parseFloat(AInfo["Estimated Number of Inspections"]||0);
	// tNumInsp += parseFloat(AInfo["Required No. of Inspections"]||0);
	valuationASI += parseFloat(AInfo["Total Valuation"]||0); // This is on "Mobile Home" and "Residential/NA/NA"
	// valuationASI = estValue|calcValue;
	// Get the Valuation as well (ASI)
	/*
	if(valuationASI <25000){
		feeAmt = 90; // Base Fee
		feeAmt = feeAmt + (90 * tNumInsp);
	}
	//*/
	
	if (AInfo["Type of work"] == "Remodeling With Addition"){
		valuationASI = valuationASI + estValue;
	}
		
	if (valuationASI >= 25000 && valuationASI <=200000){
		feeAmt = 500;  // Base Fee
		tNumInsp = Math.ceil((valuationASI - 25000)/1000);
		feeAmt = feeAmt + (6*tNumInsp);
	}
	else if (valuationASI > 200000 && valuationASI <=500000){
		feeAmt = 1550;  // Base Fee
		tNumInsp = Math.ceil((valuationASI - 200000)/1000);
		feeAmt = feeAmt + (9*tNumInsp);
	}
	else if (valuationASI > 500000 && valuationASI <=2000000){
		feeAmt = 4250;  // Base Fee
		tNumInsp = Math.ceil((valuationASI - 500000)/1000);
		feeAmt = feeAmt + (6*tNumInsp);
	}
	else if (valuationASI > 2000000){
		feeAmt = 13250;  // Base Fee
		tNumInsp = Math.ceil((valuationASI - 2000000)/1000);
		feeAmt = feeAmt + (3*tNumInsp);
	}
	//==========================
	// Process Fees
	// Residential/NA/NA First
	// Before the amount for Residential/NA/NA can be fully calculated we must
	// get the amount that had been put on deposit and paid.
	if(feeAmt > 0 && appTypeArray[2]=='NA' && exists(typeOfWork,residential)){
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
			if(varFSched == "PMT_RES" && varFCod =="RES010" && varFStatus == "INVOICED"){
				prePay = prePay + varFAmnt;
			}
		}
		// Calculate the difference
		feeAmt = feeAmt - prePay;
		aa.print("Adding fee: "+feeAmt);
		updateFee("RES060","PMT_RES", "FINAL",feeAmt, "N");
	}
	else if (feeAmt > 0 && appTypeArray[2]=='Mobile Home' && exists(typeOfWork,mobileHome)){
		//find amount already paid
		var prePayMH = 0;
		var feeAdjAmt = 0;
		prePayMH = feeAmount("MH185","NEW","INVOICED");
		feeAdjAmt = feeAmt - prePayMH;
		aa.print("Adding fee: "+feeAdjAmt);
		updateFee("MH180", "PMT_MOBILE HOME", "FINAL",feeAdjAmt, "N");
	}
	// Assess the Expedited Premium
	// Expedite Fee
	if(AInfo["Expedite"]=="Expedite" && appTypeArray[2]=='NA'){
		// Get the amount that was on the deposit and then reduce the fee.
		prePay = feeAmount("RES180","NEW","INVOICED");
		//fTotal = getSubGrpFeeAmt("EXP","","RES190") - prePay;
		fTotal = getSubGrpFeeAmt("EXP","","RES190");
		//removeFee("RES190", "FINAL");
		// Add the extra fee for expedite
		updateFee("RES190", "PMT_RES", "FINAL", fTotal, "N");
	}
	// Super Expedite Fee
	if(AInfo["Expedite"]=="Super Expedite" && appTypeArray[2]=='NA'){
		// Get the amount that was on the deposit and then reduce the fee.
		prePay = feeAmount("RES200","NEW","INVOICED");
		//fTotal = getSubGrpFeeAmt("SEXP","","RES210") - prePay;
		fTotal = getSubGrpFeeAmt("SEXP","","RES210");
		//removeFee("RES210", "FINAL");
		// Add the extra fee for expedite
		updateFee("RES210", "PMT_RES", "FINAL", fTotal, "N");
	}
	
}