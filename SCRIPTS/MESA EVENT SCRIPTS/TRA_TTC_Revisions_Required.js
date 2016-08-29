/*===================================================================
// Script Number: 291
// Script Name: TRA_TTC_Revisions_Required.js
// Script Description: When Traffic Review WF task is statused as Revisions Required Send email notification to Applicant & Barricade Contact that Revisions are required.
// Script Run Event: WTUA
// Script Parents:WTUA;Transportation!~!~!~.js
// Record Testing:  TTC2016-00836
// Version   |Date      |Engineer         |Details
//  1.0      |08/28/16  |Steve Veloudos   |Initial Release
/*==================================================================*/

try {
      var FromEmail = "noreply@mesaaz.gov";
      var ToEmail = "";
      var vEParams = aa.util.newHashtable();
      var Url = lookup("Agency_URL","ACA");
      var tStatus = "Revisions Required";
      var tName = "Traffic Review";
      var RecievedDate;
      var BCompany;

      //Get date
      RecievedDate = fileDate;
      
       //Get WF Task
       var tasks = aa.workflow.getTasks(capId).getOutput();
       for (t in tasks) 
        {
            //Check task name and status
            if (tasks[t].getDisposition() == tStatus && tasks[t].getTaskDescription() == tName)
            {            
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
                    if( TypeContact == "Barricade Company Contact" )
                    {
                         BCompany = tInfo[x]["email"];
                    }

                }
                //Add Barricade Company contact
                 ToEmail =  ToEmail + "," + BCompany;

                //Add Params
                addParameter(vEParams,"$$RECORDID$$",capIDString);
                addParameter(vEParams,"$$URLOFRECORDID$$",Url);
                addParameter(vEParams," $$RECEIVEDDATE$$",RecievedDate);
                
                //Send email
                sendNotification(FromEmail, ToEmail, "", "TRA_TTC_REVISIONS_REQUIRED", vEParams, null, capId); 
            }
        }     
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }