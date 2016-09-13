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
//             
/*==================================================================*/

/* test with PMT16-00420 */

try
{
	if (appMatch("Permits/Commercial/*/*") || appMatch("Permits/Demolition/*/*") ||
		appMatch("Permits/Master Plan/*/*") || appMatch("Permits/Online/*/*") ||
		appMatch("Permits/Residential/*/*") || appMatch("Permits/Sign/*/*")) {
	
		// on inspection scheduled, make the scheduled date the next working day (include Fridays, and exclude weekends and holidays)
		var inspDate = dateAdd(null, 1, "Y"); // default to next working day.

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
	}
		
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}
