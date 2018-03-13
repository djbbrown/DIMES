/*===================================================================
// Script Number: 006
// Script Name: LIC_IssueLicenseFeeBalanceCheck.js
// Script Developer: Kevin Ford
// Script Agency: Accela
// Script Description: Prevent the status of "Issued" being set on the workflow task "Permit Issuance" if there is a balance due or assessed fees on the record that have not been invoiced. 
// Script Run Event: WorkflowTaskUpdateBefore
// Script Parents:
//            WTUB;Licenses!~!~!~
/*==================================================================*/

// Under this line create the function that will need to run at script runtime.
// the function will be called in the event ("WorkflowTaskUpdateBefore") major event.

try{
	if(
			(
						(wfTask == "Issue License" && wfStatus == "Issued")
						|| (wfTask == "License Issuance" && wfStatus == "Issued")
						|| (wfTask == "City Clerk" && wfStatus == "Applicant Notified")
						|| (wfTask == "License Application" && wfStatus == "Received")
						|| (wfTask == "Application Intake" && wfStatus == "Received")
						|| (wfTask == "Renewal Submittal" && wfStatus == "Renewed")
			)
			&& appTypeArray[3] == 'Application'
			&& (balanceDue > 0 || feeTotalByStatus("NEW") > 0)
	){
		showMessage = true;
		message = "";
		comment("All invoiced fees must be paid before selecting this status.");
		cancel = true;
	}
}
catch(err) {
	logDebug('Error in LIC_IssueLicenseFeeBalanceCheck: ' + err.message + "   ***StackTrace: " + err.stack);
}