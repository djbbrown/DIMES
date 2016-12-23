/*===================================================================
// Script Name: WTUA;Licenses!Liquor!~!Application.js
==================================================================*/
include("LIC_AppealDeadlineDateSet");

if (matches(appTypeArray[2], "ExtensionOfPremise-Permanent", "ExtensionOfPremise-Temporary", "LiquorSpecialEvent"))
{
include("LIC_AdministrativeReviewDueDateSet"); // sets date to +10 days
}


// include("LIC_AdjustAdministrativeReviewDueDate"); // Fix for 161
include("LIC_CreateLicenseRecord"); // Added by Kevin Gurney