/*===================================================================
// SharePointRef: Issue# 13
// Script Name: Update Workflow Assignments
// Script Filename: LIC_UpdateWorkflowAssignments.js
//
// Script Developer: Michael VanWie
//
// Script Description: This script will be used to conditionally re-assign workflow tasks 
//
// Script Run Event: Workflow Task Update After
// Script Parents:
//            WTUA;Licenses!~!~!Application.js
//
// Updates:
// -----------------------------------------------------------------------------
// | BY         |    DATE      |  NOTES
// -----------------------------------------------------------------------------
// | M VanWie   |  06/19/2017  | - Initial script : When 'Supervisor Reivew' = 'Approved w/ Conditions' 
//                                 assign to the person currently assigned to the first task.
/*==================================================================*/
try
{
    var firstTask;
    var assignedTo;
    
    if((wfTask == 'Supervisor Review' || wfTask == 'License Administrator Review' ) && wfStatus == 'Approved w/Conditions')
    {
        var capResult = aa.cap.getCap(capId);

        if(capResult.getSuccess())
        {
            cap = capResult.getOutput();

            if(cap.capType.category == 'Application')
            {
                firstTask = aa.workflow.getTask(capId, 'License Application')
            }
            else if (cap.capType.category == 'Renewal')
            {
                firstTask = aa.workflow.getTask(capId, 'License Renewal')
            }
            else
            {
                firstTask = null;
            }
        }

        if(firstTask != null && firstTask.getSuccess())
        {
            assignedTo = firstTask.getOutput().getAssignedStaff();
            
            if(assignedTo.firstName != '' && assignedTo.firstName != null && assignedTo.lastName != '' && assignedTo.lastName != null)
            {
                assignToUser = aa.person.getUser(assignedTo.firstName, assignedTo.middleName, assignedTo.lastName);
                
                if(assignToUser.getSuccess())
                {
                    assignTask('Supervisor Review', assignToUser.getOutput().userID);
                }
                else
                {
                    logDebug('Failed to get UserID for ' + assignedTo.firstName + ' ' + assignedTo.lastName + '.');
                }
            }
            else
            {
                logDebug('Failed to get staff assigned to first task.');
            }
        }
        else
        {
            logDebug('Failed to get License Application Task.');
        }
    }
}
catch(err)
{
    logDebug("LIC_UpdateWorkflowAssignments - JavaScript Error: " + err.message);
    logDebug(err.stack);
}