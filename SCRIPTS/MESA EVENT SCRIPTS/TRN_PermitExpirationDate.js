/*===================================================================
// Script Number: 055
// Script Name: TRN_PermitExpirationDate.js
// Script Developer: Jody Bearden
// Script Agency: Mesa
// Script Description: Transportation!Temporary Traffic Control!~!~
//                     set the value of the ASI field "Restriction End
//                     Date" - found in ASIT "Duration Information".
//                     If field is null, set to 180 from the current
//                     date, and if there is no record in the ASIT
//                     table, don't do anything.  Trigger on ASA and
//                     ASIUA.
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
	var updateTable = false;
	// check for record(s) in Duration Information table
	tbl = loadASITable("DURATION INFORMATION");
	//tbl = DURATIONINFORMATION;
	logDebug("duration information table - record count: " + tbl.length);
	// if there is one (or more), get the value of the Restriction End Date field (for each row)
	if (tbl.length > 0) {
		var today = new Date();
		var resEndDate = dateAdd(today, 180);
		for (row in tbl) {
			endDate = tbl[row]["Restriction End Date"];
			logDebug("endDate: " + endDate);
			// if the field value is null, set it to today plus 180 days
			if (endDate == null || endDate == "") {
				logDebug("Updating Restriction End Date from empty value to: " + resEndDate);
				tbl[row]["Restriction End Date"] = resEndDate;
				updateTable = true;
				logDebug("Restriction End Date updated to: " + tbl[row]["Restriction End Date"]);
			}
		}
		// out with the old, in with the new?
		if (updateTable) {
			removeASITable("DURATION INFORMATION");
			addASITable("DURATION INFORMATION", tbl);
		}
	}
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}
