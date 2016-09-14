if (wfTask == "Application Submittal" && wfStatus == "Approved") {
	//Set License to Active and set Expiration Dates
	tmpNewDate = dateAddMonths(null, 12);
	thisLic = new licenseObject(capIDString,capId) ; 
	thisLic.setExpiration(tmpNewDate);
	thisLic.setStatus("Active");	
}
include("PMT_ResetFalseAlarmCountToZero");
include("PMT_RenewalRecordUpdateParentPermitIssuedDate");