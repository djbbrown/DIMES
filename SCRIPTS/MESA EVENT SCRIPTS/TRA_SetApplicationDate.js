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
  var today = new Date();
  var currentTime = new Date().getHours();

  if (currentTime >= 11)
  {
    mesaDate = mesaWorkingDays(aa.util.now(), 2);  //today + 1 days based on 4-day work-week
	today = new Date(mesaDate);
  }

  editAppSpecific("Application Date",jsDateToASIDate(today),capId)
  comment("Application Date set to: " + jsDateToASIDate(today));
}

catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}



