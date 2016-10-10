/*===================================================================
// Script Number: 130
// Script Name: PMT_Issued_FloodCondition.js
// Script Developer: Vance Smith
// Script Agency: Mesa
// Script Description: if record is in a flood plain
 
    Add conditions:
    - Footing/Foundation Elevation
    - Elevation Certificate

// Script Run Event: ASA

// Script Parents:
//	ASA;Permits!~!~!~ 
//            
/*==================================================================*/

/* intellisense references */
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

try
{
    // see if record is in a flood plain
    if ( isInFloodZone() )
    {
        logDebug("record is in flood plain")
        if ( doesCapConditionExist("Footing/Foundation Elevation" == false))
        {
            addStdCondition("Building Permit", "Footing/Foundation Elevation");
        }
        if ( doesCapConditionExist("Elevation Certificate" == false))
        {
            addStdCondition("Building Permit", "Elevation Certificate");
        }        
        logDebug("added conditions (if necessary)")
    }
    else
    {
        logDebug("Not in flood plan");
    }
}
catch (err)
{
  logDebug("A JavaScript error occurred: " + err.message);
}

/* Test Record: PMT16-00428

*/