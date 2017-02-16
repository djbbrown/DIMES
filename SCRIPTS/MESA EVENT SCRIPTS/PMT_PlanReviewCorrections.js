/*===================================================================
// Script Number: 383
// Script Name: PMT_PlanReviewCorrections.js
// Script Developer: Michael VanWie
// Script Agency: Mesa
// Script Description:
//      In workflow, you should not be able to issue a permit if any plan 
//      reviews are in the Corrections status.  All Plan Reviews should be 
//      Approved, Approved with Comments, or N/A
//
// Script Run Event: WTUB
// Script Parents:
//          WTUB;Permits!Addenda or Deferred!~!~
//          WTUB;Permits!Commercial!~!~
//          WTUB;Permits!Demolition!~!~
//          WTUB;Permits!Master Plan!~!~
//          WTUB;Permits!Residential!~!~
//          WTUB;Permits!Sign!~!~
/*==================================================================*/
/* intellisense references */
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

try
{
    if(wfTask == "Permit Issuance" && wfStatus == "Issued")
    {
        var tasks = loadTasks(capId);
        for(task in tasks)
        {
            if(tasks[task].status != null)
            {
                var taskStatus = String(tasks[task].status);
                var arrReviews = ["Planning Review", "Building Review", "Fire Review", "Civil Engineering Review", "DIS Review"];
                var arrStatus = ["Approved", "Approved W/Comments", "Not Required"];

                //If task is in the list of checked reviews continue evaluation
                if(IsStrInArry(task, arrReviews))
                {
                    //If the status IS NOT in the list of 'OK' statuses
                    if(!IsStrInArry(taskStatus, arrStatus))
                    {
                        logDebug("Canceled due to " + task + " being in " + taskStatus + " status.");
                        cancel = true;
                    }
                }
            }
        }
    }
}
catch(err)
{
    logDebug("Java Error: " + err.message)
}