/*===================================================================
// Script Number: 42
// Script Name: ENF_NewRecordPriorityImminentHazard.js
// Script Developer: Vance Smith
// Script Agency: Mesa
// Script Description: When Priority field in Record Detail is set 
// to "Priority" on ASA or Record field updated Schedule "Initial 
// Inspection" today and assign to Code Officer based on GIS layer.

// Script Run Event: ASA

// Script Parents:
//	ASA;Enforcement!Case!~!~ 
//            
/*==================================================================*/

/* intellisense references */
/// <reference path="../../AccelaAPI.js" />
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/* reference path="../../INCLUDES_ACCELA_FUNCTIONS_ASB-80100.js" // only for asb events!! */
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

try
{
    var cdScriptObjResult = aa.cap.getCapDetail(capId);
    if (cdScriptObjResult.getSuccess())
    {
        var cdScriptObj = cdScriptObjResult.getOutput();
        if ( cdScriptObj ) 
        {
            var cd = cdScriptObj.getCapDetailModel();
            var priority = cd.getPriority();
            logDebug("Priority: " + priority);
            if (priority == "Priority")
            {
                // schedule initial inspection for today
                //var inspector = null;
                scheduleInspectDate("Initial Inspection", new Date());//, inspector);
                logDebug("Scheduled Inspection Date for " + new Date());
            }
        }
        else
        {
            logDebug("Failed to get record priority (cdScriptObj)")
        }
    }
    else 
    {
        logDebug("Failed to get record priority (cdScriptObjResult)")
    }
    /*
    pseudocode
    DONE 1) get Priority field in record detail. 
    DONE 2) see if it is set to "Priority"
    DONE 3) if so, schedule "Initial Inspection" for today
    4) assign to Code Officer based on GIS layer (?)
    */
}
catch (err)
{
  logDebug("A JavaScript error occurred: " + err.message);
}

/* Test Record: 

*/