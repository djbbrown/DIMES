/*===================================================================
// Script Number: 36
// Script Name: ENF_Record_Opened.js
// Script Description: Send an email to the complainant when a new record is created.
// Script Run Event: ASA
// Script Parents:ASA;Enforcement!Case!~!~
//
// Version   |Date      |Engineer         |Details
//  1.0      |08/09/16  |Steve Veloudos   |Initial Release
/*==================================================================*/

try {
      var somevalue;
      var FromEmail = "noreply@mesaaz.gov";
      var vEParams = aa.util.newHashtable();
      var theAddress = aa.address.getAddressByCapId(capId).getOutput();
      var ComDesc = AInfo["Complaint Description"];
      var Url = lookup("Agency_URL","ACA"); 

      addParameter(vEParams,"$$RECORDID$$",capIDString);
      addParameter(vEParams,"$$Address$$",theAddress);
      addParameter(vEParams,"$$ComplaintDescription$$",ComDesc);
      addParameter(vEParams,"$$URL$$",Url);
      
      var tInfo = getContactArray();
      var rowCount = tInfo.length;
      var x = 0;

      {
      //Get Email of Complainant
      for (x=0;x<=(rowCount-1);x++)
          {
          somevalue = tInfo[x]["contactType"];
          if(somevalue == "Complainant" )
             {
             var ToEmail = tInfo[x]["email"];
             }
          }
      }
      //If email has a value
      if (ToEmail.length > 0)
      {
      sendNotification(FromEmail, ToEmail, "", "ENF_RECORD_OPENED", vEParams, null, capId);
      }
    }
catch (err)
      {
	logDebug("A JavaScript Error occured: " + err.message);
      }