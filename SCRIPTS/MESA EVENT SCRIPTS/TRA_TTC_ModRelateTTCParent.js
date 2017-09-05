/*===================================================================
// Script Number: 419
// Script Name:TRA_TTC_ModRelateTTCParent.js
// Script Developer: Mong Ward
// Script Agency: Mesa
// Script Description: Maintain related records - TTC Parent permit to Modification record type.
// Script Run Event: ASA, ASIUA
// Script Parents:
//	ASA;Transportation!Temporary Traffic Control!Modification!~
//  ASIUA;Transportation!Temporary Traffic Control!Modification!~
//
// This is used in conjuction with the following:
// 	TTC_VALIDATE_TTC_PARENT (Expression)

==================================================================*/
try
{

  var ttcParent = AInfo["Parent TTC Permit #"];
  var getCapResult = aa.cap.getCapID(ttcParent);
  var goodParent = false;
  var commentBlah = "";

  
  
  if (getCapResult.getSuccess())
  {
    var seCapId = aa.cap.getCapID(ttcParent).getOutput();
    
    var seCapTypeStr = aa.cap.getCap(seCapId).getOutput().getCapType().toString();
    //comment("seCapTypeStr: " + seCapTypeStr);
    
    if ((seCapTypeStr == "Transportation/Temporary Traffic Control/NA/NA"))
    {
      goodParent = true;
    }   

    if (goodParent)
    {
      addParent("" + ttcParent);
    }
	
	 else
    {
      { showDebug=false; }
      
      commentBlah = "Please enter a valid Temporary Traffic Control parent permit number";
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