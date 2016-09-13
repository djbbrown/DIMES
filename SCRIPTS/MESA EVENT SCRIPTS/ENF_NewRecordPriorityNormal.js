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
    var priority = getRecordPriority();
    logDebug("Priority: " + priority);
    if ( priority != false && priority == "Normal")
    {
        // see if the initial inspection has already been Scheduled
        var inspExist = doesInspectionExist("Initial Inspection");

        if ( inspExist == false )
        {
            // schedule initial inspection on the next working day (5 day cal)
            var nextWorkingDay = dateAdd(null, 1, "Y");

            // get the inspector for this boundary          
            var inspector = getInspectorObject();
            if (inspector != false) 
            {
                // schedule initial inspection for next working day 
                scheduleInspectionDateWithInspectorObject("Initial Inspection", nextWorkingDay, inspector);
                logDebug("Scheduled inspection for Inspector " + inspector + ".");
            }
            else
            {
                // schedule initial inspection for next working day 
                scheduleInspectDate("Initial Inspection", nextWorkingDay);
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

/* Test Record: COD16-00099
*/