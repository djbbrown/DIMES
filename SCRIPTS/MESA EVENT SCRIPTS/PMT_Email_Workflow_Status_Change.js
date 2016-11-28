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
/*==================================================================*/

try {
        var FromEmail = "noreply@mesaaz.gov";
        var ToEmail = "";
        var vEParams = aa.util.newHashtable();
        var status;
        var description;

        //Get workflow status & description
        status = wfStatus;
        description = wfTask;

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

        //Add Params
        addParameter(vEParams,"$$RECORDID$$",capIDString);
        addParameter(vEParams,"$$WORKFLOWSTEP$$",description);
        addParameter(vEParams,"$$WORKFLOWSTATUS$$",status);

        //Send email
        sendNotification(FromEmail, ToEmail, "", "PMT_WORKFLOW_STATUS_CHANGE", vEParams, null, capId);    
          
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }