//*===================================================================
//
// Script Number: 286
// Script Name: TRA_SetPlanReviewExpirationDate.js
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
// 		When a value is enterd into ASI field "Plan Review Days" 
//		then Auto-Fill "Plan Review Expiration date" with date 
//		number of days out as specified in "Plan Review Days" 
//		and "Application Date"
//
// Script Run Event: ASA / ASIUA
// Script Parents:
//             	ASA:Transportation/*/*/*
//		ASIUA;Transportation/*/*/*
// 
//==================================================================*/

try
{
  var theDate = new Date(AInfo["Application Date"]);
  var planReviewDays = parseInt(AInfo["Plan Review Days"]);

  // fix for when no date is in system
  if (theDate.getYear() <= 2016)
  {
    var today = new Date();
    var currentTime = new Date().getHours();

    if (currentTime >= 11)
    {
      today.setDate(today.getDate() + 1);
    }

    theDate = today;
  }

  comment("theDate: " + theDate);
  comment("planReviewDays: " + planReviewDays);

  planReviewDays -= 1;

  //theDate = new Date(dateAdd(theDate,planReviewDays,'Y'));
  comment("theDate (after calc): " + theDate);

  var mesaDate = mesaWorkingDays(theDate, planReviewDays);
  comment("Plan Review Expiration Date: " + mesaDate);
  theDate = new Date(mesaDate);

  editAppSpecific("Plan Review Expiration Date",jsDateToASIDate(theDate),capId);

}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}





