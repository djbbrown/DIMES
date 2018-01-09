/*===================================================================
// Script Name: ASA;Engineering!Utilities!Non City!Small Wireless Facility.js
==================================================================*/
//adding publicUser criteria check to execute scripts based on AA or ACA
if(publicUser){
   //Send Email Notification for SWF
   include("ENG_UTL_SWF_EMail");

   //Set Workflow task Due Date
   include ("ENG_UTL_SWF_Received");
}