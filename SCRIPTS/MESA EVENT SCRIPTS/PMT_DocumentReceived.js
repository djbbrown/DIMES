//Start Script Permits DUA

//Plans Distribution
var wfTaskStatusCheck = false;
if (!matches(appTypeArray[1],"Fire","Police Department") && (matches(capStatus, "Revisions Required", "Incomplete")) && isTaskActive("Plans Distribution")) {
	var wfTaskStatusCheck = true;
}
//logDebug("wfTaskStatusCheck = " + wfTaskStatusCheck);

if ((documentModelArray.size() > 0) && (wfTaskStatusCheck) && (publicUser)) 	{
	for(var index = 0; index < documentModelArray.size(); index++)	{
		//Exclude Fire CAD Ordinance documents
		if (documentModelArray.get(index).getDocCategory() != "Fire CAD Ordinance")		{ 
			// Update workflow task for document to be reviewed
			var todayDateStr = getTodayAsString();
			var comment = "Updated by DUA event";
			if (todayDateStr != null){
				 comment = comment + " On: "+todayDateStr;
			}

			updateTask("Plans Distribution", "Revisions Received", comment, comment);
			//potentially send email	
		}
	}
}

//Application Submittal
var wfTaskStatusCheckAppSubmit = false;
if (!matches(appTypeArray[1],"Fire","Police Department") && (matches(capStatus, "Incomplete", "Incomplete Submittal")) && isTaskActive("Application Submittal")) {
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