/* ID-305: When the Alarm Activity record work flow is manually set to "Fees Due" and the 
"False Alarm Fees Charged" checkbox is checked, the script will increment the 
"False Alarm Count" field up on the Alarm Permit Record by one (1).
*/
if (wfTask == "Review" && wfStatus == "Fees Due" && AInfo["False Alarm Fees Charged"]=="CHECKED"){
	var arrCapId = getParents("Permits/Police Department/Alarms/Commercial");
	if(arrCapId) {
		//should only be one parent
		var parCapId = arrCapId[0];
		var cntAlarm = parseInt(getAppSpecific("False Alarm Count", parCapId)) + 1;
		if(matches(cntAlarm, "",null)){
			editAppSpecific("False Alarm Count", 1, parCapId);
			logDebug("Initial set of False Alarm Count");
		}else{
			editAppSpecific("False Alarm Count", cntAlarm, parCapId);
			logDebug("False Alarm Count updated to " + cntAlarm);
		}
	}else{
		showMessage = true;
		comment("NOTE this record does NOT have a parent Alarm record.");
	}
	
}