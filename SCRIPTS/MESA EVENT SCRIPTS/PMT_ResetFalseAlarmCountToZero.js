/*  ID-320 lwacht: When the active Alarm Permit record moves to an application status of "Issued"
	the script will populate the current date into the Custom Field named "Date of Issuance". 
*/
try{
	if(capStatus=="Issued") {
		logDebug("Executing ID-320");
		editAppSpecific("Date of Issuance",sysDateMMDDYYYY);
	}
}catch (err) {
    logDebug("A JavaScript Error occurred: WTUA:Permits/Police Department/Alarms/Commercial: #320: " + err.message);
	logDebug(err.stack);
}