/*===================================================================
// Script Number: 236
// Script Name: PLN_addGISAdHocTask.js
// Script Developer: Chris Godwin
// Script Agency: Woolpert
// Script Description: When the workflow task “Application Acceptance” results with task status “Accepted” add the Adhoc task “GIS Shape file”.
// Script Run Event: WorkflowTaskUpdateAfter
// Script Parents:
//            WTUA;Planning!Pre-Submittal!NA!NA
===================================================================*/

// Under this line create the function that will need to run at script runtime.
// the function will be called in the event ("WorkflowTaskUpdateAfter") major event.

if(wfTask == "Application Acceptance" && wfStatus == "Accepted"){
	addAdHocTask("WFADHOC_PROCESS", "GIS Shape File", "Added by Script");
}