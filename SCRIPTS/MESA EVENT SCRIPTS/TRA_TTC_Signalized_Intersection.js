/*===================================================================
// Script Number: 284
// Script Name: TRA_TTC_Signalized_Intersection.js
// Script Description: If Signalized Intersection ASI field is marked "Y" then send Email notification to ITS Group at Issuance.
// Script Run Event: WTUA
// Script Parents:WTUA;Transportation!~!~!~.js
// Version   |Date      |Engineer         |Details
//  1.0      |08/25/16  |Steve Veloudos   |Initial Release
/*==================================================================*/

try {
      var FromEmail = "noreply@mesaaz.gov";
      var ToEmail = "Traffic_Eng_ITS@mesaaz.gov";
      var vEParams = aa.util.newHashtable();
      var ProjectLocation;
      var RestrictionStart;
      var RestrictionEnd;
      var DailyStartTime;
      var DailyEndTime;
      var TrafficRestriction;
      var SIntersection;

       SIntersection = AInfo["Signalized Intersection"];
       if(SIntersection =="Yes")
       {
            //Get the address
            loadASITables();
            var tInfo = PROJECTLOCATIONS;
            var rowCount = PROJECTLOCATIONS.length;
            if(rowCount!=0)
                {

                for (x in tInfo) 
                    {
                    ProjectLocation = (tInfo[x]["Starting Address"] + " " + tInfo[x]["Street Direction"]+ " " + tInfo[x]["Street Name"] + " " + tInfo[x]["Street Type"]);
                    } 
                }

                //Get Restriction Start Date
                loadASITables();
                tInfo = DURATIONINFORMATION;
                rowCount = DURATIONINFORMATION.length;
                if(rowCount!=0)
                {
                    for (x in tInfo) 
                        {
                        RestrictionStart = (tInfo[x]["Restriction Start Date"]);
                        RestrictionEnd = (tInfo[x]["Restriction End Date"]);
                        DailyStartTime = (tInfo[x]["Daily Start Time"]);
                        DailyEndTime = (tInfo[x]["Daily End Time"]);
                        }                      
                }

                //Get Traffic Restrictions
                loadASITables();
                tInfo = TRAFFICRESTRICTIONINFO;
                rowCount = TRAFFICRESTRICTIONINFO.length;
                if(rowCount!=0)
                {
                    for (x in tInfo) 
                        {
                        TrafficRestriction = (tInfo[x]["Street Name"] + " " + tInfo[x]["Direction of Travel"]);
                        }                      
                }
        
               //Add Params
                addParameter(vEParams,"$$RECORDID$$",capIDString);
                addParameter(vEParams,"$$PROJECTLOCATION$$",ProjectLocation );
                addParameter(vEParams,"$$RESTRICTIONSTART$$",RestrictionStart);
                addParameter(vEParams,"$$RESTRICTIONEND$$",RestrictionEnd);
                addParameter(vEParams,"$$DAILYSTARTTIME$$",DailyStartTime);
                addParameter(vEParams,"$$DAILYENDTIME$$",DailyEndTime);
                addParameter(vEParams,"$$TRAFFICRESTRICTIONASIT$$",TrafficRestriction);          
                
                //Send email
                sendNotification(FromEmail, ToEmail, "", "TRA_TTC_SIGNALIZED_INTERSECTION", vEParams, null, capId);
       }
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }