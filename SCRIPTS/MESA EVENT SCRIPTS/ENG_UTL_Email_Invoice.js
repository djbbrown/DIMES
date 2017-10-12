/*===================================================================
// Script Name: ENG_UTL_Email_Invoice.js
// Script Description: 	Email to be sent after invoice has been issued
// for engineering utility
// Author: Suzanna Majchrzak
// Initial Date: 9/21/2017
//
// Task Status: InvoiceFeeAfter 
// Script Run Event: IFA
// Script Parents:IFA;UTIL!NA!NA.js
//
/*==================================================================*/
try {  

    if (feesInvoicedTotal > 0 && balanceDue  > 0){
        var url = lookup("Agency_URL","ACA");

         //Workflow Required and for ALL task types
        var vEParams = aa.util.newHashtable();         
        var emailAddress = lookup("EMAIL_RECIPIENTS", "ENG_UTL_NCU_EMAIL");

        //retrieve template information
        var tmpl = aa.communication.getNotificationTemplate("ENG_UTL_WORKFLOW_INVOICE_AFTER").getOutput();
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
                addParameter(vEParams, "$$EMAILCONTACT$$", emailAddress);
                addParameter(vEParams, "$$URL$$", url); 
                                 
                if (UtilityNo != null){
                    var utlNo = 'Utility Provider Project No: '+UtilityNo;
                    addParameter(vEParams,"$$UTILITYPROVIDERNO$$",utlNo);
                }                
                logDebug('parameters: '+ vEParams);
                    
                //Send email
                if(ToEmail){
                    logDebug("Sending an email to the following contact: (ENG_UTL_WORKFLOW_INVOICE_AFTER): " + ToEmail + "  Type of Contact: "+TypeContact);
                    sendNotification(efrom, ToEmail, "City of Mesa: Revisions Required", "ENG_UTL_WORKFLOW_INVOICE_AFTER", vEParams, null, capId);
                }
            }        
        }
        }
    }
    catch (err)
    {
    logDebug("A JavaScript Error occured: " + err.message);
    }


  