/*===================================================================
// Script Number: 214
// Script Name: PMT_SubmittalCycle.js
// Script Developer: Vance Smith
// Script Agency: Mesa
// Script Description: When status of "Revisions Required" is applied 
// to wf task "Plans Coordination" then add 1 to the "Submittal Cycle" 
// value. Number should be increased by 1 for each time this occurs.

// Script Run Event: WTUA

// Script Parents:
//	WTUA;Permits!Addenda or Deferred!NA!NA
//	WTUA;Permits!Commercial!NA!NA
//	WTUA;Permits!Residential!NA!NA
//	WTUA;Permits!Residential!Mobile Home!NA
//	WTUA;Permits!Master Plan!NA!NA
//	WTUA;Permits!Sign!NA!NA
//            
/*==================================================================*/

/* intellisense references */
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

try
{
    var tStatus = taskStatus("Plans Coordination");
    var tActive = isTaskActive_Mesa("Plans Coordination");
    if ( tStatus != null && tStatus.toUpperCase() == "REVISIONS REQUIRED" && tActive == true) 
    {
        logDebug("Criteria met for script.");

        var revisions = getAppSpecific("Submittal Cycle");
        if ( revisions == null ) 
        {
            revisions = 1;
        }
        else
        {
            revisions = parseInt(revisions);
        }
        logDebug("Revisions: " + revisions);

        revisions++; // increment by one

        editAppSpecific_Mesa("Submittal Cycle", revisions );

        logDebug("Updated Revisions to " + revisions );
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

/* Test Record: PMT16-01012

*/