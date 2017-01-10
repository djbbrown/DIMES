/*===================================================================
// Script Number: 001
// Script Name: LICAppealDeadlineDateSet
// Script Developer: DMH
// Script Agency: Accela
// Script Description: See ASI field "Appeal Deadline"
// Script Run Event: WTUA
// nalbert 12/7/2016 - added task and status to capture OTB applications
// nalbert 1/4/2017 - updated Special Events to 5 days
/*==================================================================*/

if ((wfTask == "License Administrator Review" && wfStatus == "Denied") || (wfTask == "Licensing Supervisor" && wfStatus == "Recommend Denial") || (wfTask == "City Clerk" && wfStatus == "Applicant Notified Denied")) {
	// set ASI field
	editAppSpecific("Appeal Deadline", dateAdd(null, 10));
}

if (appMatch("Licenses/Liquor/Liquor/Application")){
	if (wfTask == "City Clerk" && wfStatus == "Applicant Notified Denied"){
		editAppSpecific("Appeal Deadline", dateAdd(null, 5));
	}
}

if(appMatch("Licenses/General/SpecialEvent/Application")){
	if (wfTask == "License Administrator Review" && wfStatus == "Denied"){
		editAppSpecific("Appeal Deadline", dateAdd(null, 5));
	}
}