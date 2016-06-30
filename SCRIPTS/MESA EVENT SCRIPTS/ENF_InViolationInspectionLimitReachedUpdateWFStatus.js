/*===================================================================*/
// Script Number: 021
// Script Name:ENF_InViolationInspectionLimitReachedUpdateWFStatus.js
// Script Developer: N. Victor Staggs
// Script Agency: Woolpert, Inc.
// Script Description: Update 'Follow-Up Inspection' workflow task when three 'Follow-Up Inspection' inspections have been resulted with "In Violation"
// Script Run Event: IRSA
// Script Parents:
//  IRSA;Enforcement!Case!Code Compliance!NA (Enforcement/Case/Code Compliance/NA)
//  IRSA;Enforcement!Case!Code Rental Issue!NA
//  IRSA;Enforcement!Case!Code Sign Issue!NA
//  IRSA;Enforcement!Environmental!Complaint!~
/*==================================================================*/

if(matches(currentUserID,"ADMIN","CGODWIN","BDEJESUS","VSTAGGS")){//user names need to be added in ALL CAPS!
	showDebug = 3;
}

try {
    logDebug("inspType:" + inspType);

    if (inspType === "Follow-Up Inspection") {
    	logDebug("inspResult:" + inspResult);
    	logDebug("Record Type:" + appTypeArray[0] + appTypeArray[1] + appTypeArray[2] + appTypeArray[3]);

        //IRSA;Enforcement!Case!Code Compliance!NA
        //IRSA;Enforcement!Case!Code Rental Issue!NA
        //IRSA;Enforcement!Case!Code Sign Issue!NA
        if (
            matches("" + appTypeArray[0], "Enforcement")
                &&
            matches("" + appTypeArray[1], "Case")
                &&
            matches("" + appTypeArray[2], "Code Compliance", "Code Rental Issue", "Code Sign Issue")
                &&
            matches("" + appTypeArray[3], "NA")
        ) {
        	logDebug("Checking inspections on Enforcement Case");
            DoInViolationInspectionUpdateWFStatusUpdate();
        }

        //IRSA;Enforcement!Environmental!Complaint!~
        if (
            matches("" + appTypeArray[0], "Enforcement")
                &&
            matches("" + appTypeArray[1], "Environmental")
                &&
            matches("" + appTypeArray[2], "Complaint")
        ) {
        	logDebug("Checking inspections on Environmental Case");
            DoInViolationInspectionUpdateWFStatusUpdate();
        }
    }
} catch (exception) {
    logDebug("JavaScript exception caught: " + exception.message);
}

function DoInViolationInspectionUpdateWFStatusUpdate() {
    logDebug("Enter DoInViolationInspectionUpdateWFStatusUpdate()");

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
        var inspectionScriptModel = null;

        for (inspectionScriptModelIndex in inspectionScriptModels) {
            inspectionScriptModel = inspectionScriptModels[inspectionScriptModelIndex];
            if ((inspectionScriptModel.getInspectionType().toUpperCase() == "FOLLOW-UP INSPECTION") && (inspectionScriptModel.getInspectionStatus().toUpperCase() == "IN VIOLATION")) {
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
                closeTask(closeTaskName, closeTaskStatus, "Closed by Script", "Closed by Script");
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

    logDebug("Exit DoInViolationInspectionUpdateWFStatusUpdate()");
}