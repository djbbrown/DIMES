/*===========================================

Title : getSubGrpFeeAmt

Purpose : Get the sum of fees for fee's belonging to a subgroup.

Author : Emmett Wylan

Functional Area : Fees

Description : This function gets the amount that has been charged on fees within a subgroup, this is particularly useful when fees can belog to multiple groups, the SG fee calculations don't always workout, this function fixes that. Note that an extra function is needed to support this function and since the function can be used in other locations it has not been included in this function.

Required extra function "isStrInArry.js"

Reviewed By : 

Script Type : EMSE

General Purpose/Client Specific : General Purpose

Client developed for : N/A

Parameters : subGrp

=========================================== */
function getSubGrpFeeAmt(subGrp){
/*---------------------------------------------------------------------------------------------------------/
| Function Intent: 
|              This function is intended to return the total fee amount for all "NEW" or "INVOICED" fees on 
|              the record that have the sub group configured. This can be used to apply surcharges where multiple 
|              subgroups exist and the SG-Percentage fee type will not work.
|
| Call Example 1 (Return total fee amount regardless of fee status for the "DEQ" subgroup):
|              getSubGrpFeeAmt("DEQ");
|
| Call Example 2 (Return total fee amount of NEW fees with the "DEQ" subgroup):
|              getSubGrpFeeAmt("DEQ","NEW")
|
| Call Example 3 (Return total fee amount of NEW fees with the "DEQ" subgroup excluding the "B_SEP_310" fee.):
|              getSubGrpFeeAmt("DEQ","NEW","B_SEP_310")
|
| Call Example 4 (Return total fee amount of all fees with the "DEQ" subgroup excluding the "B_SEP_310" fee.):
|              getSubGrpFeeAmt("DEQ","","B_SEP_310")
|
| 05/15/2012 - Ewylam
|              Version 1 Created
|
| Required paramaters in order:
|              subGrp - String - the subgroup that will be used to return the fee amounts
|
| Optional paramaters:
|              spStatus - String - The status of fees to return. NEW, CREDITED, INVOICED, VOIDED
|              excludedFeeCode - Array - the fee code of any fee to exclude from the returned amount
|	              
/----------------------------------------------------------------------------------------------------------*/

	//Check for a specific status to use, optional argument 1
	var spStatus = "";
	if (arguments.length > 1) {spStatus = arguments[1];}
	
	//Check for a specific FeeCode to exclude, optional argument 2
	var excludedFeeCode = new Array();
	if (arguments.length > 2) 
	    {
			for (var i=2; i<arguments.length; i++)
			excludedFeeCode.push(arguments[i]);
	    }
	
	var runFeeTot;
	var feeA;
	var thisFeeSubGrp;
	var thisFeeSubGrpAry;
	var x;
	
	if (spStatus !== "") {
		logDebug("Getting total fees for Sub Group: " + subGrp + "; Having a status of: " + spStatus);
		runFeeTot = 0;
		feeA = loadFees();
		for (x in feeA)    {
			thisFee = feeA[x];
			if (thisFee.subGroup !== null) {
				thisFeeSubGrp = thisFee.subGroup;
				thisFeeSubGrpAry = thisFeeSubGrp.split(",");
				if (IsStrInArry(subGrp,thisFeeSubGrpAry) && (thisFee.status == spStatus)){
					//Check to see if fee should be excluded, if not then count it.
					if (IsStrInArry(thisFee.code,excludedFeeCode)) {
						logDebug("Fee " + thisFee.code + " found with sub group: " + thisFee.subGroup + "; Amount: " + thisFee.amount + "; Status: " + thisFee.status);
						logDebug("Fee " + thisFee.code + " is excluded from the Running Total: " + runFeeTot);
					}
					//excludedFeeCode is not specified, so count all
					else {
						logDebug("Fee " + thisFee.code + " found with sub group: " + thisFee.subGroup + "; Amount: " + thisFee.amount + "; Status: " + thisFee.status );
						runFeeTot = runFeeTot + thisFee.amount;
						logDebug("Fee: " + thisFee.code + " added to the running total. Running Total: " + runFeeTot);
					}
				}
			}
		}
	}
	else {
		logDebug("Getting total fees for Sub Group: " + subGrp + "; Having a status of INVOICED or NEW.");
		runFeeTot = 0;
		feeA = loadFees();
		for (x in feeA)    {
			thisFee = feeA[x];
			if (thisFee.subGroup !== null) {
				thisFeeSubGrp = thisFee.subGroup;
				thisFeeSubGrpAry = thisFeeSubGrp.split(",");
				if (IsStrInArry(subGrp,thisFeeSubGrpAry) && (thisFee.status == "INVOICED" || thisFee.status == "NEW")) {
					if (IsStrInArry(thisFee.code,excludedFeeCode)) {
						logDebug("Fee " + thisFee.code + " found with sub group: " + thisFee.subGroup + "; Amount: " + thisFee.amount + "; Status: " + thisFee.status );
						logDebug("Fee " + thisFee.code + " is excluded from the Running Total: " + runFeeTot);
					}
					//excludedFeeCode is not specified, so count all
					else {
						logDebug("Fee " + thisFee.code + " found with sub group: " + thisFee.subGroup + "; Amount: " + thisFee.amount + "; Status: " + thisFee.status );
						runFeeTot = runFeeTot + thisFee.amount;
						logDebug("Fee: " + thisFee.code + " added to the running total. Running Total: " + runFeeTot);
					}
				}
			}
		}
	}
	logDebug("Final returned amount: " + runFeeTot);
	return (runFeeTot);
}