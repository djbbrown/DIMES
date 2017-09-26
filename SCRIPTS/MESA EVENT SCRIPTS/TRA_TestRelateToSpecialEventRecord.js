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
//		due to change in spec, changing from ASA/ASIUA to ASB/ASIUB
//
//
// Script Run Event: ASB / ASIUB
// Script Parents:
//             ASB:Transporation/Temporary Traffic Control/NA/NA
//             ASIUB:Transporation/Temporary Traffic Control/NA/NA
// 
//==================================================================*/


try
{

  var isSpecialEvent = AInfo["Is this a Special Event"];
  var specialEvent = AInfo["Special Event Application No."];
  var getCapResult = aa.cap.getCapID(specialEvent);
  var goodParent = false;
  var commentBlah = "";

  if (isSpecialEvent == "Yes")
  {

  if (getCapResult.getSuccess())
  {
    var seCapId = aa.cap.getCapID(specialEvent).getOutput();

    var seCapTypeStr = aa.cap.getCap(seCapId).getOutput().getCapType().toString();
    //comment("seCapTypeStr: " + seCapTypeStr);
    
    var seCapTypeArray = seCapTypeStr.split("/");
    
    if (
        ((seCapTypeArray[2] == "SpecialEvent") && (seCapTypeArray[4] == "Application")
        ||
        ((seCapTypeArray[2] == "Liquor") && (seCapTypeArray[3] == "SpecialEvent"))
       )
    {

    if ((seCapTypeStr == "Licenses/General/SpecialEvent/Application")
        || (seCapTypeStr == "Licenses/Liquor/LiquorSpecialEvent/Application"))
    {
      goodParent = true;
    }

    if (goodParent)
    {
      // do nothing, addParent on ASA event (need capID established before it can create relationship)
      //addParent("" + specialEvent);
    }
    else
    {
      if (publicUser) { showDebug=false; }
      commentBlah = "The Special Event Application No ("+specialEvent+") is not a Special Event. ";
      commentBlah = "Please enter a valid Special Event Application No.";
      showMessage = true;
      comment(commentBlah);
      cancel = true;  
    }

  }
  else
  { 
    if (publicUser) { showDebug=false; }
    commentBlah = "Please enter a valid Special Event Application No.";
    showMessage = true;
    comment(commentBlah);
    cancel = true;  
  }

  } 

}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}





