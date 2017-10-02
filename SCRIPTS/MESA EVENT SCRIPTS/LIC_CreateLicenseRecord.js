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
//
// Updates:
// -----------------------------------------------------------------------------
// | BY         |    DATE      |  NOTES
// -----------------------------------------------------------------------------
// | M VanWie   |  06/19/2017  | - Added BingoHall to types of records NOT to set an expiration date to
// | M VanWie   |  10/02/2017  | - Issue# 389 (old 193) Changed BingoHall exp to 12/31/2099 as this recordtype doesn't expire. 
//									This follows the date convention used for converted records. Turning off Expiration Dates 
//									for this record type causes other script errors.
// | M VanWie   |  10/02/2017  | - Issue# 41 - Added 'Special Event' expiration date calculation
/*==================================================================*/

// When WFTask "Issue License" is set to "Issued"
if (matches(wfTask,"Issue License","License Issuance") && wfStatus.equals("Issued"))
{
	aa.print("Creating License Record");
	// Create a child record of type License/*/*/License (where the record type and subtype are the same as the parent application record)
	// Need to get the type and sub-type broken out, the following format can be used appTypeArray[1]
	license = createParent(appTypeArray[0],appTypeArray[1],appTypeArray[2],"License","License");
	//var TempCap = capId;
	//capId = license;
	updateAppStatus("Active","Set via script",license);
	//capId = TempCap;
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
			aa.people.editCapContactWithAttribute(updateContact); // Commit the changes with contact ASI Attributes, this is safer to use.
		}
	}
	
	newLicIdString = license.getCustomID(); 
	aa.print("newLicIdString" + newLicIdString);
	
	lic = new licenseObject(null,license) ; 	
	
	// Set the expiration status to Active and the expiration date according to the expiration code. 
	// all the expiration_interval_unit are set to either one year or 12 months so using 365 days
	lic.setStatus("Active");
	// if record type is Licenses/Liquor/Liquor/License do not update expiration date let configured expiration date do the work.
	if(!matches(appTypeArray[2],"Liquor","Fireworks","LiquorSpecialEvent", "BingoHall", "SpecialEvent")){
		lic.setExpiration(dateAdd(null,365));
	}
	if(appTypeArray[2] == "Fireworks"){
		var eventFWExpDt = getAppSpecific("Event End Date",capId);
		lic.setExpiration(dateAdd(eventFWExpDt,1));
	}
	if(appTypeArray[2] == "LiquorSpecialEvent"){
		var eventSELExpDt = getAppSpecific("Event End Date",capId);
		lic.setExpiration(dateAdd(eventSELExpDt,1));
	}
	if(appTypeArray[2] == "BingoHall"){
		lic.setExpiration('12/31/2099');
	}
	if(appTypeArray[2] == "SpecialEvent"){
		var eventSEExpDt = getAppSpecific("Last Event Day",capId);
		lic.setExpiration(dateAdd(eventSEExpDt,1));
	}
	
	// Copy info from application to "License" according to standard choice EMSE:ASI Copy Exceptions.
	// EMSE:ASI Copy Exceptions - contains the record type (in the "Standard Choices Value" field)
	// along with a "|" delimited list ASI fields to exclude when copying the ASI (in the "Value Desc" field).
	
	var ignore = lookup("EMSE:ASI Copy Exceptions",appTypeString); 
	var ignoreArr = new Array(); 
	if(ignore != null) ignoreArr = ignore.split("|");
	copyASIFields(capId,license,ignoreArr); // Copy the actual ASI Fields
	copyAppSpecific(license,ignoreArr); // Copy the values
	// no need for ASIT table as it is only for Denial
	//copyASITables(capId,license);
	
	// Update the License DBA with the "Business Name" ASI from the Application Record
	// Note that this is not in the spec.
	// The following has been edited by request of Janet Evelan to use "Application Name" for dba
	// the request was specifically for Massage License and may not apply to other types so we're being careful
	// If "Business Name" is blank, then we're going to get the capName(Appliaciton Name)
	var dba = getAppSpecific("Business Name",capId);
	if (dba == null) {
		dba = capName;
	}
	var desc = aa.cap.getCap(license).getOutput().getCapModel();
	desc.setSpecialText(dba); // This is the capName record Name
	aa.print(desc.getSpecialText());
	setNameResult = aa.cap.editCapByPK(desc);
	if (!setNameResult.getSuccess())
		{ logDebug("**WARNING: error setting cap name : " + setNameResult.getErrorMessage()) ;}
}
