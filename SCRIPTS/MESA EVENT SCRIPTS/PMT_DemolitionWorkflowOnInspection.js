/*===================================================================
// Script Number: 232
// Script Name: PMT_DemolitionWorkflowOnInspection.js
// Script Agency: Mesa
// Script Description: When “Demo Final” inspection type is resulted
//                     as “Approved” Update WF task “Inspection”
//                     with status of “Final Inspection Complete”
// Script Run Event: IRSA
// Script Parents:
//		IRSA;Permits!Demolition!NA!NA
//
// Version   |Date      |Engineer         |Details
//  1.0      |09/01/16  |Jody Bearden     |Initial Release
/*==================================================================*/

/* test with PMT16-00509 */

try
{	
	var getInspectionsResult = aa.inspection.getInspections(capId);
	
	if(getInspectionsResult.getSuccess()) {
		
		inspArr = getInspectionsResult.getOutput(); // array ot inspection objects
		logDebug("inspArr.length: " + inspArr.length);
		
		for (inspIdx in inspArr) {
			var inspObj = inspArr[inspIdx];
			var inspStatus = inspObj.getInspectionStatus();
			//logDebug("inspStatus: " + inspStatus + ", inspType: " + inspType);
			//if(isTaskActive("Inspection")) { logDebug("Inspection task is active..."); }
			//if(matches(inspStatus, "Scheduled")) { logDebug("taskStatus: " + taskStatus("Inspection")); }
			if (inspType == "Demo Final" && inspStatus == "Approved") {
				//logDebug("Inspections Task Status: " + taskStatus("Inspection"));
				updateTask("Inspection", "Final Inspection Complete", "", "");
				//logDebug("Inspection Workflow Task Status (after update): " + taskStatus("Inspection"));
			}
		}
	}
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}
