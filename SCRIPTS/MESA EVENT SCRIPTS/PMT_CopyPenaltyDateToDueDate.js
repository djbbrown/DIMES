/*===================================================================
 Versions:
 9/19/2016-A	John Cheney			initial
 ---------------------------------------------------------------------
 Script Number: 334
 Script Name: PMT_CopyPenaltyDateToDueDate.js
 Script Agency: Mesa
 Script Description:
    	
Copy the date found in ASI field "Penalty Date" to the "Due Date" field on the wfTask for the following tasks:
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

The date in the Penalty Date ASI field should be copied to the Due Date field in EVERY "Review and 
Plans Coordination" workflow tasks in ALL PMT record types.  
This should occur on ASIUA.  The Penalty Date is calculated and populated via script (#66)

Permits\*\*\*    EXCEPT  Demo, Document Retrieval, Online, Commercial\Annual Facilities, Fire and PD

Test records: PMT16-00606, PMT16-00483
Test records of types to avoid:
    - demo: PMT16-00589,PMT16-00567
    - document: DOC16-00626,DOC16-00625
    - online:   PMT16-00572, PMT16-00534
    - annual: AFP16-00600, AFP16-00571
    - fire: FTP16-00596, 16EST-000141
    - police: ALR16-00728, ALR16-00727

specs: https://portal.accelaops.com/projects/Mesa/Lists/Script%20Tracker/DispForm.aspx?ID=334&Source=https%3A%2F%2Fportal%2Eaccelaops%2Ecom%2Fprojects%2FMesa%2FLists%2FScript%2520Tracker%2Factive%2Easpx  

task object model reference:
file://isrc01/ittechdocs/Applications/Dimes/EMSE-API-8_0_2-Doc/com/accela/aa/emse/dom/TaskItemScriptModel.html#setDueDate(com.accela.aa.emse.util.ScriptDateTime) 

Script run events: ASIUA
Script Parents:  ASIUA;Permits!~!~!~

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
