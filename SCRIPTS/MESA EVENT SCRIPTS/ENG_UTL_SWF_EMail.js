/*===================================================================
// Script Name: ENG_UTL_SWF_EMail.js
// Script Description: 	Email to be sent any of the following status update
// for Small Wireless Facility (SWF)
// Author: Suzanna Majchrzak
// Initial Date: January 9, 2018
//
// Task Status: Received
// Event: ASA
//
/*==================================================================*/
try {  
        var capStatus = cap.getCapStatus();
    
        //Workflow Required and for ALL task types
        if ((capStatus == "Received" ))
        { 
                var vEParams = aa.util.newHashtable();         
                var ToEmail = lookup("EMAIL_RECIPIENTS", "ENG_UTL_SWF_EMAIL");
    
                //retrieve template information
                var tmpl = aa.communication.getNotificationTemplate("ENG_UTL_SWF_RECEIVED").getOutput();
                var ebody = tmpl.getEmailTemplateModel().getContentText();
                var esub = tmpl.getEmailTemplateModel().getTitle();
                var efrom = tmpl.getEmailTemplateModel().getFrom();
    
                //Get the contact info
                var tInfo = getContactArray();
                var rowCount = tInfo.length;
                var AntennaSiteNumber = AInfo["Antenna Site Number:"];  
                addParameter(vEParams,"$$RECORDID$$",capIDString);
                addParameter(vEParams, "$$APPLICATIONPROJECTNUMBER$$", AntennaSiteNumber);                    
    
                for (var x=0;x<=(rowCount-1);x++)
                {
                    var TypeContact = tInfo[x]["contactType"];
                    var FirstName = "";
                    var LastName = "";
                    if( TypeContact == "Applicant" )  {
                    
                        var FirstName = tInfo[x]["firstName"];
                        var LastName = tInfo[x]["lastName"];
                        addParameter(vEParams,"$$APPLICANTNAME$$",FirstName+ " " + LastName);
                    }           
                }
                
                //Send email
                 if(ToEmail){
                    logDebug("Sending an email to the following contact: (ENG_UTL_SWF_RECEIVED): " + ToEmail );
                    sendNotification(efrom, ToEmail, "City of Mesa: Small Wireless Facility: Application Received", "ENG_UTL_SWF_RECEIVED", vEParams, null, capId);
                 }        
        }
        }
        catch (err)
        {
        logDebug("A JavaScript Error occured: " + err.message);
        }
    

  

