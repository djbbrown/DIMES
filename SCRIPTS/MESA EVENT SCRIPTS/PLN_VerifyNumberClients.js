/*===================================================================
// Script Number: 253
// Script Name: PLN_VerifyNumberClients
// Script Developer: Vance Smith
// Script Agency: Mesa
// Script Description: Compare values for ASI field "Number of Clients" 
// between this Renewal record and its parent Registration record.  

// If the Registration ASI field "Number of Clients" = "1 - 5" 
// but the Renewal ASI field "Number of Clients" = "6 - 10", 
// display error message to applicant "You have requested a change 
// to the Number of Clients. Please contact the City of Mesa Planning 
// Division Staff at 480-644-2385 to make changes to your Group 
// Home Registration.".

// Script Run Event: ASB, ASIUB

// Script Parents:
//	ASB;Planning!Group Home!Renewal!NA
//	ASIUB;Planning!Group Home!Renewal!NA
//            
/*==================================================================*/

/* intellisense references */
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS_ASB-80100.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

try
{
    var thisNumClients = getAppSpecific("Number of Clients");

    if ( thisNumClients == "6 - 10")
    {
        var parCapId = getParentCapID4Renewal();
        if ( parCapId != false)
        {
            
            var parNumClients = getAppSpecific("Number of Clients", parCapId);  
            logDebug(parNumClients);          
            if (parNumClients == "1 - 5")
            {
                if (publicUser) { showDebug=false; }

                logDebug("showed message");
                showMessage = true;
                comment("You have requested a change to the Number of Clients. Please contact the City of Mesa Planning Division Staff at 480-644-2385 to make changes to your Group Home Registration.");
                cancel = true;
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