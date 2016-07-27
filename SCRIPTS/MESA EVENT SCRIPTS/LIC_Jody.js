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
  //loadASITable("CURRENT ANIMAL INFO");
  //var tInfo = CURRENTANIMALINFO;
  //var propSize = getAppSpecific["Property Size"]; //AInfo["Property Size"];
/*
  if(propSize != null) {
	propSize = String(propSize);
    editAppSpecific("Previous Offenses", propSize);
  }
 */
   editAppSpecific("Previous Offenses", "test");
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}





