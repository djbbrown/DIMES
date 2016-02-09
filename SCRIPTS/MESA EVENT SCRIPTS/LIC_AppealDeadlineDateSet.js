/*===================================================================
// Script Number: 001
// Script Name: LICAppealDeadlineDateSet
// Script Developer: DMH
// Script Agency: Accela
// Script Description: See ASI field "Appeal Deadline"
// Script Run Event: WTUA
/*==================================================================*/

if (wfTask.equals("License Administrator Review") && wfStatus.equals("Denied")) {
	// set ASI field
	editAppSpecific("Appeal Deadline", dateAdd(null, 10))
}

