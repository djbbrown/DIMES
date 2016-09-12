/*===================================================================
// Script Number: 055
// Script Name: TRN_PermitExpirationDate.js
// Script Developer: Jody Bearden
// Script Agency: Mesa
// Script Description: Transportation!Temporary Traffic Control!~!~
//                     Populate the ASI field "Permit Expiration Date"
//                     with the date entered in the ASIT field
//                     "Restriction End Date. If there is more than
//                     one record, use the date furthest out (if
//                     dates are 10/1 and 11/5, use 11/5).
// Script Run Event: ASA, ASIUA
// Script Parents:
//		ASA;Transportation!Temporary Traffic Control!~!~
//		ASIUA;Transportation!Temporary Traffic Control!~!~
//             
/*==================================================================*/

/* test with TTC16-00024 => no records */
/* test with TTC16-00026 */

try
{
	// check for record(s) in Duration Information table
	tbl = loadASITable("DURATION INFORMATION");
	//logDebug("duration information table - record count: " + tbl.length);

	// if there is one (or more), get the value of the most current Restriction End Date field
	if (tbl.length > 0) {
		var resEndDate = tbl[0]["Restriction End Date"]; // init before loop
		for (row in tbl) {
			tempEndDate = tbl[row]["Restriction End Date"];
			logDebug("tempEndDate: " + tempEndDate);
			if (tempEndDate > resEndDate) {  resEndDate = tempEndDate; } // get most current date
		}

		//logDebug("Current Permit Expiration Date: " + getAppSpecific("Permit Expiration Date"));
		//logDebug("Updating Permit Expiration Date to: " + resEndDate);
		editAppSpecific("Permit Expiration Date", resEndDate);
		//logDebug("Permit Expiration Date updated to: " + getAppSpecific("Permit Expiration Date"));
	} // else no records in ASIT, so no restriction end date to pull, so nothing to calculate permit date from.
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}
