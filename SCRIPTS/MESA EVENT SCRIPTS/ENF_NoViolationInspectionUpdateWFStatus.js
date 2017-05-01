/*===================================================================
Versions:
 08/29/2016		Vance Smith			initial
 12/05/2016		Vance Smith			reworked due to changes in requirements
 05/01/2017		Michael VanWie		case check had spelling mistake
 05/01/2017		Michael VanWie		Per tracker - Script canceled - duplicates #354
 ---------------------------------------------------------------------

// Script Number: 020
// Script Name: ENF_NoViolationInspectionUpdateWFStatus.js
// Script Developer: Vance Smith
// Script Agency: Mesa
// Script Description: 

// OLD REQUIREMENTS
// When an inspection of type "Initial Inspection" is resulted with a status of "No Violation":
// 1) Apply wf task status of "No Violation" to workflow task "Initial Inspection"
// 2) deactivate all workflow tasks
// 3) set record status to "Case Closed".

// NEW REQUIREMENTS - 11/16/2016
// When an inspection of type "Initial Inspection" is resulted with a status of "No Violation": 
// 1) set status of workflow task “Initial Inspection” to “No Violation”
// 2) deactivate all active tasks in the workflow
// 3) set record status to “No Violation”.

// When an inspection of type "Follow-Up Inspection" is resulted with a status of "Voluntary Compliance":
// 1) set status of workflow task “Follow-Up Inspection” to "Voluntary Compliance"
// 2) deactivate all active tasks in the workflow
// 3) set record status to "Voluntary Compliance"
 
// When an inspection of type "Citation Inspection" is resulted with a status of “Forced Compliance – Fees Paid”:
// 1) set status of workflow task “Citation Inspections” to “Forced Compliance – Fees Paid”
// 2) deactivate all active tasks in the workflow
// 3) set record status to “Forced Compliance – Fees Paid”

// When an inspection of type "Follow-Up Inspection" is resulted with a status of “Forced Compliance – Lien”:
// 1) set status of workflow task “Follow-Up Inspection” to “Forced Compliance – Lien
// 2) set record status to “Forced Compliance – Lien”.

// Script Run Event: IRSA

// Script Parents:
//	IRSA;Enforcement!Environmental!Complaint!~
//            
/*==================================================================*/

/* intellisense references */
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

// try
// {
// 	switch( inspType )
// 	{
// 		case "Initial Inspection":
// 			if ( inspResult == "No Violation")
// 			{
// 				if( isTaskActive("Initial Inspection") ) 
// 				{
// 					updateTask("Initial Inspection", "No Violation", "Updated by Script", "Updated by Script");
// 					logDebug("updated task");
// 				}

// 				// deactivate entire workflow
// 				var tasksResult = aa.workflow.getTasks(capId);
// 				if (tasksResult.getSuccess())
// 				{
// 					var tasks = tasksResult.getOutput();
// 					for (task in tasks){
// 						deactivateTask(tasks[task].getTaskDescription());
// 					}
// 				}
// 				logDebug("deactivated workflow");

// 				updateAppStatus("No Violation", "Updated by Script");
// 				logDebug("changed app status to No Violation");
// 			}
// 			break;
// 		case "Follow-Up Inspection":
// 			if ( inspResult == "Voluntary Compliance")
// 			{
// 				if( isTaskActive("Follow-Up Inspection") ) 
// 				{
// 					updateTask("Follow-Up Inspection", "Voluntary Compliance", "Updated by Script", "Updated by Script");
// 					logDebug("updated task");
// 				}

// 				// deactivate entire workflow
// 				var tasksResult = aa.workflow.getTasks(capId);
// 				if (tasksResult.getSuccess())
// 				{
// 					var tasks = tasksResult.getOutput();
// 					for (task in tasks){
// 						deactivateTask(tasks[task].getTaskDescription());
// 					}
// 				}
// 				logDebug("deactivated workflow");

// 				updateAppStatus("Voluntary Compliance", "Updated by Script");
// 				logDebug("changed app status to Voluntary Compliance");
// 			}
// 			if ( inspResult == "Forced Compliance - Lien")
// 			{
// 				if( isTaskActive("Follow-Up Inspection") ) 
// 				{
// 					updateTask("Follow-Up Inspection", "Forced Compliance - Lien", "Updated by Script", "Updated by Script");
// 					logDebug("updated task");
// 				}

// 				updateAppStatus("Forced Compliance - Lien", "Updated by Script");
// 				logDebug("changed app status to Forced Compliance - Lien");
// 			}
// 			break;
// 		case "Citation Inspection":
// 			if ( inspResult == "Forced Compliance - Fees Paid")
// 			{
// 				if( isTaskActive("Citation Inspection") ) 
// 				{
// 					updateTask("Citation Inspection", "Forced Compliance - Fees Paid", "Updated by Script", "Updated by Script");
// 					logDebug("updated task");
// 				}

// 				// deactivate entire workflow
// 				var tasksResult = aa.workflow.getTasks(capId);
// 				if (tasksResult.getSuccess())
// 				{
// 					var tasks = tasksResult.getOutput();
// 					for (task in tasks){
// 						deactivateTask(tasks[task].getTaskDescription());
// 					}
// 				}
// 				logDebug("deactivated workflow");

// 				updateAppStatus("Forced Compliance - Fees Paid", "Updated by Script");
// 				logDebug("changed app status to Forced Compliance - Fees Paid");
// 			}
// 			break;
// 	}
// }
// catch (err)
// {
//   logDebug("A JavaScript error occurred: " + err.message);
// }