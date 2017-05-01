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
//	IRSA;Enforcement/Environmental/NA/NA -- removed by vsmith

// 11/29/2016 nalbert - Adding from defect #103: 
//						follow-up insp status = Citation Issued -> create citation insp
//						initial inspection status = Citation -> create citation insp
// 04/06/2017 vsmith - 	added code so this script does not fire for ENVC records
// 						this script was colliding with #354
//
// scheduleInspection("inspType", daysAhead, "inspID", inspTime, "inspComment");
/*==================================================================*/

// dont execute this script on Environmental/Complaint (ENVC) record types
if (!appMatch("Enforcement/Environmental/Complaint/*")) { 
	
	if (inspType == "Citation Inspection" && inspResult == "In Violation") {
		scheduleInspection("Citation Inspection", 7);
	}

	if (inspType == "Citation Inspection" && inspResult == "In Violation - Expedite") {
		scheduleInspection("Citation Inspection", 3);
	}

	if (inspType == "Follow-Up Inspection" && inspResult == "Citation Issued") {
		scheduleInspection("Citation Inspection", 7);
	}

	if (inspType == "Initial Inspection" && inspResult == "Citation") {
		scheduleInspection("Citation Inspection", 7);
	}
}