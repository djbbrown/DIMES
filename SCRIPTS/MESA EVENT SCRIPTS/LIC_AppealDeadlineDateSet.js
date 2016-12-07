/*===================================================================
// Script Number: 001
// Script Name: LICAppealDeadlineDateSet
// Script Developer: DMH
// Script Agency: Accela
// Script Description: See ASI field "Appeal Deadline"
// Script Run Event: WTUA
// nalbert 12/7/2016 - added task and status to capture OTB applications
/*==================================================================*/

if (matches(wfTask, "License Administrator Review", "Licensing Supervisor") && matches(wfStatus, "Denied", "Recommend Denial")) {
	// set ASI field
	editAppSpecific("Appeal Deadline", dateAdd(null, 10));
}

if (appMatch("Licenses/Liquor/Liquor/Application")){
	if (wfTask == "City Clerk" && wfStatus == "Applicant Notified Denied"){
		editAppSpecific("Appeal Deadline", dateAdd(null, 5));
	}
}