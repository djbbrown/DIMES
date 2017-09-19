/*===================================================================
// Script Number: 288
// Script Name: TRA_TTC_Incomplete_Submittal.js
// Script Description: When WF Task Application Submittal is statused "Incomplete Submittal" Send email notification to applicant and change Record status to "Incomplete".
// Script Run Event: WTUA
// Script Parents:WTUA;Transportation!~!~!~.js
// Test Record: TTC16-00020
// Version   |Date      |Engineer         |Details
//  1.0      |08/26/16  |Steve Veloudos   |Initial Release
//  1.0      |10/24/16  |Steve Veloudos   |Removed adjust the task status per Mong
/*==================================================================*/

try {
      var FromEmail = "noreply@mesaaz.gov";
      var ToEmail = "";
      var vEParams = aa.util.newHashtable();
      var Url = lookup("Agency_URL","ACA");
      var tStatus = "Incomplete Submittal";
       
       //Get WF Task
       var tasks = aa.workflow.getTasks(capId).getOutput();
       for (t in tasks) 
        {
            //Check task status
            if (tasks[t].getDisposition() == tStatus)
            {
              //Get task name
              var tName = tasks[t].getTaskDescription();
              
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
                        var ToEmail = tInfo[x]["email"];
                    }
                }
                //Add Params
                addParameter(vEParams,"$$RECORDID$$",capIDString);
                addParameter(vEParams,"$$URLTTCPERMIT$$",Url);
				addParameter(vEParams,"$$WORKFLOWCOMMENT$$",wfComment);
 
                //Send email
                sendNotification(FromEmail, ToEmail, "", "TRA_TTC_INCOMPLETE_SUBMITTAL", vEParams, null, capId); 

                //Set status to Incomplete
                //setTask(tName,"N","N");
            }
        }     
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }