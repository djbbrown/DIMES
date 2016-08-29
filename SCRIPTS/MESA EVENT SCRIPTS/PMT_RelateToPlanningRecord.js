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
//
//             ASIUA:Permits/Commercial/NA/NA
//             ASIUA:Permits/Residential/NA/NA
//             ASIUA:Permits/Signs/NA/NA
//             ASIUA:Permits/Residential/Mobile Home/NA
//             ASIUA:Permits/Addenda or Deferred/NA/NA
// 
//==================================================================*/

try
{
  // check if parent exists
  var planningNumber = AInfo["Planning Number"];
  var getCapResult = aa.cap.getCapID(planningNumber);
  
  // if parent exists, addParent(parent capId)
  if (getCapResult.getSuccess())
  {
    addParent("" + planningNumber);
    //mkyOutput += "planningNumber  found: " + planningNumber + " \r";
    logDebug("Planning Number found and added as parent");
  }
  else
  { 
    //mkyOutput += "ERROR: could not find parent planningNumber : " + planningNumber + " \r";
    logDebug("**ERROR: could not find SUP Case Number (" + planningNumber + "): " + getCapResult.getErrorMessage());
  }

}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}





