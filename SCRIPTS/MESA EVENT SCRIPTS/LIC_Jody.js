//*===================================================================
//
// Script Number: N/A
// Script Name: LIC_Jody.js
// Script Developer: Jody Bearden
// Script Agency: City of Mesa
// Script Description: 
// 		Copy ASI field "Property Size" to ASI field "Previous Offenses"
//
// Script Run Event: ASIUA
// Script Parents:
//             ASIUA:Licenses/General/Livestock/Application
// 
//==================================================================*/

try
{
  var propSize = AInfo["Property Size"];

  if(propSize != null) {
	propSize = String(propSize);
    editAppSpecific("Previous Offenses", propSize);
  }
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}





