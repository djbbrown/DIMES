//*===================================================================
// Script Number: ???
// Script Name: LIC_TotalAnimalPointsEmail.js
// Script Developer: Brian O'Dell
// Script Agency: Mesa
// Script Description: 
//                  This script is for testing/training purposes only
//
// Script Run Event: ASA
// Script Parents:
//  		ASIUA:Licenses/General/Livestock/Application
//
//==================================================================*


var fromEmail = "Brian.ODell@mesaaz.gov";
var emailAddress = "brian.odell@gmail.com";
var vEParams = aa.util.newHashtable();

addParameter(vEParams,"$$RECORD ID$$",capIDString);

// to me
sendNotification(fromEmail, emailAddress, "", "LIC_TESTEMAIL", vEParams, null, capId);

emailAddress = "Lauren.Lupica@MesaAZ.gov";
sendNotification(fromEmail, emailAddress, "", "LIC_TESTEMAIL", vEParams, null, capId);

emailAddress = "Steve.Veloudos@MesaAZ.gov";
sendNotification(fromEmail, emailAddress, "", "LIC_TESTEMAIL", vEParams, null, capId);
