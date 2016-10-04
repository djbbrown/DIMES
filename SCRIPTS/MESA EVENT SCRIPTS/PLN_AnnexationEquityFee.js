/*===================================================================
 Versions:
 9/29/2016-B	John Cheney			initial
 10/3/2016-b	John Cheney			added standard choice lookup 
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
        // have classification and equity var.. try to lookup standard choice 
        var choiceVar = lookup("PLN ANX Equity_Fee_Rates", useClass);

        if(choiceVar){
            // found a value, so try to calculate fee
            logDebug("PLN_AnnexationEquityFee - calculating feeQty = " + choiceVar + " x " + equityVar);
            var feeQty = Number(equityVar) * Number(choiceVar);

            var feeCode = "ANX020";

            // remove existing fee if found and not invoiced
            if (feeExists(feeCode, "NEW")){
                voidRemoveFee(feeCode);
            }

            // levy fee
            addFee(feeCode, "PLN_ANX", "FINAL", feeQty, "N");

        } else{
            logDebug("PLN_AnnexationEquityFee - No Action - failed to lookup Standard Choice for Use Classification = " + useClass);
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
