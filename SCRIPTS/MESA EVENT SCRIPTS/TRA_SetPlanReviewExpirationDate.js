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
  var theDate = AInfo["Application Date"];
  var planReviewDays = parseInt(AInfo["Plan Review Days"]);

  // fix for when no date is in system
  if (theDate == null)
  {
    var today = new Date();
	var currentTime = new Date().getHours();

		if (currentTime >= 11)
		{
			//Sunday thru Wednesday - next day
			if ((today.getDay(mesaWorkingDays) == 0) || (today.getDay(mesaWorkingDays) == 1) || (today.getDay(mesaWorkingDays) == 2) || (today.getDay(mesaWorkingDays) == 3)) 
			{
			today.setDate(today.getDate(mesaWorkingDays) + 1);
			}
	
			//Thursday add 4 days to get to monday
			else if (today.getDay(mesaWorkingDays) == 4) 
			{
				today.setDate(today.getDate(mesaWorkingDays) + 4);
			}
	
			//Friday add 3 days to get to monday
			else if (today.getDay(mesaWorkingDays) == 5) 
			{
				today.setDate(today.getDate(mesaWorkingDays) + 3);
			}
			// Saturday, add 2 days to get to monday
			if (today.getDay(mesaWorkingDays) == 6) 
			{
				today.setDate(today.getDate(mesaWorkingDays) + 2);
			} 
		}
    theDate = today;
  }

  comment("theDate: " + theDate);
  comment("planReviewDays: " + planReviewDays);

  //planReviewDays -= 1;  //This looks to be the offending line of code that was subtracting a day feedback based on GoLiveIssueTracker 100

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





