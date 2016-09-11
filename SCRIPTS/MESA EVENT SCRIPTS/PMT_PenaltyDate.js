//*===================================================================
//
// Script Number: 66
// Script Name: PMT_PenaltyDate.js 
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
// 		Script – when a status of “Accepted – Plan Review Req” is 
//		applied to wf task “Application Submittal” then auto-fill 
//		“Plan Review Penalty Date” ASI field with date based on 
//		the number of days identified in the Turn around time field.  
//		The date generated should be based on a 4 day work week, 
//		Monday through Thursday, should not include Fridays, Weekends 
//		or Holidays.
//
// Script Run Event: WTUA
// Script Parents:
//              WTUA;Permits!~!~!~
// 
//==================================================================*/


// leaving in case they want the record type testing back
// (appMatch("Permits/Commercial/NA/NA")) ||
// (appMatch("Permits/Document Retrieval/NA/NA")) ||
// (appMatch("Permits/Residential/NA/NA"))

try
{
    
  if ((wfTask == "Application Submittal") && (wfStatus == "Accepted - Plan Review Req"))
  {
    var turnAroundTime = AInfo["Turn Around Time"];
    var penaltyDate = AInfo["Penalty Date"];
    var planReviewPenaltyDate = AInfo["Plan Review Penalty Date"];
    var todayDate = new Date();

    if (typeof penaltyDate == "undefined")
    {
      comment("The ASI field 'Penalty Date' does not exist, skipping date assignment");
    }
    else
    {
      //comment("The ASI field 'Penalty Date' exists, setting date");
      var futureDate = new Date(mesaWorkingDays(todayDate, turnAroundTime));

      editAppSpecific("Penalty Date", jsDateToASIDate(futureDate));
    }

  }

}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}









