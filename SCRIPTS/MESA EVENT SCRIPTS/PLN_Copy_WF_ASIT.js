/*===================================================================
// Script Number: 269
// Script Name: PLN_Copy_WF_ASIT.js
// Script Description: Whenever the Workflow Task Hearing is updated to a status that is NOT Note, or Hearing Scheduled, or SP Hearing Complete; 
// Then create a new row in the ASIT DECISIONS AND RECOMMENDATIONS
// Script Run Event: WTUA
// Script Parents:WTUA;Planning/General Plan Amendment - Major/!~/!~.js    
// WTUA;Planning/Planning and Zoning/!~/!~.js
// WTUA;Planning/Subdivision/!~/!~.js
// Test Record: ZON16-00249
// Version   |Date      |Engineer         |Details
//  1.0      |09/21/16  |Steve Veloudos   |Initial Release
==================================================================*/

try {
    var NotNoteFlag = 0;
    var NotHearingFlag = 0;
    var NotSpHearingFlag = 0;
    var StatusDate;
    var Status;
    var HearingValue = "None";

    //Set workflow name based on the type of record
    if(appTypeString == "Planning/Planning and Zoning/NA/NA" ||appTypeString ==  "Planning/General Plan Amendment - Major/NA/NA")
    {
        HearingValue = "Hearing(s)";
    }
    if(appTypeString == "Planning/Subdivision/NA/NA")
    {
        HearingValue = "Hearing";
    }

    //Get Hearing Workflow task
    var tasks = aa.workflow.getTasks(capId).getOutput();
    for (t in tasks) 
    {
        //Check task name and status & set flags
        if (tasks[t].getTaskDescription() == HearingValue)
        { 
            if(tasks[t].getDisposition() != "Note")
            {
               NotNoteFlag = 1; 
            }
            if(tasks[t].getDisposition() != "Hearing Scheduled")
            {
               NotHearingFlag = 1; 
            }
            if(tasks[t].getDisposition() != "SP Hearing Complete")
            {
               NotSpHearingFlag = 1; 
            }
            //Get workflow info
            Status = tasks[t].getDisposition();
            StatusDate = "" + (tasks[t].getStatusDate().getMonth() + 1) + "/" + tasks[t].getStatusDate().getDate() + "/" + (parseInt(tasks[t].getStatusDate().getYear()) + 1900);
            
            break;          
        }
    }               
    
    //Check flags & create new ASIT row if true
    if(NotNoteFlag == 1 || NotHearingFlag == 1 || NotSpHearingFlag == 1)
        {
            newDescASIT = [];
            newRow = [];
			newRow["Date"] =  new asiTableValObj("Date", StatusDate,"N");
			newRow["Decision"] =  new asiTableValObj("Decision",Status,"N") ;
			newDescASIT.push(newRow);
            addASITable("DECISIONS AND RECOMMENDATIONS",newDescASIT);
        }
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }