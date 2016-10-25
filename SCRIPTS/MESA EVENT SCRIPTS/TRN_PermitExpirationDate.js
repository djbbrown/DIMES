/*===================================================================
// Script Number: 055
// Script Name: TRN_PermitExpirationDate.js
// Script Developer: Jody Bearden
// Script Agency: Mesa
//
// (per change 88):
// Change Description: The change is to populate the ASI field "Permit
//                     Start Date" with the date entered in the ASIT
//                     field "Restriction Start Date". If there is
//                     more than one record, use the date earliest
//                     (if dates are 10/1 and 11/5, use 10/1)
//
// Original Script Description: Transportation!Temporary Traffic Control!~!~
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
/* test with TTC16-00026,  TTC16-00055 */

try
{
	// check for record(s) in Duration Information table
	tbl = loadASITable("DURATION INFORMATION");
	//logDebug("duration information table - record count: " + tbl.length);

	// if there is one (or more), get the value of the most current Restriction End Date field
	if (tbl.length > 0) {
		var resStartDate = tbl[0]["Restriction Start Date"]; // init before loop
		for (row in tbl) {
			tempStartDate = tbl[row]["Restriction Start Date"];
			logDebug("tempStartDate: " + tempStartDate);
			if (tempStartDate < resStartDate) {  resStartDate = tempStartDate; } // get most current date
		}

		//logDebug("Current Permit Start Date: " + getAppSpecific("Permit Start Date"));
		//logDebug("Updating Permit Start Date to: " + resStartDate);
		editAppSpecific("Permit Start Date", resStartDate);
		//logDebug("Permit Start Date updated to: " + getAppSpecific("Permit Start Date"));
	} // else no records in ASIT, so no restriction end date to pull, so nothing to calculate permit date from.
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}
