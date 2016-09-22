/*===================================================================
// Script Number: 23
// Script Name: ENF_AddViolationOrdinanceOnViolationCode.js
// Script Developer: Michael Kniskern
// Script Agency: Mesa
// Script Description: 

When ASIT is updated and on Application submittal, for each row in the ASIT "VIOLATION INFORMATION":
If the column  “Violation Code” has a value, add the appropriate text into "Violation Ordinance" from the Value Desc field (in Standard Choices Item).
 
Standard Choices Item = ENF_VIOLATION_ORDINANCE_LONG_DESC

// Script Run Event: ASA, ASIUA

// Script Parents:

//	ASA;Enforcement/Case/~/~
    ASIUA;Enforcement/Case/~/~

//            
/*==================================================================*/

/* intellisense references */
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

try
{
    if(appMatch("Enforcement/Case/*/*")) {

        //get the ASIT Violation Information table for the Record
        var originalViolationInfoTable = loadASITable("VIOLATION INFORMATION"); 

        if(originalViolationInfoTable != null && originalViolationInfoTable.length > 0) {
            //create new table that will stored the updated rows with violation ordiance
            var newViolationInfoTable = new Array();
            var standardChoicesItem = "ENF_VIOLATION_ORDINANCE_LONG_DESC";

            //loop through the violation information table
            for(count in originalViolationInfoTable) {
                var currentRow = originalViolationInfoTable[count];

                //get the violation code from current row
                var violationCode = "" + currentRow["Violation Code"];

                //get the violation ordiance by violation code using the lookup function
                var violationOrdiance = "" + lookup(standardChoicesItem, violationCode);

                //if a violation ordiance exists, update the current row
                if(violationOrdiance != null && violationOrdiance != "undefined") {
                    currentRow["Violation Ordinance"] = new asiTableValObj("Violation Ordinance", violationOrdiance, "N");
                }

                //add updated row to new violation table
                newViolationInfoTable.push(currentRow); 
            }

            //remove old violation information AST table from record 
            removeASITable("VIOLATION INFORMATION");

            //add new violation information table to the record
            addASITable("VIOLATION INFORMATION", newViolationInfoTable);
        }
    }
}
catch (err)
{
  logDebug("A JavaScript error occurred: " + err.message);
}

/* Test Record: 
     COD16-00102
*/