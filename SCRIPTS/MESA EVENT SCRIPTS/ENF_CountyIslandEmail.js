//*===================================================================
// Script Number: 40
// Script Name: ENF_CountyIslandEmail.js 
// Script Developer: Brian O'Dell
// Script Agency: Mesa
// Script Description: 
//                  Send an email to the contact of type "Complainant" using the email template "ENF_COUNTY_ISLAND".
//
// Script Run Event: IRSA
// Script Parents:
//  IRSA:Enforcement/Case/NA/NA
//
//==================================================================*


var fromEmail = "noreply@MesaAz.gov";
var emailAddress = "Brian.ODell@mesaaz.gov";
var vEParams = aa.util.newHashtable();

addParameter(vEParams,"$$RECORD ID$$",capIDString);
//addParameter(vEParams,"$$CLEARANCE TO$$","Southwest Gas");
//emailAddress = "Lauren.Lupica@MesaAZ.gov";
//emailAddress = "";
sendNotification(fromEmail, emailAddress, "", "ENF_COUNTY_ISLAND", vEParams, null, capId);

