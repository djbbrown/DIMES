function addFeeWithQtyAndAmt(fcode,fsched,fperiod,fqty,famt, fformula, fcalcVariable) // Adds a single fee, optional argument: fCap
{
// based off the master script addFee(), this creates the fee using the quantity and calc variable
// ghess: 01/27/14

	// Updated Script will return feeSeq number or null if error encountered (SR5112) 
	var feeCap = capId;
	var feeCapMessage = "";
	var feeSeq_L = new Array();				// invoicing fee for CAP in args
	var paymentPeriod_L = new Array();			// invoicing pay periods for CAP in args
	var feeSeq = null;
	if (arguments.length > 7) 
	{
		feeCap = arguments[7]; // use cap ID specified in args
		feeCapMessage = " to specified CAP";
	}

	assessFeeResult = aa.finance.createFeeItem(feeCap,fsched,fcode,fperiod,fqty);
	if (assessFeeResult.getSuccess())
	{
		feeSeq = assessFeeResult.getOutput();
		invoiceOneNow(feeSeq, fperiod, feeCap); // in order to change the amount and the quantity the fee has to be invoiced. 
		// but that now messes up the invoiced amount, so go fix it
		
		// update fee with quantity and calc variable
		//aa.print("Updating  fee: " + fcode + ", Quantity = " + fqty + ", Calc Variable = " + famt);
		fsm = aa.finance.getFeeItemByPK(feeCap, feeSeq).getOutput().getF4FeeItem();
		//fsm.setFeeNotes(sca[0]);
		//fsm.setFeeDescription(sca[1]);
		fsm.setFee(famt); 
		fsm.setFeeUnit(fqty); //Quantity
		fsm.setFormula(fcalcVariable); //Calc Variable
		fsm.setFeeCalcProc(fformula);
		editResult = aa.finance.editFeeItem(fsm);
		if (editResult.getSuccess()) {
			logDebug("The assessed fee Sequence Number " + feeSeq + feeCapMessage);
			//aa.print("The assessed fee Sequence Number " + feeSeq + feeCapMessage);
			// now need to adjust the invoice
			// find it first
			invoiceWeWant = null;
		    var invArray = aa.finance.getInvoiceByCapID(feeCap, null).getOutput();
		    for (var invCount in invArray)   {
		    	var thisInvoice = invArray[invCount];
                feeT = aa.invoice.getFeeItemInvoiceByInvoiceNbr(thisInvoice.getInvNbr()).getOutput();
                for (targetFeeNum in feeT) {
                	 var thisTFee = feeT[targetFeeNum];
                	 if (thisTFee.getFeeSeqNbr() == feeSeq) { 
                		 invoiceWeWant = thisInvoice;
                		 break;
                	 }
                }
		    }
		    // now modify it
		    if (invoiceWeWant != null) {
        	 	var i = invoiceWeWant.getInvoiceModel()
        		editResult = aa.finance.editInvoice(feeCap,
        						i.getInvNbr(),
        						i.getInvLevel(),
        						i.getInvStatus(),
        						i.getInvStatusDate() ? aa.date.parseDate(i.getInvStatusDate()) : null,
        						famt,
        						famt,
        						i.getInvDate() ? aa.date.parseDate(i.getInvDate()) : null,
        						i.getInvDueDate() ? aa.date.parseDate(i.getInvDueDate()) : null,
        						i.getInvComment(),
        						i.getInvBatchNbr(),
        						i.getInvBatchDate() ? aa.date.parseDate(i.getInvBatchDate()) : null,
        						i.getUdf1(),
        						i.getUdf2(),
        						i.getUdf3(),
        						i.getUdf4(),
        						i.getPrintInvNbr(),
        						i.getAuditDate() ? aa.date.parseDate(i.getAuditDate()) : null,
        						i.getAuditStatus());
        	 	if (!editResult.getSuccess()) { logDebug(editResult.getErrorMessage()); }
 		    }
	
		}
		else {
			logDebug("Error editing the fee item " + editResult.getErrorMessage())
		}
		updateFeeItemInvoiceFlag(feeSeq,"Y");
	}
	else
	{
		logDebug( "**ERROR: assessing fee (" + fcode + "): " + assessFeeResult.getErrorMessage());
		//aa.print( "**ERROR: assessing fee (" + fcode + "): " + assessFeeResult.getErrorMessage());
		feeSeq = null;
	}
	
	return feeSeq;
	   
}
