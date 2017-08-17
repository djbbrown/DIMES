/*===================================================================*/
// Script Number: 243
// Script Name: PLN_Applicant_Status_Change.js
// Script Description: Send email to Applicant for record status changes   
// Script Run Event: WTUA;Planning!Pre-Submittal!~!~
// Version   |Date      |Engineer         |Details
//  1.0      |08/31/16  |Steve Veloudos   |Initial Release  
//  1.1      |09/15/16  |Steve Veloudos   |Adjusted Phone Incomplete Status  
//  1.2      |12/06/16  |Steve Veloudos   |Added the workflow comments when app status is Incomplete 
//  1.3      |07/19/17  |Steve Allred     |Disabled email to Applicant on AppStatus = "Distributed"
/*==================================================================*/

try {
	var FromEmail = "noreply@mesaaz.gov";
    var ToEmail;
    var vEParams = aa.util.newHashtable();
    var AppStatus;
    var StatusType = 0;
    var ConType;
    var AppToEmail;
    var PlanningPhone;
    var tStatus = "Incomplete";
 
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
    if (AppStatus == "Incomplete")
        {
        StatusType = 3;
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

    //Send Email if correct record status
    if(StatusType != 0)
		{
			//Get Planner
			var taskResult = aa.workflow.getTask(capId, wfTask); 

			if (taskResult.getSuccess()) 	
				{ 
				var taskOutput = taskResult.getOutput(); 
				var taskAssignStaff = taskOutput.getAssignedStaff(); 
				var taskAssignStaffUser = aa.person.getUser(taskAssignStaff.getFirstName(), taskAssignStaff.getMiddleName(), taskAssignStaff.getLastName()).getOutput(); 
				ToEmail = taskAssignStaffUser.getEmail(); 
				}		
			//Withdrawn
			if(StatusType == 1)
				{
					//Email Planner
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
				//Email Planner
				sendNotification(FromEmail, ToEmail, "", "DISTRIBUTION LIST - STAFF", vEParams, null, capId);
				}
			//Incomplete
			if(StatusType == 3)
				{           
					//Get the employee that put the record in Incomplete
					var taskActBy = getTaskActionBy("Application Acceptance");
					var iNameResult = aa.person.getUser(taskActBy);
					
					//Get phone number
					if (iNameResult.getSuccess())
						{
					var iUserObj = iNameResult.getOutput();
					PlanningPhone = iUserObj.getPhoneNumber();
						}

					//Get workflow comments
					var comments = wfComment;
					
					addParameter(vEParams,"$$PLANNINGPHONE$$",PlanningPhone);
					addParameter(vEParams,"$$COMMENTS$$",comments);
					
					//Email Applicant
					if(AppToEmail !="")
						{
					sendNotification(FromEmail, AppToEmail, "", "INCOMPLETE SUBMITTAL - APPLICANT", vEParams, null, capId);
						}
				}
		  
		}
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }