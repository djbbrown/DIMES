/*===================================================================
// Script Number: 378
// Script Name: ENG_IssuePermitFeeBalanceCheck.js
// Script Developer: Mong Ward
// Script Agency: Accela
// Script Description: Prevent the status of "Issued" being set on the workflow task "Permit Issuance" if there is a balance due or assessed fees on the record that have not been invoiced.
//						Also prevent Inspectins WFtask to final out if there is a balance due or assessed fees on the record that have not been invoiced.
// Script Run Event: WorkflowTaskUpdateBefore
// Script Parents:
//            WTUB;Engineering!Right of Way!~!~
//			  WTUB;​Engineering/Utilities/Non-City/Standard
/*==================================================================*/

// Under this line create the function that will need to run at script runtime.
// the function will be called in the event ("WorkflowTaskUpdateBefore") major event.

try 
{
	if(
		(
					(wfTask == "Permit Issuance" && wfStatus == "Issued")
					|| (wfTask == "LOA" && wfStatus == "Letter Sent")
					|| (wfTask == "Inspection" && wfStatus == "Final Inspection Complete")
					|| (wfTask == "Inspection" && wfStatus == "Final Inspections Complete")

		)
		
		&& (balanceDue > 0 || feeTotalByStatus("NEW") > 0)
	){
	showMessage = true;
	message = "";
	comment("All invoice fees must be paid before selecting this status.");
	cancel = true;
	}
}

 catch (err) 
 { 
   logDebug("A JavaScript error occurred: " + err.message); 
 } 
