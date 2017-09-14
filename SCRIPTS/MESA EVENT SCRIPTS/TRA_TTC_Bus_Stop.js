/*===================================================================
// Script Number: 285
// Script Name: TRA_TTC_Bus_Stop.js
// Script Description: If Bus stop affected ASI field is marked "Y" then send email notification to Transit at permit issuance.
// Script Run Event: WTUA
// Script Parents:WTUA;Transportation!~!~!~.js
// Version   |Date      |Engineer         |Details
//  1.0      |08/25/16  |Steve Veloudos   |Initial Release
//  1.1      |08/29/16  |Steve Veloudos   |Added Std Choice
//  1.2      |10/26/16  |Steve Veloudos   |Added workflow and address per Mong
/*==================================================================*/

try {
      var FromEmail = "noreply@mesaaz.gov";
      var ToEmail = lookup("EMAIL_RECIPIENTS","Transit");
      var vEParams = aa.util.newHashtable();
      var RestrictionStart;
      var RestrictionEnd;
      var DetailedDesc;
      var BusStopDesc;
      var BusStopAffected;
      var Address;
      var PermitIssued = 0;
      
      //Find the workflow
      if (wfTask == "Permit Issuance" && wfStatus == "Issued")
      {
       PermitIssued = 1;
      }

       BusStopAffected = AInfo["Bus Stop Affected"];
       if(BusStopAffected =="Yes")
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

            Address = hseNum + " " + streetDir + " " + streetName + " " + streetSuffix;
            }
                        
            RestrictionStart =  AInfo["Permit Start Date"];
            RestrictionEnd =  AInfo["Permit Expiration Date"];

            //Get bus stop info
            BusStopDesc = AInfo["Bus Stop Accommodation"];
                        
            //Get record detailed desc
            DetailedDesc = workDescGet(capId); 
            if(DetailedDesc == null) 
            {
                DetailedDesc = ""; 
            }                              
                        
            //Convert to strings
            var RStart = String(RestrictionStart);
            var REnd = String(RestrictionEnd);
            var DDesc = String(DetailedDesc);
            var BDesc = String(BusStopDesc);

            //Add Params
            addParameter(vEParams,"$$ADDRESS$$",Address);
            addParameter(vEParams,"$$RECORDID$$",capIDString);
            addParameter(vEParams,"$$RESTRICTIONSTART$$",RStart);
            addParameter(vEParams,"$$RESTRICTIONEND$$",REnd);
            addParameter(vEParams,"$$DETAILEDDESCRIPTION$$",DDesc);
            addParameter(vEParams,"$$BUSSTOPACCOMODATIONDESC$$",BDesc); 

            //Send email
            if(PermitIssued == 1)
            {
            sendNotification(FromEmail, ToEmail, "", "TRA_TTC_BUS_STOP", vEParams, null, capId);
            }
       }
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }