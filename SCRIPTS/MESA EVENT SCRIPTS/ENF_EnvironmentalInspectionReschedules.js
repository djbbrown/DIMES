/*===================================================================
// Script Number: 354
// Script Name: ENF_EnvironmentalInspectionReschedules.js
// Script Developer: Vance Smith
// Script Agency: Mesa
// Script Description: see script tracker attached spreadsheet

// Script Run Event: IRSA

// Script Parents:
//	IRSA;Enforcement!Environmental!Complaint!NA
// - Date    	| Updated By			| Notes
// ------------------------------------------------------------------
// - 01/01/1900 | Vance Smith           | Initial Version 
// - 05/02/2017 | Michael VanWie		| Updated
// - 05/17/2017 | Michael VanWie        | Updated based on User Testing
/*==================================================================*/      


/* intellisense references */
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />   
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

/*
showDebug = true;
showMessage = true;
*/

try
{
    // get current inspection object
    var inspObj = aa.inspection.getInspection(capId,inspId).getOutput();

    // set the inspection schedule date (if needed)
    var mon1 = parseInt(inspObj.getInspectionDate().getMonth());
    var dt1 = parseInt(inspObj.getInspectionDate().getDayOfMonth());
    var yr1 = parseInt(inspObj.getInspectionDate().getYear());
    var inspResultDate = new Date(yr1, mon1-1, dt1); //JS uses a zero-base month but one-base year/day
    var futureDate14 = jsDateToMMDDYYYY(addDays(inspResultDate, 14)); // 14 calendar days // adjusted 2/9/2017
    var futureDate7 = jsDateToMMDDYYYY(addDays(inspResultDate, 7));   // 7 calendar days
    var futureDate3 = mesaWorkingDays(inspResultDate, 4);   // 3 working days (function counts today as 1)

    // get the last inspector's ID
    var inspectorId = getLastInspector(inspType);

    if ( inspType == "Initial Inspection")
    {

        switch ("" + inspResult)
        {
            case "In Violation":
                // change wf task status to "In Violation"
                updateTask(inspType, "In Violation", "Updated By Script (#354)", "");

                // move wf to wf task "Follow-Up Inspection" (make active)
                setTask("Follow-Up Inspection", "Y", "N");

                // create new "Follow-Up" inspection (14 calendar days out from inspection date)
                scheduleInspectionDateWithInspector("Follow-Up Inspection", futureDate14, inspectorId);
                break;

            case "Citation":                
                // change wf task status to "Citation Issued"
                closeTask(inspType, "Citation Issued", "Updated By Script (#354)", "");              

                // move wf to wf task "Citation Inspection" (make active)
                setTask("Citation Inspections", "Y", "N");

                // create new "Citation" inspection (7 calendar days out from inspection date)
                scheduleInspectionDateWithInspector("Citation Inspection", futureDate7, inspectorId);
                break;

            case "3rd Party Abatement":
                //Change wf task status to "3rd Party Abatement"
                updateTask(inspType, "3rd Party Abatement", "Updated by Script (#354)", "");
                setTask(inspType, 'N', 'Y');

                //Move wf to wf task "Follow-Up Inspection" and make active
                setTask("Follow-Up Inspection", "Y", "N");

                break;

            case "No Violation":
                // change wf task status to "No Violation" and Complete
                updateTask(inspType, "No Violation", "Updated By Script (#354)", "");
                setTask(inspType, 'N', 'Y');

                //Close all WF Tasks
                closeWorkflow();

                //Close Complaint
                updateAppStatus("Closed", "Set by Script (#354)");
                break;
        }
    } 

    if ( inspType == "Follow-Up Inspection")
    {
        switch ("" + inspResult)
        {
            case "Extension":
                // change wf task status to "Extension"
                updateTask(inspType, "Extension", "Updated By Script (#354)", "");

                // create new "Follow-Up" inspection (14 calendar days out from inspection date)
                scheduleInspectionDateWithInspector("Follow-Up Inspection", futureDate14, inspectorId);
                break;

            case "In Violation":
                // change wf task status to "In Violation"
                updateTask(inspType, "In Violation", "Updated By Script (#354)", "");

                // create new "Follow-Up" inspection (14 calendar days out from inspection date)
                scheduleInspectionDateWithInspector("Follow-Up Inspection", futureDate14, inspectorId);
                break;

            case "Citation Issued":
                // change wf task status to "Citation Issued"
                updateTask(inspType, "Citation Issued", "Updated By Script (#354)", "");
                setTask(inspType, 'N', 'Y');

                // move wf to wf task "Citation Inspection" (make active)
                setTask("Citation Inspections", "Y", "N");

                // create new "Citation" inspection (7 calendar days out from inspection date)
                scheduleInspectionDateWithInspector("Citation Inspection", futureDate7, inspectorId);
                break;

            case "3rd Party Abatement":
            //Change wf task status to "3rd Party Abatement"
                updateTask(inspType, "3rd Party Abatement", "Updated by Script (#354)", "");

                break;

            case "Voluntary Compliance":
                // change wf task status to "Voluntary Compliance" and Complete
                updateTask(inspType, "Voluntary Compliance", "Updated By Script (#354)", "");
                setTask(inspType, 'N', 'Y');

                // close record
                closeWorkflow();
                updateAppStatus("Closed", "Set by Script (#354)");
                break;
        }
    }

    if (inspType == "Citation Inspection")
    {
        switch ("" + inspResult)
        {
            case "In Violation":
                // change wf task status to "In Violation"
                updateTask(inspType, "In Violation", "Updated By Script (#354)", "");

                // create new "Citation" inspection (14 calendar days out from inspection date)
                scheduleInspectionDateWithInspector("Citation Inspection", futureDate7, inspectorId);
                break;

            case "In Violation - Expedite":
                // change wf task status to "In Violation-Expedite"
                // 05/17/2017 - Added 's' as WFTask is spelt differently then Inspection Name
                updateTask(inspType + 's', "In Violation - Expedite", "Updated By Script (#354)", "");

                // create new "Citation" inspection (14 calendar days out from inspection date)
                scheduleInspectionDateWithInspector("Citation Inspection", futureDate3, inspectorId);
                break;

            case "Forced Compliance":
                // dont do anything
                break;
        }
    }
}
catch (err)
{
  logDebug("A JavaScript error occurred: " + err.message);
}