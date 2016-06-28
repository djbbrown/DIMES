//*===================================================================
// Script Number: ???
// Script Name: ENF_TotalAnimalPointsEmail.js
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


var fromEmail = "Brian.ODell@mesaaz.gov";  //"noreply@MesaAz.gov";
var emailAddress = "Brian.ODell@mesaaz.gov";
var vEParams = aa.util.newHashtable();

addParameter(vEParams,"$$RECORD ID$$",capIDString);
//addParameter(vEParams,"$$The_Address$$","<address goes here>");
//emailAddress = "Lauren.Lupica@MesaAZ.gov";
//emailAddress = "";
sendNotification(fromEmail, emailAddress, "", "ENF_COUNTY_ISLAND", vEParams, null, capId);


