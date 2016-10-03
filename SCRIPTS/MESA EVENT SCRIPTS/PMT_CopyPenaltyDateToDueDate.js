/*===================================================================
 Versions:
 9/19/2016-A	John Cheney			initial
 10/3/2016-A	John Cheney			adjusted to newly found limitations (cannot set dueDate of a task unless already active) 
 ---------------------------------------------------------------------
 Script Number: 334
 Script Name: PMT_CopyPenaltyDateToDueDate.js
 Script Agency: Mesa
 Script Description:
    	
((revised by cheney))

Applies to Permits/* except 
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

Limitation: cannot set due date for tasks except when they are active.  

Solution:

- detect if currently active task = one in the list
- if yes: 
    - get ASI field (“Penalty Date” or “Plan Review Penalty Date”)
    - set the task due date = the penalty date


Events: 
-	ASIUA: handles change to currently active task if penalty date is modified
-	WTUA: insure that due date is correct after task events (such as task becomes active)

Script parents:
- PMT_CopyPenaltyDateToDueDate (WTUA script that sets penalty date) – assumption to test: if a WTUA event modifies an ASI field, ASIUA is not fired
- ASIUA;Permits!~!~
- WTUA;Permits!Addenda or Deferred!NA!NA
- WTUA;Permits!Master Plan!NA!NA
- WTUA;Permits!Residential!



specs: https://portal.accelaops.com/projects/Mesa/Lists/Script%20Tracker/DispForm.aspx?ID=334  

/*==================================================================*/

logDebug("---------- start  PMT_CopyPenaltyDateToDueDate ----------");
try {

    // is this a type to avoid?
    var typesToAvoid = ["Permits/Demolition/NA/NA", "Permits/Document Retrieval/NA/NA", "Permits/Online/NA/NA", "Permits/Commercial/Annual Facilities/NA", "Permits/Fire/Tent Permit/NA", "Permits/Police Department/Alarms/Activity"];
    var appType = String(appTypeString);

    if(typesToAvoid.indexOf(appType) == -1){
        // not a record type to avoid .. is the active task this script cares about?

        var tasksToUpdate = ["Building Review", "Fire Review", "Planning Review", "Public Works Review", "Utilities Review", "Arborist Review", "Civil Review", "Civil Engineering Review", "DIS Review", "Plans Coordination"];

        if(wfTask && tasksToUpdate.indexOf(wfTask) > -1){
            // yes
            // get the due date (from either penalty date or plan review penalty date)
            var dueDate = AInfo["Penalty Date"];
            if(!dueDate){
                dueDate = AInfo["Plan Review Penalty Date"];
            }

            if(dueDate){ 
                // due date is found, so set it
                editTaskDueDate(wfTask, dueDate);
                logDebug("PMT_CopyPenaltyDateToDueDate - Set dueDate = " + dueDate + " for wfTask: " + wfTask);
            }

        } else {
            logDebug("PMT_CopyPenaltyDateToDueDate - No Action - wfTask " + wfTask +  " is out of scope.");
        }
    }else{
        logDebug("PMT_CopyPenaltyDateToDueDate - No Action - appTypeString " + appTypeString + " is out of scope.");
    }
} catch (err) {
	logDebug("A JavaScript Error occured in PMT_CopyPenaltyDateToDueDate: " + err.message);
	logDebug(err.stack);
}
logDebug("---------- end  PMT_CopyPenaltyDateToDueDate ----------");
