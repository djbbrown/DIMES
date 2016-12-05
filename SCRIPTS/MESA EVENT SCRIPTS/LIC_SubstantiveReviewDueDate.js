/*===================================================================
// Script Number: 003
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
		appTypeArray[0]=="Licenses"
		&& (
		(wfTask == "License Application" && wfStatus == "Complete")
		// Peddler/OffTrackBetting ("Substantive Review Due" field exists)
		|| (wfTask == "License Application" && wfStatus == "Completed")
		// Update for Extension of Premise - Permanent
		|| (wfTask == "Administrative" && wfStatus == "Completed")
		// BingoHall workflow
		|| (wfTask == "Administrative Review" && wfStatus == "Complete")
		// ParkandSwap workflow
		|| (wfTask == "Application Intake" && wfStatus == "Completed")
		)
		// The following must be checked.
		// Bingo Hall - No Status (No "Substantive Review Due" field) - update 12/5/2016 - due date should be 45 days, not 60 including rec type below
		// Livestock - No Status (No "Substantive Review Due" field)
		// Special Event - No Status (No "Substantive Review Due" field)
)
{
	// Get Record type before setting the "Substantive Review Due"
	if(appTypeArray[2]=="SpecialEvent"
		|| appTypeArray[2]=="ExtensionOfPremise-Temporary"
		|| appTypeArray[2]=="ExtensionOfPremise-Permanent"
		|| appTypeArray[2]=="Firework"
		) {
		// Special Event + 30 needs to be set
		editAppSpecific("Substantive Review Due", dateAdd(null,30));
	}
	/* The following code exists because it was on the tracker,
	 * It was not however in the script specification.
	 */
	if(appTypeArray[2]=="MassageEstablishment") {
		editAppSpecific("Substantive Review Due", dateAdd(null,90));
	}
	if(appTypeArray[2]=="LiquorSpecialEvent"
		|| appTypeArray[2]=="TeenDance"
		|| appTypeArray[2]=="Liquor"
		|| appTypeArray[2]=="ParkandSwap"
		|| appTypeArray[2]=="BingoHall"
	) {
		editAppSpecific("Substantive Review Due", dateAdd(null,45));
	}
	//*/
	else {
		// Update the Substantive Review Due + 60 for all other record types.
		editAppSpecific("Substantive Review Due", dateAdd(null,60));
	}
}