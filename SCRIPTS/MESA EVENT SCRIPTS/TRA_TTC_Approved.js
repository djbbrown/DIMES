/*===================================================================
// Script Number: 290
// Script Name: TRA_TTC_Approved.js
// Script Description: When Traffic Review Task is statused as Approved - No Fees Automatically status permit Issuance Task to Issued and go to next task.
// Script Run Event: WTUA
// Script Parents:WTUA;Transportation!~!~!~.js
// Test Record: TTC16-00029
// Version   |Date      |Engineer         |Details
//  1.0      |09/19/16  |Steve Veloudos   |Initial Release
/*==================================================================*/

try {
      var tName = "TRAFFIC REVIEW"
      var tStatus = "APPROVED - NO FEES";
       
       //Get WF Task
       var tasks = aa.workflow.getTasks(capId).getOutput();
       for (t in tasks) 
        {
            //Check for Traffic review task
            if(tasks[t].getTaskDescription().toUpperCase() == tName)
            {
                //Check task status Approved No Fees
                if (tasks[t].getDisposition().toUpperCase() == tStatus)
                {
                    //Set Permit Issuance task to issued
                    updateTask("Permit Issuance","Issued","","");
                    setTask("Permit Issuance","N","Y");
                    
                    //Set the next task Inspection to open
                    setTask("Inspections","Y","N");
                }
            }
        }     
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }