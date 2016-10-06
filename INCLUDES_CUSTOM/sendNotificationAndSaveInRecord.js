//*===================================================================
//
// Script Name: sendNotificationAndSaveInRecord.js 
// Script Developer: Vance Smith
// Script Agency: City of Mesa
// Script Description:  
//		Similar to sendNotification() except that it saves the email 
//      in the record on the communications tab.
// 
//==================================================================*/
function sendNotificationAndSaveInRecord(from, to, cc, templateName, templateParameters, fileNames)
{
    // can pass in a capId as an optional parameter
    if (arguments.length == 7) 
    {
        capId = arguments[6];
    }

    if (typeof (templateName) == "undefined" || templateName == null) 
    {
        logDebug("Could not send email. No nofification template specified.");
        return;
    }

    if (typeof (to) == "undefined" || to == null) 
    {
        to = "";
    }

    if (typeof (cc) == "undefined" || cc == null) 
    {
        cc = "";
    }

    if (typeof (fileNames) == "undefined" || fileNames == null) 
    {
        fileNames = [];
    }

    var capId4Email = aa.cap.createCapIDScriptModel(capId.getID1(), capId.getID2(), capId.getID3());

    // If we have template parameters, stuff them in a hashtable
    // so they can be passed to the template
    var emailParameters = aa.util.newHashtable();

    if (typeof (templateParameters) != "undefined" && templateParameters != null) 
    {
        for (templParamKey in templateParameters) 
        {
            var templParamValue = templateParameters[templParamKey];

            if (templParamValue == null)
            {
                templParamValue = "";
            }

            var notificationKey = "$$" + templParamKey + "$$";
            emailParameters.put(notificationKey, templParamValue);
        }
    }

    aa.document.sendEmailAndSaveAsDocument(from, to, cc, templateName, emailParameters, capId4Email, fileNames);

}