/*===================================================================
// Script Number: 001
// Script Name: LICAppealDeadlineDateSet
// Script Developer: DMH
// Script Agency: Accela
// Script Description: See ASI field "Appeal Deadline"
// Script Run Event: WTUA
/*==================================================================*/

if (wfTask == "License Administrator Review" && wfStatus == "Denied") {
	// set ASI field
	editAppSpecific("Appeal Deadline", dateAdd(null, 10));
}

if (appMatch("Licenses/Liquor/Liquor/Application")){
	if (wfTask == "City Clerk" && wfStatus == "Applicant Notified Denied"){
		editAppSpecific("Appeal Deadline", dateAdd(null, 5));
	}
}