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
    today.setDate(today.getDate() + 1);
  }

  var traAppDate = today;
  comment("traAppDate: " + traAppDate);

  editAppSpecific("Application Date",jsDateToASIDate(today),capId)
  //logDebug("Application Date set to: " + jsDateToASIDate(today));
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}



