/*===================================================================
// Script Number: 3
// Script Name: LIC Substantive Review Due Date - Set
// Script Developer: Kevin Ford
// Script Agency: Accela
// Script Description:
// 		LIC Set the 'Substantive Review Due' ASI field to the current date plus
// 		60 calendar days when the "License Application" task is set to a status of "Complete" 
// Script Run Event:
//		Workflow Task Update After (WTUA)
// Script Parents:
//		WTUA;Licenses!General!~!Application
/*==================================================================*/

// Under this line create the function that will need to run at script runtime.
// the function will be called in the event ("AppSubmitAfter") major event.
// Need to make sure which record types have "Substantive Review Due Date".
if(
		// Most Licenses
		(wfTask == "License Application" && wfStatus == "Complete")
		// Peddler/OffTrackBetting ("Substantive Review Due" field exists)
		|| (wfTask == "License Application" && wfStatus == "Completed")
		
		// The following must be checked.
		// Bingo Hall - No Status (No "Substantive Review Due" field)
		// Livestock - No Status (No "Substantive Review Due" field)
		// Special Event - No Status (No "Substantive Review Due" field)
)
{
	// Update "Substantive Review Due" to current date + 60
	// get 
	var subReviewDue = dateAdd(null,60);
	//editAppSpecific("Substantive Review Due", dateAdd(null,60));
	//aa.print(dateAdd(null,60));
	editAppSpecific("Substantive Review Due", subReviewDue,capId);
}