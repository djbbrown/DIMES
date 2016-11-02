/*===================================================================
// Script Number: 289
// Script Name: TRA_TTC_After_Hours.js
// Script Description: When Saturday Restriction or Sunday Restriction is selected as Y,  Add condition to hold issuance of 
// Permit until After Hours work permit is obtained. Fire before workflow Permit Issuance when active. Stop status Issued By adding condition
// Script Run Event: WTUB
// Script Parents: Transportation!~!~!~.js
// Removed ASA & ASIUA
// Version   |Date      |Engineer         |Details
//  1.0      |09/07/16  |Steve Veloudos   |Initial Release 
//  2.0      |10/24/16  |Steve Veloudos   |Added the doesCapConditionExist check
//  3.0      |11/02/16  |Steve Veloudos   |Added check for Permit Issuance task status Issued
/*==================================================================*/

try {
    var SatRestrict;
    var SunRestrict;
    var ConditionFlag ;
    var tName = "PERMIT ISSUANCE"
    var tStatus = "ISSUED";
    var ConditionFlag = 0;

    //Get WF Task
       var tasks = aa.workflow.getTasks(capId).getOutput();
       for (t in tasks) 
        {
            //Check for Permit Issuance task
            if(tasks[t].getTaskDescription().toUpperCase() == tName)
            {
                //Check task status Issued
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

                        //Set condition
                        if(ConditionFlag == 1)
                        {
                            //First check if the condition already exists
                            if (doesCapConditionExist("After Hours or Saturday/Sunday Restriction") == false)
                            {
                            addAppCondition("Transportation","Applied(Applied)","After Hours or Saturday/Sunday Restriction","Permit cannot be issued until After Hours Work Permit is obtained.","Hold");
                            }
                        }
                    }
                }
            }
        }
       
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }