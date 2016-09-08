/*===================================================================
// Script Number: 234
// Script Name: PLN Adjust Substantive Review Expiration Dat 
// Script Developer: Kevin Ford
// Script Agency: Accela
// Script Description: When the workflow task "Plans Coordination" is set to a status of "Revisions Received" adjust the Substantive Review Due Date. Adjust the date by adding the number of days between the current date (the date the info was received) and the date the info was requested (the date the status was set to "Revisions Required").  
// Script Run Event: WTUA  
// Script Parents:
//		WTUA;Planning!Admin Review!NA!NA
//		WTUA;Planning!Annexation!NA!NA
//		WTUA;Planning!Board of Adjustment!NA!NA
//		WTUA;Planning!Design Review!NA!NA
//		WTUA;Planning!General Plan Amendment - Major!NA!NA
//		WTUA;Planning!Group Home!Application!NA
//		WTUA;Planning!Planning and Zoning!NA!NA
//		WTUA;Planning!Subdivision!NA!NA
===================================================================*/

try {
	// ===========================
	// Check 1
	// ===========================
	// When workflow task “Distribution” or “Substantive Review Distribution” is set to “Resubmitted”  
	if(
			(wfTask == 'Substantive Review Distribution' || wfTask == 'Distribution')
			&& wfStatus == 'Resubmitted'
	){
		// Update the “Start/Stop Indicator” (subgroup = “KEY DATES”) to “Started”
		editAppSpecific("Start/Stop Indicator", 'Started');
		// Update the “Substantive Review Due Date” (subgroup = “KEY DATES”) = today’s date + # of working days.
		// The # of working days is retrieved from “Value Desc” field of Standard Choices Item
		// “PLN Substantive Review Days”.
		// Note that the numbers are based on a five day work week.
		workingDays = lookup("PLN Substantive Review Days",appTypeString);
		
	}
	// ===========================
	// Check 2
	// ===========================
	// When workflow task status of “Revisions Required” is applied to workflow task “Review Consolidation” then
	if(
			(wfTask == 'Review Consolidation')
			&& wfStatus == 'Revisions Required'
	){
		// Update the “Start/Stop Indicator” (subgroup = “KEY DATES”) to “Stopped”
		editAppSpecific("Start/Stop Indicator", 'Stopped');
	}
	// ===========================
	// Check 3
	// ===========================
	// For the following record types:
	// 		‘Planning/Admin Review/NA/NA’
	//		‘Planning/Board of Adjustment/NA/NA’
	//		‘Planning/Design Review/NA/NA’
	//		‘Planning/General Plan Amendment – Major/NA/NA’
	//		‘Planning/Group Home/Application/NA’
	//		‘Planning/Subdivision/NA/NA’
	// When workflow task status of “Resubmitted” is applied to workflow task “Distribution” then
	check3 = ['Planning/Admin Review/NA/NA',
	      			'Planning/Board of Adjustment/NA/NA',
	      			'Planning/Design Review/NA/NA',
	      			'Planning/General Plan Amendment – Major/NA/NA',
	      			'Planning/Group Home/Application/NA',
	      			'Planning/Subdivision/NA/NA'];
	if (
			exists(appTypeString,check3)
			&& (wfTask == 'Distribution')
			&& wfStatus == 'Resubmitted'
	){
		// 1) Update the “Start/Stop Indicator” (subgroup = “KEY DATES”) to “Started”
		editAppSpecific("Start/Stop Indicator", 'Started');
		// 2) Update the “Substantive Review Due Date” (subgroup = “KEY DATES”) = current value of “Substantive Review Due Date + the number of days difference between the status date of workflow task “Review Consolidation” with task status “Revisions Required” and the status date of workflow task “Distribution” with task status “Resubmitted”. 
	}
	// ===========================	
	// Check 4
	// ===========================
	// For the following record type: 'Planning/Planning and Zoning/NA/NA', ‘Planning/Annexation/NA/NA’
	// When workflow task status of “Resubmitted” is applied to workflow task “Substantive Review Distribution” then
	check4 = ["Planning/Planning and Zoning/NA/NA","Planning/Annexation/NA/NA"];
	if (
			exists(appTypeString,check4)
			&& (wfTask == 'Substantive Review Distribution')
			&& wfStatus == 'Resubmitted'
	){
		// 1) Update the “Start/Stop Indicator” (subgroup = “KEY DATES”) to “Started”
		editAppSpecific("Start/Stop Indicator", 'Started');
		// 2) Update the “Substantive Review Due Date” (subgroup = “KEY DATES”) = current 
		// value of “Substantive Review Due Date + the number of days difference between
		// the status date of workflow task “Review Consolidation” with task status-
		// “Revisions Required” and the status date of workflow task “Substantive Review Distribution”
		// with task status “Resubmitted”. 

	}
	// ===========================
	// Check 5
	// ===========================
	// For all record types listed above:
	// When workflow task status of “Proceed” or “Complete” or “DR Board” or “Planning Director” is
	// applied to workflow task “Review Consolidation” then:
	check5Status = ["Proceed","Complete","DR Board","Planning Director"];
	if (
			(wfTask == 'Review Consolidation')
			&& exsits(wfStatus,check5Status)
	){
		// Update the “Start/Stop Indicator” (subgroup = “KEY DATES”) to “Stopped”
		editAppSpecific("Start/Stop Indicator", 'Stopped');
	}
	// ===========================
	// Check 6
	// ===========================
	// When workflow task status of “Complete” is applied to workflow task “Case Complete” then:
	if (
			(wfTask == 'Case Complete')
			&& wfStatus == 'Complete'
	){
		// Update the “Start/Stop Indicator” (subgroup = “KEY DATES”) to “Stopped”
		editAppSpecific("Start/Stop Indicator", 'Stopped');
	}
	

	
}
catch (err) {
	aa.print("A JavaScript Error occurred: " + err.message);
}