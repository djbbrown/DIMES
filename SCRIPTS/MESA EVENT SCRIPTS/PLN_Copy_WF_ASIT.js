/*===================================================================
// Script Number: 269
// Script Name: PLN_Copy_WF_ASIT.js
// Script Description: Whenever the Workflow Task Hearing is updated to a status that is NOT Note, or Hearing Scheduled, or SP Hearing Complete; 
// Then create a new row in the ASIT DECISIONS AND RECOMMENDATIONS
// Script Run Event: WTUA
// Script Parents:
//		WTUA;Planning/Subdivision/NA/NA
//		WTUA;Planning/General Plan Amendment – Major/NA/NA
//		WTUA;Planning/Planning and Zoning/NA/NA
//		WTUA;Planning/Design Review/NA/NA
//		WTUA;Planning/Board of Adjustment/NA/NA
//		WTUA;Planning/Admin Review/NA/NA
//
// Version   |Date      |Engineer         |Details
//  1.0      |09/21/16  |Steve Veloudos   |Initial Release
//  1.1      |12/08/1   |Jody Bearden     |Redid to current specs - used environment variables, removed Java API calls
==================================================================*/
/* Test Record: ZON16-00249 */

try {
	if (matches(wfTask, "Hearing(s)", "Hearing", "Hearings")) {
		if (!matches(wfStatus, "Note", "Hearing Scheduled", "Hearing Complete") {
			var asitRow = new Array();
			asitRow["Date"] = wfDateMMDDYYYY;
			asitRow["Decision"] = wfStatus;
			asitRow["Review/Decision By"] = AInfo["Hearing Body"];
			addToASITable("DECISIONS AND RECOMMENDATIONS", asitRow, capId);
		}
	}
}
catch (err){
	logDebug("A JavaScript Error occured: " + err.message);
}