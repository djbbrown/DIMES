/*===================================================================
// Script Number: ---
// Script Name: PMT_AddRefContactForBillingContact.js
// Script Developer: Michael VanWie
// Script Agency: Mesa
// Script Description:
//      Add/Update reference contact list when a billing contact is 
//      added to a PD Alarm, Fire or Enforcement 
//
// Script Run Event: CAA - Contact Add After
// Script Parents:
//
//          CAA;Permits!Police Department!Alarms!~
/*==================================================================*/

/* intellisense references */
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

try
{
    var contactTypesToLink = ["Billing Contact"];

    if(contactType === "Billing Contact")
    {
        createRefContactsFromCapContactsAndLink(capId, contactTypesToLink, null, false, true, comparePeopleStandard);
    }
}
catch(err)
{
    logDebug("Javascript Error: " + err.message);
    logDebug("Error Stack: " + err.stack);
}