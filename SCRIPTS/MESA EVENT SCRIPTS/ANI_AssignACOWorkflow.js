/*===================================================================
// Script Number: 403
// Script Name: ANI_AssignACOWorkflow.js
// Script Developer: Steve Allred
// Script Agency: Mesa
// Script Description: 

	
on WTUA, update the workflow task "Animal Control Officer" to the person entered in the 
"Assigned to Staff" field on the Intake form

// Script Run Event: WTUA

// Script Parents:

//	WTUA;Animal Control!~!~!~
//            
/*==================================================================*/
/* intellisense references */
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

try
{

    if (wfTask.equals("Case Intake") && wfStatus.equals("Assigned")) {

        var capDetailObjResult = aa.cap.getCapDetail(capId);

        //get the "Record Summary" portion of record to get the "Assigned Staff" value
        if(capDetailObjResult.getSuccess()) {
            var capDetail = capDetailObjResult.getOutput();
            var assignedTo = "" + capDetail.getAsgnStaff();

            if((assignedTo != null) && (assignedTo != "undefined")) {
                //load the "Case Intake" workflow task and set the "Assigned to Staff" value for the task
                var workflowResult = aa.workflow.getTasks(capId);

                if(workflowResult.getSuccess()) {
                    var workflowArray = workflowResult.getOutput();

                    for(x in workflowArray) {
                        var currentTask = workflowArray[x];
                        var currentTaskName = "" + currentTask.getTaskDescription().toUpperCase(); 

                        if(currentTaskName == "ANIMAL CONTROL OFFICER") {
                            assignTask("Animal Control Officer", assignedTo);
                            break;
                        }
                    }
                }
            }
        }
    }
}
catch (err)
{
  logDebug("A JavaScript error occurred: " + err.message);
}

/* Test Record: 
     ANI2016-04680 - Kevin Gurney
     ANI2016-04681 - Shannon Gross
*/