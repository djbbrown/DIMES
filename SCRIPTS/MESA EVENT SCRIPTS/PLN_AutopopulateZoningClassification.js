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

/* test with: ZON17-00305  */

try
{
	var zoning_districts = getGISInfoArray("Planning/Zoning", "Zoning Districts", "ZONING");
	
	if(zoning_districts == undefined)
	{
		zoning_districts = [];
	}

	// convert to a comma(plus space)-separated string
	zoning_districts = zoning_districts.join(", ");

	if(zoning_districts != "")
	{
		logDebug("Existing Zoning being updated to: " + zoning_districts);
		ezb = getAppSpecific("Existing Zoning"); // existing zoning before setting
		logDebug("Existing Zoning (before setting): " + ezb);
		editAppSpecific("Existing Zoning", zoning_districts);
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