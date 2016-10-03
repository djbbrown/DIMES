/*===================================================================
 Versions:
 9/29/2016-B	John Cheney			initial
 10/3/2016-a	John Cheney			use equityVar when assessing fee (not dollar amt) 
 ---------------------------------------------------------------------
 Script Number: 329
 Script Name: PLN_AnnexationEquityFee.js
 Script Agency: Mesa
 Script Description: 	

Calculate and assess the Annexation Equity Fee when ASI fields 
“Use Classification” and “Equity Fee Variable” are entered.

Note: we cannot get previous values in ASIUA event, 
so levy fee every ASIUA if other conditions are met

Specs:
    https://portal.accelaops.com/projects/Mesa/Lists/Script%20Tracker/DispForm.aspx?ID=329 

Script Run Events: ASIUA

Script Parents:
      ASIUA;Planning!Annexation!NA!NA

==================================================================*/

 //logDebug("---------- start  PLN_AnnexationEquityFee ver 10/3 ----------");

try
{
    var useClass = AInfo["Use Classification"];
    var equityVar = AInfo["Equity Fee Variable"];

    if(useClass && equityVar){
        var feeCode = "ANX020";
        // found the required values..

        // remove existing fee if found and not invoiced
        if (feeExists(feeCode, "NEW")){
            voidRemoveFee(feeCode);
//    		logDebug("PLN_AnnexationEquityFee - Removed fee with code " + feeCode + " and status NEW");
        }

        // levy fee

        if(equityVar > 0){
                addFee(feeCode, "PLN_ANX", "FINAL", equityVar, "N");
            } else {
                logDebug("PLN_AnnexationEquityFee - No Action - equityVar = " + String(equityVar));
            }

    } else {
        logDebug("PLN_AnnexationEquityFee - No Action - Use Classification or Equity Fee Variable is null");
    }
}
catch (err)
{
  logDebug("PLN_AnnexationEquityFee - JavaScript Error: " + err.message);
  logDebug(err.stack);
}


// logDebug("---------- end  PLN_AnnexationEquityFee ----------");
