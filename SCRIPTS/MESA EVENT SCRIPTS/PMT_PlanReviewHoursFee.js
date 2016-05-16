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
var APPROVED = "Approved";
var APPROVED_WITH_COMMENTS = "Approved w/Comments";
var REVISIONS_REQUIRED = "Revisions Required";
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

var taskValid = wfTask == WFTASK;
if (!taskValid) logDebug("Task invalid");
var statusValid = (wfStatus == APPROVED) || (wfStatus == APPROVED_WITH_COMMENTS) || (wfStatus == REVISIONS_REQUIRED);
if (!statusValid) logDebug("Status invalid");
var hoursValid = !!wfHours && wfHours > 0;
if (!hoursValid) logDebug("Hours invalid");

if (taskValid && statusValid && hoursValid){
	if (AInfo[EXPEDITED_FIELD] == EXPEDITED){
		if (feeExists(FEE_CODE.EXPEDITED, "INVOICED")) voidRemoveFee(FEE_CODE.EXPEDITED);
		updateFee(FEE_CODE.EXPEDITED, FEE_SCHEDULE, FEE_PERIOD, wfHours, FEE_INVOICE);
	} else if (AInfo[EXPEDITED_FIELD] == SUPER_EXPEDITED){
		if (feeExists(FEE_CODE.SUPER_EXPEDITED, "INVOICED")) voidRemoveFee(FEE_CODE.SUPER_EXPEDITED);
		updateFee(FEE_CODE.SUPER_EXPEDITED, FEE_SCHEDULE, FEE_PERIOD, wfHours, FEE_INVOICE);
	}	
} 