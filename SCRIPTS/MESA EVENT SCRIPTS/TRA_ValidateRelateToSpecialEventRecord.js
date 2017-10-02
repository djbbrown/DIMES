//*===================================================================
//
// Script Number: 283
// Script Name: TRA_ValidateRelateToSpecialEventRecord.js
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
// 		When LIC number is entered into "Special Event License 
//		Application No" ASI field, Validate and relate LIC number 
//		as the parent record on ASA.
//
//		updated spec (per Mong)
//		Test if valid Special Event record type, if not
//		block submission/save and display error message
//
//		due to change in spec, changing from ASA/ASIUA to ASB/ASIUB
//
//
// Script Run Event: ASB / ASIUB
// Script Parents:
//             ASB:Transporation/Temporary Traffic Control/NA/NA
//             ASIUB:Transporation/Temporary Traffic Control/NA/NA
// 
//Revisions:
//10-02-2017: Suzanna Majchrzak: Change to include License and some code cleanup
//==================================================================*/

try
{

  var isSpecialEvent = AInfo["Is this a Special Event"];
  var specialEvent = AInfo["Special Event Application No."];
  var getCapResult = aa.cap.getCapID(specialEvent);
  var commentTxt = "";

  if (isSpecialEvent == "Yes")
  {

    if (getCapResult.getSuccess())
    {
      var seCapId = aa.cap.getCapID(specialEvent).getOutput();
      var seCapTypeStr = aa.cap.getCap(seCapId).getOutput().getCapType().toString();
      logDebug("Type: " + seCapTypeStr);
   
      if ((seCapTypeStr == "Licenses/General/SpecialEvent/Application")
          || (seCapTypeStr == "Licenses/Liquor/LiquorSpecialEvent/Application")
          || (seCapTypeStr == "Licenses/General/SpecialEvent/License"
          || (seCapTypeStr ==  "Licenses/General/LiquorSpecialEvent/License")))
      {
        logDebug("Entered a Valid Special Event Application No.")
        // do nothing, addParent on ASA event (need capID established before it can create relationship)
        //addParent("" + specialEvent);
      }
      else
      {
        showMessage = true;
        comment("Please enter a valid Special Event Application No.");
        cancel = true;  
      }

  }
  else
  { 
    if (publicUser) { showDebug=false; }
    showMessage = true;    
    comment("Please enter a valid Special Event Application No.");
    cancel = true;  
  }
  } 

}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}





