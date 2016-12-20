/*===================================================================
// Script Number: 252
// Script Name: PLN_RenewRegistrationRecord.js
// Script Developer: Jody Bearden
// Script Agency: Mesa
// Script Description: When the Workflow task "Renewal Review" is set
//                     to "Renewed", reset Registration Expiration Date
//                     to today + 365 days, and copy all ASI data from
//                     Renewal record to the corresponding Registration
//                     record which is the parent of this Renewal record.
// Script Run Event: WTUA
// Script Parents:
//            WTUA;Planning!Group Home!Renewal!NA
===================================================================*/
/* test with GHRN16-00327, 16TMP-000325, GHRN16-00467 */
/* parcel: 13837003A -> MCP@20 E MAIN St */
/* parent rec of GHRN16-00467 => REC16-00000-002QI */
try
{
	//Begin Renewal functions
	parentCapId = getParentLicenseCapID(capId);
	parentAltId = getParentLicenseCustomID(parentCapId);
	if ((parentCapId != "undefined" || parentCapId != null) && (wfTask == "Renewal Review" && wfStatus == "Renewed")) {
	//1. Update parent license workflow
		
	//2. Copy key information from child renewal to parent license
	//Copy ASI from renewal to license
	copyASIInfo(capId,parentCapId);
	
	//3. Remove Contacts from parent record
	var ca = getContactObjs(parentCapId);
	var i;
	for (i in ca) {
		c = ca[i];
		if (c.seqNumber) {
			aa.people.removeCapContact(parentCapId, c.seqNumber);
			logDebug("Contacts removed from record" + parentAltId);
		}
	}
	//4. Copy Contacts to parent record
	copyContacts3_0(capId,parentCapId); //Copy Contacts from renewal to license

	//5. Update Renewal Info
	parentCapId = getParentCapID4Renewal();
	if (parentCapId)
		thisReg = new licenseObject(parentCapId.getCustomID(), parentCapId);
	if (parentCapId)
		if (new Date(sysDateMMDDYYYY) > new Date(thisReg.b1ExpDate))
			thisReg.setExpiration(dateAddMonths(null, 12));
		else
			thisReg.setExpiration(dateAddMonths(thisReg.b1ExpDate, 12));
	if (parentCapId)
		thisReg.setStatus("Active");
	
	//6. Updated complete status
	renewalCapProject = getRenewalCapByParentCapIDForIncomplete(parentCapId); //complete renewal record status
	if (renewalCapProject != null)
	{
		renewalCapProject.setStatus("Complete"); //Set renewal CAP status to "Complete"
		aa.cap.updateProject(renewalCapProject); //Save updates
	}
	
	}


	//remarked out code below for renewal functionality
	/*if (wfTask == "Renewal Review" && wfStatus == "Renewed") {
		//logDebug("reg exp date (before): " + getAppSpecific("Registration Expiration Date"));
		editAppSpecific("Registration Expiration Date", dateAdd(null, 365));
		//logDebug("reg exp date (after): " + getAppSpecific("Registration Expiration Date"));
		// Copy all ASI data from Renewal record to parent Registration record
		parentRec = getParent(); //("Planning/Group Home/Registration/NA");
		if (parentRec) {
			//logDebug("parent found.");
			//logDebug("parent recs: " + parentRec);
			copyASIFields(capId, parentRec);
		} else { logDebug("Script 252 => no parent records found."); }
	}
	*/
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}