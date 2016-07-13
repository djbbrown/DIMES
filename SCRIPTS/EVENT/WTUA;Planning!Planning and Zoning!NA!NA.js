if (wfTask == 'Substantive Review Distribution' && wfStatus == 'Distributed') {
	var vMeetingBody = lookup('SetDueDates:Planning/Planning and Zoning/NA/NA', 'Meeting Body');
	var vToday = new Date();
	var vDateFrom;
	var vDateTo;
	var vSubmittalBuffer = lookup('SetDueDates:Planning/Planning and Zoning/NA/NA', 'Submittal Buffer (Days)');
	var vTotalTimeTillHearing = vSubmittalBuffer + lookup('SetDueDates:Planning/Planning and Zoning/NA/NA', 'Time Till Hearing (Days)'); ;

	vDateFrom = new Date(dateAdd(vToday, parseInt(vTotalTimeTillHearing)));
	vDateTo = new Date(dateAdd(vToday, parseInt(vTotalTimeTillHearing + 31)));

	logDebug("FromDate: " + vDateFrom);
	logDebug("ToDate: " + vDateTo);
	
	vDateFrom = aa.date.getScriptDateTime(vDateFrom);
	vDateTo = aa.date.getScriptDateTime(vDateTo);

	var vScheduledDate = scheduleMeeting_Mesa(vMeetingBody, vDateFrom, vDateTo, capId);
	vScheduledDate = vScheduledDate.toLocaleString();

	logDebug("Scheduled Date: " + vScheduledDate);
	
	//Set Due Dates
	setWFDueDate_Mesa('SetDueDates:Planning/Planning and Zoning/NA/NA', vScheduledDate);
}