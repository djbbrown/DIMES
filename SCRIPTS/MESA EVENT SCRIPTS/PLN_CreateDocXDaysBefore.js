/*===================================================================
// Script Number: 276
// Script Name: PLN_CreateDocXDaysBefore.js
// Script Developer: Vance Smith
// Script Agency: Mesa
// Script Description: When wfTask "Review Consolidation" is resulted 
// in "Proceed", email applicant notifying them of required documents.  

// Script Run Event: WTUA

// Script Parents:
//	WTUA;Planning!Planning and Zoning!NA!NA
//	WTUA;Planning!Board of Adjustment!NA!NA
//            
/*==================================================================*/

/* intellisense references */
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

try
{
    if ( wfTask == "Review Consolidation" && wfStatus == "Proceed" ) 
    {
        logDebug("Criteria met for script.");
        var criteriaMet = false;
        var emailTemplate = "";
        var rpt = "";
        var recParams = aa.util.newHashtable();

        if (appMatch("Planning/Planning and Zoning/NA/NA"))
        {
            criteriaMet = true;
            
            //addParameter(recParams,"RecordNumber", capId.getCustomID());
            rpt = generateReport(capId, "[reportname]", "Planning", recParams);

            emailTemplate = "PLN_REMINDER_TO_POST";
        }
        else if (appMatch("Planning/Board of Adjustment/NA/NA"))
        {
            criteriaMet = true;

            //addParameter(recParams,"RecordNumber", capId.getCustomID());
            rpt = generateReport(capId, "[reportname]", "Planning", recParams);

            emailTemplate = "PLN_LETTERS_OF_NOTIFICATION";
        }
        if ( criteriaMet && rpt != false )
        {
            var plannerPhone = "";
            var plannerEmail = "";
            var plannerName = "";
            var taskResult = aa.workflow.getTask(capId, "Review Consolidation");
            if (taskResult.getSuccess())
            {
                var taskOutput = taskResult.getOutput();
                var taskAssignStaff = taskOutput.getAssignedStaff();
                var taskAssignStaffUser = aa.person.getUser(taskAssignStaff.getFirstName(), taskAssignStaff.getMiddleName(), taskAssignStaff.getLastName()).getOutput();
                plannerEmail = taskAssignStaffUser.getEmail();
                plannerName = taskAssignStaff.getFirstName() + " " + taskAssignStaff.getLastName();
                plannerPhone = lookup("REPORT_CONFIG", "Planning Phone");

                var contactArray = getContactArray(capId), emailAddress = null;
                for (contact in contactArray)
                {
                    if (contactArray[contact]["contactType"] == "Applicant")
                    {
                        emailAddress = contactArray[contact]["email"];
                    }
                }
                var hearingDate = getAppSpecific("", capId);
                //var docDate = 

                var emailParams = aa.util.newHashtable();
    			addParameter(emailParams, "%%Planner Phone%%", plannerPhone);
			    addParameter(emailParams, "%%Planner Email%%", plannerEmail);
			    addParameter(emailParams, "%%Planner Name%%", plannerName);
                addParameter(emailParams, "%%Doc Date%%", docDate);
			    sendNotification("NoReply@MesaAz.gov", emailAddress, "", emailTemplate, emailParams, [rpt]);
            }
        }
        else
        {
            logDebug("Criteria not met.")
        }
    }
    else
    {
        logDebug("Criteria not met.")
    }
}
catch (err)
{
  logDebug("A JavaScript error occurred: " + err.message);
}

/* Test Record: 

*/