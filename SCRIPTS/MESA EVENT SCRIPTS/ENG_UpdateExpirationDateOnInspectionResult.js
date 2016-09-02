/*===================================================================
// Script Number: 058
// Script Name: ENG_UpdateExpirationDateOnInspectionResult.js
// Script Developer: Jody Bearden
// Script Agency: Mesa
// Script Description: When an inspection of any type is resulted with
//                     a status of "Approved" or "Partial Approved",
//                     set the ASI field "Permit Expiration Date" to
//                     the inspection result date plus 120 days.
//                     (for Engineering!Utilities!Non-City!~ -> 120 days)
//                     (for Engineering!Right of Way!~!~ -> 180 days)
// Script Run Event: IRSA
// Script Parents:
//		IRSA;Engineering!Utilities!Non-City!~
//		IRSA;Engineering!Right of Way!~!~
//             
/*==================================================================*/

/* test with ROW16-00004 */

try
{
	var daysToExp = 120; // default number of days until expiration - to be added to inspection result date.
	if (appMatch("Engineering/Utilities/Non-City/*")) { daysToExp = 120; }
	if (appMatch("Engineering/Right Of Way/*/*")) { daysToExp = 180; }
	
	logDebug("appMatch (Utilities): " +  appMatch("Engineering/Utilities/Non-City/*"));
	logDebug("appMatch: (Right Of Way)" +  appMatch("Engineering/Right Of Way/*/*"));
	
	var getInspectionsResult = aa.inspection.getInspections(capId);
	if(getInspectionsResult.getSuccess()) {
		
		inspArr = getInspectionsResult.getOutput(); // array ot inspection objects
		logDebug("inspArr.length: " + inspArr.length);
		
		for (inspIdx in inspArr) {
			var inspObj = inspArr[inspIdx];
			var inspStatus = inspObj.getInspectionStatus();
			if(matches(inspStatus, "Approved", "Partial Approved")) {
				logDebug("inspResult---: " + inspStatus);
				if (inspObj.getInspectionStatusDate() != null) {
					// pulled from Accela code for InspectionResultSubmitAfter.js (master file for IRSA event).
					var inspResultDate = inspObj.getInspectionStatusDate().getMonth() + "/" + inspObj.getInspectionStatusDate().getDayOfMonth() + "/" + inspObj.getInspectionStatusDate().getYear();
					logDebug("Adding " + daysToExp + " to Permit Expiration Date.");
					var permitExpDate = dateAdd(inspResultDate, daysToExp);
					editAppSpecific("Permit Expiration Date", permitExpDate); // add 120 or 180 days, depending on record type.
					logDebug("inspResultDate: " + inspResultDate);
					logDebug("Permit Expiration Date: " + permitExpDate);
				} // else, no inspection result date available -> if this is null, do nothing
			}
		}
	}
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}