/*===================================================================
// Script Number: 343
// Script Name: PMT_SetInspectionScheduledDate.js
// Script Developer: Jody Bearden
// Script Agency: Mesa
// Script Description: When an inspection is scheduled, make the
//                     scheduled date the next working day. This
//                     includes Fridays and excludes weekends and
//                     holidays.  NOTE:  users should be able to
//                     manually overwrite the date and make the
//                     scheduled date a weekend as needed.
// Script Run Event: ISA
// Script Parents:
//		ISA;Permits!~!~!~ (with exception of Document Retrieval, Addenda, Fire, and PD)
//		IMSA;Permits!~!~!~ (with exception of Document Retrieval, Addenda, Fire, and PD)
//             
/*==================================================================*/

/* per Vance, see ENF_NewRecordPriorityNormal.js (26) and ENF_NewPriorityImminentHazard.js (42) for examples */
/* test with PMT16-00420, PMT16-00509 */

/*
info from Vance - in inspectionscriptmodel class there is a setScheduleDate method
 file://isrc01/ittechdocs/Applications/Dimes/EMSE-API-8_0_2-Doc/com/accela/aa/emse/dom/InspectionScriptModel.html 

*/

try
{
	if (appMatch("Permits/Commercial/*/*") || appMatch("Permits/Demolition/*/*") ||
		appMatch("Permits/Master Plan/*/*") || appMatch("Permits/Online/*/*") ||
		appMatch("Permits/Residential/*/*") || appMatch("Permits/Sign/*/*")) {
	
		// on inspection scheduled, make the scheduled date the next working day (include Fridays, and exclude weekends and holidays)
		var inspDate = dateAdd(null, 1, "Y"); // default to next working day.
		
		/*
		var inspArr = aa.env.getValue("InspectionDateArray");
		logDebug("inspArr length: " + inspArr.length());
		
		// get list of inspections associated with record
		var inspResultObj = aa.inspection.getInspections(capId);
		if (inspResultObj.getSuccess()) {
			var inspList = inspResultObj.getOutput();
			//logDebug("Number of inspections: " + inspList.length);
			for(insp in inspList) {
				if (matches(inspList[insp].getInspectionStatus(), "Scheduled")) {
					var inspType = inspList[insp].getInspectionType();
					//logDebug("Inspection type: " + inspList[insp].getInspectionType());
					//logDebug("Inspection status: " + inspList[insp].getInspectionStatus());
					scheduleInspectDate(inspType, inspDate);
				}
			}
		}
		*/
		
		// get inspection info (inspection ID and scheduled date) and update date
		/*
		var inspResultObj = aa.inspection.getInspections(capId);
		if (inspResultObj.getSuccess()) {
			var inspList = inspResultObj.getOutput();
			//logDebug("Number of inspections: " + inspList.length);
			for(insp in inspList) {
				if (inspList[insp].getIdNumber() == inspId) {
					var inspModel = inspList[insp].getInspection();
					//inspModel.setScheduledDate(inspDate);
					for(i in inspModel) {
						logDebug("inspModel[" + i + "]" + inspModel[i]);
					}
				}
			}
		}
		*/
		var inspResultObj = aa.inspection.getInspection(capId, inspId);
		if (inspResultObj.getSuccess()) {
			var inspObj = inspResultObj.getOutput();
			// setScheduledDate needs to be a type of "com.accela.aa.emse.util.ScriptDateTime"
			var theDate = aa.date.getScriptDateTime(new Date(inspDate)); // need to convert inspDate to right type of object - 
			inspObj.setScheduledDate(theDate);
			//logDebug("inspDate: " + inspDate);
		}
	/*
		logDebug("INSPECTION INFO FROM SCRIPT 343");
		logDebug("inspId: " + inspId);
		logDebug("inspInspector: " + inspInspector);
		logDebug("inspType: " + inspType);
		logDebug("inspSchedDate: " + inspSchedDate);
		logDebug("inspection date to update to: " + inspDate);
	*/
	}
		
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}
