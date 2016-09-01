/*===================================================================
// Script Number: 109
// Script Name: ENF_AutopopulateASIFieldsFromGISAttributes.js
// Script Developer: Vance Smith
// Script Agency: Mesa
// Script Description: (ASI Field) Field will be "Read Only" for all
// users. Script – Fields (see Record Type list for field list per 
// record type)  will be auto-filled with info from GIS  
// NOTE:  BEFORE application submit

// Script Run Event: ASB, ASIUB

// Script Parents:

// ASB;Permits!Demolition!NA!NA - Zoning, Land Use
// ASB;Permits!Residential!Mobile Home!NA - Flood Zone
// ASB;Permits!Commercial!NA!NA - Flood Zone, also make read-only; Zoning; Land Use; AZ Water; Storm Water Exempt
// ASB;Permits!Residential!NA!NA - Flood Zone, also make read-only; Zoning; Land Use; AZ Water; Storm Water Exempt

// ASIUB;Permits!Demolition!NA!NA
// ASIUB;Permits!Residential!Mobile Home!NA - Flood Zone, Base Flood Elevation
// ASIUB;Permits!Commercial!NA!NA - Flood Zone, also make read-only; Zoning; Land Use; AZ Water; Storm Water Exempt
// ASIUB;Permits!Residential!NA!NA - Flood Zone, also make read-only; Zoning; Land Use; AZ Water; Storm Water Exempt

//            
/*==================================================================*/

/* intellisense references */
/// <reference path="../../AccelaAPI.js" />
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/* reference path="../../INCLUDES_ACCELA_FUNCTIONS_ASB-80100.js" // only for asb events!! */
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

try
{
    logDebug("appTypeString: " + appTypeString);

    // get needed gis values
    logDebug("Getting 'Zoning'");
    var zoning = getGISInfo("Planning/Zoning", "Zoning Districts", "ZONING");
    if ( zoning == undefined ) { zoning = false; }
    logDebug("zoning: " + zoning);

    logDebug("Getting 'Land Use'");
    var landUse = getGISInfo("Accela/Accela_Base", "GeneralPlan Labels", "CharacterArea");
    if ( landUse == undefined ) { landUse = false; }
    logDebug("landUse: " + landUse);

    logDebug("Getting 'Flood Zone'");
    var floodZone = getGISInfo("Accela/Accela_Base", "Flood Plain Area", "TAG");
    if ( floodZone == undefined ) { floodZone = false; }
    logDebug("floodZone: " + floodZone);

    var azWater = false;
    var stormWaterExempt = false;

    // service name / layer / field name
    var tagFieldArray = getGISInfoArray("Accela/AccelaTAGS", "Accela_TAGS", "Accela_TAGS.TAG");
    if (tagFieldArray && tagFieldArray.length > 0) 
    {            
        for (x in tagFieldArray)
        {
            logDebug("gis tag: " + tagFieldArray[x]);
            if (IsStrInArry("AWCP", tagFieldArray)) 
            {
                logDebug("Getting 'AZ Water'");
                azWater = tagFieldArray[x];
                if ( azWater == undefined ) { azWater = false; }
                logDebug("azWater: " + azWater);
            }
            if (IsStrInArry("AWCP", tagFieldArray)) 
            {
                logDebug("Getting 'Storm Water'");
                stormWaterExempt = tagFieldArray[x];
                if ( stormWaterExempt == undefined ) { stormWaterExempt = false; }
                logDebug("stormWaterExempt: " + stormWaterExempt);
            }
        }
    }

    if ( zoning && zoning != undefined ) { 
        if ( 
            appMatch("Permits/Demolition/NA/NA") ||
            appMatch("Permits/Commercial/NA/NA") ||
            appMatch("Permits/Residential/NA/NA")
        )
        {
            editAppSpecific("Zoning", zoning); 
            logDebug("Zoning updated to '" + zoning + "'");
        }
    }
    if ( landUse ) { 
        if ( 
            appMatch("Permits/Demolition/NA/NA") ||
            appMatch("Permits/Commercial/NA/NA") ||
            appMatch("Permits/Residential/NA/NA")
        )
        {
            editAppSpecific("Land Use", landUse); 
            logDebug("Land Use updated to '" + landUse + "'");
        }
    }
    //if ( floodZone ) { // NOTE: turns out this is a boolean, so always write if the correct record type
        if ( 
            appMatch("Permits/Residential/Mobile Home/NA") ||
            //appMatch("Permits/Sign/NA/NA") || // removed cause there is no "Flood Zone" in Permits/Sign/NA/NA
            appMatch("Permits/Commercial/NA/NA") ||
            appMatch("Permits/Residential/NA/NA")
        )
        {
            editAppSpecific("Flood Zone", floodZone);
            logDebug("Flood Zone updated to '" + floodZone + "'");
        }
    //}
    //if ( azWater ) { // NOTE: turns out this is a boolean, so always write if the correct record type
        if ( 
            appMatch("Permits/Commercial/NA/NA") ||
            appMatch("Permits/Residential/NA/NA")
        )
        {
            editAppSpecific("AZ Water", azWater); 
            logDebug("AZ Water updated to '" + azWater + "'");
        }
    //}
    //if ( stormWaterExempt ) { // NOTE: turns out this is a boolean, so always write if the correct record type
        if ( 
            appMatch("Permits/Commercial/NA/NA") ||
            appMatch("Permits/Residential/NA/NA")
        )
        {
            editAppSpecific("Storm Water Exempt", stormWaterExempt);
            logDebug("Storm Water Exempt updated to '" + stormWaterExempt + "'"); 
        }
    //}

    /* pseudocode

    1) check record type to know what fields need to be autopopulated
    2) get gis data
    3) edit fields

    */
}
catch (err)
{
  logDebug("A JavaScript error occurred: " + err.message);
}

/* Test Record: 

*/