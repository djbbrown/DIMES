/*===================================================================
// Script Number: 257
// Script Name: PLN_Daycare_Handicap_Buffer.js 
// Script Developer: Raminder Gill
// Script Agency: Accela
// Script Description: If the ASI field "Type fo Application" has a value of "DayCare" then use a buffer size of 600 ft, if the value is Handicap use a buffer size of 1200 ft.
//		Prevent Application Submittal if the parcel is located within the buffer of a Planning/Group Home-Daycare/Registration/NA record
//
// Script Run Event: ASB
// Script Parents:
// ASB: Planning/Group Home/Application/NA
// 
/*==================================================================*/

//Get the tag
tagField = "" + getGISInfo("Accela/AccelaTAGS", "Accela_TAGS", "Accela_TAGS.TAG");
logDebug("tag attribute = " + tagField);

//get ASI for "Type of Application"
//var typeApp = getAppSpecific("Type of Application",capId);
var typeApp = AInfo("Type of Application");
logDebug(tagField);
logDebug(typeApp);
if(tagField == "GHDC" && typeApp == "DayCare") {
	showMessage = true;
	cancel = true;
	comment("This address is ineligible to register as a DayCare/Group Home, Please contact Planning Staff for any additional information at PlanningGroupHome@mesaaz.gov");	
}
if(tagField == "GHHF" && typeApp == "Handicap") {
	showMessage = true;
	cancel = true;
	comment("This address is ineligible to register as a DayCare/Group Home, Please contact Planning Staff for any additional information at PlanningGroupHome@mesaaz.gov");	
}
