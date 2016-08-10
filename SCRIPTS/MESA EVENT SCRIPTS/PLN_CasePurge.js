/*===================================================================
// Script Number: 240
// Script Name: Case Purge
// Script Developer: Kevin Ford
// Script Agency: Accela
// Script Description: Every month, run a batch script that will check
					records with the ASI "Meeting Date" having a value
					of more than 2 years in the past. For those records,
					update the record status to "File Purged" and delete
					all attached documents.
// Script Run Event: 
// Script Parents:
//				BATCH SCRIPT
/*==================================================================*/

// Under this line create the function that will need to run at script runtime.
// the function will be called in the event ("AppSubmitAfter") major event.