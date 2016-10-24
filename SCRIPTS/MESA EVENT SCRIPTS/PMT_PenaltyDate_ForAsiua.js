 //---------------------------------------------------------------------
// 
//==================================================================*/

try
{
  
  var okayToUpdate = isTaskComplete("Application Submittal");

  if (okayToUpdate)
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
