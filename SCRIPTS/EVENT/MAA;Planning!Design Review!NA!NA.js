var vMeeting = aa.calendar.getEventByEventID(CalendarID, TargetMeetingID).getOutput();
var x = 0;
vScheduledDate = convertDate(vMeeting.getStartDate());

logDebug("Scheduled Date: " + vScheduledDate);
	
//Set Due Dates
setWFDueDate_Mesa('SetDueDates:Planning/Planning and Zoning/NA/NA', vScheduledDate);