/*===================================================================
// Script Number: 136
// Script Name: PMT_CodeEnforcementNumber.js
// Script Developer: Vance Smith
// Script Agency: Mesa
// Script Description: Whenever the field "Code Enforcement Case 
// Number" has a change in value, check to see if there is a valid 
// record in the system where the record id = the value of "Code 
// Enforcement Case Number".
 
// If a record exists,
// -If not already present, add the condition to the record: 
//      Unauthorized Construction Fee
// -If not already present, add the condition to the record:  
//      Obtain Timeline of Completion
// -Using Notification Template PMT_ASSOCIATED_ENFORCEMENT_RECORD, 
//      email the code officer that a building permit application 
//      was submitted (reference the record id)
// -Make the Code case the parent of the PMT case.

// Script Run Event: ASIUA

// Script Parents:
//	ASIUA;Permits!Commercial!NA!NA
//	ASIUA;Permits!Residential!NA!NA
//	ASIUA;Permits!Residential!Mobile Home!NA
//	ASIUA;Permits!Demolition!NA!NA
//	ASIUA;Permits!Sign!NA!NA
//            
/*==================================================================*/

/* intellisense references */
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

try
{   var fieldSubGroup = "DEMOLITION";
    var fieldName = "Code Enforcement Case Number";
    var fieldNow = getAppSpecific(fieldName);
    var fieldBefore = getASIFieldValueBeforeItChanged(fieldSubGroup, fieldName);
    logDebug("fieldNow: " + fieldNow + ", fieldBefore: " + fieldBefore);

    if (fieldNow != fieldBefore) 
    {
        logDebug("Criteria met for script.");

        // see if there is a record with a record id = fieldNow
        var tmpID = aa.cap.getCapID(fieldNow).getOutput(); 
        if (tmpID == null)
        { // record not found
            logDebug("'" + fieldName + "' (" + fieldNow + ") record not found.");
        }
        else // valid record found
        {
            logDebug("'" + fieldName + "' (" + fieldNow + ") record was found.");

            // add conditions to record
            if ( !doesCapConditionExist("Unauthorized Construction Fee"))
            {
                addStdCondition("Building Permit", "Unauthorized Construction Fee");
            }
            if ( !doesCapConditionExist("Obtain Timeline of Completion"))
            {
		        addStdCondition("Building Permit", "Obtain Timeline of Completion");
            }


            // get the code officer (inspector) for this boundary          
            var codeOfficer = getInspectorObject();
            if (codeOfficer) 
            {
                logDebug("codeOfficer: " + codeOfficer.getFullName());

                // build code officer email
                var codeOfficerEmail = codeOfficer.getFirstName() + "." + codeOfficer.getLastName() + "@mesaaz.gov";

                // email the code officer
                var fromEmail = "noreply@MesaAZ.gov";
                var vEParams = aa.util.newHashtable();
                addParameter(vEParams,"$$Record ID$$", capIDString);
                addParameter(vEParams,"$$Record ID2$$", fieldNow);
                sendNotification(fromEmail, codeOfficerEmail, "", "PMT_ASSOCIATED_ENFORCEMENT_RECORD", vEParams, null, capId);
                
                logDebug("Sent email to Code Officer.");

                // make the record in fieldNow the parent of this record
                addParent(fieldNow);

                logDebug("'" + fieldName + "' (" + fieldNow + ") record was made the parent of " + capIDString + ".");
            }
            else
            {
                logDebug("Code Officer not found.");
            }
        }        
    }
    else
    {
        logDebug("Criteria not met.")
    }
}
catch (err)
{
  logDebug("A JavaScript error occurred: " + err.message);
}

/* Test Record: PMT16-00339

*/