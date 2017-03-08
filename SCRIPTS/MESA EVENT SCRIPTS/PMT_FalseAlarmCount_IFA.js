/* ID-305: When the Alarm Permit record has a fee invoiced on it and the 
"False Alarm Fees Charged" checkbox is checked, the script will increment the 
"False Alarm Count" field up on the Alarm Permit Record by one (1).
*/
/*if (AInfo["False Alarm Fees Charged"]=="CHECKED"){
	var arrCapId = getParents("Permits/Police Department/Alarms/Commercial");
	if(arrCapId) {
		//should only be one parent
		var parCapId = arrCapId[0];
		var cntAlarm = parseInt(getAppSpecific("False Alarm Count", parCapId)) + 1;
		if(matches(cntAlarm, "",null) || isNaN(cntAlarm)){
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
	
}*/

feesDescInvArry = new Array();
feesDescInvArry = FeeObjs;
var feeDescBurg=false;
var feeDescPanic=false;
var x;
var y;
var cntAlarm = parseInt(AInfo["False Alarm Count"]) + 1;
var cntAlarmPanic = parseInt(AInfo["False Alarm Count Panic/Robbery/Hold-Up"]) + 1;

for (x in feesDescInvArry) 
if(feesDescInvArry[x].getFeeDescription().indexOf("Burglary") > 0) {
	feeDescBurg=true; 
	logDebug("what is value of feeDescBurg = " + feeDescBurg);
	if (feeDescBurg) {
		editAppSpecific("False Alarm Count", cntAlarm);
	}
}

for (y in feesDescInvArry) 
if((feesDescInvArry[y].getFeeDescription().indexOf("Panic") > 0) || (feesDescInvArry[y].getFeeDescription().indexOf("Hold") > 0)) {
	feeDescPanic=true; 
	logDebug("what is value of feeDescPanic = " + feeDescPanic);
	if (feeDescPanic) {
		editAppSpecific("False Alarm Count Panic/Robbery/Hold-Up", cntAlarmPanic);
	}
}
