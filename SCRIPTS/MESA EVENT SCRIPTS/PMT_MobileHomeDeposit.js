/*===================================================================
// Script Number: 096
// Script Name: PMT_MobileHomeDeposit
// Script Developer: Kevin Ford
// Script Agency: Accela
// Script Description: 
// Script Run Event: ASA
// Script Parents:
// 	ASA:Permits!Residential!Mobile Home!~
// 
//
===================================================================*/
try {
	// Under this line create the function that will need to run at script runtime.
	// the function will be called in the event ("AppSubmitAfter") major event.
	var tNumInsp = 0;
	var valuationASI = 0;
	var feeAmount = 0;

	//type of work ASI different naming between Online and Residential records 
	var typeOfWork = (AInfo["Type of Work"] != undefined) ? AInfo["Type of Work"] : AInfo["Type of work"]

	// Residential Type of Work Check
	// Mobile Home Type of Work Check
	var mobileHome = ["Mobile Home Other Addition"];
	// Online Type of Work Check.

	//feeAmount = parseFloat(AInfo["Total Valuation"]||0);  //this is not updated during App submittal
	feeAmount = estValue;

	//==========================
	// Process Fees
	// Residential/NA/NA First
	// Before the amount for Residential/NA/NA can be fully calculated we must
	// get the amount that had been put on deposit and paid.
	if(feeAmount > 0 && appTypeArray[2]=='Mobile Home' && exists(typeOfWork,mobileHome)){
		// Calculate the difference
		feeAmount = Number(feeAmount);
		aa.print("Adding fee: "+feeAmount);
		updateFee("MH185","PMT_MOBILE HOME", "FINAL",feeAmount, "Y");
	}
}
catch (err) {
	aa.print("A JavaScript Error occurred: " + err.message);
}