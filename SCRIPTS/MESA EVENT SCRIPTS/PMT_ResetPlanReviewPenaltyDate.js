//*===================================================================
//
// Script Number: 169
// Script Name: PMT_ResetPlanReviewPenaltyDate.js 
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
// 		This calculates the ASI Plan Review Expiration Date field
//		Trigger:  When WF task “Plans Distribution” is statused to 
//		"Revisions Received” then:  add the number of days in the 
//		ASI Turn Around Time field to today and store in ASI Plan 
//		Review Penalty Date field. 
//		The date generated should be based on a 4 day work week, 
//		Monday through Thursday, should not include Fridays, Weekends 
//		or Holidays.
//
// Script Run Event: WTUA
// Script Parents:
//              WTUA;Permits!~!~!~
// 
//==================================================================*/


function mesaWorkDays(curDate, daysToAdd)
{
  var theDate = new Date(curDate);
  var dayOfWeek = theDate.getDay();
  var mesaFactor = ((parseInt(daysToAdd/4))* 1);

  if (dayOfWeek == 4)
  {
    mesaFactor += 1;
  }

  daysToAdd += mesaFactor;

  //mkyOutput += "theDate: " + theDate + " \r";
  //mkyOutput += "dayOfWeek: " + dayOfWeek + " \r";
  //mkyOutput += "mesaFactor: " + mesaFactor + " \r";
  //mkyOutput += "daysToAdd: " + daysToAdd + " \r";

  theDate = dateAdd(theDate, daysToAdd, 'Y');
  //mkyOutput += "theDate: " + theDate + " \r";

  return theDate;
}


//(appMatch("Permits/Document Retrieval/NA/NA")) ||
//(appMatch("Permits/Commercial/NA/NA")) ||
//(appMatch("Permits/Residential/NA/NA")) ||

try
{
  if (
	(appMatch("Permits/Demolition/NA/NA")) ||
	(appMatch("Permits/Sign/NA/NA")) ||
	(appMatch("Permits/Master Plan/NA/NA")) ||	
	(appMatch("Permits/Addenda or Deferred/NA/NA"))
	)
  {    
    if ((wfTask == "Plans Distribution") && (wfStatus == "Revisions Received"))
    {
      var turnAroundTime = AInfo["Turn Around Time"];
      //var theDate = new Date(dateAdd(theDate,turnAroundTime ,'Y'));
      //var todayDate = new Date();
      //var theDate = mesaWorkingDays(todayDate,turnAroundTime);
      showMessage = true;
      //comment("todayDate: " + todayDate);
      comment("turnAroundTime: " + turnAroundTime);
      //comment("theDate: " + theDate);

      var aDate = new Date();
      //mkyOutput += "aDate: " + aDate + " \r";
      var scheduleDate = mesaWorkDays(aDate,turnAroundTime);
      //mkyOutput += "scheduleDate: " + scheduleDate + " \r";
      comment("scheduleDate: " + scheduleDate);

      editAppSpecific("Plan Review Penalty Date", jsDateToASIDate(theDate));

    }
  }
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}









