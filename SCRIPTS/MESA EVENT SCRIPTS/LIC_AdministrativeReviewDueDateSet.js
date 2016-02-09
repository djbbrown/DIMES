/*===================================================================
// Script Number: 002
// Script Name: 002_LICAdministrativeReviewDueDate_Set
// Script Developer: RG
// Script Agency: Accela
// Script Description: Update ASI "Administrative Review Due"  based on WF task/status
// Script Run Event: WTUA
// Script Parents:
//    WTUA;Licenses!General!~!Application        
//            
/*==================================================================*/

if (wfTask.equals("License Application") && wfStatus.equals("Received")) {
	// set ASI field
	editAppSpecific("Administrative Review Due", dateAdd(null, 10))
}

