//Start Script Permits DUA

var wfTaskStatusCheck = false;
if (capStatus == "Revisions Required" && isTaskActive("Distribution")) {
	var wfTaskStatusCheck = true;
}
//logDebug("wfTaskStatusCheck = " + wfTaskStatusCheck);

if ((documentModelArray.size() > 0) && (wfTaskStatusCheck)) 	{
	for(var index = 0; index < documentModelArray.size(); index++){
		
		// Update workflow task for document to be reviewed

		if (documentModelArray.get(index).getDocCategory()=="Construction Documents") 
		{
			updateTask("Distribution", "Revisions Received", "Updated by DUA event", "Updated by DUA event");
			//potentially send email
		}	
  		
	}
}
//End Script Permits DUA