//*===================================================================
// Versions:
 // 9/?/2016	 Brian O'Dell			initial
 // 9/28/2016	 John Cheney			added include("PMT_CopyPenaltyDateToDueDate") 
// 10/17/2016	 John Cheney			removed include("PMT_CopyPenaltyDateToDueDate")

 //---------------------------------------------------------------------
// Script Number: 66, 169
// Script Name: PMT_PenaltyDate.js 
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
// 		Script when a status of Accepted Plan Review Req is 
//		applied to wf task Application Submittal then auto-fill 
//		Penalty Date ASI field with date based on 
//		the number of days identified in the Turn around time field.  
//		The date generated should be based on a 4 day work week, 
//		Monday through Thursday, should not include Fridays, Weekends 
//		or Holidays.
//
//		This has been changed to include script 169 and the
//		"Plan Review Penalty Date" ASI field and Workflow task
//		"Plans Distribution"
//
// Script Run Event: WTUA, ASIUA
// Script Parents:
//              WTUA;Permits!~!~!~ (this script is wired to this parent)
//		ASIUA;Permits!~!~!~ (_ForAsiua is wired to this parent)
// 
//==================================================================*/


// leaving in case they want the record type testing back
// (appMatch("Permits/Commercial/NA/NA")) ||
// (appMatch("Permits/Document Retrieval/NA/NA")) ||
// (appMatch("Permits/Residential/NA/NA"))

try
{
  
  var okayToUpdate = isTaskComplete("Application Submittal");


  if ((
      (wfTask == "Application Submittal") && 
      ((wfStatus == "Accepted - Plan Review Req") || (wfStatus == "Accepted"))
     )||
     (
     (wfTask == "Plans Distribution") && (wfStatus == "Revisions Received")
     ))
  {

    // the minus 1 is due to customer wanting today to be "day 1"
    var turnAroundTime = (parseInt(AInfo["Turn Around Time"]) - 1);

    var penaltyDate = AInfo["Penalty Date"];
    var planReviewPenaltyDate = AInfo["Plan Review Penalty Date"];
    var todayDate = new Date();

    // set the futureDate
    var futureDate = new Date(mesaWorkingDays(todayDate, turnAroundTime));
    var setDate = false;

    // assign to Penalty Date ASI field if exists
    if (typeof penaltyDate == "undefined")
    {
      //comment("The ASI field 'Penalty Date' does not exist, skipping date assignment");
    }
    else
    {
      //comment("The ASI field 'Penalty Date' exists, setting date");     
      //comment("futureDate: " + futureDate );
      editAppSpecific("Penalty Date", jsDateToASIDate(futureDate));
      setDate = true;
    }

    // assign to Plan Review Penalty Date ASI field if exists
    if (typeof planReviewPenaltyDate == "undefined")
    {
      //comment("The ASI field 'Plan Review Penalty Date' does not exist, skipping date assignment");
    }
    else
    {
      //comment("The ASI field 'Plan Review Penalty Date' exists, setting date");      
      //comment("futureDate: " + futureDate );
      editAppSpecific("Plan Review Penalty Date", jsDateToASIDate(futureDate));
      setDate = true;
    }
  }

}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}









