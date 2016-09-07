/*===================================================================
// Script Number: 073
// Script Name: PLN_AutopopulateZoningClassification.js
// Script Developer: Jody Bearden
// Script Agency: Mesa
// Script Description: 	Auto populate the ASI field "Existing Zoning" from GIS attribute.
// Script Run Event: ASA, ASIUA
// Script Parents:
//		ASA;Planning!Admin Review!NA!NA
//		ASA;Planning!Pre-Submittal!NA!NA
//		ASA;Planning!Subdivision!NA!NA
//
//		ASIUA;Planning!Admin Review!NA!NA
//		ASIUA;Planning!Pre-Submittal!NA!NA
//		ASIUA;Planning!Subdivision!NA!NA
//
/*==================================================================*/

/* test with: ADM16-00215, ADM15-00223 */

try
{
	var zoning = getGISInfo("Planning/Zoning", "Zoning Districts", "ZONING");  // use "ZONING" field for zoning info only (e.g. "RS-6") or "DSCR" (i.e. description) field for soning info plus a brief description (e.g. "RS-6 Single Residence 6")
	if(zoning != null && zoning != false)
	{
		logDebug("Existing Zoning being updated to: " + zoning);
		ezb = getAppSpecific("Existing Zoning"); // existing zoning before setting
		logDebug("Existing Zoning (before setting): " + ezb);
		editAppSpecific("Existing Zoning", zoning);
		eza = getAppSpecific("Existing Zoning"); // existing zoning after setting
		logDebug("Existing Zoning (after setting): " + eza);
	} else {
		logDebug("No zoning returned from GIS ... Existing Zoning not being updated.");
	}
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}