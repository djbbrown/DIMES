/*===================================================================
// Script Number: 007
// Script Name: Create License Record
// Script Developer: Kevin Ford
// Script Agency: Accela
// Script Description: Create the license record when the "Issue License"
			task on the application record is set to a status of "Issued".
			Convert to contact of type "Applicant" to "Licensee". Set the
			expiration status to Active and the expiration date according
			to the expiration code. Copy info from application to license
			according to standard choice EMSE:ASI Copy Exceptions.  
// Script Run Event: Workflow Task Update After
// Script Parents:
//            WTUA;Licenses!General!~!Application.js
/*==================================================================*/

// When WFTask "Issue License" is set to "Issued"
if (wfTask.equals("Issue License") && wfStatus.equals("Issued"))
{
	// Quick test for script functioning
//	showMesasge = true;
//	message = "";
//	comment("This is a test message");
//	cancel = true;
	// Convert the Contact of type "Applicant" (This should be "License Applicant")
	// to "Licensee" ("Licensee" is in configuration and should be no issue.)
	var capContactResult = aa.people.getCapContactByCapID(capId);
	if (capContactResult.getSuccess()) {
		var Contacts = capContactResult.getOutput();
		
		for (aContact in Contacts) {
			var updateContact = Contacts[aContact].getCapContactModel();
			var newPeople = updateContact.getPeople();
			var cType = newPeople.getContactType();
			if( cType = "License Applicant" || cType = "Applicant") {
				newPeople.setContactType("Licensee");
			}
			else {
				newPeople.setContactType(Type);
			}
		}
	}
	
	// Set the expiration status to "Active"

	// Set the expiration date according to the expiration code.

	// Copy info from application to "License" according to standard choice EMSE:ASI Copy Exceptions.
}