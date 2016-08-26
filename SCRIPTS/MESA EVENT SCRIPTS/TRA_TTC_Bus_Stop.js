/*===================================================================
// Script Number: 285
// Script Name: TRA_TTC_Bus_Stop.js
// Script Description: If Bus stop affected ASI field is marked "Y" then send email notification to Transit at permit issuance.
// Script Run Event: WTUA
// Script Parents:WTUA;Transportation!~!~!~.js
// Version   |Date      |Engineer         |Details
//  1.0      |08/25/16  |Steve Veloudos   |Initial Release
/*==================================================================*/

try {
      var FromEmail = "noreply@mesaaz.gov";
      var ToEmail = "transitRC365@mesaaz.gov";
      var vEParams = aa.util.newHashtable();
      var ProjectLocation;
      var RestrictionStart;
      var RestrictionEnd;
      var DailyStartTime;
      var DailyEndTime;
      var DetailedDesc;
      var BusStopDesc;
      var BusStopAffected;

       BusStopAffected = AInfo["Bus Stop Affected"];
       if(BusStopAffected =="Yes")
       {
            //Get the address
            loadASITables();
            var tInfo1 = PROJECTLOCATIONS;
            var tInfo2 = DURATIONINFORMATION;
            var rowCount = PROJECTLOCATIONS.length;
            if(rowCount!=0)
                {

                for (x in tInfo1) 
                    {
                    ProjectLocation = (tInfo1[x]["Starting Address"] + " " + tInfo1[x]["Street Direction"]+ " " + tInfo1[x]["Street Name"] + " " + tInfo1[x]["Street Type"]);
                    } 
                }

                //Get Restriction Dates & Times
                rowCount = DURATIONINFORMATION.length;
                if(rowCount!=0)
                {
                    for (x in tInfo2) 
                        {
                        RestrictionStart = (tInfo2[x]["Restriction Start Date"]);
                        RestrictionEnd = (tInfo2[x]["Restriction End Date"]);
                        DailyStartTime = (tInfo2[x]["Daily Start Time"]);
                        DailyEndTime = (tInfo2[x]["Daily End Time"]);
                        }                      
                }

                        //Get bus stop info
                        BusStopDesc = AInfo["Bus Stop Accommodation"];
                        
                        //Get record detailed desc
                        DetailedDesc = workDescGet(capId); 
                        if(DetailedDesc == null) 
                        {
                           DetailedDesc = ""; 
                        }                              
                        
                //Convert to strings
                var Plocation = String(ProjectLocation);
                var RStart = String(RestrictionStart);
                var REnd = String(RestrictionEnd);
                var DStartTime = String(DailyStartTime);
                var DEndTime = String(DailyEndTime);
                var DDesc = String(DetailedDesc);
                var BDesc = String(BusStopDesc);

               //Add Params
                addParameter(vEParams,"$$RECORDID$$",capIDString);
                addParameter(vEParams,"$$PROJECTLOCATION$$",Plocation);
                addParameter(vEParams,"$$RESTRICTIONSTART$$",RStart);
                addParameter(vEParams,"$$RESTRICTIONEND$$",REnd);
                addParameter(vEParams,"$$DAILYSTARTTIME$$",DStartTime);
                addParameter(vEParams,"$$DAILYENDTIME$$",DEndTime);
                addParameter(vEParams,"$$DETAILEDDESCRIPTION$$",DDesc);          
                addParameter(vEParams,"$$BUSSTOPACCOMODATIONDESC$$",BDesc); 

                //Send email
                sendNotification(FromEmail, ToEmail, "", "TRA_TTC_BUS_STOP", vEParams, null, capId);
       }
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }