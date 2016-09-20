/*===================================================================
 Versions:
 9/19/2016-A	John Cheney			initial
 ---------------------------------------------------------------------
 Script Number: 329
 Script Name: PLN_AnnexationEquityFee.js
 Script Developer: John Cheney
 Script Agency: Mesa
 Script Description:
   
   Assess Annexation Equity Fee when specific Annexation custom fields are entered.

   Whenever the value of “Use Classification” changes OR the value of the field “Equity Fee Variable” changes
    1.	Delete the Annexation Equity Fee (Fee Schedule = ‘PLN_ANX’, Fee Code = ‘ANX020’) if it exists and has not been invoiced
    2.	Assess the Annexation Equity Fee (Fee Schedule = ‘PLN_ANX’, Fee Code = ‘ANX020’).  
        a.	Retrieve  Value Desc from the PLN ANX Equity_Fee_Rates Standard Choices Item where Standard Choices Value =  the value in ASI field “Use Classification”.  
        b.	Calculate the fee amount to be assessed as follows:  Value Desc * value of “Equity Fee Variable”

Test records:  ANX16-00187, ANX16-00246

specs: https://portal.accelaops.com/projects/Mesa/Lists/Script%20Tracker/DispForm.aspx?ID=335&Source=https%3A%2F%2Fportal%2Eaccelaops%2Ecom%2Fprojects%2FMesa%2FLists%2FScript%2520Tracker%2Factive%2Easpx&ContentTypeId=0x010300D70AB462012E604593F2EB837FB5F3FD 

Script run events: ASIUA
Script Parents:  ASIUA;Planning!Annexation!NA!NA

/*==================================================================*/

// logDebug("---------- start  PLN_AnnexationEquityFee ----------");

try {
    var useClass = AInfo["Use Classification"];
    var equityFee = Number(AInfo["Equity Fee Variable"]);

    if (useClass && equityFee){

        //logDebug("- useClass = " + useClass);
        //logDebug("- equityFee = " + equityFee);
        
        // remove previous fee if not invoiced
        if (feeExists("ANX020", "NEW")) voidRemoveFee("ANX020");

        // look up the rate for this useClass
        var rate =  Number(lookup("PLN ANX Equity_Fee_Rates", useClass));

        if (rate){
            // found rate, so calculate fee and apply
           var newFee = equityFee * rate;
           addFee("ANX020","PLN_ANX", "FINAL", newFee, "N");
           logDebug("PLN_AnnexationEquityFee - Added fee = " + String(newFee) + " for Use Classification = " + useClass);
        } else {
            logDebug("PLN_AnnexationEquityFee - No Action - Failed to find Equity Fee Rate for Use Classification = " + useClass);
        }
    } else {
        logDebug("PLN_AnnexationEquityFee - No Action - Out of scope. Use Classification = " + useClass + ", Equity Fee Variable = " + equityFee);    
    }
} catch (err) {
	logDebug("A JavaScript Error occured in PLN_AnnexationEquityFee: " + err.message);
	logDebug(err.stack);
}
// logDebug("---------- end  PLN_AnnexationEquityFee ----------");