/*===================================================================
// Script Number: 176
// Script Name: PMT_PlanReviewHoursFee.js
// Script Developer: 
// Script Agency: 
// Script Description: When a  workflow status of "Approved", "Approved w/ Comments", or "Revisions Required" at wf task "Plan Review" 
// 					When a value is entered into the "Hours Spent" field within the wf "process form" on the "Plan Review" task, 
//                  assess the "Plan Review Fee" with the entered value.
//			update per Marisol.Vazquez : only do the fee assessment on the Plans Coordination" task set to "Ready to Issue"
// Script Run Event: WTUA
// Script Parents:
//            WTUA;Permits!Master Plan!NA!NA
/*==================================================================*/
//if (matches(wfTask, "Planning Review","Building Review","Fire Review","Civil Engineering Review")) {
	//if (matches(wfStatus, "Approved","Approved w/Comments","Revisions Required")) {
if(
	(wfTask == "Application Submittal" && wfStatus == "Accepted - Plan Review Not Req")
	|| (wfTask == "Plans Coordination" && wfStatus == "Ready to Issue")
) {
			// sum hours across tasks
		totHours  = getWFHours(capId,"Planning Review","Building Review","Fire Review","Civil Engineering Review");
		if (totHours > 0) {
			if (AInfo["Expedite"] == "Expedite"){
					logDebug("Invoicing "+totHours+" hours as Expedited");
					updateFee("MST040", "PMT_MST", "FINAL", totHours, "N");
			}
		    if (AInfo["Expedite"] == "Super Expedite") {
		    		logDebug("Invoicing "+totHours+" hours as Super-Expedited");
					updateFee("MST050", "PMT_MST", "FINAL", totHours, "N");
		    }
		}
		else {
			if (feeExists("MST040", "NEW", "INVOICED")) voidRemoveFee("MST040");
			if (feeExists("MST050", "NEW", "INVOICED")) voidRemoveFee("MST050");
		}
	//}	
}
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