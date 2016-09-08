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
      
      


      editAppSpecific("Plan Review Penalty Date", jsDateToASIDate(theDate));

    }
  }
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}









