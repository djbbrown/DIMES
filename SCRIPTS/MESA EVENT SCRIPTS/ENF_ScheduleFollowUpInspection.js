/*===================================================================
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
//	 
//      
//            
/*==================================================================*/

if (inspType == "Initial Inspection" && inspResult == "In Violation") {
		
	var inspInterval = AInfo["Inspection Interval"];
	var daysOut = 14;
	if (inspInterval == "10 Days")
		daysOut = 10;
	if (inspInterval == "7 Days")
		daysOut = 7;
	if (inspInterval == "3 Days")
		daysOut = 5;
	
	scheduleInspection("Follow-Up Inspection", daysOut, "ADMIN", null, "ADMIN");
}

