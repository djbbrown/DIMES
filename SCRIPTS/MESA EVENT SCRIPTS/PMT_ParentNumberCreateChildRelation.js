/*===================================================================
// Script Number: 356
// Script Name: PMT_ParentNumberCreateChildRelation
// Script Developer: Vance Smith
// Script Agency: Mesa
// Script Description: If a valid PMT number is entered in the ASI 
// field "Parent PMT Number" field, relate the Permit record as a 
// child of the Parent PMT. This is for the Addenda/Deferred record type.

// Script Run Event: ASA, ASIUA

// Script Parents:
//	ASA;Permits!Addenda or Deferred!NA!NA
//	ASIUA;Permits!Addenda or Deferred!NA!NA
//            
/*==================================================================*/

/* intellisense references */
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

try
{
    // get value of Parent PMT Number
    var parentRecNumber = getAppSpecific("Parent PMT Number"); 

    if ( parentRecNumber != null )
    {
        // see if there is a record with a record id = parentRecNumber
        var tmpID = aa.cap.getCapID(parentRecNumber).getOutput(); 
        if (tmpID == null)
        { 
            // record not found
            logDebug(parentRecNumber + " record not found.");
        }
        else // valid record found
        {
            logDebug(parentRecNumber + " record was found.");

            // make the record in parentRecNumber the parent of this record
            var parCapId = getParent(); // getParents()?
            if ( parCapId == false )
            {
                logDebug("Criteria met for script.");
                logDebug("No parent record.");
                addParent(tmpID);
                logDebug(parentRecNumber + " record was made the parent of " + capIDString + ". (no parent before)");
            }
            else 
            {
                logDebug("Parent record found!");

                // see if the parent is the parent specified in fieldNow
                var parAltId = parCapId.getCapID().getAltID();
                if ( parAltId == parentRecNumber )
                {
                    logDebug(parentRecNumber + " is already the parent.");
                }
                else 
                {
                    logDebug("Criteria met for script.");
                    addParent(tmpID);
                    logDebug(parentRecNumber + " record was made the parent of " + capIDString + ". (new parent)");
                }
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