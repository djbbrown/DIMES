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
  var matchCap = aa.cap.getCap(matchCapId).getOutput();
  var rowRecordType = matchCap.getCapType().toString();

  //mkyOutput += rowPermitNo: " + rowPermitNo + "\r";
  logDebug("rowPermitNo: " + rowPermitNo);
  //mkyOutput += "matchCap: " + matchCap + "\r";
  logDebug("matchCap: " + matchCap);
  //mkyOutput += "recordType: " + recordType + "\r";
  logDebug("recordType: " + recordType);

  if (rowRecordType != "Engineering/Right of Way/NA/NA")
  {
    aa.env.setValue("ScriptReturnMessage", "ROW not found");
  }

}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}



