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
//             ASA:Transportation/*/*/*
//		ASIUA;Transportation/*/*/*
// 
//==================================================================*/

try
{
  var theDate = new Date(AInfo["Application Date"]);
  var planReviewDays = parseInt(AInfo["Plan Review Days"]);

  theDate = dateAdd(theDate,planReviewDays,'Y');

  editAppSpecific("Plan Review Expiration Date",jsDateToASIDate(theDate),capId);

}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}





