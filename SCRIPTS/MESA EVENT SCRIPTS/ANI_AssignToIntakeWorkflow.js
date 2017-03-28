/*===================================================================
// Script Number: 357
// Script Name: ANI_AssignToIntakeWorkflow.js
// Script Developer: Michael Kniskern
// Script Agency: Mesa
// Script Description: 

	
on ASA, update the record and workflow task "Case Intake" to the person entered in the 
"Assigned to Staff" field on the Intake form

// Script Run Event: ASA

// Script Parents:

//	ASA;Animal Control!~!~!~
//            
/*==================================================================*/

/* intellisense references */
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

try
{
    //verify that record is an animal control record
    if(appMatch("AnimalControl/*/*/*")) {
        //verify the Case Intake workflow task
        var isCaseIntakeActive = isTaskActive("Case Intake");

        if(isCaseIntakeActive) {
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

                            if(currentTaskName == "CASE INTAKE") {
                                assignTask("Case Intake", assignedTo);
                                break;
                            }
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