/*===================================================================
// Script Number: 020
// Script Name: ENF_NoViolationInspectionUpdateWFStatus.js
// Script Developer: Vance Smith
// Script Agency: Mesa
// Script Description: When an inspection of type "Initial Inspection" 
// is resulted with a status of "No Violation", Apply wf task status of 
// "No Violation" to workflow task "Initial Inspection" and deactivate 
// all workflow tasks and set record status to "Case Closed".

// Script Run Event: IRSA

// Script Parents:
//	IRSA;Enforcement!Case!~!~ 
//	IRSA;Enforcement!Environmental!Complaint!~
//            
/*==================================================================*/

/* intellisense references */
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

try
{
	var getInspectionsResult = aa.inspection.getInspections(capId);

	if (getInspectionsResult.getSuccess()) 
	{
		logDebug("got inspection results");
		var inspectionScriptModels = getInspectionsResult.getOutput();
		var inspectionScriptModel = null;
		logDebug("inspectionScriptModels length: " + inspectionScriptModels.length);
		for (i in inspectionScriptModels)
		{
			inspectionScriptModel = inspectionScriptModels[i];
			if (
				inspectionScriptModel.getInspectionType().toUpperCase() == "INITIAL INSPECTION"
				&& (inspectionScriptModel.getInspectionStatus().toUpperCase() == "NO VIOLATION")
			)
			{
				/* found the one we want, now process per specifications */
				logDebug("found inspection");
				if( isTaskActive("Initial Inspection") ) 
				{
					updateTask("Initial Inspection", "No Violation", "Updated by Script", "Updated by Script");
					logDebug("updated task");
				}

				// deactivate entire workflow
				var tasksResult = aa.workflow.getTasks(capId);
				if (tasksResult.getSuccess())
				{
					var tasks = tasksResult.getOutput();
					for (task in tasks){
						deactivateTask(tasks[task].getTaskDescription());
					}
				}
				logDebug("deactivated workflow");
			}

			// set app status to 'Case Closed'
			updateAppStatus("Case Closed", "Updated by Script");
			logDebug("changed app status to case closed");
		}
		/*
		psuedocode
		DONE 1) check inspection type, want "Initial Inspection"
		DONE 2) check inspection status, want "No Violation"
		DONE 3) get wf task "Initial Inspection"
		DONE 4) apply wf task status of "No Violation"
		DONE 5) deactivate workflow
		DONE 6) set record status to "Case Closed"
		*/	
	}
	else 
	{
		logDebug("no inspections");
	}
}
catch (err)
{
  logDebug("A JavaScript error occurred: " + err.message);
}