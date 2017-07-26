/*===================================================================
// Script Number: 
// Script Name: TRA_TTC_SetPermitIssuedDate.js
// Script Description: 	When the workflow task Permit Issuance is set to a status Issued, copy the status date to the ASI field Permit Issued Date
// Script Run Event: WTUA
// Script Parents:WTUA;Transportation!Temporary Traffic Control!NA!NA
// Test Record: 
// Version   |Date      |Developer         |Details
//  1.0      |07/25/17  |Mong Ward		   |Initial Release
//  
/*==================================================================*/

try {
       if (wfTask == "Permit Issuance" && wfStatus == "Issued"){       
            //upate the custom field Permit Issued Date
            editAppSpecific("Permit Issued Date", wfDateMMDDYYYY);
		        }                
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }