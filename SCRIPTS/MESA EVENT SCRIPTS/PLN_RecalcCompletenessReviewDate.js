/*===================================================================
// Script Number: 157
// Script Name: PLN_RecalcCompletenessReviewDate.js
// Script Developer: Kevin Ford
// Script Agency: Accela
// Script Description: 

// Script Run Event: ASA

// Script Parents:
//	WTUA;Planning!~!~!~
//	
/*==================================================================*/
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
if(
	// Check that it's the correct record type
	exists(appTypeString,recTypesCheck)
	// Check that it has the correct workflow task/status
	&& (
			(wfTask =='Accepted' && wfStatus=='Application Acceptance')
			|| (wfTask =='Completeness Review' && wfStatus=='Information Received')
			|| (wfTask =='Completeness Review' && wfStatus=='Revisions Submittal')
			|| (wfTask =='Planning Initial Review' && wfStatus=='Resubmittal Received')
			|| (wfTask =='Completeness Review' && wfStatus=='Incomplete Submittal')
			|| (wfTask =='Completeness Review' && wfStatus=='Returned to Applicant')
			|| (wfTask =='Planning Initial Review' && wfStatus=='Corrections Required')
			|| (wfTask =='Review Consolidation' && wfStatus=='Revisions Required')
	)
){
	var tBd = [];
	// following array used for check "Affidavit of Change"
	aOcSubProc = ['Affidavit of Change/Correction', 
    'Addition to or modification of amenity package',
    'Change to Wall Design or Entry Feature',
    'Lot Combination',
    'Other']
	// following array used for check "Product Review"
	pRSubProc = ['New detached product','New Attached product','Other'];
	// following array used for check "Design Review - Staff"
	dRProc = ['Design Review','Land Division','Desert Uplands Development Standards'];
	
	// Checks for record type 'Planning/Admin Review/NA/NA'
	if(appTypeString == 'Planning/Admin Review/NA/NA'){
		// Cell Tower - staff
		if(
			(
				AInfo["Type of Process"] == 'Board of Adjustment/Zoning Admin'
				&& exists(AInfo["Sub process type"],cTSSubProc)
			)
			|| AInfo["Type of Process"] == 'Wireless Communications Facilities'
		) {
			tBd.push('Cell Tower - staff');
		}
		// Group of "Board of Adjustment/Zoning Admin
		else if(
				AInfo["Type of Process"] == 'Board of Adjustment/Zoning Admin'
		){
			// Administrative Extensions for Zoning Administration Cases
			if(AInfo["Sub process type"] == 'Administrative Extension'){
				tBd.push('Administrative Extensions for Zoning Administration Cases');
			}
			// A-frame Sign
			else if(AInfo["Sub process type"] == 'A-Frame Sign'){
				tBd.push('A-frame Sign');
			}
			// Alternative Landscaping
			else if (AInfo["Sub process type"] == 'Alternative Landscaping'){
				tBd.push('Alternative Landscaping');
			}
			// Alternative Parking
			else if (AInfo["Sub process type"] == 'Alternative Parking'){
				tBd.push('Alternative Parking');
			}
			// Shared Parking
			else if (AInfo["Sub process type"] == 'Shared Parking'){
				tBd.push('Shared Parking');
			}
			// Temporary Use Permits
			else if (AInfo["Sub process type"] == 'Temporary Use Permit'){
				tBd.push('Temporary Use Permits');
			}
			// Development Incentive Permit Modification
			else if (AInfo["Sub process type"] == 'Amendment of development incentive permit'){
				tBd.push('Development Incentive Permit Modification');
			}
			// Substantial Conformance Improvement Permit Modification
			else if(
				AInfo["Sub process type"] == 'Amendment of Substantial Conformance Improvement Permit'
				|| AInfo["Sub process type"] == 'Other'
			){
				tBd.push('Substantial Conformance Improvement Permit Modification');
			}
		} // End board of adjustment
		// Development Unit Plan Modification – Staff
		else if(
			AInfo["Type of Process"] == 'Development Unit Plan'
			&& AInfo["Sub process type"] == 'Amendment to Development Unit Plan'
		){
			tBd.push('Development Unit Plan Modification - Staff');
		}
		// Development Unit Plan - Staff
		else if (
			AInfo["Type of Process"] == 'Development Unit Plan'
			&& (
				AInfo["Sub process type"] == 'Development Unit Plan'
				|| AInfo["Sub process type"] == 'Other'
			)
		){
			tBd.push('Development Unit Plan - Staff');
		}
		// Form-based Code Zoning Clearance
		else if (
			AInfo["Type of Process"] == 'Form Based Code/Zoning Clearance'
		){
			tBd.push('Form-based Code Zoning Clearance');
		}
		// Certificate of Appropriateness
		else if (
			AInfo["Type of Process"] == 'Historic Preservation'
			&& (AInfo["Sub process type"] == 'Certificate of Appropriateness'
				|| AInfo["Sub process type"] == 'Demolition Permit'
			)
		){
			tBd.push('Certificate of Appropriateness');
		}
		// 106 Reviews
		else if (
			AInfo["Type of Process"] == 'Historic Preservation'
			&& AInfo["Sub process type"] == 'Section 106 Review'
		){
			tBd.push('106 Reviews');
		}
		// Split for Land Division
		else if (
			AInfo["Type of Process"] == 'Land Division'
		){
			// // Affidavit of Change
			if (exists(AInfo["Sub process type"],aOcSubProc)){
			tBd.push('Affidavit of Change');
			}
			// Preliminary Plat Modification
			else if (AInfo["Sub process type"] == 'Amendment to Lot layout/street system'){
				tBd.push('Preliminary Plat Modification');
			}
			// Land Split
			else if (AInfo["Sub process type"] == 'Land Split'){
				tBd.push('Land Split');
			}
			// Preliminary Plat Extension
			else if (AInfo["Sub process type"] == 'Preliminary Plat Extension'){
				tBd.push('Preliminary Plat Extension');
			}
		}
		// Medical Marijuana
		else if (AInfo["Type of Process"] == 'Medical Marijuana'){
			tBd.push('Medical Marijuana');
		}
		// Product Review Modification
		else if (
			AInfo["Type of Process"] == 'Product Approval'
			&& AInfo["Sub process type"] == 'Amendment/Addition to Approved Product'
		){
			tBd.push('Product Review Modification');
		}
		// Product Review
		else if (
			AInfo["Type of Process"] == 'Product Approval'
			&& exists(AInfo["Sub process type"],pRSubProc)
		){
			tBd.push('Product Review');
		}
		// Site Plan Modification - Admin
		else if (
			AInfo["Type of Process"] == 'Zoning/Site Plan'
		){
			tBd.push('Site Plan Modification - Admin');
		}
		else if (
			exists(AInfo["Type of Process"],dRProc)
		){
			tBd.push('Design Review - Staff');
		}
			
	} // End of test for 'Planning/Admin Review/NA/NA
	// Annexation
	else if (appTypeString=='Planning/Annexation/NA/NA'){
		tBd.push('Annexation');
	}
	else if (appTypeString == 'Planning/Board of Adjustment/NA/NA'){
		// Development Incentive Permit
		if (AInfo["Development Incentive Permit"] == 'CHECKED'){
			tBd.push('Development Incentive Permit');
		}
		// Interpretation
		if (AInfo["Interpretation"] == 'CHECKED'){
			tBd.push('Interpretation');
		}
		// PAD Modification – BOA
		if (AInfo["Modification of Planned Area Development"] == 'CHECKED'
		){
			tBd.push('PAD Modification - BOA');
		}
		// Special Use Permit
		if (AInfo['Special Use Permit'] == 'CHECKED'
			|| AInfo['Administrative Use Permits'] == 'CHECKED'
		){
			tBd.push('Special Use Permit');
		}
		// Substantial Conformance Improvement Permit
		if (AInfo['Substantial Conformance Improvement Permit'] == 'CHECKED'){
			tBd.push('Substantial Conformance Improvement Permit');
		}
		// Variance
		if(AInfo['Variance'] == 'CHECKED'){
			tBd.push('Variance');
		}
	}
	// Designed Review Board
	else if (
		appTypeString == "Planning/Design Review/NA/NA" 
	){
		tBd.push('Design Review - Board');
	}
	// Major General Plan Amendment
	else if (
		appTypeString == "Planning/General Plan Amendment - Major/NA/NA"
	){
		tBd.push('Major General Plan Amendment');
	}
	// Group Home Registrations
	else if (
		appTypeString == "Planning/Group Home/Application/NA"	
	){
		tBd.push('Group Home Registrations');
	}
	// Planning/Planning and Zoning/NA/NA
	else if (appTypeString == "Planning/Planning and Zoning/NA/NA")
	{
		// Council Use Permit
		if (AInfo["Council Use Permit"] == 'CHECKED'){
			tBd.push('Council Use Permit');
		}
		// Development Unit Plan - P&Z
		if (AInfo["Development Unit Plan"] == 'CHECKED'){
			tBd.push('Development Unit Plan - P&Z');
		}
		// Minor General Plan Amendment
		if (AInfo["Minor General Plan Amendment"] == 'CHECKED'
			|| AInfo["Planned Community Minor Amendment"] == 'CHECKED'
		)
		{
			tBd.push('Minor General Plan Amendment');
		}
		// Preliminary Plat
		if (AInfo["Pre-Plat"] == 'CHECKED'){
			tBd.push('Preliminary Plat');
		}
		if (
					AInfo['Rezone'] == 'CHECKED'
					|| AInfo['Rezone - Infill Development District 2'] == 'CHECKED'
					|| AInfo['Rezone - Planned Community District'] == 'CHECKED'
					|| AInfo['Combined Rezone and Site Plan Review/Modification'] == 'CHECKED'
		)
		{
			tBd.push('Rezoning - general');
		}
		// Special Use Permit 
		if (AInfo['Special Use Permit'] == 'CHECKED'){
			tBd.push('Special Use Permit');
		}
		// Site Plan Review - P&Z
		if (AInfo['Site Plan Review/Modification'] == 'CHECKED'
		){
			tBd.push('Site Plan Review - P&Z');
		}
	}
	else if (appTypeString == "Planning/Subdivision/NA/NA"){
		// Final Plat and Re-plat
		if (AInfo['Application Type'] == 'Final Plat Review'){
			tBd.push('Final Plat and Re-plat');
		}
		// Final Plat Modification
		if (
				AInfo['Application Type'] == 'Re-Plat'
				|| AInfo['Application Type'] == 'Map of Dedication (MOD)'
		){
			tBd.push('Final Plat Modification');
		}
		// Subdivision Technical Review 
		if (AInfo['Application Type'] == 'Subdivision Technical Review'){
			tBd.push('Subdivision Technical Review');
		}
	}
	
	// Now parse all of the values that were added to the tBd array
	// in reverse to get the maximum number of days that it should be shifted
	tBdDay = [];
	for(x in tBd){
		workingDays = lookup("PLN Substantive Review Days",tBd[x]); // Confirmed working
		tBdDay.push(workingDays);
	}
	tBdDay.sort().reverse(); // this will order from highest to lowest, which we want the highest.
	shiftDays = tBdDay[0];
	
	// Test 1 - 1.	Update ASI “Start/Stop Indicator” to “Started”
	if(
		(wfTask =='Accepted' && wfStatus=='Application Acceptance')
		|| (wfTask =='Completeness Review' && wfStatus=='Information Received')
		|| (wfTask =='Completeness Review' && wfStatus=='Revisions Submittal')
		|| (wfTask =='Planning Initial Review' && wfStatus=='Resubmittal Received')
	){
		// 1.	Update ASI “Start/Stop Indicator” to “Started” 
	}
	
	// Test 2 - 1.	Update ASI “Start/Stop Indicator” to “Stopped”
	if(
		(wfTask =='Completeness Review' && wfStatus=='Incomplete Submittal')
		|| (wfTask =='Completeness Review' && wfStatus=='Returned to Applicant')
		|| (wfTask =='Planning Initial Review' && wfStatus=='Corrections Required')
		|| (wfTask =='Review Consolidation' && wfStatus=='Revisions Required')
	){
		// 1.	Update ASI “Start/Stop Indicator” to “Stopped”
		
	}
	
	// Test 3 - 1.	Update ASI “Completeness Review Due Date” to crdDate1.
	if(
		(wfTask =='Accepted' && wfStatus=='Application Acceptance')
		|| (wfTask =='Completeness Review' && wfStatus=='Information Received')
	){
		
	}
	// Test 4 - 1.	 Update ASI “Completeness Review Due Date” to crdDate2.
	if(
		(wfTask =='Completeness Review' && wfStatus=='Information Received')
	){
		
	}
	// Test 5 - 1.	 Update ASI “Completeness Review Due Date” to crdDate3.
	if(
		(wfTask =='Completeness Review' && wfStatus=='Revisions Submittal')
	){
		
	}
	
	// Test 6 - 1.	 Update ASI “Completeness Review Due Date” to crdDate4.
	if (
		(wfTask =='Planning Initial Review' && wfStatus=='Resubmittal Received')
	){
		
	}
}