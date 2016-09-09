//*===================================================================
//
// Script Number: 169
// Script Name: PMT_ResetPlanReviewPenaltyDate.js 
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
// 		This calculates the ASI Plan Review Expiration Date field
//		Trigger:  When WF task “Plans Distribution” is statused to 
//		"Revisions Received” then:  add the number of days in the 
//		ASI Turn Around Time field to today and store in ASI Plan 
//		Review Penalty Date field. 
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
// (appMatch("Permits/Addenda or Deferred/NA/NA")) ||
// (appMatch("Permits/Demolition/NA/NA")) ||
// (appMatch("Permits/Master Plan/NA/NA")) ||	
//(appMatch("Permits/Residential/Mobile Home/NA")) ||
// (appMatch("Permits/Sign/NA/NA"))


try
{

  if ((wfTask == "Plans Distribution") && (wfStatus == "Revisions Received"))
  {

    var turnAroundTime = AInfo["Turn Around Time"];
    var penaltyDate = AInfo["Penalty Date"];
    var planReviewPenaltyDate = AInfo["Plan Review Penalty Date"];
    var todayDate = new Date();

    if (typeof planReviewPenaltyDate == "undefined")
    {
      comment("The ASI field 'Plan Review Penalty Date' does not exist, skipping date assignment");
    }
    else
    {
      //comment("The ASI field 'Plan Review Penalty Date' exists, setting date");
      var futureDate = new Date(mesaWorkingDays(todayDate, turnAroundTime));

      editAppSpecific("Plan Review Penalty Date", jsDateToASIDate(futureDate));
    }    

  }

}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}









