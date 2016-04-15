/*===================================================================
// Script Number: 046
// Script Name:ENF_ScheduleAdditionalCitationInspection
// Script Developer: Raminder Gill
// Script Agency: Accela
// Script Description: Schedule additional Citation Inspection based on Insp result
// Script Run Event: IRSA
// Script Parents:
//	IRSA;Enforcement/Case/Code Compliance/NA
//	IRSA;Enforcement/Case/Code Rental Issue/NA
//	IRSA;Enforcement/Case/Code Sign Issue/NA
//	IRSA;Enforcement/Environmental/NA/NA 
//            
/*==================================================================*/

if (inspType == "Citation Inspection" && inspResult == "In Violation") {
	// The following will assign to a specific person, this was not a requirement in the spec.
	// scheduleInspection("Citation Inspection", 7, "ADMIN", null, "ADMIN");
	scheduleInspection("Citation Inspection", 7);
}

if (inspType == "Citation Inspection" && inspResult == "In Violation - Expedite") {
	// The following will assign to a specific person, this was not a requirement in the spec.
	// scheduleInspection("Citation Inspection", 3, "ADMIN", null, "ADMIN");
	scheduleInspection("Citation Inspection", 3);
}