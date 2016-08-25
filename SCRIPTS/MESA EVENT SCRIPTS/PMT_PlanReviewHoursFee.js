/*===================================================================
// Script Number: 176
// Script Name: PMT_PlanReviewHoursFee.js
// Script Developer: 
// Script Agency: 
// Script Description: When a  workflow status of “Approved”, “Approved w/ Comments”, or “Revisions Required” at wf task “Plan Review” When a value is entered into the “Hours Spent” field within the wf “process form” on the “Plan Review” task, assess the “Plan Review Fee” with the entered value.
// Script Run Event: WTUA
// Script Parents:
//            WTUA;Permits!Master Plan!NA!NA
/*==================================================================*/


if (matches(wfTask, "Planning Review","Building Review","Fire Review","Civil Engineering Review")) {
	if (matxhes(wfStatus, "Approved","Approved w/Comments","Revisions Required")) {
			// sum hours across tasks
		totHours  = getHoursSpent("Planning Review") + getHoursSpent("Building Review") + getHoursSpent("Fire Review") + getHoursSpent("Civil Engineering Review");
		if (totHours > 0) {
			if (AInfo["Expedite"] == "Expedite")			
					updateFee("MST040", "PMT_MST", "FINAL", totHours, "N");				
		    if (AInfo["Expedite"] == "Super Expedite")
					updateFee("MST050", "PMT_MST", "FINAL", totHours, "N");		
		}
		else {
			if (feeExists("MST040", "NEW", "INVOICED")) voidRemoveFee("MST040");
			if (feeExists("MST050", "NEW", "INVOICED")) voidRemoveFee("MST050");
		}
	}	
} 