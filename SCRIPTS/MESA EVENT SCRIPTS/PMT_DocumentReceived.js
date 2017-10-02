//Start Script Permits DUA

var wfTaskStatusCheck = false;
if (!matches(appTypeArray[1],"Fire","Police Department") && capStatus == "Revisions Required" && isTaskActive("Plans Distribution")) {
	var wfTaskStatusCheck = true;
}
//logDebug("wfTaskStatusCheck = " + wfTaskStatusCheck);

if ((documentModelArray.size() > 0) && (wfTaskStatusCheck) && (publicUser)) 	{
	for(var index = 0; index < documentModelArray.size(); index++)	{
		//Exclude Fire CAD Ordinance documents
		if (documentModelArray.get(index).getDocCategory() != "Fire CAD Ordinance")		{ 
			// Update workflow task for document to be reviewed
			updateTask("Plans Distribution", "Revisions Received", "Updated by DUA event", "Updated by DUA event");
			//potentially send email	
		}
	}
}

var wfTaskStatusCheckAppSubmit = false;
if (!matches(appTypeArray[1],"Fire","Police Department") && (capStatus == "Incomplete" || capStatus == "Incomplete Submittal") && isTaskActive("Application Submittal")) {
	var wfTaskStatusCheckAppSubmit = true;
}
//logDebug("wfTaskStatusCheckAppSubmit = " + wfTaskStatusCheckAppSubmit);

if ((documentModelArray.size() > 0) && (wfTaskStatusCheckAppSubmit) && (publicUser)) 	{
	for(var index = 0; index < documentModelArray.size(); index++)	{
		//Exclude Fire CAD Ordinance documents
		if (documentModelArray.get(index).getDocCategory() != "Fire CAD Ordinance")		{ 
			// Update workflow task for document to be reviewed
			updateTask("Application Submittal", "Note", "Document Received - Updated by DUA event", "Document Received - Updated by DUA event");
			updateAppStatus("Submitted","Document Received");
			//potentially send email
		}
	}
}
//End Script Permits DUA