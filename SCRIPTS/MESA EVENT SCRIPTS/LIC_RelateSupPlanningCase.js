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
//             WTUB;Licenses!General!SpecialEvent!Application.js
// 
//==================================================================*/

try
{
  
  var numOfDays = parseInt(AInfo["Number of Event Days"]);
  
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
        //showMessage = true;
        //comment("SUP Case Number found and added as parent");
      }
      else
      { 
        showMessage = true;
        comment("A valid SUP Case No is required for Special Events over 4 days, the current SUP Case No ("+ supCaseNumber +") is not valid.");
        cancel = true;
      }

    } 
    else 
    {
      showMessage = true;
      comment("The SUP Case No is required for Special Events over 4 days");
      cancel = true;
    }

  }

}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}





