/*===================================================================
// Script Number: 40
// Script Name: ENF_CountyIslandEmail.js
// Script Description: Send an email when the parcel is in a County Island
// Script Run Event: ASA
// Script Parents:ASA;Enforcement!Case!~!~
// Testing Record: COD16-00084
// Version   |Date      |Engineer         |Details
//  1.0      |08/30/16  |Steve Veloudos   |Initial Release 
/*==================================================================*/

try {
      var FromEmail = "noreply@mesaaz.gov";
      var vEParams = aa.util.newHashtable();
      var GisFlag = 0;
      
      //Get GIS Info
      var tInfo = getGISInfoArray("Accela/Accela_Base", "NonMesaJurisdictionShaded", "NAME");

      var rowCount = tInfo.length;
      var x = 0;
      var GisValue;

        //Iterate and look for 
        for (x=0;x<=(rowCount-1);x++)
        {
             GisValue = tInfo[x];
             if(GisValue == "MARICOPA CO")
             {
                GisFlag = 1;
             }
        }

      //If Gis flag proceed
      if(GisFlag == 1)
        {
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

                //Get the contact info
                var tInfo = getContactArray();
                var rowCount = tInfo.length;
                var x = 0;

                //Get Email of Complainant
                for (x=0;x<=(rowCount-1);x++)
                    {
                        somevalue = tInfo[x]["contactType"];
                        if(somevalue == "Complainant" )
                        {
                        var ToEmail = tInfo[x]["email"];
                        }
                    }
                //Add Params
                addParameter(vEParams,"$$RECORDID$$",capIDString);
                addParameter(vEParams,"$$Address$$",theAddress);

                //If email has a value send email
                if (ToEmail != "")
                {
                sendNotification(FromEmail, ToEmail, "", "ENF_COUNTY_ISLAND", vEParams, null, capId);
                }
        }
    }
 
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }