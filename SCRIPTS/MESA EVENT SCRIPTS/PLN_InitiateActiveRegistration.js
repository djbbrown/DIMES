/*===================================================================
 Versions:
 9/20/2016-A	John Cheney			initial
 9/26/2016-A	John Cheney			wfStatus.equals changed to "Approved - Finalize Marking"
 11/1/2016-A	John Cheney			in new record: set Registration task = active
 4/12/2017      Michael VanWie		Added coping owner to registration record
 ---------------------------------------------------------------------
 Script Number: 250
 Script Name: PLN_InitiateActiveRegistration.js
 Script Developer: John Cheney
 Script Agency: Mesa
 Script Description:
   
When Workkflow Task "Planning Final Review" is updated to a status of "Approved"; 
- create a Planning/Group Home/Registration/NA.  
- Copy all ASI data from the Application record type to the new Registration record (like for like). 
- Set new record's "Registration Expiration Date" 365 days in the future.
- set new record's workflow task "Registration" to active
This creates a new Registration that is a child of the original Application.

Test records: GHAP16-00206,  GHAP16-00244(final review is not active task)  

specs: https://portal.accelaops.com/projects/Mesa/Lists/Script%20Tracker/DispForm.aspx?ID=250&Source=https%3A%2F%2Fportal%2Eaccelaops%2Ecom%2Fprojects%2FMesa%2FLists%2FScript%2520Tracker%2Factive%2Easpx%23InplviewHash7e331ea4%2D3c8e%2D4f93%2D9ce2%2D6518918cd44f%3DFilterField1%253DAssignedTo%2DFilterValue1%253DJohn%25252ECheney%252540mesaaz%25252Egov&ContentTypeId=0x010300D70AB462012E604593F2EB837FB5F3FD 

Script run events: WTUA
Script Parents:  WTUA;Planning!Group Home!Application!NA

/*==================================================================*/

logDebug("---------- start  PLN_InitiateActiveRegistration ----------");
try {
    if (wfTask.equals("Planning Final Review") && wfStatus.equals("Approved - Finalize Marking")){

        // create child record that is a registration, then copy data over
        // createChild() copies the following data from the current record to the new child record: parcels, contacts, property addresses
        var newId = createChild("Planning","Group Home", "Registration", "NA", capName);

        // copy asi fields (which also copies their values in contradiction to documentation .. go figure..)
        copyASIFields(capId,newId); 

		//Copy Owners
		copyOwner(capId, newId);

        // set expiration date of new record to 365 days in future
        var expireDate = new Date(dateAdd(null,365));
        editAppSpecific("Application Expiration Date", jsDateToASIDate(expireDate),newId);

        // set task "Registration" status = active
        activateTaskInRecord("Registration", newId);


        // get the id that humans use
        var newCustomId = newId.getCustomID();
        logDebug("PLN_InitiateActiveRegistration - Created Registration with ID = " + newCustomId);

    } else {
		logDebug("PLN_InitiateActiveRegistration - No Action - current task and status out of scope.");
	}
} catch (err) {
	logDebug("A JavaScript Error occured in PLN_InitiateActiveRegistration: " + err.message);
	logDebug(err.stack);
}
logDebug("---------- end  PLN_InitiateActiveRegistration ----------");

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
