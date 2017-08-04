/*===================================================================
// Script Number: 393
// Script Name: PMT_IssueOnlinePermitACAjs
// Script Developer: Michael VanWie
// Script Agency: Mesa
// Script Description: When the Online Permit is submitted through ACA:
                            Update Task Status to "Issued"
                            Deactivate Task
                            Update Record Status to "Issued"
                            Execute Report "219 - Online Permit" and save it to the document tab
// Script Run Event: ASA
// Script Parents:
//	ASA;Permits!Online!NA!NA    
/*==================================================================*/

/* intellisense references */
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

try
{
    if(appMatch("Permits/Online/NA/NA"))
    {
        //Update Application Submittal to "Ready to Issue"
        branchTask("Application Submittal", "Ready To Issue", "Closed by Script 393", "Closed via Script 393");
        
        //Update Permit Issuance to "Issued"
        branchTask("Permit Issuance", "Issued", "Issued by Script 393", "Issued via Script 393");
        
        //Update App Status to "Issued"
        updateAppStatus("Issued", "Issued by Script 393");
		
		//upate the custom field Permit Issued Date
        editAppSpecific("Permit Issued Date", dateAdd(null,0);
		var typeOfWork = "" + getAppSpecific("Type of Work");
		if (typeOfWork == "Construction Noise Permit")
            {
				editAppSpecific("Permit Expiration Date", dateAdd(null,30);
			}
		else
			{
				editAppSpecific("Permit Expiration Date", dateAdd(null,180);
			}

        //Run and Attach report 39 Building Permit
		//adding retrieval of notification template that could be used to send email
		var tmpl = aa.communication.getNotificationTemplate("PMT_ONLINEPERMIT").getOutput();
		var ebody = tmpl.getEmailTemplateModel().getContentText();
		var esub = tmpl.getEmailTemplateModel().getTitle();
		var efrom = tmpl.getEmailTemplateModel().getFrom();
	
        var rParams = aa.util.newHashMap();
		rParams.put("RecordNumber", capIDString);
		//saving the report but the code below could be used to also send the email notification with the report by changing last param to true
		sendReportInThread(capId,capIDString,"Building Permit",rParams,"PERMITS","ADMIN",efrom,"","",esub,ebody,true,false);
       
    }
}
catch(ex)
{
    logDebug("Javascript error: " + ex.message);
    logDebug("Error Stack: " + ex.stack);
}