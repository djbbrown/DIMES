/*===================================================================
// Script Number: 290
// Script Name: TRA_TTC_Approved.js
// Script Description: When Traffic Review Task is statused as Approved - No Fees Automatically status permit Issuance Task to Issued and go to next task.
// Script Run Event: WTUA
// Script Parents:WTUA;Transportation!~!~!~.js
// Test Record: TTC16-00029
// Version   |Date      |Engineer         |Details
//  1.0      |09/19/16  |Steve Veloudos   |Initial Release
//  2.0      |11/02/16  |Steve Veloudos   |Added Restriction set
/*==================================================================*/

try {
      var tName = "TRAFFIC REVIEW"
      var tStatus = "APPROVED - NO FEES";
      var ConditionFlag = 0;

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
                    //Load Data
                    loadASITables();
                    var tInfo = DURATIONINFORMATION;
                    var rowCount = DURATIONINFORMATION.length;
                    var x = 0;

                    //Iterate and check restrictions
                    for (x=0;x<=(rowCount-1);x++)
                    {
                        SatRestrict = tInfo[x]["Saturday Restriction"];
                        SunRestrict = tInfo[x]["Sunday Restriction"];

                        if(SatRestrict == "Yes" || SunRestrict == "Yes")
                        {
                        ConditionFlag = 1;
                        break; 
                        }    
                    }
                    
                        //Check Condition flag
                        if(ConditionFlag == 1)
                        {
                            //Set Permit Issuance task to issued
                            updateTask("Permit Issuance","Hold","","");
                            setTask("Permit Issuance","Y","N");
                            
                            //First check if the condition already exists
                            if (doesCapConditionExist("After Hours or Saturday/Sunday Restriction") == false)
                            {
                            addAppCondition("Transportation","Applied(Applied)","After Hours or Saturday/Sunday Restriction","Permit cannot be issued until After Hours Work Permit is obtained.","Hold");
                            }
                        }
                        else
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
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }