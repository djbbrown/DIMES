/*===================================================================*/
// Script Number: 116
// Script Name: PMT_Light_Rail.js
// Script Description: Send an email if one or more parcels located in the Light Rail Corridor.   
// Script Run Event: ASA
// Script Parents: ASA;Permits/Demolition/NA/NA
// ASA;Permits/Residential/NA/NA
// ASA;Permits/Commercial/NA/NA
// ASA;Permits/Sign/NA/NA
//
// Version   |Date      |Engineer         |Details
//  1.0      |08/24/16  |Steve Veloudos   |Initial Release
//  1.1      |08/29/16  |Steve Veloudos   |Added Std Conditions
/*==================================================================*/

try {
    var FromEmail = "noreply@mesaaz.gov";
    var vEParams = aa.util.newHashtable();
    var LightRail1Flag = 0;
    var LightRail2Flag = 0; 
    var ToEmail;
    
    //Get GIS Data
    var tInfo = getGISInfoArray("Accela/AccelaTAGS", "Accela_TAGS", "Accela_TAGS.TAG");
    var rowCount = tInfo.length;
    var x = 0;
    var TagValue;

    //Iternate for GIS Tags
    for (x=0;x<=(rowCount-1);x++)
        {
            TagValue = tInfo[x];
            
            //Check Light Rail 1
            if(TagValue == "RAIL")
            {
                LightRail1Flag = 1;
            }
            //Check Light Rail 2
            if(TagValue == "RAI2")
            {
                LightRail2Flag = 1;
            }
        }

      addParameter(vEParams,"$$RECORDID$$",capIDString);
      
      //Send Email For Light Rail 1
      if(LightRail1Flag == 1)
      {
      ToEmail = lookup("EMAIL_RECIPIENTS","RAIL");
      sendNotification(FromEmail, ToEmail, "", "PMT_LIGHT_RAIL", vEParams, null, capId);
      }

      //Send Email For Light Rail 2
      if(LightRail2Flag == 1)
      {
      ToEmail = lookup("EMAIL_RECIPIENTS","RAI2");
      sendNotification(FromEmail, ToEmail, "", "PMT_LIGHT_RAIL", vEParams, null, capId);
      }

    }
    catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }