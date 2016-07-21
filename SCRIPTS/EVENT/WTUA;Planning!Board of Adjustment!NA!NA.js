if (wfTask == 'Distribution' && wfStatus == 'Distributed') {
	var vMeetingBody = lookup('SetDueDates:Planning/Board of Adjustment/NA/NA', 'Meeting Body');
	var vToday = new Date();
	var vDateFrom;
	var vDateTo;
	var vSubmittalBuffer = lookup('SetDueDates:Planning/Board of Adjustment/NA/NA', 'Submittal Buffer (Days)');
	var vTotalTimeTillHearing = vSubmittalBuffer + lookup('SetDueDates:Planning/Board of Adjustment/NA/NA', 'Time Till Hearing (Days)'); ;

	//aa.print("vSubmittalBuffer " + vSubmittalBuffer);
	//aa.print("vTotalTimeTillHearing" + vTotalTimeTillHearing);
	
	//vDateFrom = new Date(dateAdd(vToday, parseInt(vTotalTimeTillHearing)));
	//vDateTo = new Date(dateAdd(vToday, parseInt(vTotalTimeTillHearing + 31)));

	vDateFrom = new Date(dateAdd(vToday, 59));
	vDateTo = new Date(dateAdd(vToday, 90));
	
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