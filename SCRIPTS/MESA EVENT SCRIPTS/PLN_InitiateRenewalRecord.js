/*===================================================================
// Script Number: 251
// Script Name: PLN_InitiateRenewalRecord.js
// Script Developer: Michael Kniskern
// Script Agency: Mesa
// Script Description: 
	
	
When the renew button on the renewal tab or the renew license link is clicked in ACA, create the ​Planning/Group Home/Renewal/NA
record and copy any ASI information (like for like) from the Registration record to the renewal record. Set Registration Expiration Date 
to 356 days in the future.  Make the Renewal record a child of the Registration record.

// Script Run Event: ASA

// Script Parents: 

//  ASA;Planning!Group Home!Registration!NA (added by MRK 10.3.2016)
//  ASIUA;Planning!Group Home!Registration!NA (removed by MRK 10.3.2016)
//            
/*==================================================================*/

/* intellisense references */
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

try
{
    if(appMatch("Planning/Group Home/Registration/NA")) {
        //create a child record of type "Planning/Group Home/Renewal/NA" for the registration record.
        var childRenewalId = createChild("Planning", "Group Home", "Renewal", "NA", "");

        //record and copy all ASI information from the parent registration record to the new child renewal record.  
        copyASIFields(capId, childRenewalId);

        //Set the ASI field "Registration Expiration Date" of the child renewal record to 365 days (1 year) in the future from the current date 
        var childRegistrationExpDate = new Date(AInfo["Registration Expiration Date"]);
        childRegistrationExpDate.setDate(childRegistrationExpDate.getDate() + 365);

        //call jsDateToASIDate function to format registration expiration date in the mm/dd/yyyy format
        editAppSpecific("Registration Expiration Date", jsDateToASIDate(childRegistrationExpDate), childRenewalId);
    }
}
catch (err)
{
  logDebug("A JavaScript error occurred: " + err.message);
}

/* Test Record: 
     GHRG16-00222: parent record 
*/