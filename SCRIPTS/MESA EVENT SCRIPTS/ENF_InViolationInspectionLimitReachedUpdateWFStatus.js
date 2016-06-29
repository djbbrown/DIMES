/*===================================================================*/
// Script Number: 021
// Script Name:ENF_InViolationInspectionUpdateWFStatus.js
// Script Developer: N. Victor Staggs
// Script Agency: Woolpert, Inc.
// Script Description: Update 'Follow-Up Inspection' workflow task when three 'Follow-Up Inspection' inspections have been resulted with "In Violation"
// Script Run Event: IRSA
// Script Parents:
//  IRSA;Enforcement!Case!CodeCompliance!NA
//  IRSA;Enforcement!Case!CodeRentalIssue!NA
//  IRSA;Enforcement!Case!CodeSignIssue!NA
//  IRSA;Enforcement!Environmental!Complaint!~
/*==================================================================*/

if (inspType === "Follow-Up Inspection") {

    //IRSA;Enforcement!Case!CodeCompliance!NA
    //IRSA;Enforcement!Case!CodeRentalIssue!NA
    //IRSA;Enforcement!Case!CodeSignIssue!NA
    if (
        matches("" + appTypeArray[0], "Enforcement")
            &&
        matches("" + appTypeArray[1], "Case")
            &&
        matches("" + appTypeArray[2], "CodeCompliance", "Code Rental Issue", "Code Sign Issue")
            &&
        matches("" + appTypeArray[3], "NA")
    ) {
        DoWFStatusUpdate();
    }

    //IRSA;Enforcement!Environmental!Complaint!~
    if (
        matches("" + appTypeArray[0], "Enforcement")
            &&
        matches("" + appTypeArray[1], "Environmental")
            &&
        matches("" + appTypeArray[2], "Complaint")
    ) {
        DoWFStatusUpdate();
    }
}

function DoWFStatusUpdate() {
    logDebug("Enter DoWFStatusUpdate()");

    logDebug("capId: " + capId);

    var closeTaskName = "Follow-Up Inspection";
    logDebug("closeTaskName: '" + closeTaskName + "'");

    var closeTaskActive = isTaskActive(closeTaskName);
    logDebug("closeTaskActive: " + closeTaskActive);

    var closeTaskStatus = "Citation Issued";
    logDebug("closeTaskStatus: " + closeTaskStatus);

    var activateTaskName = "Citation Inspections";
    logDebug("activateTaskName: '" + activateTaskName + "'");

    var activateTaskActive = isTaskActive(activateTaskName);
    logDebug("activateTaskActive: " + activateTaskActive);

    var inViolationInspectionScriptModels = [];

    var getInspectionsResult = aa.inspection.getInspections(capId);

    if (getInspectionsResult.getSuccess()) {

        var inspectionScriptModels = getInspectionsResult.getOutput();

        for (inspectionScriptModelIndex in inspectionScriptModels) {
            var inspectionScriptModel = inspectionScriptModels[inspectionScriptModelIndex];
            if ((inspectionScriptModel.getInspectionType().toUpperCase() === "FOLLOW-UP INSPECTION") && (inspectionScriptModel.getInspectionStatus().toUpperCase() === "IN VIOLATION")) {
                inViolationInspectionScriptModels.push(inspectionScriptModel);
            }
        }

        logDebug("inViolationInspectionScriptModels.length:" + inViolationInspectionScriptModels.length);

        if (inViolationInspectionScriptModels.length >= 3) {

            logDebug("'In Violation' Inspection threshold reached");

            if (!isTaskActive(closeTaskName)) {
                logDebug("'" + closeTaskName + "' workflow task is not active.");
            } else {
                logDebug("'" + closeTaskName + "' workflow task is active.");

                logDebug("Begin calling closeTask()");
                closeTask(closeTaskName, closeTaskStatus, "Closed by Script", "Closed by Script")
                logDebug("End calling closeTask()");

                logDebug("Begin calling activateTask()");
                activateTask(activateTaskName);
                logDebug("End calling activateTask()");

                if (isTaskActive(activateTaskName)) {
                    logDebug("'" + activateTaskName + "' workflow task is active.");
                }
            }
        }
    }

    logDebug("Exit DoWFStatusUpdate()");
}