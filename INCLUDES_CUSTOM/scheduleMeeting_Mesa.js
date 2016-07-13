function scheduleMeeting_Mesa(vMeetingBody, vDateFrom, vDateTo, vCapId) {
	var vDuration = 0;
	var vStartTime = '';
	var vDayOfWeek = '';
	var vLocation = '';

	//aa.print(vDateFrom.getMonth() + "/" + vDateFrom.getDayOfMonth() + "/" + vDateFrom.getYear() + " : " + vDateTo.getMonth() + "/" + vDateTo.getDayOfMonth() + "/" + vDateTo.getYear());

	var vAvalMeeting = aa.calendar.getAvailableHearingItem(vMeetingBody, vDuration, vStartTime, vDateFrom, vDateTo, vDayOfWeek, vLocation).getOutput();
	vAvalMeeting.sort(function (a, b) {
		return new Date(a.getStartDate()).getTime() - new Date(b.getStartDate()).getTime()
	})
	//aa.print(vAvalMeeting.length);

	if (vAvalMeeting.length > 0) {
		var vMeeting = vAvalMeeting[0];
		var vMeetingID = vMeeting.getMeetingId();
		var vMeetingDate = vMeeting.getStartDate();
		var vMeetingGroupID = vMeeting.getMeetingGroupId();

		//aa.print(vMeetingID);
		//aa.print(vMeetingDate);
		//aa.print(vMeetingGroupID);

		var vScheduleResult = aa.calendar.scheduleHearing4V360(capId, vMeetingGroupID, vMeetingID, '', '', '').getSuccess();
		if (vScheduleResult == true) {
			return vMeetingDate;
		}
	}
	return false;
}