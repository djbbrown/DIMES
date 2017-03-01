//*===================================================================
//
// Script Number: 380
// Script Name: TRA_TTC_ZeroBalanceFeeCheck.js
// Script Developer: Michael VanWie
// Script Agency: City of Mesa
// Script Description: 
// 		Prevent the status of "Issued" being set on the Workflow Task 'Permit Issuance'
//      if there is a balance due or assessed fee on the record that have not been invoiced.
//
// Script Run Event: WTUB
// Script Parents:
//             WTUB:Transportation/Temporary Traffic Control/NA/NA
// 
//==================================================================*/
/* intellisense references */
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

try
{
    if(wfTask == 'Permit Issuance' && wfStatus == 'Issued' && (feeTotalByStatus('NEW') > 0 || balanceDue > 0))         
    {
        showMessage = true;
        comment("All balances and fees must be paid before this permit can be issued.");
        cancel = true;
    }
}
catch (err)
{
    logDebug("Javascript Error: " + err.message);
    logDebug("Javascript Error Stack: " + err.stack);
}