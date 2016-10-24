/*===================================================================
// Script Number: 366
// Script Name: ENG_SetIssuedAndExpirationDateWhenIssued.js
// Script Developer: Vance Smith
// Script Agency: Mesa
// Script Description: When wfTask "Permit Issuance" results in "Issued":
 
1) For all Engineering permit record types (Engineering/~/~/~), set "Permit Issued Date" = today's date. 
 
2) For the Engineering/Utilities/~/~ record type, set "Permit Expiration Date" = today's date + 120 days
 
3) For the Engineering/Right of Way/~/~ record type, set "Permit Expiration Date" = today's date + 3 months.

// Script Run Event: WTUA

// Script Parents:

// ASIUA;Engineering!~!~!~
          
/*==================================================================*/

/* intellisense references */
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS_ASB-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

try
{
    logDebug("appTypeString: " + appTypeString);

    if (wfTask == "Permit Issuance" && wfStatus == "Issued")
    {
        logDebug("Criteria Met");
        var today = new Date();

        editAppSpecific_Mesa("Permit Issued Date", today);        

        if ( appMatch("Engineering/Utilities/*/*") )
        {
            editAppSpecific_Mesa("Permit Expiration Date", dateAdd(today, 120));
        }
        else if (appMatch("Permits/Right of Way/*/*"))
        {
            editAppSpecific_Mesa("Permit Expiration Date", dateAddMonths(today, 3));
        }
    }
    else
    {
        logDebug("Criteria Not Met");
    }
}
catch (err)
{
  logDebug("A JavaScript error occurred: " + err.message);
}

/* Test Record: PMT16-00413

*/