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
// Good Test Record: ADM16-00221
===================================================================*/

try {
	// ===========================
	// Technical breakdown
	// ===========================
	// 106 Reviews
	// Record Type:
	//		Planning/Admin Review/NA/NA
	// Type of Process = 'Board of Adjustment/Zoning Admin' and 
	// Sub Process type = 'A-frame Sign'
	if (
		appTypeString == 'Planning/Admin Review/NA/NA'
		&& AInfo["Type of Process"] == 'Historical Preservation'
		&& AInfo["Sub process type"] == 'Section 106 Review'
	){
		tBd = '106 Reviews'
	}
	// ---------------------------
	// A-frame Sign
	// Record Type:
	//		Planning/Admin Review/NA/NA
	// Type of Process = 'Board of Adjustment/Zoning Admin' and 
	// Sub Process type = 'A-frame Sign'
	if (
		appTypeString == 'Planning/Admin Review/NA/NA'
		&& AInfo["Type of Process"] == 'Board of Adjustment/Zoning Admin'
		&& AInfo["Sub process type"] == 'A-frame Sign'
	){
		tBd = 'A-frame Sign'
	}
	// ---------------------------
	// Administrative Extensions for Zoning Administration Cases
	// Record Type:
	//		Planning/Admin Review/NA/NA
	// Type of Process = 'Board of Adjustment/Zoning Admin' and 
	// Sub Process type = 'Adminstrative Extension'
	if (
		appTypeString == 'Planning/Admin Review/NA/NA'
		&& AInfo["Type of Process"] == 'Board of Adjustment/Zoning Admin'
		&& AInfo["Sub process type"] == 'Adminstrative Extension'
	){
		tBd = 'Administrative Extensions for Zoning Administration Cases'
	}
	// ---------------------------
	// Affidavit of Change
	// Record Type:
	//		Planning/Admin Review/NA/NA
	// Type of Process = 'Land Division' and 
	// Sub Process type = 'Affidavit of Change/Correction'
	// 		or 'Addition to or modification of amenity package'
	//		or 'Change to Wall Design or Entry Feature'
	// 		or 'Lot Combination'
	//		or 'Other'
	aOcSubProc = ['Affidavit of Change/Correction',
	              'Addition to or modification of amenity package',
	              'Change to Wall Design or Entry Feature',
	              'Lot Combination',
	              'Other']	
	if (
		appTypeString == 'Planning/Admin Review/NA/NA'
		&& AInfo["Type of Process"] == 'Land Division'
		&& exists(AInfo["Sub process type"],aOcSubProc)
	){
		tBd = 'Affidavit of Change'
	}
	// ---------------------------
	// Alternative Landscaping
	// Record Type:
	//		Planning/Admin Review/NA/NA
	// Type of Process = 'Board of Adjustment/Zoning Admin' and 
	// Sub Process type = 'Alternative Landscaping'
	if (
			appTypeString == 'Planning/Admin Review/NA/NA'
			&& AInfo["Type of Process"] == 'Board of Adjustment/Zoning Admin'
			&& AInfo["Sub process type"] == 'Alternative Landscaping'
	){
		tBd = 'Alternative Landscaping'
	}
	// ---------------------------
	// Alternative Parking
	// Record Type:
	//		Planning/Admin Review/NA/NA
	// Type of Process = 'Board of Adjustment/Zoning Admin' and 
	// Sub Process type = 'Alternative Parking'
	if (
		appTypeString=='Planning/Admin Review/NA/NA'
		&& AInfo["Type of Process"] == 'Board of Adjustment/Zoning Admin'
		&& AInfo["Sub process type"] == 'Alternative Parking'
	){
		tBd = 'Alternative Parking'
	}
	// ---------------------------
	// Annexation
	// Record Type:
	//		Planning/Annexation/NA/NA
	if (
		appTypeString=='Planning/Annexation/NA/NA'
	){
		tBd = 'Annexation'
	}
	// ---------------------------
	// Cell Tower - Board
	// ---------------------------
	// Cell Tower - staff
	// Record Type:
	//		Planning/Admin Review/NA/NA
	// (
	// 		Type of Process = 'Board of Adjustment/Zoning Admin'
	//		and Sub Process type in ('Addition to or modification of cell towers',  'Addition to or modification of sign plan')
	// ) 
	// or Type of Process = 'Wireless Communications Facilities'
	//
	cTSSubProc = ['Addition to or modification of cell towers',  'Addition to or modification of sign plan'];
	if(
		appTypeString == "Planning/Admin Review/NA/NA"
		&& (
			(
				AInfo["Type of Process"] == 'Board of Adjustment/Zoning Admin'
				&& exists(AInfo["Sub process type"],cTSSubProc)
			)
			|| AInfo["Type of Process"] == 'Wireless Communications Facilities'
		)
	){
		tBd = 'Cell Tower - staff'
	}
	// ---------------------------
	// Certificate of Appropriateness
	// Record Type:
	//		Planning/Admin Review/NA/NA
	// Type of Process = 'Historical Preservation'
	// and Sub Process type = 'Certificate of Appropriateness' or 'Demolition Permit'
	if (
		appTypeString == "Planning/Admin Review/NA/NA"
		&& AInfo["Type of Process"] == 'Historical Preservation'
		&& (AInfo["Sub process type"] == 'Certificate of Appropriateness'
			|| AInfo["Sub process type"] == 'Demolition Permit'
		)
	){
		tBd = 'Certificate of Appropriateness'
	}
	// ---------------------------
	// Council Use Permit
	// Record Type:
	//		Planning/Planning and Zoning/NA/NA
	// Development Incentive Permit = 'Yes'
	if (
		appTypeString == "Planning/Planning and Zoning/NA/NA"
		&& AInfo["Council Use Permit"] == 'Yes'
	){
		tBd = 'Council Use Permit'
	}
	// ---------------------------
	// Design Review Modification
	// ---------------------------
	// Design Review – Board
	// Record Type:
	//		Planning/Design Review/NA/NA
	// none
	if (
		appTypeString == "Planning/Design Review/NA/NA" 
	){
		tBd = 'Design Review – Board'
	}
	// ---------------------------
	// Design Review – Staff
	// Record Type:
	//		Planning/Admin Review/NA/NA
	// Type of Process = 'Design Review' or 'Land Division' or 'Desert Uplands Development Standards'
	dRProc = ['Design Review','Land Division','Desert Uplands Development Standards'];
	if (
		appTypeString == "Planning/Admin Review/NA/NA"
		&& exists(AInfo["Type of Process"],dRProc)
	){
		tBd = 'Design Review – Staff'
	}
	// ---------------------------
	// Development Incentive Permit
	// Record Type:
	//		Planning/Board of Adjustment/NA/NA
	// Development Incentive Permit = 'Yes'
	if (
		appTypeString == 'Planning/Board of Adjustment/NA/NA'
		&& AInfo["Development Incentive Permit"] == 'Yes'
	){
		tBd = 'Alternative Landscaping'
	}
	// ---------------------------
	// Development Incentive Permit Modification
	// Record Type:
	//		Planning/Admin Review/NA/NA
	// Type of Process = 'Board of Adjustment/Zoning Admin' and 
	// Sub Process type = 'Amendment of development incentive permit'
	if (
		appTypeString == "Planning/Admin Review/NA/NA"
		&& AInfo["Type of Process"] == 'Board of Adjustment/Zoning Admin'
		&& AInfo["Sub process type"] == 'Amendment of development incentive permit'
	){
		tBd = 'Development Incentive Permit Modification'
	}
	// ---------------------------
	// Development Unit Plan - P&Z
	// Record Type:
	//		Planning/Planning and Zoning/NA/NA
	// Development Unit Plan = 'Yes'
	if (
		appTypeString == "Planning/Planning and Zoning/NA/NA"
		&& AInfo["Development Unit Plan"] == 'Yes'
	){
		tBd = 'Council Use Permit'
	}
	// ---------------------------
	// Development Unit Plan - Staff
	// ---------------------------
	// Development Unit Plan Modification – P&Z
	// ---------------------------
	// Development Unit Plan Modification – Staff
	// Record Type:
	//		Planning/Admin Review/NA/NA
	// Type of Process = 'Development Unit Plan' and 
	// Sub Process type = 'Amendment to Development Unit Plan'
	if (
		appTypeString == "Planning/Admin Review/NA/NA"
		&& AInfo["Type of Process"] == 'Development Unit Plan'
		&& AInfo["Sub process type"] == 'Amendment to Development Unit Plan'
	){
		tBd = 'Development Unit Plan Modification – Staff'
	}
	// ---------------------------
	// Final Plat Modification
	// Record Type:
	//		Planning/Subdivision/NA/NA
	// Application Type = 'Re-Plat' or 'Map of Dedication (MOD)'
	if (
		appTypeString == "Planning/Subdivision/NA/NA"
		&& (
			AInfo['Application Type'] == 'Re-Plat'
			|| AInfo['Application Type'] == 'Map of Dedication (MOD)'
		)
	){
		tBd = 'Final Plat and Re-plat'
	}
	// ---------------------------
	// Final Plat and Re-plat
	// Record Type:
	//		Planning/Subdivision/NA/NA
	// Application Type = 'Final Plat Review'
	if (
		appTypeString == "Planning/Subdivision/NA/NA"
		&& AInfo['Application Type'] == 'Final Plat Review'
	){
		tBd = 'Final Plat and Re-plat'
	}
	// ---------------------------
	// Form-based Code Zoning Clearance
	// Record Type:
	//		Planning/Admin Review/NA/NA
	// Type of Process = 'Form Based Code/Zoning Clearance'
	if (
		appTypeString == "Planning/Admin Review/NA/NA"
		&& AInfo["Type of Process"] == 'Form Based Code/Zoning Clearance'
	){
		tBd = 'Form-based Code Zoning Clearance'
	}
	// ---------------------------
	// Group Home Registrations
	// Record Type:
	//		Planning/Group Home/Application/NA
	// none
	if (
		appTypeString == "Planning/Group Home/Application/NA"	
	){
		tBd = 'Group Home Registrations'
	}
	// ---------------------------
	// Improvement Permit Modification
	// ---------------------------
	// Interpretation
	// Record Type:
	//		Planning/Board of Adjustment/NA/NA
	// Interpretation = 'Yes'
	if (
		appTypeString == "Planning/Board of Adjustment/NA/NA"
		&& AInfo["Interpretation"] == 'Yes'
	){
		tBd = 'Alternative Landscaping'
	}
	// ---------------------------
	// Land Split
	// Record Type:
	//		Planning/Admin Review/NA/NA
	// Type of Process = 'Land Division' and 
	// Sub Process type = 'Land Split'
	if (
		appTypeString == "Planning/Admin Review/NA/NA"
		&& AInfo["Type of Process"] == 'Land Division'
		&& AInfo["Sub process type"] == 'Land Split'
	){
		tBd = 'Land Split'
	}
	// ---------------------------
	// Major General Plan Amendment
	// Record Type:
	//		Planning/General Plan Amendment - Major/NA/NA
	// none
	if (
		appTypeString == "Planning/General Plan Amendment - Major/NA/NA"
	){
		tBd = 'Design Review – Board'
	}
	// ---------------------------
	// Medical Marijuana
	// Record Type:
	//		Planning/Admin Review/NA/NA
	// Type of Process = 'Medical Marijuana'
	if (
		appTypeString == "Planning/Admin Review/NA/NA"
		&& AInfo["Type of Process"] == 'Medical Marijuana'
	){
		tBd = 'Medical Marijuana'
	}
	// ---------------------------
	// Minor General Plan Amendment
	// Record Type:
	//		Planning/Planning and Zoning/NA/NA
	// Minor General Plan Amendment = 'Yes' or 
	// Planned Community Minor Amendment = 'Yes'
	if (
		appTypeString == "Planning/Planning and Zoning/NA/NA"
		&& (
			AInfo["Minor General Plan Amendment"] == 'Yes'
			|| AInfo["Planned Community Minor Amendment"] == 'Yes'
		)
	){
		tBd = 'Minor General Plan Amendment'
	}
	// ---------------------------
	// PAD Modification - BOA
	// Record Type:
	//		Planning/Board of Adjustment/NA/NA
	// Modification of Planned Area Development = 'Yes'
	if (
		appTypeString == "Planning/Board of Adjustment/NA/NA"
		&& AInfo["Modification of Planned Area Development"] == 'Yes'
	){
		tBd = 'PAD Modification - BOA'
	}
	// ---------------------------
	// PAD Modification - P&Z
	// ---------------------------
	// Preliminary Plat
		// Record Type:
		//		Planning/Planning and Zoning/NA/NA
		// Minor General Plan Amendment = 'Yes' or 
		// Planned Community Minor Amendment = 'Yes'
		if (
			appTypeString == "Planning/Planning and Zoning/NA/NA"
			&& AInfo["Pre-Plat"] == 'Yes'
		){
			tBd = 'Preliminary Plat'
		}
	// ---------------------------
	// Preliminary Plat Extension
	// Record Type:
	//		Planning/Admin Review/NA/NA
	// Type of Process = 'Land Division' and 
	// Sub Process type = 'Preliminary Plat Extension'
	if (
			appTypeString == "Planning/Admin Review/NA/NA"
			&& AInfo["Type of Process"] == 'Land Division'
			&& AInfo["Sub process type"] == 'Preliminary Plat Extension'
	){
		tBd = 'Preliminary Plat Extension'
	}
	// ---------------------------
	// Preliminary Plat Modification
	// Record Type:
	//		Planning/Admin Review/NA/NA
	// Type of Process = 'Land Division' and 
	// Sub Process type = Amendment to Lot layout/street system'
	if (
			appTypeString == "Planning/Admin Review/NA/NA"
			&& AInfo["Type of Process"] == 'Land Division'
			&& AInfo["Sub process type"] == 'Amendment to Lot layout/street system'
	){
		tBd = 'Preliminary Plat Modification'
	}
	// ---------------------------
	// Product Review
	// Record Type:
	//		Planning/Admin Review/NA/NA
	// Type of Process = 'Product Approval' and 
	// Sub Process type = 'New detached product' or 'New Attached product' or 'Other'
	pRSubProc = ['New detached product','New Attached product','Other'];
	if (
			appTypeString == "Planning/Admin Review/NA/NA"
			&& AInfo["Type of Process"] == 'Product Approval'
			&& ( 
				AInfo["Sub process type"] == 'Amendment/Addition to Approved Product'
				|| exists(AInfo["Sub process type"],pRSubProc)
			)
	){
		tBd = 'Product Review'
	}
	// ---------------------------
	// Product Review Modification
	// Record Type:
	//		Planning/Admin Review/NA/NA
	// Type of Process = 'Product Approval' and 
	// Sub Process type = 'Amendment/Addition to Approved Product'
	if (
			appTypeString == "Planning/Admin Review/NA/NA"
			&& AInfo["Type of Process"] == 'Product Approval'
			&& AInfo["Sub process type"] == 'Amendment/Addition to Approved Product'
	){
		tBd = 'Product Review Modification'
	}	
	// ---------------------------
	// Rezoning - Historic District
	// ---------------------------
	// Rezoning - Historic Landmark
	// ---------------------------
	// Rezoning - general
	// Record Type:
	//		Planning/Planning and Zoning/NA/NA
	// Rezone = 'Yes' or
	// Rezone - Infill Development District 2 = 'Yes' or 
	// Rezone - Planned Community District = 'Yes' or
	// Combined Rezone and Site Plan Review/Modification = 'Yes'
	if (
			appTypeString == "Planning/Planning and Zoning/NA/NA"
			&& (
				AInfo['Rezone'] == 'Yes'
				|| AInfo['Rezone - Infill Development District 2'] == 'Yes' 
				|| AInfo['Rezone - Planned Community District'] == 'Yes'
				|| AInfo['Combined Rezone and Site Plan Review/Modification'] == 'Yes'
			)
	){
		tBd = 'Rezoning - general'
	}
	// ---------------------------
	// Shared Parking
	// Record Type:
	//		Planning/Admin Review/NA/NA
	// Type of Process = 'Board of Adjustment/Zoning Admin' and 
	// Sub Process type = 'Shared Parking'
	if (
			appTypeString == "Planning/Admin Review/NA/NA"
			&& AInfo["Type of Process"] == 'Board of Adjustment/Zoning Admin'
			&& AInfo["Sub process type"] == 'Shared Parking'
	){
		tBd = 'Shared Parking'
	}
	// ---------------------------
	// Site Plan Modification - Admin
	// Record Type:
	//		Planning/Admin Review/NA/NA
	// Type of Process = 'Zoning/Site Plan'
	if (
			appTypeString == "Planning/Admin Review/NA/NA"
			&& AInfo["Type of Process"] == 'Zoning/Site Plan'
	){
		tBd = 'Site Plan Modification - Admin'
	}	
	// ---------------------------
	// Site Plan Review - Council
	// ---------------------------
	// Site Plan Review - P&Z
	// Record Type:
	//		Planning/Board of Adjustment/NA/NA
	// Special Use Permit = 'Yes'
	//		or Administrative Use Permits = 'Yes'
	if (
			appTypeString == "Planning/Board of Adjustment/NA/NA"
			&& AInfo['Site Plan Review/Modification'] = 'Yes'
	){
		tBd = 'Site Plan Review - P&Z'
	}
	// ---------------------------
	// Special Use Permit
	// Record Type:
	//		Planning/Board of Adjustment/NA/NA
	// Special Use Permit = 'Yes'
	//		or Administrative Use Permits = 'Yes'
	// Record Type:
	//		Planning/Planning and Zoning/NA/NA
	// Special Use Permit = 'Yes'
	if (
			(
				appTypeString == 'Planning/Board of Adjustment/NA/NA'
				&& (AInfo['Special Use Permit'] == 'Yes'
				|| AInfo['Administrative Use Permits'] == 'Yes')
			)
			|| (
				appTypeString == 'Planning/Planning and Zoning/NA/NA'
				&& (AInfo['Special Use Permit'] == 'Yes'
			)
	){
		tBd = 'Special Use Permit'
	}
	// ---------------------------
	// Special Use Permit Modification
	// ---------------------------
	// Subdivision Technical Review
	// Record Type:
	//		Planning/Subdivision/NA/NA
	// Application Type = 'Subdivision Technical Review'
	if (
			appTypeString == "Planning/Subdivision/NA/NA" 
			&& AInfo['Application Type'] == 'Subdivision Technical Review'
	){
		tBd = 'Subdivision Technical Review'
	}
	// ---------------------------
	// Substantial Conformance Improvement Permit
	// Record Type:
	//		Planning/Board of Adjustment/NA/NA
	// Special Use Permit = 'Yes'
	//		or Administrative Use Permits = 'Yes'
	if (
			appTypeString == "Planning/Board of Adjustment/NA/NA" 
			&& AInfo['Substantial Conformance Improvement Permit'] = 'Yes'
	){
		tBd = 'Special Use Permit'
	}
	// ---------------------------
	// Substantial Conformance Improvement Permit Modification
	// Record Type:
	//		Planning/Admin Review/NA/NA
	// Type of Process = 'Board of Adjustment/Zoning Admin' and 
	// Sub Process type = 'Amendment of Substantial Conformance Improvement Plan'
	//		or 'Other'
	if (
			appTypeString == "Planning/Admin Review/NA/NA"
			&& AInfo["Type of Process"] == 'Board of Adjustment/Zoning Admin'
			&& (
				AInfo["Sub process type"] == 'Amendment of Substantial Conformance Improvement Plan'
				|| AInfo["Sub process type"] == 'Other'
			)
	){
		tBd = 'Substantial Conformance Improvement Permit Modification'
	}
	// ---------------------------
	// Temporary Use Permits
	// Record Type:
	//		Planning/Admin Review/NA/NA
	// Type of Process = 'Board of Adjustment/Zoning Admin' and 
	// Sub Process type = 'Temporary Use Permit'
	if (
			appTypeString == "Planning/Admin Review/NA/NA"
			&& AInfo["Type of Process"] == 'Board of Adjustment/Zoning Admin'
			&& AInfo["Sub process type"] == 'Temporary Use Permit'
	){
		tBd = 'Temporary Use Permits'
	}
	// ---------------------------
	// Variance
	// Record Type:
	//		Planning/Board of Adjustment/NA/NA
	// Special Use Permit = 'Yes'
	//		or Administrative Use Permits = 'Yes'
	if (
			appTypeString == "Planning/Board of Adjustment/NA/NA"
			&& AInfo['Variance'] = 'Yes'
	){
		tBd = 'Variance'
	}
	// ---------------------------
	// Variance Modification
	// ---------------------------
	
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