//*===================================================================
//
// Script Number: 182
// Script Name: LIC_RelateSupPlanningCase.js
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
// 		On ASA and ASIUA if a value is entered into the ASI field
//		"SUP Case Number". Then relate the planning record as parent 
//		to the current record as a child
//
// Script Run Event: ASA / ASIUA
// Script Parents:
//             ASA:Licenses/General/Special Event/Application
//             ASIUA:Licenses/General/Special Event/Application
// 
//==================================================================*/

try
{
  // check if parent exists
  var supCaseNumber = AInfo["SUP Case Number"];
  var getCapResult = aa.cap.getCapID(supCaseNumber);
  
  // if parent exists, addParent(parent capId)
  if (getCapResult.getSuccess())
  {
    addParent("" + supCaseNumber);
    //mkyOutput += "supCaseNumber found: " + supCaseNumber + ", parentId: " + parentId + " \r";
    logDebug("SUP Case Number found and added as parent");
  }
  else
  { 
    //mkyOutput += "ERROR: could not find parent supCaseNumber: " + supCaseNumber + " \r";
    logDebug("**ERROR: could not find SUP Case Number (" + supCaseNumber + "): " + getCapResult.getErrorMessage());
  }

}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}





