//*===================================================================
//
// Script Number: 66
// Script Name: PMT_PenaltyDate.js 
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
// 		Script � when a status of �Accepted � Plan Review Req� is 
//		applied to wf task �Application Submittal� then auto-fill 
//		�Plan Review Penalty Date� ASI field with date based on 
//		the number of days identified in the Turn around time field.  
//		The date generated should not be based on a 4 day work week, 
//		Monday through Thursday, should not include Fridays, Weekends 
//		or Holidays.
//
// Script Run Event: ASA / ASIUA
// Script Parents:
//              ASA;Permits/???
//              ASIUA;Permits/???
// 
//==================================================================*/


try
{
  if (
	(appMatch("Permits/Document Retrieval/NA/NA")) ||
	(appMatch("Permits/Demolition/NA/NA")) ||
	(appMatch("Permits/Sign/NA/NA")) ||
	(appMatch("Permits/Master Plan/NA/NA")) ||
	(appMatch("Permits/Residential/NA/NA")) ||
	(appMatch("Permits/Commercial/NA/NA")) ||
	(appMatch("Permits/Addenda/NA/NA"))
	)
  {
    if ((wfTask == "Application Submittal") && (wfStatus == "Accepted - Plan Review Req"))
    {
      var turnAroundTime = AInfo["Turn Around Time"];
      var theDate = new Date();

      theDate = dateAdd(theDate,turnAroundTime ,'Y');

      editAppSpecific("Penalty Date", jsDateToASIDate(theDate));

    }
  }
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}


