/*===================================================================
Versions:
 9/?/2016-A	    Vance Smith			initial
 10/18/2016-A	John Cheney			fixed bug related to Storm Water Exempt setting  
 ---------------------------------------------------------------------
// Script Number: 109
// Script Name: PMT_AutopopulateASIFieldsFromGISAttributes.js
// Script Developer: Vance Smith
// Script Agency: Mesa
// Script Description: (ASI Field) Field will be "Read Only" for all
// users. Script Fields (see Record Type list for field list per 
// record type)  will be auto-filled with info from GIS  
// NOTE:  BEFORE application submit

// Script Run Event: ASA, ASIUA

// Script Parents:

// ASA;Permits!Demolition!NA!NA :  Zoning, Land Use
// ASA;Permits!Residential!Mobile Home!NA : Flood Zone
// ASA;Permits!Sign!NA!NA : Flood Zone
// ASA;Permits!Commercial!NA!NA : Flood Zone, also make read-only; Zoning; Land Use; AZ Water; Storm Water Exempt
// ASA;Permits!Residential!NA!NA : Flood Zone, also make read-only; Zoning; Land Use; AZ Water; Storm Water Exempt
// ASA;Permits!Online!NA!NA : Flood Zone

// ASIUA;Permits!Demolition!NA!NA
// ASIUA;Permits!Residential!Mobile Home!NA :  Flood Zone, Base Flood Elevation
// ASIUA;Permits!Sign!NA!NA : Flood Zone
// ASIUA;Permits!Commercial!NA!NA : Flood Zone, also make read-only; Zoning; Land Use; AZ Water; Storm Water Exempt
// ASIUA;Permits!Residential!NA!NA : Flood Zone, also make read-only; Zoning; Land Use; AZ Water; Storm Water Exempt
// ASIUA;Permits!Online!NA!NA : Flood Zone

//            
/*==================================================================*/

/* intellisense references */
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS_ASB-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

try
{
    logDebug("appTypeString: " + appTypeString);

    /* GET NEEDED GIS VALUES */

    logDebug("Getting 'Zoning'");
    var zoning = getGISInfo("Planning/Zoning", "Zoning Districts", "ZONING");
    if ( zoning == undefined ) { 
        logDebug("Zoning was undefined, setting to false");
        zoning = false; 
    }
    logDebug("zoning: " + zoning);

    logDebug("Getting 'Land Use'");
    var landUse = getGISInfo("Accela/Accela_Base", "GeneralPlan Labels", "CharacterArea");
    if ( landUse == undefined ) { 
        logDebug("Land Use was undefined, setting to false");
        landUse = false; 
    }
    logDebug("landUse: " + landUse);
    
    var azWater = false;
    var stormWaterExempt = true;
    var floodZone = isInFloodZone();

    // service name / layer / field name
    tagFieldArray = getGISInfoArray("Accela/AccelaTAGS", "Accela_TAGS", "Accela_TAGS.TAG");
    if (tagFieldArray && tagFieldArray.length > 0) 
    {            
        for (x in tagFieldArray)
        {
            //logDebug("gis tag: " + tagFieldArray[x]);

            if (IsStrInArry("AWCP", tagFieldArray)) 
            {
                logDebug("Getting 'AZ Water'");
                azWater = tagFieldArray[x];
                if ( azWater == undefined ) { 
                    logDebug("AZ Water was undefined, setting to false");
                    azWater = false; 
                }
                logDebug("azWater: " + azWater);
            }

            // storm water Exempt - jcheney 10/18/2016
            var thisTag = tagFieldArray[x];
            if(matches(thisTag, "STOR")) {
                logDebug("Found GIS tag STOR - setting stormWaterExempt = false");
                stormWaterExempt = false;
            }

        }
    }

    /* SET VALUES */

    if ( zoning != false ) { 
        if ( 
            appMatch("Permits/Demolition/NA/NA") ||
            appMatch("Permits/Commercial/NA/NA") ||
            appMatch("Permits/Residential/NA/NA")
        )
        {
            logDebug("Updating Zoning to '" + zoning + "'");
            editAppSpecific("Zoning", zoning); 
        }
    }
    if ( landUse != false ) { 
        if ( 
            appMatch("Permits/Demolition/NA/NA") ||
            appMatch("Permits/Commercial/NA/NA") ||
            appMatch("Permits/Residential/NA/NA")
        )
        {
            logDebug("Updating Land Use to '" + landUse + "'");
            editAppSpecific("Land Use", landUse); 
        }
    }
    if ( // Flood Zone
        appMatch("Permits/Residential/Mobile Home/NA") ||
        appMatch("Permits/Sign/NA/NA") || 
        appMatch("Permits/Commercial/NA/NA") ||
        appMatch("Permits/Residential/NA/NA") ||
        appMatch("Permits/Online/NA/NA") ||
        appMatch("Permits/Demolition/NA/NA")
    )
    {
        logDebug("Updating Flood Zone to '" + floodZone + "'");
        editAppSpecific("Flood Zone", floodZone);
    }
    if ( // AZ Water
        appMatch("Permits/Commercial/NA/NA") ||
        appMatch("Permits/Residential/NA/NA")
    )
    {
        var azValue = "No";
        if ( azWater != null && azWater){
            azValue = "Yes";
        }
        logDebug("Updating AZ Water to '" + azValue + "'");
        editAppSpecific("AZ Water", azValue);
    }    
    if ( // Storm Water Exempt
        appMatch("Permits/Commercial/NA/NA") ||
        appMatch("Permits/Residential/NA/NA")
    )
    {
        var sweValue = "No";
        if ( stormWaterExempt != null && stormWaterExempt ) {
            sweValue = "Yes";
        }
        logDebug("Updating Storm Water Exempt to '" + sweValue + "'"); 
        editAppSpecific("Storm Water Exempt", sweValue);
    }
}
catch (err)
{
  logDebug("A JavaScript error occurred: " + err.message);
}

/* Test Record: PMT16-00413

*/