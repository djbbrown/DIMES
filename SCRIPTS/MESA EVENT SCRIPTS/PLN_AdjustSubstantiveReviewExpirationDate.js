/*===================================================================
// Script Number: 234
// Script Name: PLN Adjust Substantive Review Expiration Date
// Script Developer: Kevin Ford
// Script Agency: Accela
// Script Description: When the workflow task "Plans Coordination" is set to a status of "Revisions Received" adjust the Substantive Review Due Date. Adjust the date by adding the number of days between the current date (the date the info was received) and the date the info was requested (the date the status was set to "Revisions Required").  
// Script Run Event: WTUA  
// Script Parents:
//		WTUA;Planning!~!~!~
===================================================================*/

try {
	recTypesCheck = [
		'Planning/Admin Review/NA/NA',
		'Planning/Annexation/NA/NA',
		'Planning/Board of Adjustment/NA/NA',
		'Planning/Design Review/NA/NA',
		'Planning/General Plan Amendment - Major/NA/NA',
		'Planning/Group Home/Application/NA',
		'Planning/Planning and Zoning/NA/NA',
		'Planning/Subdivision/NA/NA'
	];
	if(exists(appTypeString,recTypesCheck)){
		var tBd = [];
		// ===========================
		// Technical breakdown
		// ===========================
		// 106 Reviews - Confirmed PLN2016-00506
		// Record Type:
		//		Planning/Admin Review/NA/NA
		// Type of Process = 'Board of Adjustment/Zoning Admin' and 
		// Sub Process type = 'A-frame Sign'
		if (
			appTypeString == 'Planning/Admin Review/NA/NA'
			&& AInfo["Type of Process"] == 'Historic Preservation'
			&& AInfo["Sub process type"] == 'Section 106 Review'
		){
			tBd.push('106 Reviews');
		}
		// ---------------------------
		// A-frame Sign - Confirmed PLN2016-00506
		// Record Type:
		//		Planning/Admin Review/NA/NA
		// Type of Process = 'Board of Adjustment/Zoning Admin' and 
		// Sub Process type = 'A-frame Sign'
		if (
			appTypeString == 'Planning/Admin Review/NA/NA'
			&& AInfo["Type of Process"] == 'Board of Adjustment/Zoning Admin'
			&& AInfo["Sub process type"] == 'A-Frame Sign'
		){
			tBd.push('A-frame Sign');
		}
		// ---------------------------
		// Administrative Extensions for Zoning Administration Cases - Confirmed PLN2016-00506
		// Record Type:
		//		Planning/Admin Review/NA/NA
		// Type of Process = 'Board of Adjustment/Zoning Admin' and 
		// Sub Process type = 'Adminstrative Extension'
		if (
			appTypeString == 'Planning/Admin Review/NA/NA'
			&& AInfo["Type of Process"] == 'Board of Adjustment/Zoning Admin'
			&& AInfo["Sub process type"] == 'Administrative Extension'
		){
			tBd.push('Administrative Extensions for Zoning Administration Cases');
		}
		// ---------------------------
		// Affidavit of Change - Confirmed PLN2016-00506
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
			tBd.push('Affidavit of Change');
		}
		// ---------------------------
		// Alternative Landscaping - Confirmed PLN2016-00506
		// Record Type:
		//		Planning/Admin Review/NA/NA
		// Type of Process = 'Board of Adjustment/Zoning Admin' and 
		// Sub Process type = 'Alternative Landscaping'
		if (
				appTypeString == 'Planning/Admin Review/NA/NA'
				&& AInfo["Type of Process"] == 'Board of Adjustment/Zoning Admin'
				&& AInfo["Sub process type"] == 'Alternative Landscaping'
		){
			tBd.push('Alternative Landscaping');
		}
		// ---------------------------
		// Alternative Parking - Confirmed PLN2016-00506
		// Record Type:
		//		Planning/Admin Review/NA/NA
		// Type of Process = 'Board of Adjustment/Zoning Admin' and 
		// Sub Process type = 'Alternative Parking'
		if (
			appTypeString=='Planning/Admin Review/NA/NA'
			&& AInfo["Type of Process"] == 'Board of Adjustment/Zoning Admin'
			&& AInfo["Sub process type"] == 'Alternative Parking'
		){
			tBd.push('Alternative Parking');
		}
		// ---------------------------
		// Annexation - Confirmed ANX16-00187
		// Record Type:
		//		Planning/Annexation/NA/NA
		if (
			appTypeString=='Planning/Annexation/NA/NA'
		){
			tBd.push('Annexation');
		}
		// ---------------------------
		// Cell Tower - Board
		// ---------------------------
		// Cell Tower - staff - Confirmed PLN2016-00506
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
			tBd.push('Cell Tower - staff');
		}
		// ---------------------------
		// Certificate of Appropriateness - Confirmed PLN2016-00506
		// Record Type:
		//		Planning/Admin Review/NA/NA
		// Type of Process = 'Historical Preservation'
		// and Sub Process type = 'Certificate of Appropriateness' or 'Demolition Permit'
		if (
			appTypeString == "Planning/Admin Review/NA/NA"
			&& AInfo["Type of Process"] == 'Historic Preservation'
			&& (AInfo["Sub process type"] == 'Certificate of Appropriateness'
				|| AInfo["Sub process type"] == 'Demolition Permit'
			)
		){
			tBd.push('Certificate of Appropriateness');
		}
		// ---------------------------
		// Council Use Permit
		// Record Type:
		//		Planning/Planning and Zoning/NA/NA
		// Development Incentive Permit = 'Yes'
		if (
			appTypeString == "Planning/Planning and Zoning/NA/NA"
			&& AInfo["Council Use Permit"] == 'CHECKED'
		){
			tBd.push('Council Use Permit');
		}
		// ---------------------------
		// Design Review Modification
		// ---------------------------
		// Design Review - Board - Confirmed DRB16-00226
		// Record Type:
		//		Planning/Design Review/NA/NA
		// none
		if (
			appTypeString == "Planning/Design Review/NA/NA" 
		){
			tBd.push('Design Review - Board');
		}
		// ---------------------------
		// Design Review - Staff - Confirmed PLN2016-00506
		// Record Type:
		//		Planning/Admin Review/NA/NA
		// Type of Process = 'Design Review' or 'Land Division' or 'Desert Uplands Development Standards'
		dRProc = ['Design Review','Land Division','Desert Uplands Development Standards'];
		if (
			appTypeString == "Planning/Admin Review/NA/NA"
			&& exists(AInfo["Type of Process"],dRProc)
		){
			tBd.push('Design Review - Staff');
		}
		// ---------------------------
		// Development Incentive Permit
		// Record Type:
		//		Planning/Board of Adjustment/NA/NA
		// Development Incentive Permit = 'Yes'
		if (
			appTypeString == 'Planning/Board of Adjustment/NA/NA'
			&& AInfo["Development Incentive Permit"] == 'CHECKED'
		){
			tBd.push('Development Incentive Permit');
		}
		// ---------------------------
		// Development Incentive Permit Modification - Confirmed PLN2016-00506
		// Record Type:
		//		Planning/Admin Review/NA/NA
		// Type of Process = 'Board of Adjustment/Zoning Admin' and 
		// Sub Process type = 'Amendment of development incentive permit'
		if (
			appTypeString == "Planning/Admin Review/NA/NA"
			&& AInfo["Type of Process"] == 'Board of Adjustment/Zoning Admin'
			&& AInfo["Sub process type"] == 'Amendment of development incentive permit'
		){
			tBd.push('Development Incentive Permit Modification');
		}
		// ---------------------------
		// Development Unit Plan - P&Z
		// Record Type:
		//		Planning/Planning and Zoning/NA/NA
		// Development Unit Plan = 'Yes'
		if (
			appTypeString == "Planning/Planning and Zoning/NA/NA"
			&& AInfo["Development Unit Plan"] == 'CHECKED'
		){
			tBd.push('Development Unit Plan - P&Z');
		}
		// ---------------------------
		// Development Unit Plan - Staff - Confirmed PLN2016-00506
		// Record Type:
		//		Planning/Admin Review/NA/NA
		// Type of Process = 'Development Unit Plan' and 
		// Sub Process type = 'Development Unit Plan' or 'Other'
		if (
			appTypeString == "Planning/Admin Review/NA/NA"
			&& AInfo["Type of Process"] == 'Development Unit Plan'
			&& (
				AInfo["Sub process type"] == 'Development Unit Plan'
				|| AInfo["Sub process type"] == 'Other'
			)
		){
			tBd.push('Development Unit Plan - Staff');
		}
		// ---------------------------
		// Development Unit Plan Modification - P&Z
		// ---------------------------
		// Development Unit Plan Modification - Staff - Confirmed PLN2016-00506
		// Record Type:
		//		Planning/Admin Review/NA/NA
		// Type of Process = 'Development Unit Plan' and 
		// Sub Process type = 'Amendment to Development Unit Plan'
		if (
			appTypeString == "Planning/Admin Review/NA/NA"
			&& AInfo["Type of Process"] == 'Development Unit Plan'
			&& AInfo["Sub process type"] == 'Amendment to Development Unit Plan'
		){
			tBd.push('Development Unit Plan Modification - Staff');
		}
		// ---------------------------
		// Final Plat Modification - Confirmed SUB16-00208
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
			tBd.push('Final Plat Modification');
		}
		// ---------------------------
		// Final Plat and Re-plat - Confirmed SUB16-00208
		// Record Type:
		//		Planning/Subdivision/NA/NA
		// Application Type = 'Final Plat Review'
		if (
			appTypeString == "Planning/Subdivision/NA/NA"
			&& AInfo['Application Type'] == 'Final Plat Review'
		){
			tBd.push('Final Plat and Re-plat');
		}
		// ---------------------------
		// Form-based Code Zoning Clearance - Confirmed PLN2016-00506
		// Record Type:
		//		Planning/Admin Review/NA/NA
		// Type of Process = 'Form Based Code/Zoning Clearance'
		if (
			appTypeString == "Planning/Admin Review/NA/NA"
			&& AInfo["Type of Process"] == 'Form Based Code/Zoning Clearance'
		){
			tBd.push('Form-based Code Zoning Clearance');
		}
		// ---------------------------
		// Group Home Registrations - Confirmed GHAP16-00206
		// Record Type:
		//		Planning/Group Home/Application/NA
		// none
		if (
			appTypeString == "Planning/Group Home/Application/NA"	
		){
			tBd.push('Group Home Registrations');
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
			&& AInfo["Interpretation"] == 'CHECKED'
		){
			tBd.push('Interpretation');
		}
		// ---------------------------
		// Land Split - Confirmed PLN2016-00506
		// Record Type:
		//		Planning/Admin Review/NA/NA
		// Type of Process = 'Land Division' and 
		// Sub Process type = 'Land Split'
		if (
			appTypeString == "Planning/Admin Review/NA/NA"
			&& AInfo["Type of Process"] == 'Land Division'
			&& AInfo["Sub process type"] == 'Land Split'
		){
			tBd.push('Land Split');
		}
		// ---------------------------
		// Major General Plan Amendment - Confirmed GPA16-00227
		// Record Type:
		//		Planning/General Plan Amendment - Major/NA/NA
		// none
		if (
			appTypeString == "Planning/General Plan Amendment - Major/NA/NA"
		){
			tBd.push('Major General Plan Amendment');
		}
		// ---------------------------
		// Medical Marijuana - Confirmed PLN2016-00506
		// Record Type:
		//		Planning/Admin Review/NA/NA
		// Type of Process = 'Medical Marijuana'
		if (
			appTypeString == "Planning/Admin Review/NA/NA"
			&& AInfo["Type of Process"] == 'Medical Marijuana'
		){
			tBd.push('Medical Marijuana');
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
				AInfo["Minor General Plan Amendment"] == 'CHECKED'
				|| AInfo["Planned Community Minor Amendment"] == 'CHECKED'
			)
		){
			tBd.push('Minor General Plan Amendment');
		}
		// ---------------------------
		// PAD Modification - BOA
		// Record Type:
		//		Planning/Board of Adjustment/NA/NA
		// Modification of Planned Area Development = 'Yes'
		if (
			appTypeString == "Planning/Board of Adjustment/NA/NA"
			&& AInfo["Modification of Planned Area Development"] == 'CHECKED'
		){
			tBd.push('PAD Modification - BOA');
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
			&& AInfo["Pre-Plat"] == 'CHECKED'
		){
			tBd.push('Preliminary Plat');
		}
		// ---------------------------
		// Preliminary Plat Extension - Confirmed PLN2016-00506
		// Record Type:
		//		Planning/Admin Review/NA/NA
		// Type of Process = 'Land Division' and 
		// Sub Process type = 'Preliminary Plat Extension'
		if (
				appTypeString == "Planning/Admin Review/NA/NA"
				&& AInfo["Type of Process"] == 'Land Division'
				&& AInfo["Sub process type"] == 'Preliminary Plat Extension'
		){
			tBd.push('Preliminary Plat Extension');
		}
		// ---------------------------
		// Preliminary Plat Modification - Confirmed PLN2016-00506
		// Record Type:
		//		Planning/Admin Review/NA/NA
		// Type of Process = 'Land Division' and 
		// Sub Process type = Amendment to Lot layout/street system'
		if (
				appTypeString == "Planning/Admin Review/NA/NA"
				&& AInfo["Type of Process"] == 'Land Division'
				&& AInfo["Sub process type"] == 'Amendment to Lot layout/street system'
		){
			tBd.push('Preliminary Plat Modification');
		}
		// ---------------------------
		// Product Review - Confirmed PLN2016-00506
		// Record Type:
		//		Planning/Admin Review/NA/NA
		// Type of Process = 'Product Approval' and 
		// Sub Process type = 'New detached product' or 'New Attached product' or 'Other'
		pRSubProc = ['New detached product','New Attached product','Other'];
		if (
				appTypeString == "Planning/Admin Review/NA/NA"
				&& AInfo["Type of Process"] == 'Product Approval'
				&& exists(AInfo["Sub process type"],pRSubProc)
		){
			tBd.push('Product Review');
		}
		// ---------------------------
		// Product Review Modification - Confirmed PLN2016-00506
		// Record Type:
		//		Planning/Admin Review/NA/NA
		// Type of Process = 'Product Approval' and 
		// Sub Process type = 'Amendment/Addition to Approved Product'
		if (
				appTypeString == "Planning/Admin Review/NA/NA"
				&& AInfo["Type of Process"] == 'Product Approval'
				&& AInfo["Sub process type"] == 'Amendment/Addition to Approved Product'
		){
			tBd.push('Product Review Modification');
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
					AInfo['Rezone'] == 'CHECKED'
					|| AInfo['Rezone - Infill Development District 2'] == 'CHECKED'
					|| AInfo['Rezone - Planned Community District'] == 'CHECKED'
					|| AInfo['Combined Rezone and Site Plan Review/Modification'] == 'CHECKED'
				)
		){
			tBd.push('Rezoning - general');
		}
		// ---------------------------
		// Shared Parking - Confirmed PLN2016-00506
		// Record Type:
		//		Planning/Admin Review/NA/NA
		// Type of Process = 'Board of Adjustment/Zoning Admin' and 
		// Sub Process type = 'Shared Parking'
		if (
				appTypeString == "Planning/Admin Review/NA/NA"
				&& AInfo["Type of Process"] == 'Board of Adjustment/Zoning Admin'
				&& AInfo["Sub process type"] == 'Shared Parking'
		){
			tBd.push('Shared Parking');
		}
		// ---------------------------
		// Site Plan Modification - Admin - Confirmed PLN2016-00506
		// Record Type:
		//		Planning/Admin Review/NA/NA
		// Type of Process = 'Zoning/Site Plan'
		if (
				appTypeString == "Planning/Admin Review/NA/NA"
				&& AInfo["Type of Process"] == 'Zoning/Site Plan'
		){
			tBd.push('Site Plan Modification - Admin');
		}	
		// ---------------------------
		// Site Plan Review - Council
		// ---------------------------
		// Site Plan Review - P&Z
		// Record Type:
		//		Planning/Board of Adjustment/NA/NA
		// Special Use Permit = 'Yes'
		//		or Administrative Use Permits = 'Yes'R
		if (
				appTypeString == "Planning/Planning and Zoning/NA/NA"
				&& AInfo['Site Plan Review/Modification'] == 'CHECKED'
		){
			tBd.push('Site Plan Review - P&Z');
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
					&& (AInfo['Special Use Permit'] == 'CHECKED'
					|| AInfo['Administrative Use Permits'] == 'CHECKED')
				)
				|| (
					appTypeString == 'Planning/Planning and Zoning/NA/NA'
					&& (AInfo['Special Use Permit'] == 'CHECKED')
				)
		){
			tBd.push('Special Use Permit');
		}
		// ---------------------------
		// Special Use Permit Modification
		// ---------------------------
		// Subdivision Technical Review - Confirmed SUB16-00208
		// Record Type:
		//		Planning/Subdivision/NA/NA
		// Application Type = 'Subdivision Technical Review'
		if (
				appTypeString == "Planning/Subdivision/NA/NA" 
				&& AInfo['Application Type'] == 'Subdivision Technical Review'
		){
			tBd.push('Subdivision Technical Review');
		}
		// ---------------------------
		// Substantial Conformance Improvement Permit
		// Record Type:
		//		Planning/Board of Adjustment/NA/NA
		// Special Use Permit = 'Yes'
		//		or Administrative Use Permits = 'Yes'
		if (
				appTypeString == "Planning/Board of Adjustment/NA/NA" 
				&& AInfo['Substantial Conformance Improvement Permit'] == 'CHECKED'
		){
			tBd.push('Substantial Conformance Improvement Permit');
		}
		// ---------------------------
		// Substantial Conformance Improvement Permit Modification - Confirmed PLN2016-00506
		// Record Type:
		//		Planning/Admin Review/NA/NA
		// Type of Process = 'Board of Adjustment/Zoning Admin' and 
		// Sub Process type = 'Amendment of Substantial Conformance Improvement Plan'
		//		or 'Other'
		if (
				appTypeString == "Planning/Admin Review/NA/NA"
				&& AInfo["Type of Process"] == 'Board of Adjustment/Zoning Admin'
				&& (
					AInfo["Sub process type"] == 'Amendment of Substantial Conformance Improvement Permit'
					|| AInfo["Sub process type"] == 'Other'
				)
		){
			tBd.push('Substantial Conformance Improvement Permit Modification');
		}
		// ---------------------------
		// Temporary Use Permits - Confirmed PLN2016-00506
		// Record Type:
		//		Planning/Admin Review/NA/NA
		// Type of Process = 'Board of Adjustment/Zoning Admin' and 
		// Sub Process type = 'Temporary Use Permit'
		if (
				appTypeString == "Planning/Admin Review/NA/NA"
				&& AInfo["Type of Process"] == 'Board of Adjustment/Zoning Admin'
				&& AInfo["Sub process type"] == 'Temporary Use Permit'
		){
			tBd.push('Temporary Use Permits');
		}
		// ---------------------------
		// Variance
		// Record Type:
		//		Planning/Board of Adjustment/NA/NA
		// Special Use Permit = 'Yes'
		//		or Administrative Use Permits = 'Yes'
		if (
				appTypeString == "Planning/Board of Adjustment/NA/NA"
				&& AInfo['Variance'] == 'CHECKED'
		){
			tBd.push('Variance');
		}
		// ---------------------------
		// Variance Modification
		// ---------------------------
		
		// ===========================
		// Check 1
		// ===========================
		// When workflow task "Distribution" or "Substantive Review Distribution" is set to "Resubmitted"
		check4 = [
					// Check 3
					'Planning/Admin Review/NA/NA',
					'Planning/Board of Adjustment/NA/NA',
					'Planning/Design Review/NA/NA',
					'Planning/General Plan Amendment - Major/NA/NA',
					'Planning/Group Home/Application/NA',
					'Planning/Subdivision/NA/NA',
					// Check 4
					'Planning/Planning and Zoning/NA/NA',
					'Planning/Annexation/NA/NA'
					];
		if(
				(wfTask == 'Substantive Review Distribution' || wfTask == 'Distribution')
				&& wfStatus == 'Distributed'
				&& tBd.length > 0
		){
			// Update the "Start/Stop Indicator" (subgroup = "KEY DATES") to "Started"
			editAppSpecific("Start/Stop Indicator", 'Started');
			// Update the "Substantive Review Due Date" = todays date + # of working days.
			// The #of working days is retrieved from "Value Desc" field of Standard Choices Item
			// "PLN Substantive Review Days".
			// Note that the numbers are based on a five day work week.
			tBdDay = [];
			for(x in tBd){
				workingDays = lookup("PLN Substantive Review Days",tBd[x]); // Confirmed working
				tBdDay.push(workingDays);
			}
			tBdDay.sort().reverse(); // this will order from highest to lowes, which we want the highest.
			nextDate = workDaysAdd(Date(),tBdDay[0],['WORKDAY CALENDAR'],['WEEKEND','HOLIDAY']);
			editAppSpecific("Substantive Review Due Date", jsDateToASIDate(convertDate2(nextDate)));
		}
		// ===========================
		// Check 2 COMPLETE
		// ===========================
		// When workflow task status of "Revisions Required" is applied to workflow task "Review Consolidation" then
		if(
				(wfTask == 'Review Consolidation')
				&& wfStatus == 'Revisions Required'
		){
			// Update the "Start/Stop Indicator" (subgroup = "KEY DATES") to "Stopped"
			editAppSpecific("Start/Stop Indicator", 'Stopped');
		}
		// ===========================	
		// Check 3 & 4 COMPLETE
		// ===========================
		// Check 3
		// For the following record types:
		// 		'Planning/Admin Review/NA/NA'
		//		'Planning/Board of Adjustment/NA/NA'
		//		'Planning/Design Review/NA/NA'
		//		'Planning/General Plan Amendment - Major/NA/NA'
		//		'Planning/Group Home/Application/NA'
		//		'Planning/Subdivision/NA/NA'
		// When workflow task status of "Resubmitted" is applied to workflow task "Distribution" then
		// Check 4
		// For the following record type: 'Planning/Planning and Zoning/NA/NA', 'Planning/Annexation/NA/NA'
		// When workflow task status of "Resubmitted" is applied to workflow task "Substantive Review Distribution" then
		if (
				1==1
				&& (wfTask == 'Distribution')
				&& wfStatus == 'Resubmitted'
		){
			// 1) Update the "Start/Stop Indicator" (subgroup = "KEY DATES") to "Started"
			// editAppSpecific("Start/Stop Indicator", 'Started');
			editAppSpecific("Start/Stop Indicator", 'Started'); // note that this will only update when there is an update to do, otherwise warning
			// 2) Update the "Substantive Review Due Date" (subgroup = "KEY DATES") = current 
			// value of "Substantive Review Due Date + the number of days difference between
			// the status date of workflow task "Review Consolidation" with task status-
			// "Revisions Required" and the status date of workflow task "Substantive Review Distribution"
			// with task status "Resubmitted".
			srDD = getAppSpecific("Substantive Review Due Date");
			if(srDD == null || srDD == 'undefined'){
				srDD = Date();
			};
			srDD = convertDate2(srDD);
			var rR; // Revisions required
			wf = aa.workflow.getTask(capId,"Review Consolidation").getOutput();
			if(wf.getDisposition() == "Revisions Required" && wf.getStatusDate() != null){
				rR = convertDate2(wf.getStatusDate());
			}
			else {
				rR = Date();
			}
			var dR; // Distribution/Resubmitted
			wf = aa.workflow.getTask(capId,"Distribution").getOutput();
			if(wf.getDisposition() == "Resubmitted" && wf.getStatusDate() != null){
				dR = convertDate2(wf.getStatusDate());
			}
			else {
				dR = Date();
			}
			// aa.print(rR);
			// aa.print(dR);
			bTasks = workDaysBetween(rR,dR,['WORKDAY CALENDAR'],['WEEKEND','HOLIDAY']);
			// aa.print(bTasks);
			if(bTasks > 0 || srDD == Date()){;
				var nextDate = new Date();
				nextDate = convertDate2(workDaysAdd(srDD, bTasks,['WORKDAY CALENDAR'],['WEEKEND','HOLIDAY']));
				editAppSpecific("Substantive Review Due Date", jsDateToASIDate(nextDate));
			}
		}
		// ===========================
		// Check 5 COMPLETE
		// ===========================
		// For all record types listed above:
		// When workflow task status of "Proceed" or "Complete" or "DR Board" or "Planning Director" is
		// applied to workflow task "Review Consolidation" then:
		check5Status = ["Proceed","Complete","DR Board","Planning Director"];
		if (
				(wfTask == 'Review Consolidation')
				&& exsits(wfStatus,check5Status)
		){
			// Update the "Start/Stop Indicator" (subgroup = "KEY DATES") to "Stopped"
			editAppSpecific("Start/Stop Indicator", 'Stopped');
		}
		// ===========================
		// Check 6 COMPLETE
		// ===========================
		// When workflow task status of "Complete" is applied to workflow task "Case Complete" then:
		if (
				(wfTask == 'Case Complete')
				&& wfStatus == 'Complete'
		){
			// Update the "Start/Stop Indicator" (subgroup = "KEY DATES") to "Stopped"
			editAppSpecific("Start/Stop Indicator", 'Stopped');
		}
		/*
		for(x in wf){
			//aa.print(wf[x]);
			aa.print(wf.getStatusDate());
			aa.print(wf.getDisposition());
		}
		//*/
	}
}
catch (err) {
	aa.print("A JavaScript Error occurred: " + err.message);
}

// Custom Functions
function dayDiff(first, second) {
    return Math.round((second-first)/(1000*60*60*24));
}
function convertDate2(thisDate)
{
	if (typeof(thisDate) == "string")
		{
		var retVal = new Date(String(thisDate));
		if (!retVal.toString().equals("Invalid Date"))
			return retVal;
		}
	if (typeof(thisDate)== "object")
		{
		if (!thisDate.getClass) // object without getClass, assume that this is a javascript date already
			{
			return thisDate;
			}
		if (thisDate.getClass().toString().equals("class com.accela.aa.emse.dom.ScriptDateTime"))
			{
			return new Date(thisDate.getMonth() + "/" + thisDate.getDayOfMonth() + "/" + thisDate.getYear());
			}
		if (thisDate.getClass().toString().equals("class com.accela.aa.emse.util.ScriptDateTime"))
			{
			return new Date(thisDate.getMonth() + "/" + thisDate.getDayOfMonth() + "/" + thisDate.getYear());
			}			
		if (thisDate.getClass().toString().equals("class java.util.Date")
			|| thisDate.getClass().toString().equals("class java.sql.Timestamp")
		)
			{
			return new Date(thisDate.getTime());
			}
		if (thisDate.getClass().toString().equals("class java.lang.String"))
			{
			return new Date(String(thisDate));
			}
		}
	if (typeof(thisDate) == "number")
		{
		return new Date(thisDate);  // assume milliseconds
		}
	logDebug("**WARNING** convertDate2 cannot parse date : " + thisDate);
	return null;
}
function monthDiff(d1, d2) {
	var months;
	d1 = convertDate2(d1);
	d2 = convertDate2(d2);
	months = (d2.getFullYear() - d1.getFullYear()) * 12;
	months -= d1.getMonth();
	months += d2.getMonth();
	return months <= 0 ? 0 : months;
}
function removeA(arr) {
	var what, a = arguments, L = a.length, ax;
	while (L > 1 && arr.length) {
		what = a[--L];
		while ((ax= arr.indexOf(what)) !== -1) {
			arr.splice(ax, 1);
		}
	}
	return arr;
}
function workDaysBetween(sDate,eDate,aCal,aDayEx){
	// sDate == Start Date
	// eDays == End Date
	// aCal == Array of calendars to include.
	// aDayEx == Array of day types that you wish to exclude.
	
	// Any weekend could be a three day weekend
	// 3 days are added for every weekend to make sure that we cover enough for the jump.
	// aDays2 = aDays + ((aDays / 7)*3) + 7 // this should sufficiently protect the day jumps
	
	// Variables
	var dArray = []; // to store the dates between the two dates.
	var sDate2 = convertDate2(sDate);
	var eDate2 = convertDate2(eDate);
	
	aDays2 = dayDiff(sDate2,eDate2);
	
	// Change everything in aCal to upper for comparison.
	toUpper = function(x){ 
		  return x.toUpperCase();
	};
	aCal = aCal.map(toUpper);
	
	// eDate2 needs to be sufficiently into the future for the rest of the function.
	eDate2.setDate(eDate2.getDate() + aDays2);
	
	// will be used to pull sufficient days that are "off"
	var monthsBetween = monthDiff(sDate2,eDate2);

	// Now create an array of dates adding one day to each date.
	for(a = 1; a<= aDays2; a++){
		calcDate = new Date(sDate);
		calcDate.setDate(calcDate.getDate() + a);
		dArray.push(jsDateToASIDate(calcDate));
	}
	// Now look up the calendars that are going to be excluded.
	// expected return is the calendar ID's
	calNames = aa.calendar.getCalendarNames().getOutput();
	for(x in calNames){
		// IF the name of the calendar is included in the list we need the
		// events from that calendar
		if(exists(calNames[x].getCalendarName().toUpperCase(),aCal)){
			for(a = 0; a <= monthsBetween; a++){
				calE = aa.calendar.getEventSeriesByCalendarID(calNames[x].getCalendarID(),sDate2.getFullYear(),sDate2.getMonth()+a).getOutput();
				for(b in calE){
					// Get the event details
					var evtDateDate = new Date(convertDate2(calE[b].getStartDate()));
					var evtType = calE[b].getEventType();
					// Now do the COMPARISON
					if(
						exists(evtType,aDayEx)
						&& exists(jsDateToASIDate(evtDateDate),dArray)
					)
					{
						removeA(dArray,jsDateToASIDate(evtDateDate));
					}
				}
			}
		}
	}
	if(sDate2 == eDate2){
		return 0;
	} else {
	return dArray.length // Return the Date that can be used as a working day.
	}
}
function workDaysAdd(sDate,aDays,aCal,aDayEx){
	// sDate == Start Date
	// aDays == Days to add
	// aCal == Array of calendars to include.
	// aDayEx == Array of day types that you wish to exclude.
	
	// Any weekend could be a three day weekend
	// 3 days are added for every weekend to make sure that we cover enough for the jump.
	aDays2 = aDays + ((aDays / 7)*3) + 7 // this should sufficiently protect the day jumps
	
	// Variables
	var dArray = []; // to store the dates between the two days.
	var sDate2 = convertDate2(sDate);
	var eDate2 = new Date(sDate2);
	
	// Change everything in aCal to upper for comparison.
	toUpper = function(x){ 
		  return x.toUpperCase();
	};
	aCal = aCal.map(toUpper);
	
	// eDate2 needs to be sufficiently into the future for the rest of the function.
	eDate2.setDate(eDate2.getDate() + aDays2);
	
	// will be used to pull sufficient days that are "off"
	var monthsBetween = monthDiff(sDate2,eDate2)+1;

	// Now create an array of dates adding one day to each date.
	for(a = 1; a<= aDays2; a++){
		calcDate = new Date(sDate);
		calcDate.setDate(calcDate.getDate() + a);
		dArray.push(jsDateToASIDate(calcDate)); // watch out this array can get to big very quickly.
	}
	// Now look up the calendars that are going to be excluded.
	// expected return is the calendar ID's
	calNames = aa.calendar.getCalendarNames().getOutput();
	for(x in calNames){
		// IF the name of the calendar is included in the list we need the
		// events from that calendar
		if(exists(calNames[x].getCalendarName().toUpperCase(),aCal)){
			for(a = 0; a <= monthsBetween; a++){
				calE = aa.calendar.getEventSeriesByCalendarID(calNames[x].getCalendarID(),sDate2.getFullYear(),sDate2.getMonth()+a).getOutput();
				for(b in calE){
					// Get the event details
					var evtDateDate = new Date(convertDate2(calE[b].getStartDate()));
					var evtType = calE[b].getEventType();
					// aa.print(evtDateDate);
					// aa.print(evtDateDate.toString());
					// Now do the COMPARISON
					if(
						1==1
						&& exists(evtType,aDayEx)
						&& exists(jsDateToASIDate(evtDateDate),dArray)
					)
					{
						// aa.print("Removing element...");
						removeA(dArray,jsDateToASIDate(evtDateDate));
						// aa.print(evtDateDate.toString());
					}
				}
			}
		}
	}
	return dArray[aDays-1]; // Return the Date that can be used as a working day.
}