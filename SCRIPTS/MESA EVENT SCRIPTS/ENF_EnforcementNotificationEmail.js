//*===================================================================
// Script Number: 36
// Script Name: ENF_EnforcementNotificationEmail.js
// Script Developer: Brian O'Dell
// Script Agency: Mesa
// Script Description: 
//              Send email to contact of type complaintant on record creation 
//
// Script Run Event: ASA
// Script Parents:
//      ASA:Enforcement/Case/NA/NA
//
// This script calls the notification template ENF RECORD OPENED
//==================================================================*/

var fromEmail = "noreply@MesaAz.gov";
var vEParams = aa.util.newHashtable(); 
var theAddress = aa.address.getAddressByCapId(capId).getOutput();
var emailAddress = "Brian.ODell@mesaaz.gov";

addParameter(vEParams,"$$RECORD ID$$",capIDString);
addParameter(vEParams,"$$THE ADDRESS$$",theAddress);
//emailAddress = "Brian.ODell@mesaaz.gov";
//emailAddress = "Lauren.Lupica@MesaAZ.gov";
//emailAddress = "customerinfobillingops@mesaaz.gov";
sendNotification(fromEmail, emailAddress, "", "ENF RECORD OPENED", vEParams, null, capId);