/*===================================================================
// Script Number: 26
// Script Name: ENF_NewRecordPriorityNormal.js
// Script Developer: Vance Smith
// Script Agency: Mesa
// Script Description: When Priority field in Record Detail is set 
// to "Normal" on ASA or Record field updated Schedule "Initial 
// Inspection" to the next working day (5-day calendar) and assign 
// to Code Officer based on GIS layer.

// Script Run Event: ASA, ASIUA

// Script Parents:
//	ASA;Enforcement!Case!~!~ 
//  ASIUA;Enforcement!Case!~!~  
//            
/*==================================================================*/

/* intellisense references */
/// <reference path="../../AccelaAPI.js" />
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
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
            if (priority == "Normal")
            {
                // schedule initial inspection on the next working day (5 day cal)
                var nextWorkingDay = dateAdd(null, 1, "Y");

                // get the inspector for this boundary          
                var inspector = getGISInfo("Accela/AccelaBoundaries", "Code_Officer_Boundary", "CODE_OFFICER");
                if (inspector) 
                {
                    // schedule initial inspection for today 
                    scheduleInspectDate("Initial Inspection", nextWorkingDay, inspector);
                    logDebug("Scheduled inspection for Inspector " + inspector + ".");
                }
                else
                {
                    // schedule initial inspection for today 
                    scheduleInspectDate("Initial Inspection", nextWorkingDay);
                    logDebug("Inspector was not found, so was not assigned.");
                }
                logDebug("Scheduled Inspection Date for " + nextWorkingDay);
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
}
catch (err)
{
  logDebug("A JavaScript error occurred: " + err.message);
}

/* Test Record: COD16-00097
*/