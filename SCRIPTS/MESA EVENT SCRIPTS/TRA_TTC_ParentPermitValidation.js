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

  if (parentPermit != "")
  {

    var matchCapId = aa.cap.getCapID(ttcPermitNo).getOutput();


    if ((matchCapId) && (capStatus(matchCapId) != "Issued"))
    {
				
      var matchCap = aa.cap.getCap(matchCapId).getOutput();
      var ttcRecordType = matchCap.getCapType().toString();

      if (ttcRecordType != "Transportation/Temporary Traffic Control/NA/NA")
      {
        showMessage = true;
        comment("The TTC Permit No is not a valid TTC Permit Number");
        cancel = true;
      }
		
    }
    else
    {
      showMessage = true;
      comment("The TTC Permit No is not valid");
      cancel = true;
    }

  }

}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}



