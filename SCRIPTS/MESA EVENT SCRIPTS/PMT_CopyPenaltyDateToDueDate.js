/*===================================================================
 
 NOT DONE YET!!  BUILD IN EXCEPTION PERMIT TYPES TO AVOID!!
 
 
 Versions:
 9/15/2016-A	John Cheney			initial
 ---------------------------------------------------------------------
 Script Number: 334
 Script Name: PMT_CopyPenaltyDateToDueDate.js
 Script Developer: John Cheney
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

The date in the Penalty Date ASI field should be copied to the Due Date field in EVERY Review and 
Plans Coordination workflow tasks in ALL PMT record types.  
This should occur on ASIUA.  The Penalty Date is calculated and populated via script (#66)

Permits\*\*\*    EXCEPT  Demo, Document Retrieval, Online, Commercial\Annual Facilities, Fire and PD

Test records: ?? PMT16-00606, PMT16-00483

specs: https://portal.accelaops.com/projects/Mesa/Lists/Script%20Tracker/DispForm.aspx?ID=334&Source=https%3A%2F%2Fportal%2Eaccelaops%2Ecom%2Fprojects%2FMesa%2FLists%2FScript%2520Tracker%2Factive%2Easpx  

task object model reference:
file://isrc01/ittechdocs/Applications/Dimes/EMSE-API-8_0_2-Doc/com/accela/aa/emse/dom/TaskItemScriptModel.html#setDueDate(com.accela.aa.emse.util.ScriptDateTime) 

Script run events: ASIUA
Script Parents:  ASIUA;Permits!~!~!~

/*==================================================================*/

logDebug("---------- start  PMT_CopyPenaltyDateToDueDate ----------");
try {
    
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
            var taskCount = 0;
            for (t in tasks) {
                var tName = tasks[t].getTaskDescription();
                //tasks[t].setDueDateString(dueDate); // does not throw errors, but evidently does not update DueDate (?)
                //tasks[t].setDueDate(dueDate); // date not correct object type
                editTaskDueDate(tName, dueDate);
                
                //var tDate1 = tasks[t].getDueDate();
                var tDate2 = getTaskDueDate(tName); 
                //logDebug("- task = " + tName + " - tDate2 = " + tDate2);
                taskCount = taskCount + 1;
            }
            
            logDebug("PMT_CopyPenaltyDateToDueDate - Set dueDate = " + dueDate + " in " + taskCount + " tasks.");

        } else {
            logDebug("PMT_CopyPenaltyDateToDueDate - No Action - No Tasks found.");    
        }
    }
    else{
        logDebug("PMT_CopyPenaltyDateToDueDate - No Action - Cannot find Penalty Date or Plan Review Penalty Date.");
    }

} catch (err) {
	logDebug("A JavaScript Error occured in PMT_CopyPenaltyDateToDueDate: " + err.message);
	logDebug(err.stack);
}
logDebug("---------- end  PMT_CopyPenaltyDateToDueDate ----------");
