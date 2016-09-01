//*===================================================================
//
// Script Number: 182
// Script Name: LIC_RelateSupPlanningCase.js
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
//		(updated criteria)
//		If "Number of Event Days" (ASI) is more than 4, then require 
//		a valid "SUP Case No" (ASI) before License Application (Workflow Task) 
//		can be gien a status of Submitted. If valid, relate the
//		SUP Case No as a parent
//
// Script Run Event: WTUB
// Script Parents:
//             WTUB;License!General!SpecialEvent!Application.js
// 
//==================================================================*/

try
{
  
  var numOfDays = parseInt(AInfo["Number of Event Days"]);
  numOfDays = 5;
  //mkyOutput += "numOfDays: " + numOfDays + " \r";

  if ((wfTask == "License Application")
        && (wfStatus == "Submitted")
        && (numOfDays > 4))
  {

    var supCaseNumber = AInfo["SUP Case Number"];

    if (supCaseNumber != "")
    {

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
        //mkyOutput += "The SUP Case No " + supCaseNumber + " is not a valid Case No \r";
        showMessage = true;
        comment("The SUP Case No is required for Special Events over 4 days");
        cancel = true;
        //logDebug("The SUP Case No " + supCaseNumber + " is not a valid Case No");
      }

    } 
    else 
    {
      //mkyOutput += "The SUP Case No is required for Special Events over 4 days";
      showMessage = true;
      comment("The SUP Case No is required for Special Events over 4 days");
      cancel = true;
      //logDebug("The SUP Case No is required for Special Events over 4 days");  
    }

  }

}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}





