if (wfTask == "Application Submittal" && wfStatus == "Approved") {
	//Set License to Active and set Expiration Dates
	tmpNewDate = dateAddMonths(null, '12');
	thisLic = new licenseObject(capIdString,capId) ; 
	thisLic.setExpiration(dateAdd(tmpNewDate,0));
	thisLic.setStatus("Active");	
}