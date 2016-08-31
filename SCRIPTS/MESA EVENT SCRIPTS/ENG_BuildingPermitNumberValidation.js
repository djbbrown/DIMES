//*===================================================================
//
// Script Number: 52
// Script Name: ENG_BuildingPermitNumberValidation.js
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
// 		When a value is entered into the ASI field "Building Permit No." 
//		validate that it is the alt ID of an actual record in AA of 
//		record type Permits/*/*/*
//
// Script Run Event: ASB, ASIUB
// Script Parents:
//              ASB;Engineering!Utilities!Non City!~
//		ASIUB;Engineering!Utilities!Non City!~
// 
//==================================================================*/

try
{

  var bldPermitNo = AInfo["Building Permit No."]; //"PMT16-00511";

  if (bldPermitNo != "")
  {

    var matchCapId = aa.cap.getCapID(bldPermitNo).getOutput();


    if (matchCapId)
    {

      var matchCap = aa.cap.getCap(matchCapId).getOutput();
      var bldRecordType = matchCap.getCapType().toString();
      var bldRecordTypePieces = bldRecordType.toString().split("/");

      if (bldRecordTypePieces[0] != "Permits")
      {
        showMessage = true;
        comment("The Building Permit No is not a valid Permit Number");
        cancel = true;
      }

    }
    else
    {
      showMessage = true;
      comment("The Building Permit No is not a valid Permit Number");
      cancel = true;
    }

  }

}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}



