/*===================================================================
// Script Number: 117
// Script Name: PMT_preventIssuanceWithBalanceDue.js
// Script Developer: Christopher Godwin
// Script Agency: Woolpert
// Script Description: Prevent the status of "Issued" being set on the workflow task "Permit Issuance" if there is a balance due or assessed fees on the record that have not been invoiced. 
// Script Run Event: WorkflowTaskUpdateBefore
// Script Parents:
//            WTUB;Licenses!~!~!~
/*==================================================================*/

// Under this line create the function that will need to run at script runtime.
// the function will be called in the event ("WorkflowTaskUpdateBefore") major event.

if(
		(
					(wfTask == "Issue License" && wfStatus == "Issued")
					|| (wfTask == "License Issuance" && wfStatus == "Issued")
		)
		&& (balanceDue > 0 || feeTotalByStatus("NEW") > 0)
){
	showMessage = true;
	message = "";
	comment("All invoiced fees must be paid before selecting this status.");
	cancel = true;
}