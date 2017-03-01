//*===================================================================
//
// Script Number: 380
// Script Name: TRA_TTC_FinalInspectionFeeCheck.js
// Script Developer: Michael VanWie
// Script Agency: City of Mesa
// Script Description: 
// 		Prevent scheduling of "Final Inspection" when WF Task " Inspections" is active 
//      if there is a balance due or assessed fees on the record that have not been invoiced
//
// Script Run Event: ISB
// Script Parents:
//             ISB:Transportation/Temporary Traffic Control/NA/NA
// 
//==================================================================*/
/* intellisense references */
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

try
{
    if(inspType == "Final Inspection" && (isTaskActive('Inspections') || balanceDue > 0 || feeTotalByStatus('NEW') > 0))
    {
        showMessage = true;
        comment("Final Inspection can not be scheduled while Inspections workflow task is active or while there is a balance due.");
        cancel = true;
    }
}
catch(err)
{
    logDebug("Javascript Error: " + err.message);
    logDebug("Javascript Error Stack: " + err.stack);
}