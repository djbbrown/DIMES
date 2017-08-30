/*===================================================================
// Script Number: 387
// Script Name: PMT_Email_Workflow_Status_Change.js
// Script Description: 	Email to be sent anytime a status update is made in the workflow process.  This will be for all Permits record types EXCEPT PD Alarms and Fire.
// Script Run Event: WTUA
// Script Parents:WTUA;Permits!Addenda or Deferred!NA!NA.js
// WTUA;Permits!Commercial!NA!NA.js
// WTUA;Permits!Commercial!Annual Facilities!NA.js
// WTUA;Permits!Demolition!NA!NA.js
// WTUA;Permits!Document Retrieval!NA!NA.js
// WTUA;Permits!Master Plan!NA!NA.js
// WTUA;Permits!Online!NA!NA.js
// WTUA;Permits!Residential!NA!NA.js
// WTUA;Permits!Residential!Mobile Home!NA.js
// WTUA;Permits!Sign!NA!NA.js
// Version   |Date      |Engineer         |Details
//  1.0      |11/22/16  |Steve Veloudos   |Initial Release
//  2.0      |07/07/17  |Kevin Gurney	  |Updated to retrieve info notification template info and only send email when app status changes
//  3.0      |08/25/17  |Steve Allred     |Removed wfStatus parm and added addr parm (address)
/*==================================================================*/

try {
        var wfStatusChngResult;
		wfStatusChngResult = getWorkflowTaskAppStatus(wfTask,wfStatus);
		if(wfStatusChngResult !=null) {
        var ToEmail = "";
        var vEParams = aa.util.newHashtable();
      
		//retrieve template information
		var tmpl = aa.communication.getNotificationTemplate("PMT_WORKFLOW_STATUS_CHANGE").getOutput();
	    var ebody = tmpl.getEmailTemplateModel().getContentText();
	    var esub = tmpl.getEmailTemplateModel().getTitle();
	    var efrom = tmpl.getEmailTemplateModel().getFrom();

        //Get the contact info
        var tInfo = getContactArray();
        var rowCount = tInfo.length;
        var x = 0;
        //Get Email of Applicant
        for (x=0;x<=(rowCount-1);x++)
        {
            var TypeContact = tInfo[x]["contactType"];
            if( TypeContact == "Applicant" )
            {
                ToEmail = tInfo[x]["email"];
            }
        }
		
		//logDebug("ToEmail = " + ToEmail);
		
		//Get Address
		var addr = getAddress(capId);
		logDebug("Address = " + addr);
		
        //Add Params
        addParameter(vEParams,"$$RECORDID$$",capIDString);
        //addParameter(vEParams,"$$WORKFLOWSTEP$$",wfTask);
        addParameter(vEParams,"$$WORKFLOWSTATUS$$",wfStatus);
		addParameter(vEParams,"$$WORKFLOWCOMMENT$$",wfComment);
		addParameter(vEParams,"$$ADDRESS$$",addr);
		
        //Send email
        if(ToEmail){
			sendNotification(efrom, ToEmail, "", "PMT_WORKFLOW_STATUS_CHANGE", vEParams, null, capId);  
			}
		}
	}
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }