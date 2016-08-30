//*===================================================================
//
// Script Number: 51
// Script Name: ENG_RowPermitNumberValidation.js
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
// 		When a value is entered into the ASI field "ROW Permit No.", 
//		validate that is an actual record in AA of type Engineering/Right 
//		of Way/NA/NA.
//
// Script Run Event: ASB, ASIUB
// Script Parents:
//              ASB;Engineering!Utilities!Non City!~
//		ASIUB;Engineering!Utilities!Non City!~
// 
//==================================================================*/

try
{
  var rowPermitNo = AInfo["ROW Permit No."]; //"UTL16-00008";
  var matchCapId = aa.cap.getCapID(rowPermitNo).getOutput();


  if (matchCapId)
  {

    var matchCap = aa.cap.getCap(matchCapId).getOutput();
    var rowRecordType = matchCap.getCapType().toString();

    if (rowRecordType != "Engineering/Right Of Way/NA/NA")
    {
      showMessage = true;
      comment("The ROW Permit No is not of type Engineering/Right of Way");
      cancel = true;
    }

  }
  else
  {
    showMessage = true;
    comment("The ROW Permit No is not valid");
    cancel = true;
  }

}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}



