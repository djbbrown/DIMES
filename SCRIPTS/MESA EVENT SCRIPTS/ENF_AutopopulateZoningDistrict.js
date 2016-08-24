/*===================================================================
// Script Number: 016
// Script Name:ENF_AutopopulateZoningDistrict.js
// Script Developer: Jody Bearden
// Script Agency: Mesa
// Script Description: Autopopulate the ASI field "Zoning District" from GIS "Planning/Zoning" layer, "Zoning" attribute , using the configured GIS Map serivce. On record creation
// Script Run Event: ASA
// Script Parent(s):
//      ASA;Enforcement!Case!~!~
//             
/*==================================================================*/

try
{
	var zoning = getGISInfo("Planning/Zoning", "Zoning Districts", "ZONING");  // use "ZONING" field for zoning info only (e.g. "RS-6") or "DSCR" (i.e. description) field for soning info plus a brief description (e.g. "RS-6 Single Residence 6")
	if(zoning != null)
	{
		// auto-populate ASI "Zoning District" (Zoning field or DSCR field?)
		editAppSpecific("Zoning District", zoning);
	}
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}
