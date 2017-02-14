/*===================================================================
// Script Number: 354
// Script Name: ENF_EnvironmentalInspectionReschedules.js
// Script Developer: Vance Smith
// Script Agency: Mesa
// Script Description: see script tracker attached spreadsheet

// Script Run Event: IRSA

// Script Parents:
//	IRSA;Enforcement!Environmental!Complaint!NA            
/*==================================================================*/

/* intellisense references */
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

/* function scorecards

updateTask w 2, f 7
setTask w 1, f 2
scheduleInspectionDateWithInspector w 6, f 1
closeWorkflow w 2, f 0
updateAppStatus w 2, f 0

*/

showDebug = true;
showMessage = true;

try
{
    // get current inspection object
    var inspObj = aa.inspection.getInspection(capId,inspId).getOutput();

    // get the inspection date
    //var inspResultDate = inspObj.getInspectionDate().getMonth() + "/" + inspObj.getInspectionDate().getDayOfMonth() + "/" + inspObj.getInspectionDate().getYear();

    // set the inspection schedule date (if needed)
    var mon1 = parseInt(inspObj.getInspectionDate().getMonth());
    var dt1 = parseInt(inspObj.getInspectionDate().getDayOfMonth());
    var yr1 = parseInt(inspObj.getInspectionDate().getYear());
    var inspResultDate = new Date(yr1, mon1-1, dt1);
    var futureDateObj = addDays(inspResultDate, 14); // 14 calendar days // adjusted 2/9/2017
    var futureDate = jsDateToMMDDYYYY(futureDateObj);

    // get the last inspector's ID
    //var inspUserObj = aa.person.getUser(inspObj.getInspector().getFirstName(), inspObj.getInspector().getMiddleName(), inspObj.getInspector().getLastName()).getOutput();
    //var inspectorId = inspUserObj.getUserID();
    var inspectorId = getLastInspector(inspType);

    comment("FutureDate: " + futureDate);
    comment("Insp First Name: " + inspObj.getInspector().getFirstName());
    comment("Insp ID: " + inspectorId);
    comment("inpType: " + inspType + ".");
    comment("inspResult: " + ".");

    if ( inspType == "Initial Inspection")
    {
        switch (inspResult)
        {
            case "In Violation":
                // change wf task status to "In Violation"
                updateTask(inspType, "In Violation", "Updated By Script (#354)", "");

                // move wf to wf task "Follow-Up Inspection" (make active)
                setTask("Follow-Up Inspection", "Y", "N"); // ?

                // create new "Follow-Up" inspection (14 calendar days out from inspection date)
                scheduleInspectionDateWithInspector("Follow-Up Inspection", futureDate, inspectorId); // didnt work bc of futureDate
                
                /* From Derek:
                Created Follow-Up Inspection but needs to be scheduled for 14 calendar days from 
                Insp Date instead of Request Date
                */
                break;
            case "Citation":
                comment("1");
                // change wf task status to "Citation Issued"
                updateTask(inspType, "Citation Issued", "Updated By Script (#354)", ""); // didnt work
                comment("2");
                // move wf to wf task "Citation Inspection" (make active)
                setTask("Citation Inspections", "Y", "N"); // didnt work
                comment("3");
                // create new "Citation" inspection (14 calendar days out from inspection date)
                scheduleInspectionDateWithInspector("Citation Inspection", futureDate, inspectorId); // didnt work
                comment("4");
                /* From Derek:
                Created Citation Inspection but needs to be scheduled for 14 calendar days from Insp Date 
                and did not assign to previous ACO and Department, 
                Did not make WF status for Initial Inspection = Citation Issued and move WF to Citation Inspections
                */
                break;
            case "3rd Party Abatement":
                // dont do anything
                break;
            case "No Violation":
                // change wf task status to "No Violation"
                updateTask(inspType, "No Violation", "Updated By Script (#354)", ""); // didnt work

                // close record
                closeWorkflow();
                updateAppStatus("Closed", "Set by Script (#354)");

                /* From Derek:
                Did not set WF Initial Inspection status as No Violation
                */
                break;
        }
    } 

    if ( inspType == "Follow-Up Inspection")
    {
        switch (inspResult)
        {
            case "Extension":
                // change wf task status to "Extension"
                updateTask(inspType, "Extension", "Updated By Script (#354)", ""); // didnt work

                // create new "Follow-Up" inspection (14 calendar days out from inspection date)
                scheduleInspectionDateWithInspector("Follow-Up Inspection", futureDate, inspectorId); // didnt work bc of futureDate

                /* From Derek:
                Created Follow-Up Inspection 14 calendar days from Request Date instead of Insp Date, 
                Did not result Follow-Up Inspection WF status as Extension
                */
                break;
            case "In Violation":
                // change wf task status to "In Violation"
                updateTask(inspType, "In Violation", "Updated By Script (#354)", "");

                // create new "Follow-Up" inspection (14 calendar days out from inspection date)
                scheduleInspectionDateWithInspector("Follow-Up Inspection", futureDate, inspectorId); // didnt work bc of futureDate

                /* From Derek:
                Created Follow-Up Inspection 14 calendar days from Request Date instead of Insp Date
                */
                break;
            case "Citation Issued":
                // change wf task status to "Citation Issued"
                updateTask(inspType, "Citation Issued", "Updated By Script (#354)", ""); // didnt work

                // move wf to wf task "Citation Inspection" (make active)
                setTask("Citation Inspections", "Y", "N"); // didnt work

                // create new "Citation" inspection (14 calendar days out from inspection date)
                scheduleInspectionDateWithInspector("Citation Inspection", futureDate, inspectorId); // didnt work bc of futureDate

                /* From Derek: 
                Created Citation Inspection but needs to be scheduled for 14 calenda days from Insp Date,
                Did not make Workflow Tasks Follow-Up Inspection Status = Citation Issued, 
                Did not move WF to Citation Inspections
                break;
                */
            case "3rd Party Abatement":
                // dont do anything
                break;
            case "Voluntary Compliance":
                // change wf task status to "Voluntary Compliance"
                updateTask(inspType, "Voluntary Compliance", "Updated By Script (#354)", ""); // didnt work

                // close record
                closeWorkflow();
                updateAppStatus("Closed", "Set by Script (#354)");

                /* From Derek: 
                Did not set WF Follow-Up Inspection status to Voluntary Compliance
                */
                break;
        }
    }

    if ( inspType == "Citation Inspection")
    {
        switch (inspResult)
        {
            case "In Violation":
                // change wf task status to "In Violation"
                updateTask(inspType, "In Violation", "Updated By Script (#354)", ""); // didnt work

                // create new "Citation" inspection (14 calendar days out from inspection date)
                scheduleInspectionDateWithInspector("Citation Inspection", futureDate, inspectorId); // didnt work bc of futureDate

                /* From Derek:
                Created Citation Inspection but did not schedule 14 calendar days out from the Insp Date, 
                did not make Citation Inspections WF status In Violation. 
                */
                break;
            case "In Violation - Expedite":
                // change wf task status to "In Violation-Expedite"
                updateTask(inspType, "In Violation - Expedite", "Updated By Script (#354)", ""); // didnt work

                // create new "Citation" inspection (14 calendar days out from inspection date)
                scheduleInspectionDateWithInspector("Citation Inspections", futureDate, inspectorId); // didnt work bc of futureDate

                /* From Derek:
                Created Citation Inspection but did not schedule 14 calendar days out from the Insp Date, 
                did not make Citation Inspections WF status In Violation - Expedite. 
                */
                break;
            case "Forced Compliance":
                // dont do anything
                break;
        }
    }
    comment("5");
    /* // OLD CODE BELOW

    // check inspection result, if "In Violation"
    if (inspResult == "In Violation")
    {
        // then get and loop through workflow tasks and look for tasks that meet criteria
        var tasksResult = aa.workflow.getTasks(capId);
        if (tasksResult.getSuccess())
        {
            var tasks = tasksResult.getOutput();
            for (task in tasks){
                var taskName = tasks[task].getTaskDescription();
                logDebug("taskName: " + taskName);
                if ( 
                    tasks[task].getActiveFlag().equals("Y") && 
                    (taskName == "Initial Inspection" || taskName == "Follow-Up Inspection" || taskName == "Citation Inspections")
                )
                {
                    logDebug(taskName + " is active");
                    
                    // schedule a new "Follow-Up Inspection" inspection for the number of days 
                    // out specified in ASI field "Inspection Interval" (business days)
                    var numDays = Number(getAppSpecific("Inspection Interval").replace(" Days", ""));
                    var scheduleDate = dateAdd(null, numDays, "Y");
                    var inspectorName = lookup("ENF_ENV_INSPECTORS", "Area1"); //getInspectorObject();

                    var nameArray = inspectorName.split(" ");
                    var inspRes = null;
                    switch (nameArray.length)
                    {
                        case 1:
                            inspRes = aa.person.getUser(inspector);
                            break;
                        case 2:
                        logDebug(nameArray[0] + " " + nameArray[1]);
                            inspRes = aa.person.getUser(nameArray[0], "", nameArray[1]);
                            break;
                        case 3:
                            inspRes = aa.person.getUser(nameArray[0], nameArray[1], nameArray[2]);
                            break;
                    }
                    var inspectorObject = null;
                    if (inspRes.getSuccess())
                    {
                        inspectorObject = inspRes.getOutput();
                    }
                    else
                    {
                        inspectorObject = false;
                        logDebug("Failed to create inspector object!");
                    }

                    if (inspectorObject != false)
                    {
                        scheduleInspectionDateWithInspectorObject("Follow-Up Inspection", scheduleDate, inspectorObject);
                    }

                    // apply status of "In Violation"
                    updateTask(taskName, "In Violation", "Updated By Script", "");

                    break;
                }
            }
        }
    }
    else 
    {
        logDebug("Criteria not met. Inpsection Result: " + inspResult + ", Inspection Type: " + inspType)
    }

    */
}
catch (err)
{
  logDebug("A JavaScript error occurred: " + err.message);
}

/* Test Record: ENVC16-00064

*/

