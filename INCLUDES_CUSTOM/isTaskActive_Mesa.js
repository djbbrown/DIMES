//*===================================================================
//
// Script Name: isTaskActive_Mesa.js 
// Script Developer: Vance Smith
// Script Agency: City of Mesa
// Script Description:  
//		Checks if the task is active. Returns true or false.
// 
//==================================================================*/
function isTaskActive_Mesa(wfstr) // optional process name
{
	var useProcess = false;
	var processName = "";

	if (arguments.length == 2) {
		processName = arguments[1]; // subprocess
		useProcess = true;
	}

	var workflowResult = aa.workflow.getTaskItems(capId, wfstr, processName, null, null, "Y");
	if (workflowResult.getSuccess())
    {
		wfObj = workflowResult.getOutput();
    }
	else 
    {
		logDebug("**ERROR: Failed to get workflow object: " + s_capResult.getErrorMessage());
		return false;
	}

    if (wfObj.length == 0) 
    {
        logDebug("No workflow tasks returned.");
        return false;
    }
    else
    {
        for (i in wfObj)
        {
            fTask = wfObj[i];
            if (fTask.getTaskDescription().toUpperCase().equals(wfstr.toUpperCase()) && (!useProcess || fTask.getProcessCode().equals(processName)))
            {
                if (fTask.getActiveFlag().equals("Y"))
                {
                    logDebug(wfstr + " task is active!");
                    return true;
                }
                else
                {
                    logDebug(wfstr + " task is NOT active!");
                    return false;
                }
            }
        }
        // if we reach this point then the workflow task was not found, return false
        // this could be because the record has not reached that part in the workflow
        logDebug(wfstr + " task was not found, returning false.");
        return false;
    }
}