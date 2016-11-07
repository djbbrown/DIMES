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
//		updated spec (per Mong)
//		Test if valid Special Event record type, if not
//		block submission/save and display error message
//
//		** this is the create relationship piece of the puzzle (ASA)
//
//		NOTE: need to test for Special Event record on ASB and block submission if applicable
//		Need to create parent relationship on ASA, as the capID does not 
//		exist at time of ASB.
//
//
// Script Run Event: ASA
// Script Parents:
//             ASA:Transporation/Temporary Traffic Control/NA/NA
// 
//==================================================================*/


try
{
  var specialEvent = AInfo["Special Event Application No."];
  var getCapResult = aa.cap.getCapID(specialEvent);
  var goodParent = false;
  var commentBlah = "";
  
  if (getCapResult.getSuccess())
  {
    var seCapId = aa.cap.getCapID(specialEvent).getOutput();
    
    var seCapTypeStr = aa.cap.getCap(seCapId).getOutput().getCapType().toString();
    comment("seCapTypeStr: " + seCapTypeStr);
    
    if ((seCapTypeStr = "Licenses/General/SpecialEvent/Application")
        || (seCapTypeStr = "Licenses/Liquor/LiquorSpecialEvent/Application"))
    {
      goodParent = true;
    }   

    if (goodParent)
    {
      addParent("" + specialEvent);
    }

  }

}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}





