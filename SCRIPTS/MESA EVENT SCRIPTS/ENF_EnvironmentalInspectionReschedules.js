/*===================================================================
// Script Number: 354
// Script Name: ENF_EnvironmentalInspectionReschedules.js
// Script Developer: Vance Smith
// Script Agency: Mesa
// Script Description: see script tracker attached spreadsheet

Questions: 
1) Does a script need to be created that creates the initial inspection?
2) When you say "Move Workflow to Workflow Task", does that mean make the specified task active?
3) Is "inspId" available?
4) "Close record" - Is this setting the record status to "Closed"?

// Script Run Event: IRSA

// Script Parents:
//	IRSA;Enforcement!Environmental!Complaint!NA            
/*==================================================================*/

/* intellisense references */
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

try
{
    // get current inspection object
    var inspObj = aa.inspection.getInspection(capId,inspId).getOutput();

    // get the inspection date
    var inspResultDate = inspObj.getInspectionDate().getMonth() + "/" + inspObj.getInspectionDate().getDayOfMonth() + "/" + inspObj.getInspectionDate().getYear();

    // set the inspection schedule date (if needed)
    var futureDate = dateAdd(inspResultDate, 14, "N"); // 14 calendar days

    // get the last inspector's ID
    var inspUserObj = aa.person.getUser(inspObj.getInspector().getFirstName(), inspObj.getInspector().getMiddleName(), inspObj.getInspector().getLastName()).getOutput();
    var inspectorId = inspUserObj.getUserID();

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
                scheduleInspectionDateWithInspector("Follow-Up", futureDate, inspectorId);
                break;
            case "Citation":
                // change wf task status to "Citation Issued"
                updateTask(inspType, "Citation Issued", "Updated By Script (#354)", "");

                // move wf to wf task "Citation Inspection" (make active)
                setTask("Citation Inspection", "Y", "N"); // ?

                // create new "Citation" inspection (14 calendar days out from inspection date)
                scheduleInspectionDateWithInspector("Citation", futureDate, inspectorId);
                break;
            case "3rd Party Abatement":
                // dont do anything
                break;
            case "No Violation":
                // change wf task status to "No Violation"
                updateTask(inspType, "No Violation", "Updated By Script (#354)", "");

                // close record
                closeWorkflow();
                updateAppStatus("Closed", "Set by Script (#354)");
                break;
        }
    } 

    if ( inspType == "Follow-Up Inspection")
    {
        switch (inspResult)
        {
            case "Extension":
                // change wf task status to "Extension"
                updateTask(inspType, "Extension", "Updated By Script (#354)", "");

                // create new "Follow-Up" inspection (14 calendar days out from inspection date)
                scheduleInspectionDateWithInspector("Follow-Up", futureDate, inspectorId);
                break;
            case "In Violation":
                // change wf task status to "In Violation"
                updateTask(inspType, "In Violation", "Updated By Script (#354)", "");

                // create new "Follow-Up" inspection (14 calendar days out from inspection date)
                scheduleInspectionDateWithInspector("Follow-Up", futureDate, inspectorId);
                break;
            case "Citation Issued":
                // change wf task status to "Citation Issued"
                updateTask(inspType, "Citation Issued", "Updated By Script (#354)", "");

                // move wf to wf task "Citation Inspection" (make active)
                setTask("Citation Inspection", "Y", "N"); // ?

                // create new "Citation" inspection (14 calendar days out from inspection date)
                scheduleInspectionDateWithInspector("Citation", futureDate, inspectorId);
                break;
            case "3rd Party Abatement":
                // dont do anything
                break;
            case "Voluntary Compliance":
                // change wf task status to "Voluntary Compliance"
                updateTask(inspType, "Voluntary Compliance", "Updated By Script (#354)", "");

                // close record
                closeWorkflow();
                updateAppStatus("Closed", "Set by Script (#354)");
                break;
        }
    }

    if ( inspType == "Citation Inspection")
    {
        switch (inspResult)
        {
            case "In Violation":
                // change wf task status to "In Violation"
                updateTask(inspType, "In Violation", "Updated By Script (#354)", "");

                // create new "Citation" inspection (14 calendar days out from inspection date)
                scheduleInspectionDateWithInspector("Citation", futureDate, inspectorId);
                break;
            case "In Violation-Expedite":
                // change wf task status to "In Violation-Expedite"
                updateTask(inspType, "In Violation-Expedite", "Updated By Script (#354)", "");

                // create new "Citation" inspection (14 calendar days out from inspection date)
                scheduleInspectionDateWithInspector("Citation", futureDate, inspectorId);
                break;
            case "Forced Compliance":
                // dont do anything
                break;
        }
    }

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