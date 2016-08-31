/*===================================================================*/
// Script Number: 243
// Script Name: PLN_Applicant_Status_Change.js
// Script Description: Send email to Applicant for record status changes   
// Script Run Event: WTUA;Planning!Pre-Submittal!~!~
// Testing Record: PMT16-00498
// Version   |Date      |Engineer         |Details
//  1.0      |08/31/16  |Steve Veloudos   |Initial Release 
/*==================================================================*/

try {
      var FromEmail = "noreply@mesaaz.gov";
      var ToEmail;
      var vEParams = aa.util.newHashtable();
      var AppStatus;
      var StatusType = 0;
      var ConType;
      var AppToEmail;
 
    //Get application status
    AppStatus = capStatus;
    
    //Set status type
    if (AppStatus == "Withdrawn")
        {
        StatusType = 1;
        }
    
    if (AppStatus == "Distributed")
        {
        StatusType = 2;
        }
    
    //Add parms
    addParameter(vEParams,"$$RECORDID$$",capIDString);

    //Get the contact info
    var tInfo = getContactArray();
    var rowCount = tInfo.length;
    var x = 0;

    //Get Email of Complainant
    for (x=0;x<=(rowCount-1);x++)
        {
            ConType = tInfo[x]["contactType"];
            if(ConType == "Applicant" )
            {
            var AppToEmail = tInfo[x]["email"];
            }
        } 

    //Send Email if correct doc category
    if(StatusType != 0)
      {
        //Withdrawn
        if(StatusType == 1)
        {
            //Email Staff
            ToEmail = lookup("EMAIL_RECIPIENTS","Planning_Staff_Application_Withdrawn");
            sendNotification(FromEmail, ToEmail, "", "WITHDRAWN NOTIFICATION - STAFF", vEParams, null, capId);
            
            //Email Applicant
            if(AppToEmail !="")
            {
            sendNotification(FromEmail, AppToEmail, "", "WITHDRAWN NOTIFICATION - APPLICANT", vEParams, null, capId);
            }
        }
        //Distributed
        if(StatusType == 2)
        {
            //Email Staff
            ToEmail = lookup("EMAIL_RECIPIENTS","Planning_Staff_Application_Distribution");
            sendNotification(FromEmail, ToEmail, "", "DISTRIBUTION LIST - STAFF", vEParams, null, capId);
            
            //Email Applicant
            if(AppToEmail !="")
            {
            sendNotification(FromEmail, AppToEmail, "", "DISTRIBUTION LIST - APPLICANT", vEParams, null, capId);
            }
        }
      
      }
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }