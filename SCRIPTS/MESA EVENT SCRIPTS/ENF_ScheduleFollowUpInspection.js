/*===================================================================
// Script Number: 019
// Script Name:ENF_ScheduleFollowUpInspection
// Script Developer: Raminder Gill
// Script Agency: Accela
// Script Description: Update workflow task and schedule additional Inspection based on Insp result
// Script Run Event: IRSA
// Script Parents:
//	IRSA;Enforcement!Case!~!~ 
//	IRSA;Enforcement!Environmental!~!~ 
//	-- this doesn't exist anymore IRSA;Enforcement!Animal Control!~!~ 
//      
//            
/*==================================================================*/

if (inspType == "Initial Inspection" && inspResult == "In Violation") {
	if( isTaskActive("Initial Inspection") ) {
		closeTask("Initial Inspection","In Violation","Closed by Script","Closed by Script");
	}
	if( isTaskActive("Follow-Up Inspection") ) {
		updateTask("Follow-Up Inspection","In Violation","Updated by Script","Updated by Script");
	}
	//assuming the citation Inspections is to be updated.
	if( isTaskActive("Citation Inspections") ) {
		updateTask("Citation Inspections","In Violation","Updated by Script","Updated by Script");
	}
	//Using the default of 14 days for Inspection interval - don't know how to use ASI field value here
	var inspInterval = AInfo["Inspection Interval"];
	var daysOut = 14;
	if (inspInterval == "10 Days")
		daysOut = 7;
	if (inspInterval == "7 Days")
		daysOut = 7;
	if (inspInterval == "3 Days")
		daysOut = 5;
	
	scheduleInspection("Follow-Up Inspection", daysOut, "ADMIN", null, "ADMIN");
}

