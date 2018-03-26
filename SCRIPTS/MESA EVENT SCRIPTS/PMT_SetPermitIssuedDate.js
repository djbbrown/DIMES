/*===================================================================
// Script Number: 367
// Script Name: PMT_SetPermitIssuedDate.js
// Script Description: 	When the workflow task Permit Issuance is set to a status Issued, copy the status date to the ASI field Permit Issued Date
// Script Run Event: WTUA
// Script Parents:WTUA;Permits/Addenda or Deferred/NA/NA
// Permits/Commercial/NA/NA
// Permits/Commercial/Annual Facilities/NA
// Permits/Demolition/NA/NA 
// Permits/Document Retrieval/NA/NA
// Permits/Master Plan/NA/NA
// Permits/Online/NA/NA
// Permits/Residential/Mobile Home/NA
// Permits/Residential/NA/NA
// Permits/Sign/NA/NA
// Test Record: PMT16-00947
// Version   |Date      |Engineer         |Details
//  1.0      |10/12/16  |Steve Veloudos   |Initial Release
//  1.1      |10/24/16  |Kevin Gurney     |Updated to utilize environment variables.
//  1.2      |03/22/18  |Julie Darling    |Updated to include Issued Self-Certified status
/*==================================================================*/

try {
    if (wfTask == "Permit Issuance" && (wfStatus == "Issued" || wfStatus == "Issued - Self Certified")) {       
         //upate the custom field Permit Issued Date
         editAppSpecific("Permit Issued Date", wfDateMMDDYYYY);
             }                
 }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }