//*===================================================================
//
// Script Number: 256
// Script Name: PLN_SetGroupHomeAppExpirationDate.js
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
// 		When the Appication record is created; set the 
//		"expiration date" asi for 90 days in the future.
//
// Script Run Event: ASA
// Script Parents:
//             ASA:Planning/Group Home/Application/*
// 
//==================================================================*/


try
{
  var expireDate = dateAdd(null, 90);

  editAppSpecific("Expiration Date", expireDate);
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}





