//*===================================================================
// Script Number: 40
// Script Name: ENF_CountyIslandEmail.js
// Script Developer: Brian O'Dell
// Script Agency: Mesa
// Script Description: 
//                  Send an email to the contact of type "Complainant" using the email template ENF_COUNTY_ISLAND
//
// Script Run Event: ASA
// Script Parents:
//  		ASA:Enforcement/Case/NA/NA  -- this is just for testing
//
//==================================================================*


var fromEmail = "Brian.ODell@mesaaz.gov";  //"noreply@MesaAz.gov";
var emailAddress = "Brian.ODell@mesaaz.gov";  //"Lauren.Lupica@MesaAZ.gov"
var vEParams = aa.util.newHashtable();

addParameter(vEParams,"$$RECORD ID$$",capIDString);
//addParameter(vEParams,"$$The_Address$$","<address goes here>");
sendNotification(fromEmail, emailAddress, "", "ENF_COUNTY_ISLAND", vEParams, null, capId);


