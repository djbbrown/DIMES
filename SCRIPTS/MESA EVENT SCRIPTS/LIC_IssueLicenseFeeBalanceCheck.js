/*===================================================================
// Script Number: 006
// Script Name: LIC_IssueLicenseFeeBalanceCheck.js
// Script Developer: Kevin Ford
// Script Agency: Accela
// Script Description: Prevent the status of "Issued" being set on the workflow task "Permit Issuance" if there is a balance due or assessed fees on the record that have not been invoiced. 
// Script Run Event: WorkflowTaskUpdateBefore
// Script Parents:
//            WTUB;Licenses!~!~!~
// Updates:
// -----------------------------------------------------------------------------
// | BY         |    DATE      |  NOTES
// -----------------------------------------------------------------------------
// | M VanWie   |  03/13/2018  | - Expanded to check Peddler Renewal and made it easier to include more WTUB checks
// |            |              | - Added Try / Catch
// | M VanWie   |  03/19/2018  | - Added fee check for [Renewal License / Issued]
/*==================================================================*/

// Under this line create the function that will need to run at script runtime.
// the function will be called in the event ("WorkflowTaskUpdateBefore") major event.

try {
	var appTasks = ["Issue License", "License Issuance", "City Clerk", "License Application", "Application Intake"];
	var appStatus = ["Issued", "Applicant Notified", "Received"]
	
	var rnwTasks = ["Renewal Submittal", "Renew License"];
	var rnwStatus = ["Renewed", "Issued"];
	
	if( ((IsStrInArry(wfTask, appTasks) && IsStrInArry(wfStatus, appStatus) && appTypeArray[3] == "Application")
			||
		(IsStrInArry(wfTask, rnwTasks) && IsStrInArry(wfStatus, rnwStatus) && appTypeArray[3] == "Renewal"))
		&&
		(balanceDue > 0 || feeTotalByStatus("NEW") > 0)
	  ){
		showMessage = true;
		message = "";
		comment("All invoiced fees must be paid before selecting this status.");
		cancel = true;
	  }
		
}
catch(err){
	logDebug('Error in LIC_IssueLicenseFeeBalanceCheck: ' + err.message + "   ***StackTrace: " + err.stack);
}