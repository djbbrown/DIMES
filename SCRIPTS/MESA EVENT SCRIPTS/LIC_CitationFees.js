/*===================================================================
// Script Number: 200
// Script Name: 200 Lic Citation Fees
// Script Developer: Kevin Ford
// Script Agency: Accela
// Script Description:
// Script Run Event: 
// Script Parents:
//		ASIUA;Licensing!General!MassageEstablishment!License
===================================================================*/

// Under this line create the function that will need to run at script runtime.
// the function will be called in the event ("AppSubmitAfter") major event.
function feeAdjust(fCnt,asitCnt,fCode) {
	fCnt.sort().reverse(); // Sort the fee items in reverse sequence number so that most recent is voided first
	// The following would show that we need to remove a fee
	if(fCnt.length > asitCnt) {
		remFees = fCnt.length - asitCnt;
		for (fL = 0; fL < remFees; fL++){
			voidRemoveFees_bySequence(fCnt[fL]);
		}
	};
	// The following would show that we need to add a fee
	if (fCnt.length < asitCnt){
		addFees = asitCnt - fCnt.length;
		for(fL = 0; fL < addFees; fL++){
			addFee(fCode,"LIC_PASS","FINAL",1,"Y");
			logDebug("Adding " +fCode+" fee.");
		}
	};
	if(fCnt.length == asitCnt) {
		logDebug("No fee adjustment needed for "+fCode);
	};
}
function voidRemoveFees_bySequence(vFeeCode)
{
	//logDebug("Starting voidRemoveFees_bySequence");
	var feeSeqArray = new Array();
	var invoiceNbrArray = new Array();
	var feeAllocationArray = new Array();
	var itemCap = capId;
	if (arguments.length > 1)
		itemCap = arguments[1];
	recalcFees = getAppSpecific("Recalc Fees");
	if (recalcFees == "No") { 
		logDebug("Not updating fees because ASI field Recalc Fees is no");
		return;
	}  
	// for each fee found
	//  	  if the fee is "NEW" remove it
	//  	  if the fee is "INVOICED" void it and invoice the void
	//
	var targetFees = loadFees(itemCap);
	for (tFeeNum in targetFees)
		{
		targetFee = targetFees[tFeeNum];
		//if (targetFee.code.equals(vFeeCode))
		if (targetFee.sequence == vFeeCode)
			{
			// only remove invoiced or new fees, however at this stage all AE fees should be invoiced.
			if (targetFee.status == "INVOICED")
				{
				var editResult = aa.finance.voidFeeItem(itemCap, targetFee.sequence); // Void Fee
				// Error or success if the fee has been voided.
				if (editResult.getSuccess())
					logDebug("Voided existing Fee Item: " + targetFee.code);
				else
					{ logDebug( "**ERROR: voiding fee item (" + targetFee.code + "): " + editResult.getErrorMessage()); return false; }
				
				var feeSeqArray = new Array();
				var paymentPeriodArray = new Array();
				feeSeqArray.push(targetFee.sequence);
				paymentPeriodArray.push(targetFee.period);
				// Create an invoice for the "voided" feeitem.
				var invoiceResult_L = aa.finance.createInvoice(itemCap, feeSeqArray, paymentPeriodArray);
				if (!invoiceResult_L.getSuccess())
					{
					logDebug("**ERROR: Invoicing the fee items voided " + thisFee.code + " was not successful.  Reason: " +  invoiceResult_L.getErrorMessage());
					return false;
					}
				}
			// If fee status is "NEW" the fee can be removed entirely.
			if (targetFee.status == "NEW")
				{
				// delete the fee
				var editResult = aa.finance.removeFeeItem(itemCap, targetFee.sequence);
				// Error or success if the fee has been removed completely.
				if (editResult.getSuccess())
					logDebug("Removed existing Fee Item: " + targetFee.code);
				else
					{ logDebug( "**ERROR: removing fee item (" + targetFee.code + "): " + editResult.getErrorMessage()); return false; }
				}
			} // each matching fee
		}  // each  fee
}  // function
try {
	// Load the ASIT
	loadASITable("CITATIONCHECKLIST");
	var tInfo=CITATIONCHECKLIST;
	
	// Total Rows
	rowCount = 0;
	
	if (tInfo == null){
		logDebug("There was no rows in the table.");
		//aa.print("There was no rows in the table.");
	}
	else if(tInfo.length<1){
		logDebug("There was no rows in the table.");
		//aa.print("There was no rows in the table.");
	}
	// Only if there are rows in the table do we really want to do anything.
	else {
		// Just to count the fees that have already been applied.
		firstCitFee = [];
		secondCitFee = [];
		thirdCitFee = [];
		// Count the fees that are applied.
		var targetFees = loadFees(capId);
		for (tFeeNum in targetFees)
		{
			targetFee = targetFees[tFeeNum];
			if(targetFee['code'] == 'L040' && targetFee['status'] != 'VOIDED'){ firstCitFee.push(targetFee['sequence']);}
			else if(targetFee['code'] == 'L050' && targetFee['status'] != 'VOIDED'){ secondCitFee.push(targetFee['sequence']);}
			else if(targetFee['code'] == 'L060' && targetFee['status'] != 'VOIDED'){ thirdCitFee.push(targetFee['sequence']);}
		}
		
		// Looping through ASIT
		rowCount = CITATIONCHECKLIST.length;
		totalRowCount = CITATIONCHECKLIST.length;
		rowStart18 = 0;
		
		//=======================================
		// Order the array
		//=======================================
		column = "Citation Issued Date"; // Column Name in ASIT array
		tInfo.sort(function(x,y){
			x2 = convertDate(x[column].toString());
			y2 = convertDate(y[column].toString());
			//aa.print(x2+':'+y2);
			if (x2 > y2) {return 1;}
			else if (x2 < y2) {return -1;}
			aa.print(0);
			return 0;
			}
		)
		//=======================================
		// Loop through all of the rows in the ASI Table
		//=======================================
		rowNumber = 0;
		firstCitation = 0;
		secondCitation = 0;
		thirdCitation = 0;
		for(rowIndex=0; rowIndex <=(rowCount-1);rowIndex++)
		{
			// If we don't yet have a value for rowStart18
			// then we will assume that this is the first row
			if(rowStart18 == null || totalRowCount == 1){
				rowStart18 = rowIndex;
			}
			rowNumber++;
			// Parse through each row, comparing to the start of 18 months.
			date1 = tInfo[rowIndex]["Citation Issued Date"].toString();
			date2 = tInfo[rowStart18]["Citation Issued Date"].toString();
			// Now we would need to do a diffDate comparison to see if it's 18 months different or not.
			date2 = dateAddMonths(date2.toString(),18);
			date2 = convertDate(date2);
			date1 = convertDate(date1);
			// Reset the row number when the date rolls over.
			if(date1 > date2){
				rowNumber = 1;
			}
			// The following is dependent on row number only.
			if(rowNumber == 1) {
				rowStart18 = rowIndex;
				firstCitation ++;
			}
			else if(rowNumber == 2){
				secondCitation ++;
			}
			else if(rowNumber >= 3){ // Handles 3 or more in the 18 month timeframe.
				thirdCitation ++;
			}
			//=======================================
		}
		
		// Check and edit fees.
		feeAdjust(firstCitFee,firstCitation,'L040');
		feeAdjust(secondCitFee,secondCitation,'L050');
		feeAdjust(thirdCitFee,thirdCitation,'L060');
	}
}
catch(err)
{
	logDebug("A JavaScript Error occured: "+ err.message);
}