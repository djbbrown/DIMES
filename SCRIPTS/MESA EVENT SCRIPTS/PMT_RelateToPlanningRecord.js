//*===================================================================
//
// Script Number: 209
// Script Name: PMT_RelateToPlanningRecord.js
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
// 		If a valid Planning Number is entered , then relate the 
//		Permit record as a child of the Planning record.
//
// Script Run Event: ASA / ASIUA
// Script Parents:
//             ASA:Permits/Commercial/NA/NA
//             ASA:Permits/Residential/NA/NA
//             ASA:Permits/Signs/NA/NA
//             ASA:Permits/Residential/Mobile Home/NA
//             ASA:Permits/Addenda or Deferred/NA/NA
//			   ASA:Permits/Master Plan/NA/NA
//
//             ASIUA:Permits/Commercial/NA/NA
//             ASIUA:Permits/Residential/NA/NA
//             ASIUA:Permits/Signs/NA/NA
//             ASIUA:Permits/Residential/Mobile Home/NA
//             ASIUA:Permits/Addenda or Deferred/NA/NA
//			   ASIUA:Permits/Master Plan/NA/NA
//
// DMH - added in master plan
// 
//==================================================================*/

try
{
  // check if parent exists
	if (appTypeString == "Permits/Master Plan/NA/NA")
	{
		var planningNumber = AInfo["PLN Number"];
	}	
	if ((appTypeString == "Permits/Commercial/NA/NA") ||
		(appTypeString == "Permits/Residential/NA/NA") ||
		(appTypeString == "Permits/Addenda or Deferred/NA/NA"))
	{
		var planningNumber = AInfo["Planning Number"];
	}	
	if ((appTypeString == "Permits/Sign/NA/NA") ||
		(appTypeString == "Permits/Residential/Mobile Home/NA"))
	{
		var planningNumber = AInfo["Planning Case Number"];
	}
	
	if (planningNumber && planningNumber != "") 
        {
		planningNumber = String(planningNumber).toUpperCase();
	
	  var getCapResult = aa.cap.getCapID(planningNumber);
	  
	  // if parent exists, addParent(parent capId)
	  if (getCapResult.getSuccess())
	  {
	    addParent("" + planningNumber);
	    //mkyOutput += "planningNumber  found: " + planningNumber + " \r";
	    //logDebug("Planning Number found and added as parent");
	  }
	  else
	  { 
	    logDebug("Could not find SUP Case Number (" + planningNumber + "): " + getCapResult.getErrorMessage());
	  }
	}
	// Added 9/27 per Heather Removed 9/29 per Lauren
	//else {  
	//	addAppCondition("Building Permit","Applied(Applied)","Planning Approval Letter Is Required","Planning Approval Letter is required to associate a Planning record to Building Permit.","Required");
	//}

}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}





