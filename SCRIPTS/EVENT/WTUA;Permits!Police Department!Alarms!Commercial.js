if (wfTask == "Application Submittal" && wfStatus == "Approved") {
	//Set License to Active and set Expiration Dates
	tmpNewDate = dateAddMonths(null, 12);
	thisLic = new licenseObject(capIDString,capId) ; 
	thisLic.setExpiration(tmpNewDate);
	thisLic.setStatus("Active");	
}
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
/* script #325
	1.	Alarm PD Permit Renewal (Permits/Police Department/Alarms/Commercial Renewal) when the workflow task Closed is set to Issued
	1.	Update the Alarm PD Permit Record expiration date to one year in the future.
*/
try{
	if (wfTask == "Closed" && wfStatus == "Issued") {
		logDebug("Executing ID-325");
		b1ExpResult = aa.expiration.getLicensesByCapID(capId)
		if (b1ExpResult.getSuccess()) {
			b1Exp = b1ExpResult.getOutput();
			var tmpStatus = b1Exp.getExpStatus();
			var tmpDate = b1Exp.getExpDate();
			if(tmpDate){
				tmpDate = b1Exp.getExpDate();
				newExpDate = dateAddMonths(tmpDate, 12);
				licEditExpInfo("Active",newExpDate);
			}else{
				logDebug("Expiration date not found. Seting expiration date to one year from today.")
				licEditExpInfo("Active",dateAddMonths(null, 12));
			}
		}else{
			logDebug("Expiration date not found. Seting expiration date to one year from today.");
			licEditExpInfo("Active",dateAddMonths(null, 12));
		}
	}
}catch(err){
	logDebug("A JavaScript Error occurred: ASUA:Permits/Police Department/Alarms/Commercial: ID-325: " + err.message);
	logDebug(err.stack);
}