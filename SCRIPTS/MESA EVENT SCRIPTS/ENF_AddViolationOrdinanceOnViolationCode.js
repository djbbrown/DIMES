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
    ASA;Enforcement/Environmental/~/~
    ASIUA;Enforcement/Environmental/~/~

//            
/*==================================================================*/

/* intellisense references */
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

try
{
    //MRK - 9.27.2016 - added "Enforcement/Environmental/*/*" to the record type check 
    var isEnforcementCase = appMatch("Enforcement/Case/*/*");
    var isEnforcementEnv = appMatch("Enforcement/Environmental/*/*");
    var recordType = matchCap.getCapType().toString();
	logDebug("Record Type: " + recordType);
    
	if(isEnforcementCase || isEnforcementEnv) {

        //get the ASIT Violation Information table for the Record
        var originalViolationInfoTable = loadASITable("VIOLATION INFORMATION"); 

        if(originalViolationInfoTable != null && originalViolationInfoTable.length > 0) {
            logDebug("loaded ASIT");
			//create new table that will stored the updated rows with violation ordiance
            var newViolationInfoTable = new Array();
            var standardChoicesItem = "ENF_VIOLATION_ORDINANCE_LONG_DESC";

            //MRK 11.30.2016 - removed the record type check if statement because both type of records are going to use the same 
            //standard choice item

            //loop through the violation information table
            for(count in originalViolationInfoTable) {
                var currentRow = originalViolationInfoTable[count];

                //get the violation code from current row
                var violationCode = "" + currentRow["Violation Code"];

                //get the violation ordiance/detail by violation code using the lookup function
                var violationOrdinance = "" + lookup(standardChoicesItem, violationCode);
				logDebug("Ordinance:" + violationOrdinance);
                //MRK - 11.30.2016 - ASI field "Violation Detail" for Enforcement/Environmental/*/* record has be replaced by
                //"Violation Ordinance", the same as Enforcement/Case/*/* records.  Modified code to remove the record check

                //if a violation ordiance exists, update the appropriate column in the current row
                if(violationOrdinance != null && violationOrdinance != "undefined") {
                    currentRow["Violation Ordinance"] = new asiTableValObj("Violation Ordinance", violationOrdinance, "N");
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
     COD16-00102 - Enforcement/Case
     - Enforcement/Environmental
*/