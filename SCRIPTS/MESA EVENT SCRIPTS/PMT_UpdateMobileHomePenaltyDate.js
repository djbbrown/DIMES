//*===================================================================
//
// Script Number: 131
// Script Name: PMT_UpdateMobileHomePenaltyDate.js
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
// 		when a status of “Accepted – Plan Review Req” is applied 
//		to wf task “Application Submittal” then auto-fill “Plan 
//		Review Penalty Date” ASI field with date 10 days from status date.
//
// Script Run Event: WTUA
// Script Parents:
//             WTUA:Permits/Residential/Mobile Home/*
// 
//==================================================================*/

try
{
  var wfTaskMatch = isTaskStatus("Application Submittal", "Accepted - Plan Review Req");
  var theDate = new Date();
  var planReviewPenaltyDate = getAppSpecific["Plan Review Penalty Date"];
  var theStatusDate = "" + getStatusDateinTaskHistory("Application Submittal", "Accepted - Plan Review Req");
  var tempDate = "";

  if ((planReviewPenaltyDate == null) && (wfTaskMatch))
  {
    tempDate = theStatusDate.substring(0,10);
    var datePieces = tempDate.split('-');

    theDate = new Date(datePieces[1] + "/" + datePieces[2] + "/" + datePieces[0]);

    editAppSpecific("Plan Review Penalty Date",jsDateToASIDate(theDate),capId);
  }
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}





