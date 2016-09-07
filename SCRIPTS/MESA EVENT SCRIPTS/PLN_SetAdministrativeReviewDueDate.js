//*===================================================================
//
// Script Number: 075
// Script Name: PLN_SetAdministrativeReviewDueDate.js
// Script Developer: Jody Bearden
// Script Agency: City of Mesa
// Script Description: 	Set the ASI field "Administrative Review Due'
//                      to the current date plus 26 working days when
//                      the Plans Coordination task is set to a status
//                      of "Review Complete"
//
// Script Run Event: WTUA
// Script Parents:
//             WTUA;Planning!~!~!~
//             WTUA;Planning!Admin Review!NA!NA
// 
//==================================================================*/

try
{
	var today = new Date();

	// For a record type of Planning/Admin Review/NA/NA - when the 'Application Acceptance'
	// workflow task is set to a status of 'Accepted' set the value of the ASI field
	// 'Administrative Review Due' to today's date plus 21 (working?) days.
	if (appMatch("Planning/Admin Review/NA/NA") && wfTask == "Application Acceptance" && wfStatus == "Accepted") {
		logDebug("Planning/Admin Review/NA/NA - Application Acceptance updated to Accepted.");
		logDebug("Today: " + today);
		editAppSpecific("Administrative Review Due", dateAdd(today, 21, "Y"); // "Y" -> adds working days, rather than calendar days.
		logDebug("Updated Administrative Review Due to today plus 21 working days: " + getAppSpecific("Administrative Review Due"));
	} else {
		// For all other Planning record types (Planning!~!~!~), when the 'Plans Coordination'
		// workflow task is set to a status of 'Review Complete' set the value of the ASI
		// field 'Administrative Review Due' to today's date plus 26 working days.
		if (appMatch("Planning/*/*/*") && wfTask == "Plans Coordination" && wfStatus == "Review Complete") {
			logDebug("Planning/*/*/* - Plans Coordination updated to Review Complete.");
			logDebug("Today: + today);
			editAppSpecific("Administrative Review Due", dateAdd(today, 26, "Y"); // "Y" -> adds working days, rather than calendar days.
			logDebug("Updated Administrative Review Due to today plus 26 working days." + getAppSpecific("Administrative Review Due"));
		}
	}
}
catch (err)
{
	logDebug("A JavaScript Error occured: " + err.message);
}