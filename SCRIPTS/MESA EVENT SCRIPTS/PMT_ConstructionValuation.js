/********** CANCELLED ***********/

/*===================================================================
// Script Number: 104
// Script Name: PMT_ConstructionValuation.js
// Script Developer: Vance Smith
// Script Agency: Mesa
// Script Description: If ASI field "Property Type" has a value of 
// "Commercial", calculate the construction Valuation using the 
// customer valuation provided in the Additional Info intake tab.

// clarified from script tracker comments:
// "as this is online/demo, use the customer valuation only (no comparison to ICC)"

// Script Run Event: ASA, ASIUA

// Script Parents:
//	ASA;Permits!Online!NA!NA 
//  ASA;Permits!Demolition!NA!NA
//	ASIUA;Permits!Online!NA!NA 
//  ASIUA;Permits!Demolition!NA!NA
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
    if (appMatch("Permits/Online/NA/NA") || appMatch("Permits/Demolition/NA/NA"))
    {
        logDebug("Found matching record type.");
        if (AInfo["Property Type"] == "Commercial")
        {
            logDebug("Found Property Type = 'Commercial'.");
            var totalValuation = Number(AInfo["Total Valuation"]);
            if (totalValuation > 0)
            {
                editAppSpecific("Total Valuation", estValue + totalValuation);
            }
            else
            {
                editAppSpecific("Total Valuation", estValue);
            }
            logDebug("Total Valuation successfully set")
        }
        else {
            logDebug("Property Type: " + AInfo["Property Type"]);
        }
    }
    else
    {
        logDebug("Matching record type not found.")
    }
	/*
    --pseudocode--    
    DONE 1) check ASI field "Property Type" for value of "Commercial"
    DONE 2) if found, get valuation from the Additional Info intake tab
    DONE 3) if found, set calculatedvalue = estValue
    */
}
catch (err)
{
  logDebug("A JavaScript error occurred: " + err.message);
}