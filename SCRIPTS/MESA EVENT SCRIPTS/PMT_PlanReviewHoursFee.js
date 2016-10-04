/*===================================================================
// Script Number: 176
// Script Name: PMT_PlanReviewHoursFee.js
// Script Developer: 
// Script Agency: 
// Script Description: When a  workflow status of “Approved”, “Approved w/ Comments”, or “Revisions Required” at wf task “Plan Review” 
// 					When a value is entered into the “Hours Spent” field within the wf “process form” on the “Plan Review” task, 
//                  assess the “Plan Review Fee” with the entered value.
//			update per Marisol.Vazquez : only do the fee assessment on the Plans Coordination" task set to "Ready to Issue"
// Script Run Event: WTUA
// Script Parents:
//            WTUA;Permits!Master Plan!NA!NA
/*==================================================================*/


//if (matches(wfTask, "Planning Review","Building Review","Fire Review","Civil Engineering Review")) {
	//if (matches(wfStatus, "Approved","Approved w/Comments","Revisions Required")) {
if (wfTask == "Plans Coordination" && wfStatus == "Ready to Issue") {
		// sum hours across tasks
		totHours  = getWFHours(capId,"Building Review","Planning Review","Fire Review","Civil Engineering Review","Plans Coordination")
		if (totHours > 0) {
			if (AInfo["Expedite"] == "Expedite")
					depAmount = feeAmount("MST070","NEW","INVOICED");
					totFeeAmount = (110*totHours) - depAmount;
					updateFee("MST040", "PMT_MST", "FINAL", totFeeAmount, "N");				
		    if (AInfo["Expedite"] == "Super Expedite")
					depAmount = feeAmount("MST080","NEW","INVOICED");
		    		totFeeAmount = (220*totHours) - depAmount;
					updateFee("MST050", "PMT_MST", "FINAL", totFeeAmount, "N");		
		}
		else {
			if (feeExists("MST040", "NEW", "INVOICED")) voidRemoveFee("MST040");
			if (feeExists("MST050", "NEW", "INVOICED")) voidRemoveFee("MST050");
		}
	//}	
} 