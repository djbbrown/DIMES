/*===================================================================*/
// Script Number: 226
// Script Name: PMT_Communications_Towers.js
// Script Description: Send an email if  parcel is in Communications Towers GIS layer.   
// Script Run Event: ASA
// Script Parents: ASA;Permits/Commercial/NA/NA
//
// Version   |Date      |Engineer         |Details
//  1.0      |08/24/16  |Steve Veloudos   |Initial Release
//  1.1      |08/29/16  |Steve Veloudos   |Added Std Condition
/*==================================================================*/

try {
    var FromEmail = "noreply@mesaaz.gov";
    var vEParams = aa.util.newHashtable();
    var ComTowersFlag = 0;
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
            
            //Check Communications Towers
            if(TagValue == "TWRS")
            {
                ComTowersFlag = 1;
            }
            
        }

      addParameter(vEParams,"$$RECORDID$$",capIDString);
      
      //Send Email For Communications Towers
      if(ComTowersFlag  == 1)
      {
      ToEmail = lookup("EMAIL_RECIPIENTS","PMT_Communication_Towers");
      sendNotification(FromEmail, ToEmail, "", "PMT_COMMUNICATIONS_TOWERS", vEParams, null, capId);
      }

    }
    catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }