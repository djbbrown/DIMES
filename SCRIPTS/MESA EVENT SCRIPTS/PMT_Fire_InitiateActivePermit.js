/*===================================================================
 Script Number: 406
 Script Name: PMT_Fire_InitiateActivePermit.js
 Script Developer: Michael VanWie
 Script Agency: Mesa
 Script Description:
   
When Workflow Task "Permit Issuance" is updated to a status of "Issued"; 
- create a Permits/Fire/FSOP/Permit.  
- Copy all ASI data from the Application record type to the new Permit record (like for like). 
- Set new record's "Expiration Date" 365 days in the future.
- set new record's workflow task "FSOP Status" to active
This creates a new Permit that is a child of the original Application.

Test records:   

Script run events: WTUA
Script Parents:  WTUA;Permits!Fire!FSOP!Application
/*==================================================================*/

try {
    if (wfTask.equals("Permit Issuance") && wfStatus.equals("Issued")){

        // create child record that is a Permit, then copy data over
        // createChild() copies the following data from the current record to the new child record: parcels, contacts, property addresses
        var newId = createChild("Permits","Fire", "FSOP", "Permit", capName);

        // copy asi fields (which also copies their values in contradiction to documentation .. go figure..)
        copyASIFields(capId,newId); 

        // set expiration date of new record to 365 days in future
        var expireDate = new Date(dateAdd(null,365));
        editAppSpecific("Expiration Date", jsDateToASIDate(expireDate),newId);

        // set task "FSOP Status" status = active
        activateTaskInRecord("FSOP Status", newId);

        // get the id that humans use
        var newCustomId = newId.getCustomID();
        logDebug("PMT_Fire_InitiateActiveRegistration - Created Permit with ID = " + newCustomId);

    } else {
		logDebug("PMT_Fire_InitiateActiveRegistration - No Action - current task and status out of scope.");
	}
} catch (err) {
	logDebug("A JavaScript Error occured in PMT_Fire_InitiateActiveRegistration: " + err.message);
	logDebug(err.stack);
}
logDebug("---------- end  PMT_Fire_InitiateActiveRegistration ----------");

//////////////////// functions /////////////////////////////////////

function activateTaskInRecord(wfstr, recId) 
{
	var useProcess = false;
	var processName = "";
	if (arguments.length == 2) {
		processName = arguments[1]; // subprocess
		useProcess = true;
	}

	var workflowResult = aa.workflow.getTaskItems(recId, wfstr, processName, null, null, null);
	if (workflowResult.getSuccess())
		var wfObj = workflowResult.getOutput();
	else {
		logMessage("**ERROR: Failed to get workflow object: " + s_capResult.getErrorMessage());
		return false;
	}

	for (i in wfObj) {
		var fTask = wfObj[i];
		if (fTask.getTaskDescription().toUpperCase().equals(wfstr.toUpperCase()) && (!useProcess || fTask.getProcessCode().equals(processName))) {
			var stepnumber = fTask.getStepNumber();
			var processID = fTask.getProcessID();

			if (useProcess) {
				aa.workflow.adjustTask(recId, stepnumber, processID, "Y", "N", null, null)
			} else {
				aa.workflow.adjustTask(recId, stepnumber, "Y", "N", null, null)
			}
			logMessage("Activating Workflow Task: " + wfstr);
			logDebug("Activating Workflow Task: " + wfstr);
		}
	}
}
