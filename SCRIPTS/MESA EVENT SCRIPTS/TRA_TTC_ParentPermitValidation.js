//*===================================================================
//
// // Script Name: TRA_TTC_ParentPermitValidation.js
// Script Developer: Mong Ward
// Script Agency: City of Mesa
// Script Description: 
// 		When a value is entered in the ASI field 
//		"Parent TTC Permit #" verify it 
//		is the altID of a record in AA of type 
//		Transportation/Temporary Traffic Control/NA/NA
//
// Script Run Event: ASB, ASIUB
// Script Parents:
//              ASB;Transportation!Temporary Traffic Control!Modification!~
//		ASIUB;Transportation!Temporary Traffic Control!Modification!~
// 
//==================================================================*/

try
{

  var parentPermit = AInfo["Parent TTC Permit #"];
  var getCapResult = aa.cap.getCapID(parentPermit);
  var commentTxt = "";

 if (getCapResult.getSuccess())
    {
      var ppCapId = aa.cap.getCapID(parentPermit).getOutput();
      var ppCapTypeStr = aa.cap.getCap(ppCapId).getOutput().getCapType().toString();
      logDebug("Type: " + ppCapTypeStr);
   
      if (ppCapTypeStr == "Transportation/Temporary Traffic Control/NA/NA")
          
      {
        logDebug("Entered a valid Temporary Traffic Control Permit Application No.")
      }
      else
      {
        showMessage = true;
        comment("**Please enter a valid Temporary Traffic Control Permit Application No.**");
        cancel = true;  
      }

  }
  else
  { 
    if (publicUser) { showDebug=false; }
    showMessage = true;    
    comment("**ERROR**Please enter a valid Temporary Traffic Control Permit Application No.**");
    cancel = true;  
  }
  

}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}



