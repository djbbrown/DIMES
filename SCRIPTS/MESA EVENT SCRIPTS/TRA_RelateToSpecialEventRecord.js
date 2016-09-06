//*===================================================================
//
// Script Number: 283
// Script Name: TRA_RelateToSpecialEventRecord.js
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
// 		When LIC number is entered into "Special Event License 
//		Application No" ASI field, Validate and relate LIC number 
//		as the parent record on ASA.
//
// Script Run Event: ASA / ASIUA
// Script Parents:
//             ASA:Transporation/Temporary Traffic Control/NA/NA
//             ASIUA:Transporation/Temporary Traffic Control/NA/NA
// 
//==================================================================*/


try
{
  // check if parent exists
  var specialEvent = AInfo["Special Event Application No."];
  var getCapResult = aa.cap.getCapID(specialEvent);
  
  // if parent exists, addParent(parent capId)
  if (getCapResult.getSuccess())
  {
    addParent("" + specialEvent );
    //mkyOutput += "specialEvent   found: " + specialEvent + " \r";
    //logDebug("Special Event App found and added as parent");
  }
  else
  { 
    //mkyOutput += "ERROR: could not find parent specialEvent : " + specialEvent + " \r";
    //logDebug("**ERROR: could not find Special Event App (" + specialEvent + "): " + getCapResult.getErrorMessage());
  }

}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}





