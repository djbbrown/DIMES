//---------------------------------------------------------------------
// Script Number: 66, 169
// Script Name: PMT_PenaltyDate_ForAsiua.js 
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
//		**NOTE: User changed spec to include ASIUA if workflow after "Application Submittal",
//		so this various of script 66 was created.
//
//
// Script Run Event: WTUA, ASIUA
// Script Parents:
//              WTUA;Permits!~!~!~  (see other script for specs)
//		ASIUA;Permits!~!~!~ (this script is hooked to this parent)
// 
//==================================================================*/

try
{
  
  var okayToUpdate = isTaskComplete("Application Submittal");

  if (okayToUpdate)
  {

    // the minus 1 is due to customer wanting today to be "day 1"
    var turnAroundTime = (parseInt(AInfo["Turn Around Time"]));

    var penaltyDate = AInfo["Penalty Date"];
    var planReviewPenaltyDate = AInfo["Plan Review Penalty Date"];
	var recalcPenaltyDateFrom = AInfo["Recalc Penalty Date From"];
	var recalcPenaltyDateFromJS = new Date(AInfo["Recalc Penalty Date From"]);
	var penaltyDateFrom = AInfo["Penalty Date From"];
	var penaltyDateFromJS = new Date(AInfo["Penalty Date From"]);
    var todayDate = new Date();
	var recFileDateJS = new Date(fileDate);
	var updatePenaltyDateRecalc = false;
	var updatePenaltyDate = false;

    // set the futureDate
	if (recalcPenaltyDateFrom != null){
		var futureDateRecalc = new Date(mesaWorkingDays(recalcPenaltyDateFromJS, turnAroundTime));
		var setDate = false;
		updatePenaltyDateRecalc = true;
		}
	var recalcPenaltyDate = new Date(mesaWorkingDays(penaltyDateFromJS, turnAroundTime));
	
	//logDebug("recalcPenaltyDate = " + recalcPenaltyDate);
	//logDebug("penaltyDate = " + penaltyDate);
	//logDebug("recalcPenaltyDateASI = " + jsDateToASIDate(recalcPenaltyDate));
	
	if ((recalcPenaltyDateFrom == null) && (penaltyDate != jsDateToASIDate(recalcPenaltyDate))){
		var futureDate = new Date(mesaWorkingDays(penaltyDateFromJS, turnAroundTime));
		var setDate = false;
		updatePenaltyDate = true;
	}

    // assign to Penalty Date ASI field if exists
	//logDebug("updatePenaltyDateRecalc = " + updatePenaltyDateRecalc);
	//logDebug("updatePenaltyDate = " + updatePenaltyDate);
    if (typeof penaltyDate != "undefined" && updatePenaltyDateRecalc)
    {     
      //logDebug("futureDate: " + futureDate);
      editAppSpecific("Penalty Date", jsDateToASIDate(futureDateRecalc));
	  setDate = true;
	  if(recalcPenaltyDate != null){
			editAppSpecific("Recalc Penalty Date From","");
			}
    }
	if (typeof penaltyDate != "undefined" && updatePenaltyDate)
    {     
      //logDebug("futureDate: " + futureDate);
      editAppSpecific("Penalty Date", jsDateToASIDate(futureDate));
	  setDate = true;
    }
	
    // assign to Plan Review Penalty Date ASI field if exists
    if (typeof planReviewPenaltyDate != "undefined" && updatePenaltyDateRecalc)
    {
      //logDebug("futureDate: " + futureDate);
      editAppSpecific("Plan Review Penalty Date", jsDateToASIDate(futureDateRecalc));
      setDate = true;
	  if(recalcPenaltyDate != null){
			editAppSpecific("Recalc Penalty Date From","");
			}
    }
	if (typeof planReviewPenaltyDate != "undefined" && updatePenaltyDate)
    {
      //logDebug("futureDate: " + futureDate);
      editAppSpecific("Plan Review Penalty Date", jsDateToASIDate(futureDate));
      setDate = true;
    }
  }

}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}