/*===================================================================
// Script Number: 367
// Script Name: PMT_SetPermitIssuedDate.js
// Script Description: 	When the workflow task Permit Issuance is set to a status Issued, copy the status date to the ASI field Permit Issued Date
// Script Run Event: WTUA
// Script Parents:WTUA;Permits/Addenda or Deferred/NA/NA
// Permits/Commercial/NA/NA
// Permits/Commercial/Annual Facilities/NA
// Permits/Demolition/NA/NA 
// Permits/Document Retrieval/NA/NA
// Permits/Master Plan/NA/NA
// Permits/Online/NA/NA
// Permits/Residential/Mobile Home/NA
// Permits/Residential/NA/NA
// Permits/Sign/NA/NA
// Test Record: PMT16-00947
// Version   |Date      |Engineer         |Details
//  1.0      |10/12/16  |Steve Veloudos   |Initial Release
/*==================================================================*/

try {
       var StatusDate;
       
       //Get WF Task
       var tasks = aa.workflow.getTasks(capId).getOutput();
       for (t in tasks) 
        {
            //Check for Planning Review Task
            if(tasks[t].getTaskDescription().toUpperCase() == "PERMIT ISSUANCE")
            {
                //Check task status 
                if (tasks[t].getDisposition().toUpperCase() == "ISSUED")
                {
                  //Get & assign status date
                  StatusDate =  (tasks[t].getStatusDate().getMonth() + 1) + "/" + tasks[t].getStatusDate().getDate() + "/" + (tasks[t].getStatusDate().getYear() + 1900);
                  editAppSpecific("Permit Issued Date", StatusDate);
		        }              
            }
        }     
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }