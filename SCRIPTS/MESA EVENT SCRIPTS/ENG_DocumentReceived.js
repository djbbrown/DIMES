//Start Script Permits DUA

var wfTaskStatusCheck = false;
if (capStatus == "Revisions Required" && isTaskActive("Plans Distribution")) {
	var wfTaskStatusCheck = true;
}
//logDebug("wfTaskStatusCheck = " + wfTaskStatusCheck);

if ((documentModelArray.size() > 0) && (wfTaskStatusCheck) && (publicUser)) 	{
		// Update workflow task for document to be reviewed

		updateTask("Plans Distribution", "Revisions Received", "Updated by DUA event", "Updated by DUA event");

		//Send Email to Engineering Team.
		var vEParams = aa.util.newHashtable();                   

		var recordType = "Engineering/Utilities/Non-City/Small Wireless Facility";
		
			//check the record type to verify it is a Small Wireless Facility record type for Email DL
		if(appMatch(recordType)) {
			var emailAddress = lookup("EMAIL_RECIPIENTS", "ENG_UTL_SWF_EMAIL");
		}
		else {   
			var emailAddress = lookup("EMAIL_RECIPIENTS", "ENG_UTL_NCU_EMAIL");
		}

		//retrieve template information
		var tmpl = aa.communication.getNotificationTemplate("ENG_UTL_WORKFLOW_REVISION_RECEIVED").getOutput();
		var ebody = tmpl.getEmailTemplateModel().getContentText();
		var esub = tmpl.getEmailTemplateModel().getTitle();
		var efrom = tmpl.getEmailTemplateModel().getFrom();
		//Add Params
		addParameter(vEParams,"$$RECORDID$$",capIDString);
		addParameter(vEParams, "$$EMAILCONTACT$$", emailAddress);
										
		//Send email
		if(emailAddress){
			logDebug("Sending an email to the following contact: (ENG_UTL_WORKFLOW_REVISION_RECEIVED): " + emailAddress );                                                                        
			sendNotification(efrom, emailAddress, "City of Mesa: Revisions Required", "ENG_UTL_WORKFLOW_REVISION_RECEIVED", vEParams, null, capId);
		}
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