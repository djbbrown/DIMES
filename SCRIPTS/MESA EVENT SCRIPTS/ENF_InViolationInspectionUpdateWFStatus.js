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

if ((inspType == "Initial Inspection" || inspType == "Follow-Up Inspection" || inspType == "Follow-up Inspection") && inspResult == "In Violation") {
	if( isTaskActive("Initial Inspection") ) {
		branchTask("Initial Inspection","In Violation","Closed by Script","Closed by Script");
	}
	if( isTaskActive("Follow-Up Inspection") ) {
		updateTask("Follow-Up Inspection","In Violation","Updated by Script","Updated by Script");
	}
	if( isTaskActive("Citation Inspections") ) {
		updateTask("Citation Inspections","In Violation","Updated by Script","Updated by Script");
	}
	
}

