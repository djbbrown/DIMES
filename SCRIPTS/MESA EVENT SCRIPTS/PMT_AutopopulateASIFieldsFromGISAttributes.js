/*===================================================================
Versions:
9/?/2016-A            Vance Smith                                   initial
10/18/2016-A    John Cheney                                      fixed bug related to Storm Water Exempt setting
6/13/2016      Jim White                                               fixed a bug where a string was incorrectly cast
7/11/2017      Steve Allred                                      translate floodZone (which is boolean) to Yes or No
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

// ASA;Permits!Demolition!NA!NA : Zoning, Land Use, Flood Zone
// ASA;Permits!Residential!Mobile Home!NA : Flood Zone
// ASA;Permits!Sign!NA!NA : Flood Zone
// ASA;Permits!Commercial!NA!NA : Flood Zone, also make read-only; Zoning; Land Use; AZ Water; Storm Water Exempt
// ASA;Permits!Residential!NA!NA : Flood Zone, also make read-only; Zoning; Land Use; AZ Water; Storm Water Exempt
// ASA;Permits!Online!NA!NA : Flood Zone

// ASIUA;Permits!Demolition!NA!NA: Zoning, Land Use, Flood Zone
// ASIUA;Permits!Residential!Mobile Home!NA : Flood Zone
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
    comment("appTypeString: " + appTypeString);

    /* GET NEEDED GIS VALUES */

    comment("Getting 'Zoning'");
    var zoning = getGISInfo("Planning/Zoning", "Zoning Districts", "ZONING");
    if ( zoning == undefined ) { 
        comment("Zoning was undefined, setting to false");
        zoning = false; 
    }
    else
    {
        zoning = zoning.toString();
    }
    comment("zoning: " + zoning);

    comment("Getting 'Land Use'");
    var landUse = getGISInfo("Accela/Accela_Base", "GeneralPlan2040", "CharacterArea");
    if ( landUse == undefined ) { 
        comment("Land Use was undefined, setting to false");
        landUse = false; 
    }
    else
    {
      landUse = landUse.toString();
    }
    comment("landUse: " + landUse);
    
    var azWater = false;
    var stormWaterExempt = true;
    var floodZone = isInFloodZone();

    // service name / layer / field name
    tagFieldArray = getGISInfoArray("Accela/AccelaTAGS", "Accela_TAGS", "Accela_TAGS.TAG");
    if (tagFieldArray && tagFieldArray.length > 0) 
    {            
        for (x in tagFieldArray)
        {
            //comment("gis tag: " + tagFieldArray[x]);
            var thisTag = tagFieldArray[x];
                  
            if(matches(thisTag, "AWCP")) {
                comment("Getting 'AZ Water'");
                azWater = true;
                comment("azWater: " + azWater);
            }

            // storm water Exempt - jcheney 10/18/2016
            if(matches(thisTag, "STOR")) {
                comment("Found GIS tag STOR - setting stormWaterExempt = false");
                stormWaterExempt = false;
            }

        }
    }


     /* SET VALUES */

    // Zoning
    if ( zoning != false ) { 
        if ( 
            appMatch("Permits/Demolition/NA/NA") ||
            appMatch("Permits/Commercial/NA/NA") ||
            appMatch("Permits/Residential/NA/NA")
        )
        {
            comment("Updating Zoning to '" + zoning + "'");
            editAppSpecific("Zoning", zoning); 
        }
    }

    // Land Use
    if ( landUse != false ) { 
        if ( 
            appMatch("Permits/Demolition/NA/NA") ||
            appMatch("Permits/Commercial/NA/NA") ||
            appMatch("Permits/Residential/NA/NA")
        )
        {
            comment("Updating Land Use to '" + landUse + "'");
            editAppSpecific("Land Use", landUse); 
        }
    }

    // Flood Zone
    if ( 
        appMatch("Permits/Residential/Mobile Home/NA") ||
        appMatch("Permits/Sign/NA/NA") || 
        appMatch("Permits/Commercial/NA/NA") ||
        appMatch("Permits/Residential/NA/NA") ||
        appMatch("Permits/Online/NA/NA") ||
        appMatch("Permits/Demolition/NA/NA")
    )
    {
		var floodValue = "No";
		if ( floodZone != null && floodZone) {
			floodValue = "Yes";
		}
        comment("Updating Flood Zone to '" + floodValue + "'");
        editAppSpecific("Flood Zone", floodValue);
    }

    // AZ Water
    if ( 
        appMatch("Permits/Commercial/NA/NA") ||
        appMatch("Permits/Residential/NA/NA")
    )
    {
        var azValue = "No";
        if ( azWater != null && azWater){
            azValue = "Yes";
        }
        comment("Updating AZ Water to '" + azValue + "'");
        editAppSpecific("AZ Water", azValue);
    }

    // Storm Water Exempt
    if ( 
        appMatch("Permits/Commercial/NA/NA") ||
        appMatch("Permits/Residential/NA/NA")
    )
    {
        var sweValue = "No";
        if ( stormWaterExempt != null && stormWaterExempt ) {
            sweValue = "Yes";
        }
        comment("Updating Storm Water Exempt to '" + sweValue + "'"); 
        editAppSpecific("Storm Water Exempt", sweValue);
    }
}
catch (err)
{
  comment("A JavaScript error occurred: " + err.message);
}
