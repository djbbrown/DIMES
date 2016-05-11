/*===================================================================
// Script Number: 176
// Script Name: PMT_PlanReviewHoursFee.js
// Script Developer: Bryan de Jesus
// Script Agency: Woolpert
// Script Description: When a  workflow status of “Approved”, “Approved w/ Comments”, or “Revisions Required” at wf task “Plan Review” When a value is entered into the “Hours Spent” field within the wf “process form” on the “Plan Review” task, assess the “Plan Review Fee” with the entered value.
// Script Run Event: WTUA
// Script Parents:
//            WTUA;Permits!Master Plan!NA!NA
/*==================================================================*/
showDebug = true;

// constants
var WFTASK = "Planning Review";
var WFSTATUS = ["Approved", "Approved w/Comments", "Revisions Required"];
var EXPEDITED_FIELD = "Expedite";
var EXPEDITED = "Expedite";
var SUPER_EXPEDITED = "Super Expedite";
var FEE_CODE = {
	EXPEDITED: "MST040",
	SUPER_EXPEDITED: "MST050"
}
var FEE_SCHEDULE = "PMT_MST";
var FEE_PERIOD = "FINAL";
var FEE_INVOICE = "N";



if (wfTask == WFTASK && WFSTATUS.indexOf(wfStatus) > -1 && !!wfHours && wfHours > 0){
	if (AInfo[EXPEDITED_FIELD] == EXPEDITED){
		if (feeExists(FEE_CODE.EXPEDITED, "INVOICED")) voidRemoveFee(FEE_CODE.EXPEDITED);
		updateFee(FEE_CODE.EXPEDITED, FEE_SCHEDULE, FEE_PERIOD, wfHours, FEE_INVOICE);
	} else if (AInfo[EXPEDITED_FIELD] == SUPER_EXPEDITED){
		if (feeExists(FEE_CODE.SUPER_EXPEDITED, "INVOICED")) voidRemoveFee(FEE_CODE.SUPER_EXPEDITED);
		updateFee(FEE_CODE.SUPER_EXPEDITED, FEE_SCHEDULE, FEE_PERIOD, wfHours, FEE_INVOICE);
	}	
}