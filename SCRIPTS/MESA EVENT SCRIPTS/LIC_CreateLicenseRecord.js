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
	aa.print("Creating License Record");
	// •	Create a child record of type License/*/*/License (where the record type and subtype are the same as the parent application record)
	// Need to get the type and sub-type broken out, the following format can be used appTypeArray[1]
	license = createChild(appTypeArray[0],appTypeArray[1],appTypeArray[2],"License","License");
	// Convert the Contact of type "Applicant" (This should be "License Applicant")
	// to "Licensee" ("Licensee" is in configuration and should be no issue.)
	var capContactResult = aa.people.getCapContactByCapID(license);
	if (capContactResult.getSuccess()) {
		var Contacts = capContactResult.getOutput();
		
		for (aContact in Contacts) {
			var updateContact = Contacts[aContact].getCapContactModel();
			var newPeople = updateContact.getPeople();
			var cType = newPeople.getContactType();
			if( (cType == "License Applicant") || (cType == "Applicant")) {
				var ContactName = newPeople.getContactName();
				var businessName = newPeople.getBusinessName();
				//ContactName += " "+newPeople.businessName();
				aa.print("Updating Contact "+ContactName+" "+businessName);
				newPeople.setContactType("Licensee");
			}
			else {
				newPeople.setContactType(cType);
			}
		}
	}
	
	// Set the expiration status to Active and the expiration date according to the expiration code.
	lic = new licenseObject(license);
	lic.setStatus("Active");

	// Set the expiration date according to the expiration code.
	// Need to do some research on how the expiration code is being done.
	lic.setExpiration(dateAdd(null,365)); // This will add 365 days to the expiration.

	// Copy info from application to "License" according to standard choice EMSE:ASI Copy Exceptions.
	// o	EMSE:ASI Copy Exceptions – contains the record type (in the “Standard Choices Value” field)
	//		along with a “|” delimited list ASI fields to exclude when copying the ASI (in the “Value Desc” field).
	
	// Get the standard choice
	var stdChoice = lookup("EMSE:ASI Copy Exceptions",appTypeString);
	
	// use the following to split based on "|" character
	var asiExclude = stdChoice.split("|"); // Not needed as the exclusion table would work just fine
	
	// Now copy the ASI from the parent to the child using the exclusion table.
	copyAppSpecific(license,asiExclude);
	
}