/*===================================================================*/
// Script Number: 115
// Script Name: PMT_CMSW_Gas.js
// Script Description: Send an email if one or more parcels located in the City of Mesa/Southwest Gas Service overlap area.    
// Script Run Event: ASA
// Script Parents: ASA;Permits/Demolition/NA/NA
// ASA;Permits/Residential/NA/NA
// ASA;Permits/Commercial/NA/NA
//
// Version   |Date      |Engineer         |Details
//  1.0      |08/24/16  |Steve Veloudos   |Initial Release
/*==================================================================*/

try {
    var FromEmail = "noreply@mesaaz.gov";
    var vEParams = aa.util.newHashtable();
    var GasFlag = 0;
     
    var ToEmail = "Engineering-Gas@mesaaz.gov";
    
    //Get GIS Data
    var tInfo = getGISInfoArray("Accela/AccelaTAGS", "Accela_TAGS", "Accela_TAGS.TAG");
    var rowCount = tInfo.length;
    var x = 0;
    var TagValue;

    //Iternate for GIS Tags
    for (x=0;x<=(rowCount-1);x++)
        {
            TagValue = tInfo[x];
            
            //Check Gas Overlap
            if(TagValue == "CMSW")
            {
                GasFlag = 1;
            }
        }

      addParameter(vEParams,"$$RECORDID$$",capIDString);
      
      //Send Email For Gas
      if(GasFlag == 1)
      {
      sendNotification(FromEmail, ToEmail, "", "PMT_CMSW_GAS", vEParams, null, capId);
      }
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }