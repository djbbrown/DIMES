/*===================================================================
// Script Number: 407
// Script Name: PMT_Fire_RenewPermitRecord.js
// Script Developer: Michael VanWie
// Script Agency: Mesa
// Script Description: When the Workflow task "Renewal FSOP" is set to "Issued", 
//					   -Reset Permit Expiration Date to today + 365 days, 
//					   -Copy all ASI data from Renewal record to Permit Record
// Script Run Event: WTUA
// Script Parents:
//            WTUA;Permits!Fire!FSOP!Renewal
===================================================================*/

try
{
	parentCapId = getParentLicenseCapID(capId);
	parentAltId = getParentLicenseCustomID(parentCapId);

	//Begin Renewal functions
	if ((parentCapId != "undefined" || parentCapId != null) && (wfTask == "Renewal FSOP" && wfStatus == "Issued")) 
	{
		//Copy ASI from renewal to Permit
		copyASIInfo(capId,parentCapId);
	
		//Remove Contacts from parent record
		var ca = getContactObjs(parentCapId);
		var i;
		for (i in ca) {
			c = ca[i];
			if (c.seqNumber) {
				aa.people.removeCapContact(parentCapId, c.seqNumber);
				logDebug("Contacts removed from record" + parentAltId);
			}
		}

		//Copy Contacts to parent record
		copyContacts3_0(capId,parentCapId);

		//Update Renewal Info
	    if (parentCapId) {
		    thisReg = new licenseObject(parentCapId.getCustomID(), parentCapId);
	    
		    if (new Date(sysDateMMDDYYYY) > new Date(thisReg.b1ExpDate))
			    thisReg.setExpiration(dateAddMonths(null, 12));
		    else
			    thisReg.setExpiration(dateAddMonths(thisReg.b1ExpDate, 12));
	    
	    	thisReg.setStatus("Active");
	    }
	
		//Updated complete status
		renewalCapProject = getRenewalCapByParentCapIDForIncomplete(parentCapId); //complete renewal record status
		if (renewalCapProject != null)
		{
			renewalCapProject.setStatus("Complete"); //Set renewal CAP status to "Complete"
			aa.cap.updateProject(renewalCapProject); //Save updates
		}
	}
	else
	{
		logDebug("Parent Cap ID not found.")
	}
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}