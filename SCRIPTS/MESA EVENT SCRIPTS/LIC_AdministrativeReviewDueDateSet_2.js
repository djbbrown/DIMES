/*===================================================================
// Script Number: 002
// Script Name: LIC_AdministrativeReviewDueDate_Set
// Script Developer: RG
// Script Agency: Accela
// Script Description: Update ASI "Administrative Review Due"  based on WF task/status
// Script Run Event: WTUA
// Script Parents:
//    WTUA;Licenses!General!Offtrackbetting!Application               
//    WTUA;Licenses!Liquor!~!Application          
/*==================================================================*/

if ((wfTask.equals("License Application") || wfTask.equals("Application Intake")) && wfStatus.equals("Received")) {
	// set ASI field
	editAppSpecific("Administrative Review Due", dateAdd(null, 14))
}