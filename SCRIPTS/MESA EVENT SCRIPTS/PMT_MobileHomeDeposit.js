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
var feeAmount = 0;

//type of work ASI different naming between Online and Residential records 
var typeOfWork = (AInfo["Type of Work"] != undefined) ? AInfo["Type of Work"] : AInfo["Type of work"]

// Residential Type of Work Check
// Mobile Home Type of Work Check
var mobileHome = ["Mobile Home Other Addition"];
// Online Type of Work Check.

// Get the value for the total number of inspections (ASI)
// this could be one of two ASI values so we need to be careful about this.
// tNumInsp += parseFloat(AInfo["Estimated Number of Inspections"]||0);
// tNumInsp += parseFloat(AInfo["Required No. of Inspections"]||0);
valuationASI += parseFloat(AInfo["Total Valuation"]||0); // This is on "Mobile Home" and "Residential/NA/NA"
// Get the Valuation as well (ASI)
if(valuationASI <25000){
	feeAmount = 170; // Base Fee
	//feeAmount = feeAmount + (90 * tNumInsp);
}
else if (valuationASI >= 25000 && valuationASI <=200000){
	feeAmount = 500;  // Base Fee
	//tNumInsp = Math.ceil((valuationASI - 25000)/1000);
	//feeAmount = feeAmount + (6*tNumInsp);
}
else if (valuationASI > 200000 && valuationASI <=500000){
	feeAmount = 1500;  // Base Fee
	//tNumInsp = Math.ceil((valuationASI - 200000)/1000);
	//feeAmount = feeAmount + (9*tNumInsp);
}
else if (valuationASI > 500000 && valuationASI <=2000000){
	feeAmount = 4000;  // Base Fee
	// tNumInsp = Math.ceil((valuationASI - 500000)/1000);
	//feeAmount = feeAmount + (6*tNumInsp);
}
else if (valuationASI > 2000000){
	feeAmount = 13000;  // Base Fee
	//tNumInsp = Math.ceil((valuationASI - 2000000)/1000);
	//feeAmount = feeAmount + (3*tNumInsp);
}

//==========================
// Process Fees
// Residential/NA/NA First
// Before the amount for Residential/NA/NA can be fully calculated we must
// get the amount that had been put on deposit and paid.
if(feeAmount > 0 && appTypeArray[2]=='NA' && exists(typeOfWork,mobileHome)){
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
	feeAmount = feeAmount - prePay;
	aa.print("Adding fee: "+feeAmount);
	addFee("RES060","PMT_RES", "FINAL",feeAmount, "N");
}