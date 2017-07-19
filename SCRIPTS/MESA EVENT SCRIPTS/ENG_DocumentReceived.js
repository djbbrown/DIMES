//Start Script Permits DUA

var wfTaskStatusCheck = false;
if (capStatus == "Revisions Required" && isTaskActive("Plans Distribution")) {
	var wfTaskStatusCheck = true;
}
//logDebug("wfTaskStatusCheck = " + wfTaskStatusCheck);

if ((documentModelArray.size() > 0) && (wfTaskStatusCheck) && (publicUser)) 	{
		// Update workflow task for document to be reviewed

		updateTask("Plans Distribution", "Revisions Received", "Updated by DUA event", "Updated by DUA event");
		//potentially send email	
  		
	
}
//End Script Permits DUA

var wfTaskStatusCheckAppSubmit = false;
if (capStatus == "Incomplete Submittal" && isTaskActive("Application Submittal")) {
	var wfTaskStatusCheckAppSubmit = true;
}
//logDebug("wfTaskStatusCheckAppSubmit = " + wfTaskStatusCheckAppSubmit);

if ((documentModelArray.size() > 0) && (wfTaskStatusCheckAppSubmit) && (publicUser)) 	{
	// Update workflow task for document to be reviewed

	updateTask("Application Submittal", "Note", "Document Received - Updated by DUA event", "Document Received - Updated by DUA event");
	updateAppStatus("Submitted","Document Received");
	//potentially send email

}
//End Script Permits DUA