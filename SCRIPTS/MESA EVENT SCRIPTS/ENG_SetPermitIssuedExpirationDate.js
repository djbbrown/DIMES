/*===================================================================
// Script Number: 366
// Script Name: ENG_SetPermitIssuedExpirationDate.js
// Script Description: 	When the workflow task Permit Issuance is set to a status 
//                      Issued, copy the status date to the ASI field Permit Issued Date and
//                      set Permit Expiration Date as follows:
//						   Engineering!Utilities!Non-City!Annual - 365days from wfDate
//						   Engineering!Utilities!Non-City!Standard - 120 days from wfDate
//						   Engineering!Right Of Way!*!* - 180 days from wfDate
//
// Script Run Event: WTUA
// Script Parents:WTUA;Engineering!*!*!*
// Version   |Date      |Engineer         |Details
//  1.0      |11/23/16  |Kevin Gurney     |Created
/*==================================================================*/
try {
       if (wfTask == "Permit Issuance" && wfStatus == "Issued"){       
            //upate the custom field Permit Issued Date
            editAppSpecific("Permit Issued Date", wfDateMMDDYYYY);
			if (appMatch("Engineering/Utilities/Non-City/Annual")){
				editAppSpecific("Permit Expiration Date", dateAdd(wfDateMMDDYYYY,365));
		        }
			if (appMatch("Engineering/Utilities/Non-City/Standard")){
				editAppSpecific("Permit Expiration Date", dateAdd(wfDateMMDDYYYY,120));
		        }
			if (appMatch("Engineering/Right Of Way/*/*")){
				editAppSpecific("Permit Expiration Date", dateAdd(wfDateMMDDYYYY,120));
		        }
	   }                
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }