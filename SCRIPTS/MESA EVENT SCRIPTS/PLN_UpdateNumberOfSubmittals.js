//*===================================================================
//
// Script Number: 153
// Script Name: PLN_UpdateNumberOfSubmittals.js
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
// 		When the task "Substantive Reivew Distribution" is set to 
//		a status of "Distributed" or "Resubmitted" increment the 
//		value in the asi field "Number of Submittals"
//
// Script Run Event: WTUA
// Script Parents:
//             ***** WTUA:Permits/Residential/Mobile Home/*
// 		1) Planning/Applications/Design Review/NA
//		2) Planning/Group Home-Daycare/Application/NA
//		3) Planning/Subdivision/NA/NA
//		4) Planning/General Plan Amendment – Major/NA/NA
//		5) Planning/Planning and Zoning/NA/NA
//
//==================================================================*/


try
{

  ** add new code here



  var scheduleDays = getAppSpecific("Turn Around Time");
  var wfTaskMatch = isTaskStatus("Application Submittal", "Accepted - Plan Review Req");
  var theDate = new Date();
  var planReviewPenaltyDate = getAppSpecific["Plan Review Penalty Date"];
  var theStatusDate = "" + getStatusDateinTaskHistory("Application Submittal", "Accepted - Plan Review Req");
  var tempDate = "";

  if ((planReviewPenaltyDate == null) && (wfTaskMatch))
  {
    //logDebug("scheduleDays: " + scheduleDays);

    tempDate = theStatusDate.substring(0,10);
    var datePieces = tempDate.split('-');

    theDate = new Date(datePieces[1] + "/" + datePieces[2] + "/" + datePieces[0]);
    theDate = new Date(dateAdd(theDate,scheduleDays,'Y'));

    //logDebug("theDate: " + theDate);

    editAppSpecific("Plan Review Penalty Date",jsDateToASIDate(theDate));
  }
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}





