/*===================================================================
// Script Number: 36
// Script Name: ENF_Record_Opened.js
// Script Description: Send an email to the complainant when a new record is created.
// Script Run Event: ASA
// Script Parents:ASA;Enforcement!Case!~!~
//
// Version   |Date      |Engineer         |Details
//  1.0      |08/09/16  |Steve Veloudos   |Initial Release
//  1.1      |08/10/16  |Steve Veloudos   |Adj FromEmail
/*==================================================================*/

try {
      var somevalue;
      var FromEmail = "noreply@mesaaz.gov";
      var vEParams = aa.util.newHashtable();
      var ComDesc = workDescGet(capId);
      var Url = lookup("Agency_URL","ACA"); 

      //Get the address
      var capAddResult = aa.address.getAddressByCapId(capId);
      if (capAddResult.getSuccess())
      {
      var addrArray = new Array();
      var addrArray = capAddResult.getOutput();
          if (addrArray.length==0 || addrArray==undefined)
          {
          logDebug("The current CAP has no address.")
          }
      
      //Break Out each element of the address
      var hseNum = addrArray[0].getHouseNumberStart();
      var streetDir = addrArray[0].getStreetDirection();
      var streetName = addrArray[0].getStreetName();
      var streetSuffix = addrArray[0].getStreetSuffix();
      var zip = addrArray[0].getZip();
 
      var theAddress = hseNum + " " + streetDir + " " + streetName + " " + streetSuffix;
      }

      addParameter(vEParams,"$$RECORDID$$",capIDString);
      addParameter(vEParams,"$$Address$$",theAddress);
      addParameter(vEParams,"$$ComplaintDescription$$",ComDesc);
      addParameter(vEParams,"$$URL$$",Url);
      
      //Get the contact info
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
      //If email has a value send email
      if (ToEmail != "")
      {
      sendNotification(FromEmail, ToEmail, "", "ENF_RECORD_OPENED", vEParams, null, capId);
      }
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }