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
var emailAddress;

tagFieldArray = getGISInfoArray("Accela/AccelaTAGS", "Accela_TAGS", "Accela_TAGS.TAG");
if (tagFieldArray && tagFieldArray.length > 0) {
   for (tIndex in tagFieldArray) {
		thisTag = tagFieldArray[tIndex];
		logDebug(thisTag);
		if(thisTag == "SIGB")
		{
				logDebug("Parcel found to be within "+thisTag+" sending email");
				addParameter(vEParams,"$$RECORD ID$$",capIDString);
				emailAddress = lookup("EMAIL_RECIPIENTS","Signal_Butte");
				fromAddress = "noreply@mesaaz.com";
				sendNotification(fromAddress, emailAddress, "", "SIGNAL BUTTE", vEParams, null);

				userAssign = lookup("ASSIGN_USER_GROUP_LOOKUP","ENGINEERING_USER");				
				addAdHocTask("WFADHOC_PROCESS", "Engineering Review", "Note: Parcel exists in Signal Butte GIS layer",userAssign );
		}
	}
}