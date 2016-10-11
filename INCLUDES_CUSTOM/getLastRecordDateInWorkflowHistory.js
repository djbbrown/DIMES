//*===================================================================
//
// Script Name: getLastRecordDateInWorkflowHistory.js 
// Script Developer: Vance Smith
// Script Agency: City of Mesa
// Script Description:  
//		Returns the last audit date in the workflow history. 
//      Returns false if no workflow history.
// 
//==================================================================*/

/* intellisense references */
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/// <reference path="../../INCLUDES_BATCH.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

function getLastRecordDateInWorkflowHistory()
{ // optional capId
    var thisCapId;

	if (arguments.length == 1)
    {
		thisCapId = arguments[0];
    }
    else {
        thisCapId = capId;
    }

    var retDate = false;

	// get the workflow history
	var workflowResult = aa.workflow.getWorkflowHistory(thisCapId, null);

	// working with the workflow result
	if(workflowResult.getSuccess())
    {
		wfResult = workflowResult.getOutput(); // get the output
		for(x in wfResult){ // parse through each process in the workflow
            var audDate = new Date( wfResult[x].taskItem.auditDateString.replace("T", " ").replace(".0", "").replace("-", "/"));
            if ( retDate == false )
            {
                retDate = audDate;
            }
            else if ( retDate < audDate )
            {
                retDate = audDate;
            }
		}
	}
	else {
		logDebug("getLastRecordDateInWorkflowHistory() could not get a workflow history")
	}
	return retDate;
}