/*===================================================================
// Script Number: 354
// Script Name: ENF_EnvironmentalInspectionReschedules.js
// Script Developer: Vance Smith
// Script Agency: Mesa
// Script Description: When any inspection is resulted as "In Violation", 
// apply status of "In Violation" to the active inspection wf task 
// "Initial Inspection" or "Follow-Up Inspection" or "Citation Inspections" 
// (whichever one is active) and schedule a new "Follow-Up" inspection 
// for the number of days out specified in ASI field "Inspection Interval".

// Script Run Event: IRSA

// Script Parents:
//	IRSA;Enforcement!Environmental!Complaint!NA            
/*==================================================================*/

/* intellisense references */
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

try
{    
    // check inspection result, if "In Violation"
    if (inspResult == "In Violation")
    {
        // then get and loop through workflow tasks and look for tasks that meet criteria
        var tasksResult = aa.workflow.getTasks(capId);
        if (tasksResult.getSuccess())
        {
            var tasks = tasksResult.getOutput();
            for (task in tasks){
                var taskName = tasks[task].getTaskDescription();
                logDebug("taskName: " + taskName);
                if ( 
                    tasks[task].getActiveFlag().equals("Y") && 
                    (taskName == "Initial Inspection" || taskName == "Follow-Up Inspection" || taskName == "Citation Inspections")
                )
                {
                    logDebug(taskName + " is active");

                    // apply status of "In Violation"
                    updateTask(taskName, "In Violation", "Updated By Script", "");
                    
                    // then schedule a new "Follow-Up Inspection" inspection for the number of days 
                    // out specified in ASI field "Inspection Interval" (business days)
                    var numDays = Number(getAppSpecific("Inspection Interval").replace(" Days", ""));
                    var scheduleDate = dateAdd(null, numDays, "Y");
                    var inspectorObject = getInspectorObject();
                    if (inspectorObject != false)
                    {
                        scheduleInspectionDateWithInspectorObject("Follow-Up Inspection", scheduleDate, inspectorObject);
                    }
                }
            }
        }
    }
    else 
    {
        logDebug("Criteria not met. Inpsection Result: " + inspResult + ", Inspection Type: " + inspType)
    }
}
catch (err)
{
  logDebug("A JavaScript error occurred: " + err.message);
}

/* Test Record: ENVC16-00064

*/