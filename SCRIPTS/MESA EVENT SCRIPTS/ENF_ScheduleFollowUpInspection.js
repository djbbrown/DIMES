/*==================================================================================================
// Script Number: 019
// Script Name:ENF_ScheduleFollowUpInspection
// Script Developer: Raminder Gill
// Script Agency: Accela
// Script Description: Schedule additional Inspection based on Insp result
//  Workflow Update part is being done in ENF_InViolationInspectionUpdateWFStatus
// Script Run Event: IRSA
// Script Parents:
//	IRSA;Enforcement!Case!~!~ 
//	IRSA;Enforcement!Environmental!~!~ 
//	11/29/2016 nalbert - Added assignment to inspector of Initial inspection or to Environmental Department
//               		Also added from defect #103 - 
//						follow-up insp status = extension -> create follow-up
// 						follow-up insp status = in violation -> create follow-up
//				
/*=================================================================================================*/

if (inspType == "Initial Inspection" && matches(inspResult, "In Violation", "3rd Party Abatement") ||
	inspType == "Follow-Up Inspection" && matches(inspResult, "Extension", "In Violation")) {
		
	var inspInterval = AInfo["Inspection Interval"];
	var daysOut = 14;
	if (inspInterval == "10 Days")
		daysOut = 10;
	if (inspInterval == "7 Days")
		daysOut = 7;
	if (inspInterval == "3 Days")
		daysOut = 5;
	
// get inspector of Initial inspection or assign to Environmental Department
	
	var inspUserId = getInspector("Initial Inspection");
	logDebug("inspector: " + inspUserId);
	
	if (!matches(inspUserId, " ", null)){
		scheduleInspection("Follow-Up Inspection", daysOut, inspUserId);
		logDebug("scheduled inspection with last inspector");
	}else{
		scheduleInspection("Follow-Up Inspection", daysOut);
		var needDept = true;
		logDebug("need department");
	}

	if (needDept){
		var dept = "Environmental";
		setInspectionDepartment(dept);
	}
}

// helper function
function setInspectionDepartment(dept){
	logDebug("in function: " + dept);
  if(dept == null || dept == "")
    return;
// get list of inspections associated with record
		var inspObj = aa.inspection.getInspections(capId);
		if (inspObj.getSuccess()) {
			var inspList = inspObj.getOutput();
			logDebug("Number of inspections: " + inspList.length);
			for(i in inspList) {
				if (matches(inspList[i].getInspectionStatus(), "Scheduled")) {
					var inspType = inspList[i].getInspectionType();
						if (inspType == "Follow-Up Inspection"){
						logDebug("Inspection type: " + inspList[i].getInspectionType());
						logDebug("Inspection status: " + inspList[i].getInspectionStatus());
						logDebug("Inspection ID: " + inspList[i].getIdNumber());
						
						assignInspection(inspList[i].getIdNumber(), dept);
						}
				}
			}
		}

}

