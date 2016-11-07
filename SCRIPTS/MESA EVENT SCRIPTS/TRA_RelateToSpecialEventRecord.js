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
  var specialEvent = AInfo["Special Event Application No."];
  var getCapResult = aa.cap.getCapID(specialEvent);
  var goodParent = false;
  var commentBlah = "";

  //mkyOutput += "specialEvent: "+specialEvent+" \r";
  commentBlah += "specialEvent: "+specialEvent+"";
  
  if (getCapResult.getSuccess())
  {
    //mkyOutput += "Record found \r";

    var seCapId = aa.cap.getCapID(specialEvent).getOutput();
    //mkyOutput += "seCapId: "+seCapId+" \r";

    var seCapTypeStr = aa.cap.getCap(seCapId).getOutput().getCapType().toString();
    //mkyOutput += "seCapTypeStr: "+seCapTypeStr+" \r";

    var seCapTypeArray = seCapTypeStr.split("/");
    //mkyOutput += "seCapTypeArray[2]: "+seCapTypeArray[2]+" \r";
    commentBlah += "Record Type: " + seCapTypeArray[2] + " \r";

    if (seCapTypeArray[2] == "SpecialEvent")
    {
      //goodParent = true;
    }    

    if (goodParent)
    {
      commentBlah += "addParent("+specialEvent+")";
      //addParent("" + specialEvent);
      //mkyOutput += "Special Event record type confirmed and added as parent \r";
      //comment("Special Event record type confirmed and added as parent");
    }
    else
    {
      //mkyOutput += "The Special Event Application No ("+specialEvent+") is not a Special Event. ";
      //mkyOutput += Please enter a valid Special Event Application No. \r";
      commentBlah += "The Special Event Application No ("+specialEvent+") is not a Special Event. ";
      commentBlah += "Please enter a valid Special Event Application No.";
      showMessage = true;
      comment(commentBlah);
      cancel = true;  
    }

  }
  else
  { 
    commentBlah += "The Special Event Application No is required.";
    showMessage = true;
    comment(commentBlah);
    cancel = true;  
  }  

}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}





