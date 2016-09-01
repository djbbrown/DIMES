//*===================================================================
//
// Script Number: 151
// Script Name: PLN_RelatePreSubmittalNumber.js
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
//		On ASA and ASIUA if the ASI field "Pre-submittal Number" 
//		has a value, related the indicated record to the 
//		current record
//
// Script Run Event: ASA, ASIUA
// Script Parents:
//		ASA;Planning!Design Review!NA!NA.js
//		ASIUA;Planning!Design Review!NA!NA.js
// 
//==================================================================*/

try
{
  
  
  var presubNumber = AInfo["Pre-submittal Number"];

  if ((presubNumber != null) && (presubNumber != ""))
  {

    var getCapResult = aa.cap.getCapID(presubNumber);

    // if parent exists, addParent(parent capId)
    if (getCapResult.getSuccess())
    {
      addParent("" + presubNumber);
      //mkyOutput += "The Pre-Submittal Number ("+presubNumber+") was added as parent. \r";
      comment("The Pre-Submittal Number ("+presubNumber+") was not found. Please verify this is a valid number.");
    }
    else
    {
      //mkyOutput += "The Pre-Submittal Number ("+presubNumber+") was not found. Please verify this is a valid number. \r";
      showMessage = true;
      comment("The Pre-Submittal Number ("+presubNumber+") was not found. Please verify this is a valid number.");
      //cancel = true;  // uncomment if record creation/updating blocking is requested in the future
    }

  }
  else
  {
    //mkyOutput += "The Pre-Submittal Number was not entered. \r";
    //comment("The Pre-Submittal Number was not entered.");
    //cancel = true;  // uncomment if record creation/updating blocking is requested in the future
  }

}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}





