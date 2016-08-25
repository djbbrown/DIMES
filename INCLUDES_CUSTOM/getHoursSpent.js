
function getHoursSpent(wfstr) { // optional process name

	var useProcess = false;
	var processName = "";
	if (arguments.length == 2) {
		processName = arguments[1]; // subprocess
		useProcess = true;
	}

	var retValue = 0;
	var workflowResult = aa.workflow.getTasks(capId);
 	if (workflowResult.getSuccess())
  	 	wfObj = workflowResult.getOutput();
  	else
  	  	{ logMessage("**ERROR: Failed to get workflow object: " + workflowResult.getErrorMessage()); return false; }
	
	for (i in wfObj) {
   		fTask = wfObj[i];
 		if (fTask.getTaskDescription().toUpperCase().equals(wfstr.toUpperCase())  && (!useProcess || fTask.getProcessCode().equals(processName))) {
			if (fTask.getHoursSpent() != null)
				retValue = fTask.getHoursSpent();
			break;
		}

	}
	return retValue;
}