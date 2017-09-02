//*===================================================================
//
// Script Number: 280
// Script Name: TRA_SetApplicationDate.js
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
// 		Permit application date will be auto filled with current date 
//		unless application is submitted after 11AM, then application 
//		date will be for the next City Business Day
//
// Script Run Event: ASA
// Script Parents:
//             ASA:Transportation/*/*/*
// 
//==================================================================*/


try
{
  var today = new Date(mesaWorkingDays);
  var currentTime = new Date().getHours
  
      //get the NextBusDate
  var nextBusDate = new Date(mesaWorkingDays(today, 1));

  if (currentTime >= 11)
  {
    nextBusDate.setDate(nextBusDate.getDate());
	
	editAppSpecific("Application Date",jsDateToASIDate(nextBusDate),capId)
	comment("Application Date set to: " + jsDateToASIDate(nextBusDate));
	
  }
	else 
	{
		today.setDate(today.getDate() + 1);	
		editAppSpecific("Application Date",jsDateToASIDate(today),capId)
		comment("Application Date set to: " + jsDateToASIDate(today));
	}
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}



