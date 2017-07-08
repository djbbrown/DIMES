/**
 * returns the application status that would be set for a particular workflow task and status
 * @param wfstr - Workflow Task Name
 * @param wfstat - Workflow Task Status to retrieve application status from
 * @returns {String} Application Status, null if task status update does not change the application status
 */

//aa.print(getWorkflowTaskAppStatus("Intake Fees", "Paid"));

function getWorkflowTaskAppStatus(wfstr, wfstat) // optional process name
{
	var useProcess = false;
	var processName = "";
	if (arguments.length == 3) {
		processName = arguments[2]; // subprocess
		useProcess = true;
	}

	var workflowResult = aa.workflow.getTaskItems(capId, wfstr, processName, null, null, null);
	if (workflowResult.getSuccess())
		var wfObj = workflowResult.getOutput();
	else {
		logMessage("**ERROR: Failed to get workflow object: " + s_capResult.getErrorMessage());
		return false;
	}

	if (!wfstat)
		wfstat = "NA";

	for (i in wfObj) {
		var fTask = wfObj[i];
		if (fTask.getTaskDescription().toUpperCase().equals(wfstr.toUpperCase()) && (!useProcess || fTask.getProcessCode().equals(processName))) {
			var statObj = aa.workflow.getTaskStatus(fTask, wfstat);
			if (statObj.getSuccess()) {
				var vTaskStatus = statObj.getOutput();
				return vTaskStatus.getApplicationStatus();
			} else {
				logDebug("Could not get status object")
				return false;
			}
		}
	}
	return false;
}
