/*===================================================================
// Script Number: 073
// Script Name: PLN_AutopopulateZoningClassification.js
// Script Developer: Jody Bearden
// Script Agency: Mesa
// Script Description: 	
Auto populate the ASI field "Existing Zoning" from GIS attribute.
// Script Run Event: ASA
// Script Parents:
//		ASA;Planning!~!~!~
//             
/*==================================================================*/

try
{
	var zoning = getGISInfo("Planning/Zoning", "Zoning Districts", "ZONING");  // use "ZONING" field for zoning info only (e.g. "RS-6") or "DSCR" (i.e. description) field for soning info plus a brief description (e.g. "RS-6 Single Residence 6")
	if(zoning != null)
	{
		editAppSpecific("Existing Zoning ", zoning);
	}
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}