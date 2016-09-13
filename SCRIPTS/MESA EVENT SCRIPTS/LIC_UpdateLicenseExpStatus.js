//*===================================================================
//
// Script Number: 49
// Script Name: LIC_UpdateLicenseExpStatus
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
// 		Updated Criteria/Clarification: when the License Workflow 
//		task “License Status” is given a status of “Expired”, 
//		“Inactive”, or “Revoked” then change the Expiration Status 
//		to “Inactive”. Expiration Status field is on the Renewal 
//		Info tab.
//
// Script Run Event: WTUA
// Script Parents:
//              WTUA;Licenses!~!~!License
// 
//==================================================================*/


try
{

  if (
      (wfTask == "License Status") 
      && 
      ((wfStatus == "Revoked") || (wfStatus == "Inactive") || (wfStatus == "Expired"))
     )
  {
    licEditExpInfo("Inactive");
    comment("License Exp Info updated to 'Inactive'");
  }

}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}









