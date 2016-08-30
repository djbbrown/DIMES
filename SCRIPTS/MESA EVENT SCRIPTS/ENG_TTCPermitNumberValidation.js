//*===================================================================
//
// Script Number: 53
// Script Name: ENG_TTCPermitNumberValidation.js
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
// 		When a value is entered in the ASI field 
//		"Temporary Traffic Control Permit No" verify it 
//		is the altID of a record in AA of type 
//		Engineering/Temp Traffic Control/*/*
//
// Script Run Event: ASB, ASIUB
// Script Parents:
//              ASB;Engineering!Utilities!Non City!~
//		ASIUB;Engineering!Utilities!Non City!~
// 
//==================================================================*/

try
{

  var ttcPermitNo = AInfo["Temporary Traffic Control Permit No."];

  if (ttcPermitNo != "")
  {

    var matchCapId = aa.cap.getCapID(ttcPermitNo).getOutput();


    if (matchCapId)
    {

      var matchCap = aa.cap.getCap(matchCapId).getOutput();
      var rowRecordType = matchCap.getCapType().toString();

      if ((rowRecordType != "Transportation/Temporary Traffic Control/Modification/NA") &&
	(rowRecordType != "Transportation/Temporary Traffic Control/NA/NA"))
      {
        showMessage = true;
        comment("The TTC Permit No is not of type Engineering/Temp Traffic Control");
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



