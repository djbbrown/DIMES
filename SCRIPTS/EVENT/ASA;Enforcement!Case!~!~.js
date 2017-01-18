// Duplicate Case Check added in main event to exclude other scripts if record is closed.

	var capIds = capIdsGetByAddr();
	var matchesENFCase=0;
	if (capIds && capIds.length > 1){
		logDebug(capIds.length);
		for (i in capIds){
			if (capId.toString() == capIds[i].toString()) continue;
			if (appMatch(appTypeString, capIds[i])){
				var table = loadASITable("VIOLATION INFORMATION", capIds[i]);
				for (row in table){
					if (table[row]["Status"] == "Open"){
						logDebug("Violation " + table[row]["Violation Description"] + " is open");
						matchesENFCase++;
					}
				}
			}
		}
	}
	
include("ENF_EnforcementCaseDuplicate");
// add by Brian O'Dell (Mesa)
include("ENF_EnforcementNotificationEmail");
if (!publicUser){
	include("ENF_Record_Opened");
}
include("ENF_AutopopulateZoningDistrict");
include("ENF_CountyIslandEmail");

// added by Vance Smith (Mesa)
// adding if duplicate case found then no need to run this script which schedules inspection since case will be closed.
if (matchesENFCase == 0) { 
	include("ENF_NewRecordPriorityNormal"); // 26
}
//added by Michael Kniskern (Mesa)
include("ENF_AddViolationOrdinanceOnViolationCode");