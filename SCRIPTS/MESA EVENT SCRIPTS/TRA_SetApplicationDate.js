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
    //Sunday thru Wednesday - Next day
	if ((today.getDay(mesaWorkingDays) == 0) || (today.getDay(mesaWorkingDays) == 1) || (today.getDay(mesaWorkingDays) == 2) || (today.getDay(mesaWorkingDays) == 3)) 
	{
	today.setDate(today.getDate(mesaWorkingDays) + 1);
	}
	
	//Thursday add 4 days to get to Monday
	else if (today.getDay(mesaWorkingDays) == 4) 
	{
		today.setDate(today.getDate(mesaWorkingDays) + 4);
	}
	
	//Friday add 3 days to get to Monday
	else if (today.getDay(mesaWorkingDays) == 5) 
	{
		today.setDate(today.getDate(mesaWorkingDays) + 3);
	}
	// Saturday add 2 days to get to Monday
	if (today.getDay(mesaWorkingDays) == 6) 
	{
		today.setDate(today.getDate(mesaWorkingDays) + 2);
	} 
	

  }

  editAppSpecific("Application Date",jsDateToASIDate(today),capId)
  comment("Application Date set to: " + jsDateToASIDate(today));
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}



