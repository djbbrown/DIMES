/*===================================================================
// Script Name: ENG_UTL_EMail.js
// Script Description: 	Email to be sent any of the following status update
// Author: Suzanna Majchrzak
// Initial Date: 9/21/2017
//
// Task Status: Issued, Task : Permit Issuance
// Task Status: Revisions Required except Plans Distributions
// Task Status: Revisions Received, Task: Plans Distributions
// Script Run Event: WTUA
// Script Parents:WTUA;UTIL!NA!NA.js
//
/*==================================================================*/
try {  

    var url = lookup("Agency_URL","ACA");

    //Workflow Required and for ALL task types
    if ((wfTask != "Plans Coordination" && wfStatus == "Revisions Required" ))
    { 
            var vEParams = aa.util.newHashtable();         
            var emailAddress = lookup("EMAIL_RECIPIENTS", "ENG_UTL_NCU_EMAIL");

            //retrieve template information
            var tmpl = aa.communication.getNotificationTemplate("ENG_UTL_WORKFLOW_REVISIONREQUIRED").getOutput();
            var ebody = tmpl.getEmailTemplateModel().getContentText();
            var esub = tmpl.getEmailTemplateModel().getTitle();
            var efrom = tmpl.getEmailTemplateModel().getFrom();

            //Get the contact info
            var tInfo = getContactArray();
            var rowCount = tInfo.length;
            
            var UtilityNo = AInfo["Utility Provider Project No."];        

            //Get Email of Applicant
            for (var x=0;x<=(rowCount-1);x++)
            {
                var TypeContact = tInfo[x]["contactType"];
                if( TypeContact == "Applicant" || TypeContact == "Contact")  {
                
                    var ToEmail = tInfo[x]["email"];
                   
                    //Add Params
                    addParameter(vEParams,"$$RECORDID$$",capIDString);
                    addParameter(vEParams,"$$WORKFLOWSTATUS$$",wfStatus);
                    addParameter(vEParams, "$$URL$$", url);                          
                    
                    if (wfComment != null){
                        var comments = 'Comments: '+ wfComment;
                        addParameter(vEParams,"$$WORKFLOWCOMMENT$$",comments);
                    }

                    if (UtilityNo != null){
                        var utlNo = 'Utility Provider Project No: '+UtilityNo;
                        addParameter(vEParams,"$$UTLITYPROVIDERNO$$",utlNo);
                    }
            
                    addParameter(vEParams, "$$EMAILCONTACT$$", emailAddress);                    
            
                    logDebug('parameters: '+ vEParams);
                    
                    //Send email
                    if(ToEmail){
                        logDebug("Sending an email to the following contact: (ENG_UTL_WORKFLOW_REVISIONREQUIRED): " + ToEmail + "  Type of Contact: "+TypeContact);
                        sendNotification(efrom, ToEmail, "City of Mesa: Revisions Required", "ENG_UTL_WORKFLOW_REVISIONREQUIRED", vEParams, null, capId);
                    }
                    }        
            }
    }
    else if ((wfTask == "Permit Issuance" && wfStatus == "Issued"))
    {
           
            var vEParams = aa.util.newHashtable();
            var emailAddress = lookup("EMAIL_RECIPIENTS", "ENG_UTL_NCU_EMAIL");

            //retrieve template information
            var tmpl = aa.communication.getNotificationTemplate("ENG_UTL_WORKFLOW_PERMIT_ISSUED").getOutput();
            var ebody = tmpl.getEmailTemplateModel().getContentText();
            var esub = tmpl.getEmailTemplateModel().getTitle();
            var efrom = tmpl.getEmailTemplateModel().getFrom();
            
            //Get the contact info
            var tInfo = getContactArray();
            var rowCount = tInfo.length;
                    
            //Get Email of Applicant
            for (var x=0;x<=(rowCount-1);x++)
            {
                var TypeContact = tInfo[x]["contactType"];
                if( TypeContact == "Applicant" || TypeContact == "Contact")  {
                            
                    ToEmail = tInfo[x]["email"];
            
                    //Add Params
                    addParameter(vEParams,"$$RECORDID$$",capIDString);
                    addParameter(vEParams,"$$WORKFLOWSTATUS$$",wfStatus);
                    addParameter(vEParams, "$$URL$$", url);                          
                    
                    if (wfComment != null){
                        var comments = 'Comments: '+ wfComment;
                        addParameter(vEParams,"$$WORKFLOWCOMMENT$$",comments);
                     }
                    
                    addParameter(vEParams, "$$EMAILCONTACT$$", emailAddress);
                    
                    logDebug('parameters: '+ vEParams);
                            
                    //Send email
                    if(ToEmail){
                        logDebug("Sending an email to the following contact: (ENG_UTL_WORKFLOW_PERMIT_ISSUED): " + ToEmail + "  Type of Contact: "+TypeContact);
                        sendNotification(efrom, ToEmail, "City of Mesa: Revisions Required", "ENG_UTL_WORKFLOW_PERMIT_ISSUED", vEParams, null, capId);
                    }
                }        
            }
        }
        else if ((wfTask == "Plans Distribution" && wfStatus == "Revisions Received"))
        {
                
                var vEParams = aa.util.newHashtable();                   
                var emailAddress = lookup("EMAIL_RECIPIENTS", "ENG_UTL_NCU_EMAIL");
    
                //retrieve template information
                var tmpl = aa.communication.getNotificationTemplate("ENG_UTL_WORKFLOW_REVISION_RECEIVED").getOutput();
                var ebody = tmpl.getEmailTemplateModel().getContentText();
                var esub = tmpl.getEmailTemplateModel().getTitle();
                var efrom = tmpl.getEmailTemplateModel().getFrom();
                
              
                ToEmail = emailAddress;
                
                logDebug("ToEmail = " + ToEmail);
                logDebug("efrom = " + efrom);
                logDebug("TypeContact = " + TypeContact);
                                
                //Add Params
                addParameter(vEParams,"$$RECORDID$$",capIDString);
                addParameter(vEParams,"$$WORKFLOWSTATUS$$",wfStatus);
                addParameter(vEParams, "$$URL$$", url);                          
                        
                if (wfComment != null){
                        var comments = 'Comments: '+ wfComment;
                        addParameter(vEParams,"$$WORKFLOWCOMMENT$$",comments);
                }
                        
                addParameter(vEParams, "$$EMAILCONTACT$$", emailAddress);
                        
                logDebug('parameters: '+ vEParams);
                                
                //Send email
                if(ToEmail){
                    logDebug("Sending an email to the following contact: (ENG_UTL_WORKFLOW_REVISION_RECEIVED): " + ToEmail + "  Type of Contact: "+TypeContact);                                                                        
                    sendNotification(efrom, ToEmail, "City of Mesa: Revisions Required", "ENG_UTL_WORKFLOW_REVISION_RECEIVED", vEParams, null, capId);
                }
        }                          
    }
    catch (err)
    {
    logDebug("A JavaScript Error occured: " + err.message);
    }

  

