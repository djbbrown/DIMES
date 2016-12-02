/* ID-305: When the Alarm Activity record work flow is manually set to "Fees Due" and the 
"False Alarm Fees Charged" checkbox is checked, the script will increment the 
"False Alarm Count" field up on the Alarm Permit Record by one (1).
*/
if (wfTask == "Review" && wfStatus == "Fees Due" && AInfo["False Alarm Fees Charged"]=="CHECKED"){
	var arrCapId = getParents("Permits/Police Department/Alarms/Commercial");
	if(arrCapId) {
		//should only be one parent
		var parCapId = arrCapId[0];
		var parCapIdAltId = parCapId.getCustomID();
		var evType = AInfo["Event Type"];
		//logDebug("evType = " + evType);
		if (evType == "459A"){
			var cntAlarm = parseInt(getAppSpecific("False Alarm Count", parCapId)) + 1;
			if(matches(cntAlarm, "",null) || isNaN(cntAlarm)){
				editAppSpecific("False Alarm Count", 1, parCapId);
				logDebug("Initial set of False Alarm Count");
			}else{
				editAppSpecific("False Alarm Count", cntAlarm, parCapId);
				logDebug("False Alarm Count updated to " + cntAlarm);
			}
		}
		if (evType == "927A"){
			var cntAlarmPRH = parseInt(getAppSpecific("False Alarm Count Panic/Robbery/Hold-Up", parCapId)) + 1;
			if(matches(cntAlarmPRH, "",null) || isNaN(cntAlarmPRH)){
				editAppSpecific("False Alarm Count Panic/Robbery/Hold-Up", 1, parCapId);
				logDebug("Initial set of False Alarm Count Panic/Robbery/Hold-Up");
			}else{
				editAppSpecific("False Alarm Count Panic/Robbery/Hold-Up", cntAlarmPRH, parCapId);
				logDebug("False Alarm Count Panic/Robbery/Hold-Up updated to " + cntAlarmPRH);
			}
		}
	}else{
		showMessage = true;
		comment("NOTE this record does NOT have a parent Alarm record.");
	}
	
}