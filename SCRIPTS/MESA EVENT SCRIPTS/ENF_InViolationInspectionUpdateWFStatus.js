/*===================================================================
// Script Number: 047
// Script Name:ENF_InViolationInspectionUpdateWFStatus.js
// Script Developer: Raminder Gill
// Script Agency: Accela
// Script Description: Update workflow task  When Initial or Follow-Up Inspection is resulted with "In Violation"
// Script Run Event: IRSA
// Script Parents:
//	IRSA;Enforcement!Case!~!~ 
//	IRSA;Enforcement!Environmental!~!~ 
//            
/*==================================================================*/
var inViolationInspectionScriptModels = [];

var getInspectionsResult = aa.inspection.getInspections(capId);

if (getInspectionsResult.getSuccess()) {

	var inspectionScriptModels = getInspectionsResult.getOutput();
	var inspectionScriptModel = null;

	for (inspectionScriptModelIndex in inspectionScriptModels) {
		inspectionScriptModel = inspectionScriptModels[inspectionScriptModelIndex];
		if (
			(inspectionScriptModel.getInspectionType().toUpperCase() == "FOLLOW-UP INSPECTION"
				||inspectionScriptModel.getInspectionType().toUpperCase() == "INITIAL INSPECTION"
				||inspectionScriptModel.getInspectionType().toUpperCase() == "CITATION INSPECTION"
			)
			&& (inspectionScriptModel.getInspectionStatus().toUpperCase() == "IN VIOLATION")
		) {
			inViolationInspectionScriptModels.push(inspectionScriptModel);
		}
	}
	aa.print("inViolationInspectionScriptModels.length:" + inViolationInspectionScriptModels.length);
	logDebug("inViolationInspectionScriptModels.length:" + inViolationInspectionScriptModels.length);
}
// Only do the update like this if there is less than 3 inspections,
// Else we want to pick up the script with the woolpert developed scirpt 021
if (
	(
		inspType == "Initial Inspection"
		|| inspType == "Follow-Up Inspection"
		|| inspType == "Follow-up Inspection"
		|| inspType == "Citation Inspection"
	)
	&& inspResult == "In Violation"
	&& inViolationInspectionScriptModels.length < 3
) {
	// Based on workflow and the fact that we're updating and branching I am changing the order to
	// be the reverse of the potential for an active task.
	if( isTaskActive("Citation Inspections") ) {
		updateTask("Citation Inspections","In Violation","Updated by Script","Updated by Script");
	}
	if( isTaskActive("Follow-Up Inspection") ) {
		updateTask("Follow-Up Inspection","In Violation","Updated by Script","Updated by Script");
	}
	if( isTaskActive("Initial Inspection") ) {
		branchTask("Initial Inspection","In Violation","Closed by Script","Closed by Script");
	}
}
