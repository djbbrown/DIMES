/*===================================================================
// Script Number: TBD
// Script Name: ENG_SetPermitIssuedExpirationDate.js
// Script Description: 	When the workflow task Permit Issuance is set to a status Issued, copy the status date to the ASI field Permit Issued Date and
// Script Run Event: WTUA
// Script Parents:WTUA;Engineering!*!*!*
// Version   |Date      |Engineer         |Details
//  1.0      |11/23/16  |Kevin Gurney     |Created
/*==================================================================*/

try {
       if (wfTask == "Permit Issuance" && wfStatus == "Issued"){       
            //upate the custom field Permit Issued Date
            editAppSpecific("Permit Issued Date", wfDateMMDDYYYY);
			editAppSpecific("Permit Expiration Date", dateAdd(wfDateMMDDYYYY,365));
		        }                
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }