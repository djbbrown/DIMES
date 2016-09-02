/*===================================================================
// Script Number: 326
// Script Name: PMT_OnlineCommercialPropertyType.js
// Script Agency: Mesa
// Script Description: If Property Type = "Commercial" then make Type of Work = "Construction Noise Permit"
// Script Run Event: ASA
// Script Parents:
//		ASA;Permits!Online!NA!NA
//		ASIUA:Permits!Online!NA!NA
//      
// Version   |Date      |Engineer         |Details
//  1.0      |09/01/16  |Jody Bearden   |Initial Release       
/*==================================================================*/

/* test with PMT16-00518 */

try
{
	if( getAppSpecific("Property Type") == "Commercial") {
		//logDebug("Property Type -> Commercial");
		//logDebug("Setting Type of Work to Construction Noise Permit");
		editAppSpecific("Type of Work", "Construction Noise Permit");
	}
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}