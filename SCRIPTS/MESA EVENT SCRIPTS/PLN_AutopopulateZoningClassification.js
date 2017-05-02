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

/* test with: ADM17-00163 */

try
{
	var zoning_districts = getGISInfoArray("Planning/Zoning", "Zoning Districts", "ZONING");
	var overlay_districts = getGISInfoArray("Planning/Zoning", "Overlay Districts", "OVERLAY");
	
	if(zoning_districts == undefined)
	{
		zoning_districts = [];
	}
	
	// same as above, but for overlays
	if(overlay_districts == undefined)
	{
		overlay_districts = [];
	}
	
	// combine arrays into a single one, and convert to a comma(plus space)-separated string
	var zoning_overlay = zoning_districts.concat(overlay_districts);
	zoning_overlay = zoning_overlay.join(", ");

/*	
	if(zoning_overlay != "")
	{
		logDebug("Existing Zoning being updated to: " + zoning_overlay);
		ezb = getAppSpecific("Existing Zoning"); // existing zoning before setting
		logDebug("Existing Zoning (before setting): " + ezb);
		editAppSpecific("Existing Zoning", zoning_overlay);
		eza = getAppSpecific("Existing Zoning"); // existing zoning after setting
		logDebug("Existing Zoning (after setting): " + eza);
	} else {
		logDebug("No zoning returned from GIS ... Existing Zoning not being updated.");
	}
*/
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}