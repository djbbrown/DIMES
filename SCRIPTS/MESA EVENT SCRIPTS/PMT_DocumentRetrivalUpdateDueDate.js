//*===================================================================
// Issue Number: 63
// Script Number: --- 
// Script Name: PMT_DocumentRetrivalUpdateDueDate.js
// Script Developer: Michael VanWie
// Script Agency: City of Mesa
// Script Description: 
// 		After "Document Retrieval"'s status is updated to "Accepted - Legal Required"
//      Set "PIO/Legal Review" due date to Penalty Date
//
// Script Run Event: WTUA
// Script Parents:
//             WTUA:Permit/Document Retrieval/NA/NA
// 
//==================================================================*/
try
{
    if(wfTask == "Document Retrieval" && wfStatus == "Accepted - Legal Required")
    {
        var taskResult = aa.workflow.getTask(capId, "PIO/Legal Review");

        if(taskResult.getSuccess())
        {
            var task = taskResult.getOutput();
            var penDate = aa.util.parseDate(AInfo["Penalty Date"]);
            var taskItem = task.getTaskItem()

            logDebug("Task Due Date Before: " + convertDate(taskItem.getDueDate()));
            logDebug("Updating Due Date for " + taskItem.getTaskDescription());

            taskItem.setDueDate(penDate);

            logDebug("Task Due Date After: " + taskItem.getDueDate());
        }
    }
}
catch (err)
{
    logDebug("Javascript Error: " + err.message);
}