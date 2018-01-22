/*===================================================================
// Script Number: 366
// Script Name: ENG_SetPermitIssuedExpirationDate.js
// Script Description: 	When the workflow task Permit Issuance is set to a status 
//                      Issued, copy the status date to the ASI field Permit Issued Date and
//                      set Permit Expiration Date as follows:
//						   Engineering!Utilities!Non-City!Annual - 365days from wfDate
//						   Engineering!Utilities!Non-City!Standard - 120 days from wfDate
//						   Engineering!Right Of Way!*!* - 120 days from wfDate
//						   Engineering!Utilities!Non-City!Small Wireless Facility - 180days from wfDate
//
// Script Run Event: WTUA
// Script Parents:   WTUA;Engineering!*!*!*
//
// Version   |Date      |Engineer         |Details
//  1.0      |11/23/16  |Kevin Gurney     |Created
//           |10/03/17  |Steve Allred     |Modified expiration date for Annual permits to be Dec 31st of the current year.  
//                                         Also causing record expiration date to be updated.  SP Issue 31.
/*==================================================================*/
try {
       if (wfTask == "Permit Issuance" && wfStatus == "Issued")	{       
            //upate the custom field Permit Issued Date
            editAppSpecific("Permit Issued Date", wfDateMMDDYYYY);
			if (appMatch("Engineering/Utilities/Non-City/Annual"))	{
				//following code assumes that all Annual permits expire at the end of the year in which they are created
				var d = new Date();
				var exp_year = d.getFullYear();
				var exp_date = dateFormatted("12","31", String(exp_year));
				editAppSpecific("Permit Expiration Date", exp_date);
				licEditExpInfo("Active", exp_date); 
		    }
			if (appMatch("Engineering/Utilities/Non-City/Standard"))	{
				editAppSpecific("Permit Expiration Date", dateAdd(wfDateMMDDYYYY,120));
				licEditExpInfo("Active", dateAdd(wfDateMMDDYYYY,120)); 
			}
			if (appMatch("Engineering/Right Of Way/*/*"))	{
				editAppSpecific("Permit Expiration Date", dateAdd(wfDateMMDDYYYY,120));
				licEditExpInfo("Active", dateAdd(wfDateMMDDYYYY,120)); 
			}
			if (appMatch("Engineering/Utilities/Non-City/Small Wireless Facility"))	{
				editAppSpecific("Permit Expiration Date", dateAdd(wfDateMMDDYYYY,180));
				licEditExpInfo("Active", dateAdd(wfDateMMDDYYYY,120)); 
			}
		}                
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }