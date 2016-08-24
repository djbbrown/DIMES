/*===================================================================*/
// Script Number: 106
// Script Name: PMT_CM_Gas_Electric.js
// Script Description: Send an email if one or more parcels located in the City of Mesa Electric or Gas Service area.    
// Script Run Event: ASA
// Script Parents:ASA;Permits/Online/NA/NA
// ASA;Permits/Demolition/NA/NA
// ASA;Permits/Sign/NA/NA
// ASA;Permits/Residential/NA/NA
// ASA;Permits/Commercial/NA/NA
//
// Version   |Date      |Engineer         |Details
//  1.0      |08/23/16  |Steve Veloudos   |Initial Release
/*==================================================================*/

try {
      var FromEmail = "noreply@mesaaz.gov";
      var ToEmail;
      var vEParams = aa.util.newHashtable();
      var ElectricFlag = 0;
      var GasFlag = 0;
      var Description;
      var ContactName;
      var Address;
      var Phone = "";
      var Type;
     
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
 
      Address = hseNum + " " + streetDir + " " + streetName + " " + streetSuffix;
      }

      //Get the contact info
      var tInfo = getContactArray();
      var rowCount = tInfo.length;
      var x = 0;

      //Get Email of Complainant
      for (x=0;x<=(rowCount-1);x++)
          {
          Type = tInfo[x]["contactType"];
          if(Type == "Applicant" )
             {
                if(tInfo[x]["phone1"] != null)
                {
                 Phone = "Home: " + tInfo[x]["phone1"] +" ";
                }
                if(tInfo[x]["phone2"] != null)
                {
                  Phone = Phone + "Mobile: " + tInfo[x]["phone2"];  
                }
             ContactName = tInfo[x]["firstName"] + " " + tInfo[x]["lastName"];
             }
          }

     //Get Description
     Description = workDescGet(capId);
     
     //Get GIS Data
    var tInfo = getGISInfoArray("Accela/AccelaTAGS", "Accela_TAGS", "Accela_TAGS.TAG");
    var rowCount = tInfo.length;
    var x = 0;
    var TagValue;

    //Iternate for GIS Tags
    for (x=0;x<=(rowCount-1);x++)
        {
            TagValue = tInfo[x];
            
            //Check Gas Service
            if(TagValue == "COMG")
            {
                GasFlag = 1;
            }

            //Check Electric Service
            if(TagValue == "COME")
            {
                ElectricFlag = 1;
            }
        }

      addParameter(vEParams,"$$RECORDID$$",capIDString);
      addParameter(vEParams,"$$Address$$",Address);
      addParameter(vEParams,"$$DESCRIPTION$$",Description);
      addParameter(vEParams,"$$NAME$$",ContactName);
      addParameter(vEParams,"$$PHONE$$",Phone);

      //Send Email For Electric
      if(ElectricFlag == 1)
      {
      ToEmail = "DSCityElectricZone@MesaAZ.gov"
      sendNotification(FromEmail, ToEmail, "", "PMT_CM_ELECTRIC", vEParams, null, capId);
      }
      
      //Send Email For Gas
      if(GasFlag == 1)
      {
      ToEmail = "BSD-DevelopmentPlanning@mesaaz.gov"
      sendNotification(FromEmail, ToEmail, "", "PMT_CM_GAS", vEParams, null, capId);
      }
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }