//*===================================================================
//
// Script Name: getUnpaidFeeBalance.js 
// Script Developer: Vance Smith
// Script Agency: City of Mesa
// Script Description:  
//		returns the total of all unpaid fees on a record.
// 
//==================================================================*/

function getUnpaidFeeBalance() { // optional capId
	// Searches payment fee items and returns the unpaid balance of a fee item
	// Sums fee items if more than one exists.  
	var amtFee = 0;
	var amtPaid = 0;
	var feeSch;
    var thisCapId;

	if (arguments.length == 1)
    {
		thisCapId = arguments[0];
    }
    else {
        thisCapId = capId;
    }

	var feeResult = aa.fee.getFeeItems(thisCapId);

	if (feeResult.getSuccess()) 
    {
		var feeObjArr = feeResult.getOutput();
	} 
    else 
    {
		logDebug("**ERROR: getting fee items: " + capContResult.getErrorMessage());
		return false
	}

	for (ff in feeObjArr)
    {
		if (feeObjArr[ff].getFeeitemStatus() != "INVOICED" ) {
			amtFee += feeObjArr[ff].getFee();
			var pfResult = aa.finance.getPaymentFeeItems(thisCapId, null);
			if (pfResult.getSuccess()) {
				var pfObj = pfResult.getOutput();
				for (ij in pfObj)
                {
					if (feeObjArr[ff].getFeeSeqNbr() == pfObj[ij].getFeeSeqNbr())
                    {
						amtPaid += pfObj[ij].getFeeAllocation()
                    }
                }
			}
		}
    }
	return amtFee - amtPaid;
}

function getUnpaidFeeBalance() { // optional capId
	// Searches payment fee items and returns the unpaid balance of a fee item
	// Sums fee items if more than one exists.  
	var amtFee = 0;
	var amtPaid = 0;
	var feeSch;
    var thisCapId;

	if (arguments.length == 1)
    {
		thisCapId = arguments[0];
    }
    else {
        thisCapId = capId;
    }

	var feeResult = aa.fee.getFeeItems(thisCapId);

	if (feeResult.getSuccess()) 
    {
		var feeObjArr = feeResult.getOutput();
	} 
    else 
    {
		logDebug("**ERROR: getting fee items: " + capContResult.getErrorMessage());
		return false
	}

	for (ff in feeObjArr)
    {
		if (feeObjArr[ff].getFeeitemStatus() != "INVOICED" ) {
			amtFee += feeObjArr[ff].getFee();
			var pfResult = aa.finance.getPaymentFeeItems(thisCapId, null);
			if (pfResult.getSuccess()) {
				var pfObj = pfResult.getOutput();
				for (ij in pfObj)
                {
					if (feeObjArr[ff].getFeeSeqNbr() == pfObj[ij].getFeeSeqNbr())
                    {
						amtPaid += pfObj[ij].getFeeAllocation()
                    }
                }
			}
		}
    }
	return amtFee - amtPaid;
}