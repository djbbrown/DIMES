
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
//==================================================================*/

function mesaWorkingDays(curDate, daysToAdd)
{
  var theDate = new Date(curDate);
  var dayOfWeek = theDate.getDay();
  var mesaFactor = parseInt((parseInt(daysToAdd/4))* 3);

  if (dayOfWeek == 4)
  {
    mesaFactor += 3;
  }

  var dayAdjustment = parseInt(daysToAdd) + mesaFactor;

  theDate = dateAdd(theDate, dayAdjustment);

  return theDate;
}