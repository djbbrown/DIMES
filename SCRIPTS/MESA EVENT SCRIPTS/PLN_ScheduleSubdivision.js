/*===================================================================
// Script Number: 302 
// Script Name: Assign Due Date by Meeting Calendar
// Script Developer: Emmett Wylam
// Script Agency: Accela
// Script Description: Script to assign workflow tasks due date by meetings scheduled on calendar.
// Script Run Event: WUTA
// Script Parents:
//            WTUA;Planning!Subdivision!NA!NA
===================================================================*/
if (wfTask == 'Distribution' && wfStatus == 'Distributed') {
	
	if (AInfo["Application Type"] == "Final Plat Review") {
		appAcceptanceDate = taskStatusDate("Application Acceptance");
		if (appAcceptanceDate && appAcceptanceDate != "") {
			editTaskDueDate("Planning Review", dateAdd(appAcceptanceDate, 30));
		}
		editTaskDueDate("Engineering Review", dateAdd(fileDate, 28));
		editTaskDueDate("Development Planning Review", dateAdd(fileDate, 28));
		editTaskDueDate("Parks and Rec Review", dateAdd(fileDate, 28));
		editTaskDueDate("Transportation Review", dateAdd(fileDate, 28));
		editTaskDueDate("Bldg Safety-Fire Review", dateAdd(fileDate, 28));
		editTaskDueDate("IT GIS Review", dateAdd(fileDate, 28));
		editTaskDueDate("Real Estate Review", dateAdd(fileDate, 28));
		editTaskDueDate("Energy Rsc-Gas Review", dateAdd(fileDate, 28));
		editTaskDueDate("Planning GIS", dateAdd(fileDate, 28));
		editTaskDueDate("Solid Waste Review", dateAdd(fileDate, 28));
		editTaskDueDate("Environmental Review", dateAdd(fileDate, 28));
		editTaskDueDate("Crime Prev Review", dateAdd(fileDate, 28));
		editTaskDueDate("Falcon Field Review", dateAdd(fileDate, 28));
		editTaskDueDate("Gas Mktg", dateAdd(fileDate, 28));
		editTaskDueDate("Bldg Safety-Bldg Review", dateAdd(fileDate, 28));
		editTaskDueDate("Energy Res-Elec Review", dateAdd(fileDate, 28));
		editTaskDueDate("Water Resources - Water Review", dateAdd(fileDate, 28));
		editTaskDueDate("Water Resources - Wastewater",dateAdd(fileDate, 28));
		editTaskDueDate("Review Consolidation", dateAdd(fileDate, 30));
	}
	else {
		var vMeetingBody = lookup('SetDueDates:Planning/Subdivision/NA/NA', 'Meeting Body');
		var vToday = new Date();
		var vDateFrom;
		var vDateTo;
		var vSubmittalBuffer = lookup('SetDueDates:Planning/Subdivision/NA/NA', 'Submittal Buffer (Days)');
		var vTotalTimeTillHearing = vSubmittalBuffer + lookup('SetDueDates:Planning/Subdivision/NA/NA', 'Time Till Hearing (Days)'); ;
	
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
		setWFDueDate_Mesa('SetDueDates:Planning/Subdivision/NA/NA', vScheduledDate);
	}
}