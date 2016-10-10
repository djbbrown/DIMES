/*===================================================================
// Script Number: TBD
// Script Name: PMT_Email_Residential_DocUpload.js
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: test
// Script Run Event: DUA
// Script Parents:
//   DUA:
/*==================================================================*/
//Test email document upload

//Get Notification Template information
var tmpl = aa.communication.getNotificationTemplate("PMT_RESIDENTIAL_DOCUMENT_UPLOAD").getOutput();
var ebody = tmpl.getEmailTemplateModel().getContentText();
var esub = tmpl.getEmailTemplateModel().getTitle();
var efrom = tmpl.getEmailTemplateModel().getFrom();

//create has table for record information
var vEParams = aa.util.newHashtable(); 
vEParams.put("$$altid$$", capIDString);

if (currentUserID == "KGURNEY") {
	sendNotification(efrom, "kgurney@accela.com", "", "PMT_RESIDENTIAL_DOCUMENT_UPLOAD", vEParams, null, capId);
}