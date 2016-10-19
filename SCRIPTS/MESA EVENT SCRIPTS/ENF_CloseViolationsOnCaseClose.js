/*===================================================================
// Script Number: 323
// Script Name: ENF_CloseViolationsOnCaseClose.js
// Script Developer: Vance Smith
// Script Agency: Mesa
// Script Description: 
// From Script Tracker: When the record status for Enforcement/Case/~/~
// records is updated to 'Case Closed', update all Violations that 
// are still open on the record.
// 
// From the Spec: When a record is given the record status of 
// 'Case Closed', THEN for each row in the Violation Information 
// ASIT with 'Status' = 'Open':
//  -- Set 'Status' = 'Closed'
//  -- Set 'Date Closed' = Today's date.

// Script Run Event: ASIUA

// Script Parents:
// ASIUA;Enforcement!Case!~!~
/*==================================================================*/

/* intellisense references */
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

try
{
    // if status = "Closed" then close each Violation
    if ( capStatus == "Closed")
    {
        // get the violation information
        loadASITable("VIOLATION INFORMATION");
        var tInfo = VIOLATIONINFORMATION;
        var tInfoCount = tInfo.length;
        var newTable = new Array();
        var criteriaMet = false;
        for(var eachRow in tInfo)
        {
            var thisRow = tInfo[eachRow];

            // THEN for each row in the Violation Information 
            // ASIT with 'Status' = 'Open':
            var rowStatus = thisRow["Status"];

            if ( rowStatus == "Open" || rowStatus == "")
            {
                //  -- Set 'Status' = 'Closed'
                thisRow["Status"] = new asiTableValObj("Status", "Closed", "N");
                logDebug("Updated Violation Status to 'Closed'");

                //  -- Set 'Date Closed' = Today's date.
                thisRow["Date Closed"] = new asiTableValObj("Date Closed", getTodayAsString(), "N");
                logDebug("Updated Date Closed to '" + getTodayAsString() +"'");

                newTable.push(thisRow);
                criteriaMet = true;
            }
        }

        if (criteriaMet)
        {
            removeASITable("VIOLATION INFORMATION");
            addASITable("VIOLATION INFORMATION", newTable);
        }
    }
    else
    {
        logDebug("Criteria not met.");
    }
}
catch (err)
{
  logDebug("A JavaScript error occurred: " + err.message);
}

/* Test Record: COB16-00012

*/