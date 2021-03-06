/*===================================================================
// Script Number: TBD
// Script Name: Assign Due Date by Meeting Calendar
// Script Developer: Emmett Wylam
// Script Agency: Accela
// Script Description: Script to assign meeting calendar.
// Script Run Event: ASA
// Script Parents:
//            ASA;Planning!Pre-Submittal!NA!NA
===================================================================*/
try {
	var vMeetingBody = lookup('SetDueDates:Planning/Pre-Submittal/NA/NA', 'Meeting Body');
	var vToday = new Date();
	var vDateFrom;
	var vDateTo;
	var vSubmittalBuffer = lookup('SetDueDates:Planning/Pre-Submittal/NA/NA', 'Submittal Buffer (Days)');
	var vTotalTimeTillHearing = vSubmittalBuffer + lookup('SetDueDates:Planning/Pre-Submittal/NA/NA', 'Time Till Hearing (Days)'); ;

	//aa.print("vSubmittalBuffer " + vSubmittalBuffer);
	//aa.print("vTotalTimeTillHearing" + vTotalTimeTillHearing);
	
	//vDateFrom = new Date(dateAdd(vToday, parseInt(vTotalTimeTillHearing)));
	//vDateTo = new Date(dateAdd(vToday, parseInt(vTotalTimeTillHearing + 31)));

	vDateFrom = new Date(dateAdd(vToday, 21));
	vDateTo = new Date(dateAdd(vToday, 51));
	logDebug("FromDate: " + vDateFrom);
	logDebug("ToDate: " + vDateTo);
	
	vDateFrom = aa.date.getScriptDateTime(vDateFrom);
	vDateTo = aa.date.getScriptDateTime(vDateTo);

	var vScheduledDate = scheduleMeeting_Mesa(vMeetingBody, vDateFrom, vDateTo, capId);
	vScheduledDate = vScheduledDate.toLocaleString();

	logDebug("Scheduled Date: " + vScheduledDate);
	}
catch (err) {
	logDebug("A JavaScript Error occured: " + err.message);
	}
	