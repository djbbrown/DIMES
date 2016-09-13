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
//	ASA;Enforcement!Case!Building Issue!NA
//  ASIUA;Enforcement!Case!Building Issue!NA
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
    var priority = getRecordPriority();
    logDebug("Priority: " + priority);
    if ( !priority && priority == "Priority")
    {
        // see if the initial inspection has already been Scheduled
        var insp = doesInspectionExist("Initial Inspection");

        if ( !insp )
        {
            var today = getTodayAsString();

            // get the inspector for this boundary          
            var inspector = getInspectorObject();
            if (!inspector) 
            {
                // schedule initial inspection for today 
                scheduleInspectionDateWithInspectorObject("Initial Inspection", today, inspector);
                logDebug("Scheduled inspection for Inspector " + inspector + ".");
            }
            else
            {
                // schedule initial inspection for today 
                scheduleInspectDate("Initial Inspection", today);
                logDebug("Inspector was not found, so was not assigned.");
            }
        }
        else
        {
            logDebug("Initial Inspection has already been scheduled.")
        }
    }
    else 
    {
        logDebug("Criteria not met.")
    }
}
catch (err)
{
  logDebug("A JavaScript error occurred: " + err.message);
}

/* Test Record: COB16-00017

*/