/*===================================================================
 Versions:
 9/19/2016-A	John Cheney			initial
 ---------------------------------------------------------------------
 Script Number: 334
 Script Name: PMT_CopyPenaltyDateToDueDate.js
 Script Agency: Mesa
 Script Description:
    	
((revised by cheney))

Copy the date found in ASI field ("Penalty Date" or "Plan Review Penalty Date") to the "Due Date" field of the following tasks:
- Building Review
- Fire Review
- Planning Review
- Public Works Review
- Utilities Review
- Arborist Review
- Civil Review
- Civil Engineering Review
- DIS Review
- Plans Coordination

Scope: Permits\*\*\*    EXCEPT  Demo, Document Retrieval, Online, Commercial\Annual Facilities, Fire and PD

This script for ASIUA (to cover when penalty date was modified outside of a task) AND WTUA (called by  
script 66 - PMT_PenaltyDate after it sets penalty date)
 

specs: https://portal.accelaops.com/projects/Mesa/Lists/Script%20Tracker/DispForm.aspx?ID=334&Source=https%3A%2F%2Fportal%2Eaccelaops%2Ecom%2Fprojects%2FMesa%2FLists%2FScript%2520Tracker%2Factive%2Easpx  

task object model reference:
file://isrc01/ittechdocs/Applications/Dimes/EMSE-API-8_0_2-Doc/com/accela/aa/emse/dom/TaskItemScriptModel.html#setDueDate(com.accela.aa.emse.util.ScriptDateTime) 

Script run events: ASIUA, WTUA
Script Parents:  ASIUA;Permits!~!~!~ , PMT_PenaltyDate

/*==================================================================*/

//logDebug("---------- start  PMT_CopyPenaltyDateToDueDate ----------");
try {

    // is this a type to avoid?
    var typesToAvoid = ["Permits/Demolition/NA/NA", "Permits/Document Retrieval/NA/NA", "Permits/Online/NA/NA", "Permits/Commercial/Annual Facilities/NA", "Permits/Fire/Tent Permit/NA", "Permits/Police Department/Alarms/Activity"];
    var appType = String(appTypeString);

    if(typesToAvoid.indexOf(appType) == -1){
        
        // nope, we have work to do..
        // get the due date (from either penalty date or plan review penalty date)
        var dueDate = AInfo["Penalty Date"];
        if(!dueDate){
            dueDate = AInfo["Plan Review Penalty Date"];
        }

        if(dueDate){
    //      logDebug("-dueDate = " + dueDate);
            var tasks = aa.workflow.getTasks(capId).getOutput();

            if (tasks)
            {
                var changeCount = 0;
                var taskCount = 0;
                var tasksToUpdate = ["Building Review", "Fire Review", "Planning Review", "Public Works Review", "Utilities Review", "Arborist Review", "Civil Review", "Civil Engineering Review", "DIS Review", "Plans Coordination"];
                
                for (t in tasks) {
                    taskCount = taskCount + 1;
                    var taskName = String(tasks[t].getTaskDescription());

                    if(tasksToUpdate.indexOf(taskName) > -1){
                        editTaskDueDate(taskName, dueDate);
                        // debug
                        //var tDate2 = getTaskDueDate(taskName); 
                        //logDebug("--- updated task = " + taskName + " - dueDate = " + tDate2);
                        changeCount = changeCount + 1;
                    }
                }
                
                logDebug("PMT_CopyPenaltyDateToDueDate - Set dueDate = " + dueDate + " in " + changeCount + " of " + taskCount + " tasks.");

            } else {
                logDebug("PMT_CopyPenaltyDateToDueDate - No Action - No Tasks found.");    
            }
        }
        else{
            logDebug("PMT_CopyPenaltyDateToDueDate - No Action - Cannot find Penalty Date or Plan Review Penalty Date.");
        }        
    }else{
        logDebug("PMT_CopyPenaltyDateToDueDate - No Action - appTypeString " + appTypeString + " is out of scope.");
    }

} catch (err) {
	logDebug("A JavaScript Error occured in PMT_CopyPenaltyDateToDueDate: " + err.message);
	logDebug(err.stack);
}
//logDebug("---------- end  PMT_CopyPenaltyDateToDueDate ----------");
