function getWFHours(capId) {
	// array to hold the tasks that were passed as extra parameters(arguments)
	var tasks = new Array;
	// variable for sum of hours
	var hoursSpent = 0;
	// Parse the tasks
	for(var x = 1;x < arguments.length; x++){
		tasks.push(arguments[x]);
	}
	
	// Get the workflow history
	var workflowResult = aa.workflow.getWorkflowHistory(capId, null);

	// Working with the workflow result
	if(workflowResult.getSuccess()){
		wfResult = workflowResult.getOutput(); // Get the output
		for(x in wfResult){ // Parse through each process in the workflow
			if(exists(wfResult[x].getTaskDescription(), tasks)){
				// add the hours spent.
				hoursSpent += Number(wfResult[x].getHoursSpent());
			}
		}
	}
	else {
		logDebug("getWFHours could not get a workflow history")
	}
	return hoursSpent;
}