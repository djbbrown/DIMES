
//*===================================================================
//
// Script Name: mesaWorkingDays.js 
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description:  
//		For future dates that are be based on a 4 day work week, 
//		Monday through Thursday, should not include Fridays, Weekends 
//		or Holidays.
// 
//		09/13/2016 - Updated to factor in today as day 1 (per customer)
//
//		10/17/2016 - Refactored due to Friday Holiday bug
//
//==================================================================*/


function mesaWorkingDays(curDate, daysToAdd)
{
  var theDate = new Date(curDate);
  var dayOfWeek = theDate.getDay();
  var fridayCount = 0;
  var x = 1;

  while (x < daysToAdd)
  {

    dayOfWeek = new Date(theDate).getDay();

    if (dayOfWeek == 4)
    {
      dayOfWeek = 0;
      fridayCount += 1;

      theDate = dateAdd(theDate, 2, 'Y');
    }
    else
    {
      theDate = dateAdd(theDate, 1, 'Y');
    }

    dayOfWeek += 1;
    x += 1;
  }

  return theDate;
}
