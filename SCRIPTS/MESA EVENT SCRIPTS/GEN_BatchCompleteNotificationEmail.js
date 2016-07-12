//*===================================================================
// Script Number: 000
// Script Name: GEN_BatchCompleteNotificationEmail.js
// Script Developer: Brian O'Dell
// Script Agency: Mesa
// Script Description: 
//              Send email to group once a batch job completes (use for testing/configuring) 
//
// Script Run Event: ASA
// Script Parents:
//      ASA:Enforcement/Case/NA/NA
//
// This script calls the notification template ENF RECORD OPENED
//==================================================================*/

var vEParams = aa.util.newHashtable();
var fromEmail = "Brian.ODell@MesaAz.gov";
var emailAddress = "Brian.ODell@mesaaz.gov";

sendNotification(fromEmail, emailAddress, "", "GEN Batch Job Complete", vEParams, null, capId);

fromEmail = "Vance.Smith@MesaAz.gov";
emailAddress = "Vance.Smith@mesaaz.gov";
sendNotification(fromEmail, emailAddress, "", "GEN Batch Job Complete", vEParams, null, capId);

