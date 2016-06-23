/*===================================================================
// Script Number: 102
// Script Name: PMT_GasClearanceEmail.js 
// Script Developer: Raminder Gill
// Script Agency: Accela
// Script Description: On app submittal, if parcel exists in Signal Butte GIS layer 
//        then… Add Ad-Hoc Wf task “Engineering Review and send email notification.
// Script Run Event: IRSA
// Script Parents:
// ASA: Permits/Demolition/NA/NA 
// ASA: Permits/Sign/NA/NA 
// ASA: Permits/Residential/NA/NA
// ASA: Permits/Residential/Mobile Home/NA/NA
// ASA: Permits/Commercial/NA/NA
/*==================================================================*/

 
var vEParams = aa.util.newHashtable(); 

// Signal Butte tag
tagField = "" + getGISInfo("Accela/AccelaTAGS", "Accela_TAGS", "Accela_TAGS.TAG");
logDebug("tag attribute = " + tagField);
if (tagField == "SIGB") {
	addParameter(vEParams,"$$RECORD ID$$",capIDString);
	emailAddress = "Joel.Watson@mesaaz.gov";
	sendNotification("", emailAddress, "", "SIGNAL BUTTE", vEParams, null);
	addAdHocTask("WFADHOC_PROCESS", "Engineering Review", "Note: Parcel exists in Signal Butte GIS layer");
}
	
