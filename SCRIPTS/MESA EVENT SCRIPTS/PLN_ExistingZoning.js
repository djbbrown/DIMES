/*===================================================================
 Versions:
 9/22/2016-A	John Cheney			initial
 ---------------------------------------------------------------------
// Script Number: 237
// Script Name: PLN_ExistingZoning.js
// Script Agency: Mesa
// Script Description: 	

    On application submittal, populate the ASI fields "Overlay" and "Quarter Section" from GIS

    NOTE:  There may be more than one Overlay for a given parcel/property.  
    In this case, concatenate all Overlay values separated by a comma and space, 
    as in this example: "PAD, BIZ" (do not include quotation marks).

    FYI - code is similar to PLN_AutopopulateZoningClassification

test records: ADM16-00299

specs:
https://portal.accelaops.com/projects/Mesa/Lists/Script%20Tracker/DispForm.aspx?ID=237&Source=https%3A%2F%2Fportal%2Eaccelaops%2Ecom%2Fprojects%2FMesa%2FLists%2FScript%2520Tracker%2Factive%2Easpx 

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

//logDebug("---------- start  PLN_ExistingZoning ----------");
try
{
    // get quarter section .. expecting 1 value
	var quarters = getGISInfo("Accela/Accela_Base", "MesaQuarterSection", "QUARTERSECTION");  // use "ZONING" field for zoning info only (e.g. "RS-6") or "DSCR" (i.e. description) field for soning info plus a brief description (e.g. "RS-6 Single Residence 6")
    // avoid null
    if (!quarters) quarters = "";

    // get overlays in array
	var oversArray = getGISInfoArray("Planning/Zoning", "Overlay Districts", "OVERLAY"); // get overlay value (e.g. "PAD")

    // avoid null
    var overs = "";
    if (oversArray){
        // array converts to a comma separated string. add a space after each comma for writing to ASI field
        overs = String(oversArray);
        overs = overs.replace(",",", ");
    }

    //logDebug("-- quarters = " + quarters);
    //logDebug("-- overs = " + overs);

    editAppSpecific("Overlay", overs);
    editAppSpecific("Quarter Section", quarters);

    logDebug("PLN_ExistingZoning: Set Quarter Section=" + quarters + " and Overlay=" + overs);    

}
catch (err)
{
  logDebug("PLN_ExistingZoning - JavaScript Error: " + err.message);
  logDebug(err.stack);
}

//logDebug("---------- end  PLN_ExistingZoning ----------");