/*===================================================================
 Versions:
 9/19/2016-A	John Cheney			initial
 10/3/2016-E	John Cheney			adjusted to newly found limitations (cannot set dueDate of a task unless already active)
 10/20/2016-A	John Cheney			adjusted wire up events and improved logDebug messages 
 ---------------------------------------------------------------------
 Script Number: 334
 Script Name: PMT_CopyPenaltyDateToDueDate.js
 Script Agency: Mesa
 Script Description:
    	
((revised by cheney))

Applies to Permits/* except: 
-	Permits/Commercial
-	Permits/Demolition
-	Permits/Document Retrieval
-	Permits/Fire
-	Permits/Online
-	Permits/Police Department

Goal: the due date of the following tasks should match the ASI field (“Penalty Date” or “Plan Review Penalty Date”):
-	Building Review
-	Fire Review
-	Planning Review
-	Public Works Review
-	Utilities Review
-	Arborist Review
-	Civil Review
-	Civil Engineering Review
-	DIS Review
-	Plans Coordination

Limitation: cannot set due date for tasks except when they are active.  Multiple tasks can be active at the same time.

Solution:

- detect if type of permit is in scope, exit if not
- get ASI field (“Penalty Date” or “Plan Review Penalty Date”), exit if not found
- iterate through all tasks:
    -  if task status = active, then set due date = the penalty date


Events: 
-	ASIUA: insure that due dates are correct if penalty date is modified
-	WTUA: insure that due dates are correct after task events (such as task becomes active)


Script parents:
- ASIUA;Permits!~!~
- WTUA;Permits!~!~


specs: https://portal.accelaops.com/projects/Mesa/Lists/Script%20Tracker/DispForm.aspx?ID=334  

/*==================================================================*/

//logDebug("---------- start  PMT_CopyPenaltyDateToDueDate ----------");
try {

    // is this a type to avoid?
    var typesToAvoid = ["Permits/Demolition/NA/NA", "Permits/Document Retrieval/NA/NA", "Permits/Online/NA/NA", "Permits/Commercial/Annual Facilities/NA", "Permits/Fire/Tent Permit/NA", "Permits/Police Department/Alarms/Activity"];
    var appType = String(appTypeString);

    if(typesToAvoid.indexOf(appType) == -1){
        // this permit is in scope for this script..

        // try to get penalty date 
        var dueDate = AInfo["Penalty Date"];
        if(!dueDate){ dueDate = AInfo["Plan Review Penalty Date"];}

        if(dueDate){
            // penalty date was found.. now set due date in relevant tasks to match
            var tasks = aa.workflow.getTasks(capId).getOutput();

            if (tasks)
            {
                var changeCount = 0;
                var taskCount = 0;
                var tasksToUpdate = ["Building Review", "Fire Review", "Planning Review", "Public Works Review", "Utilities Review", "Arborist Review", "Civil Review", "Civil Engineering Review", "DIS Review", "Plans Coordination"];
                
                for (t in tasks) {
                    taskCount = taskCount + 1;
                    // is this a task to work with?
                    var taskName = String(tasks[t].getTaskDescription());
                    if(tasksToUpdate.indexOf(taskName) > -1){
                        // yes - is it active?
                        if(isTaskActive(taskName)){
                            // yes, so set due date
                            changeCount = changeCount + 1;
                            editTaskDueDate(taskName, dueDate);
                            logDebug("PMT_CopyPenaltyDateToDueDate - updated task = " + taskName + " - dueDate = " + dueDate);
                        }else{
                            logDebug("PMT_CopyPenaltyDateToDueDate - found task = " + taskName + " - cannot update because it is not active");
                        }
                    }
                    logDebug("PMT_CopyPenaltyDateToDueDate - found task = " + taskName + " - no update - out of scope");
                }
                // summarize activity
                logDebug("PMT_CopyPenaltyDateToDueDate - Set dueDate = " + dueDate + " in " + changeCount + " of " + taskCount + " tasks.");

            } else {
                logDebug("PMT_CopyPenaltyDateToDueDate - No Action - No Tasks found.");    
            }
        } else {
            logDebug("PMT_CopyPenaltyDateToDueDate - No Action - Penalty Date not found");
        }
    }else{
        logDebug("PMT_CopyPenaltyDateToDueDate - No Action - appTypeString " + appTypeString + " is out of scope.");
    }
} catch (err) {
	logDebug("A JavaScript Error occured in PMT_CopyPenaltyDateToDueDate: " + err.message);
	logDebug(err.stack);
}
//logDebug("---------- end  PMT_CopyPenaltyDateToDueDate ----------");
