//Start Script Permits DUA

var wfTaskStatusCheck = false;
if (capStatus == "Revisions Required" && isTaskActive("Plans Distribution")) {
	var wfTaskStatusCheck = true;
}
//logDebug("wfTaskStatusCheck = " + wfTaskStatusCheck);

if ((documentModelArray.size() > 0) && (wfTaskStatusCheck)) 	{
	for(var index = 0; index < documentModelArray.size(); index++){
		
		// Update workflow task for document to be reviewed

		if (documentModelArray.get(index).getDocCategory()=="Construction Documents") 
		{
			updateTask("Plans Distribution", "Revisions Received", "Updated by DUA event", "Updated by DUA event");
			//potentially send email
		}	
  		
	}
}
//End Script Permits DUA

var wfTaskStatusCheckAppSubmit = false;
if (capStatus == "Incomplete" && isTaskActive("Application Submittal")) {
	var wfTaskStatusCheckAppSubmit = true;
}
//logDebug("wfTaskStatusCheckAppSubmit = " + wfTaskStatusCheckAppSubmit);

if ((documentModelArray.size() > 0) && (wfTaskStatusCheckAppSubmit)) 	{
	for(var index = 0; index < documentModelArray.size(); index++){
		
		// Update workflow task for document to be reviewed

		if (documentModelArray.get(index).getDocCategory()=="Construction Documents") 
		{
			updateTask("Application Submittal", "Note", "Document Received - Updated by DUA event", "Document Received - Updated by DUA event");
			updateAppStatus("Submitted","Document Received");
			//potentially send email
		}	
  		
	}
}
//End Script Permits DUA