/*===================================================================
// Script Number: 105
// Script Name: PMT_Parcel_51.js
// Script Description: Send an email when permit contains one or more parcels located in Parcel 51.
// Script Run Event: ASA
// Script Parents:ASA;Permits!Online!~!~
// ASA;Permits!Demolition!~!~
// ASA;Permits!Sign!~!~
// ASA;Permits!Residential!~!~
// ASA;Permits!Commercial!~!~
// Version   |Date      |Engineer         |Details
//  1.0      |08/09/16  |Steve Veloudos   |Initial Release
/*==================================================================*/

try {
      var FromEmail = "noreply@mesaaz.gov";
      var ToEmail = "BSD-DevelopmentPlanning@mesaaz.gov";
      var vEParams = aa.util.newHashtable();
      var ComDesc = workDescGet(capId);
      var GISData;
      var Parcel51 = 0;

      //Get the GIS data
      GISData  = getGISInfoArray("Accela/AccelaTAGS", "Accela_TAGS", "Accela_TAGS.TAG");
      var rowCount = GISData.length;
      var x = 0;
      
      //Iterate through GIS data
      for (x=0;x<=(rowCount-1);x++)
        {
        var FirstTwo = GISData[x].substring(0, 2);
            //Check for 51
            if(FirstTwo = "51")
                {
                    Parcel51 = 1;
                }
        }

      addParameter(vEParams,"$$RECORDID$$",capIDString);

      //If Parcel 51 send email
      if (Parcel51 == 1)
        {
        sendNotification(FromEmail, ToEmail, "", "PMT_PARCEL_51", vEParams, null, capId);
        }
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }