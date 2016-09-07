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


function getTodayAsString()
{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    } 

    if(mm<10) {
        mm='0'+mm
    } 

    return mm + '/' + dd + '/' + yyyy;
}

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
                var today = getTodayAsString();

                // get the inspector for this boundary          
                var inspector = getGISInfo("Accela/AccelaBoundaries", "Code_Officer_Boundary", "CODE_OFFICER");
                if (inspector) 
                {
                    logDebug("Inspector: " + inspector);
                    // schedule initial inspection for today 
                    scheduleInspectDate("Initial Inspection", today, inspector);
                }
                else
                {
                    // schedule initial inspection for today 
                    scheduleInspectDate("Initial Inspection", today);
                }
                logDebug("Scheduled Inspection Date for " + today);
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

/* Test Record: COB16-00017

*/