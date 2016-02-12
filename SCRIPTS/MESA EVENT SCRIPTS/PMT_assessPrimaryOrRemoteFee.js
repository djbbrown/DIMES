/*===================================================================
// Script Number: 118
// Script Name: LIC_AssessLicenseFees.js
// Script Developer: Chris Godwin
// Script Agency: Woolpert
// Script Description: Assess Primary or Remote Site fee at App Submittal and when ASI is updated
// Script Run Event: ASIUA
// Script Parents:
//            ASIUA;Permits!Commercial!Annual Facilities!NA
/*==================================================================*/

function voidRemoveFee(vFeeCode){
	var feeSeqArray = new Array();
	var invoiceNbrArray = new Array();
	var feeAllocationArray = new Array();
	var itemCap = capId;
	if (arguments.length > 1){
		itemCap = arguments[1];
	}
	var targetFees = loadFees(itemCap);
	for (tFeeNum in targetFees){// for each fee found, if the fee is "NEW" remove it, if the fee is "INVOICED" void it and invoice the void
		targetFee = targetFees[tFeeNum];
		if (targetFee.code.equals(vFeeCode)){// only remove invoiced or new fees, however at this stage all AE fees should be invoiced.
			if (targetFee.status == "INVOICED"){
				var editResult = aa.finance.voidFeeItem(itemCap, targetFee.sequence);
				if (editResult.getSuccess()){
					logDebug("Voided existing Fee Item: " + targetFee.code);
				}
				else { 
					logDebug( "**ERROR: voiding fee item (" + targetFee.code + "): " + editResult.getErrorMessage());
					return false;
				}
				var feeSeqArray = new Array();
				var paymentPeriodArray = new Array();
				feeSeqArray.push(targetFee.sequence);
				paymentPeriodArray.push(targetFee.period);
				var invoiceResult_L = aa.finance.createInvoice(itemCap, feeSeqArray, paymentPeriodArray);
				if (!invoiceResult_L.getSuccess()){
					logDebug("**ERROR: Invoicing the fee items voided " + thisFee.code + " was not successful.  Reason: " +  invoiceResult_L.getErrorMessage());
					return false;
				}
			}
			if (targetFee.status == "NEW"){// delete the fee
				var editResult = aa.finance.removeFeeItem(itemCap, targetFee.sequence);
				if (editResult.getSuccess()){
					logDebug("Removed existing Fee Item: " + targetFee.code);
				}
				else {
					logDebug( "**ERROR: removing fee item (" + targetFee.code + "): " + editResult.getErrorMessage());
					return false;
				}
			}
		}
	}
}

if ({AFP Type} == "Primary") {
	if (!feeExists("AFP010")) addFee("AFP010","PMT_AFP","FINAL",1,"Y");
	if (feeExists("AFP020")) voidRemoveFee("AFP020");
}

if ({AFP Type} == "Remote") {
	if (!feeExists("AFP020")) addFee("AFP020","PMT_AFP","FINAL",1,"Y");
	if (feeExists("AFP010")) voidRemoveFee("AFP010");
}

if ({AFP Type} == "" || {AFP Type} == null) {
	if (feeExists("AFP010")) voidRemoveFee("AFP010");
	if (feeExists("AFP020")) voidRemoveFee("AFP020");
}