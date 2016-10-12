/*===================================================================
// Script Number: TBD
// Script Name: PMT_MobileHomeAssessStorageEnclosureFee
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: 
// Script Run Event: WTUA
// Script Parents:
// 	FAA:Permits!Residential!Mobile Home!~
//
===================================================================*/

// Under this line create the function that will need to run at script runtime.
// the function will be called in the event ("AppSubmitAfter") major event.
var tNumInsp = 0;
var valuationASI = 0;
var feeAmt = 0;

if (appTypeArray[2] == 'Mobile Home') {	
	// Get the value for the total number of inspections (ASI)
	// this could be one of two ASI values so we need to be careful about this.
	tNumInsp += parseFloat(AInfo["Required No. of Inspections"]||0);
	valuationASI += parseFloat(AInfo["Total Valuation"]||0); // This is on "Mobile Home" and "Residential/NA/NA"
	// Get the Valuation as well (ASI)
	if(valuationASI <25000){
		feeAmt = 90; // Base Fee
		feeAmt = feeAmt + (90 * tNumInsp);
	}
	else if (valuationASI >= 25000 && valuationASI <=200000){
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
	if (feeAmt > 0){
		aa.print("Adding fee: "+feeAmt);
		updateFee("MH070", "PMT_MOBILE HOME", "FINAL",feeAmt, "N");
	}
}