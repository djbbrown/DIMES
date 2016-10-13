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
	if (wfTask == "Renewal Review" && wfStatus == "Renewed") {
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
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}