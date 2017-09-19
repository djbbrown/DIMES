/*===================================================================
// Script Number: 284
// Script Name: TRA_TTC_Signalized_Intersection.js
// Script Description: If Signalized Intersection ASI field is marked "Y" then send Email notification to ITS Group at Issuance.
// Script Run Event: WTUA
// Script Parents:WTUA;Transportation!~!~!~.js
// Version   |Date      |Engineer         |Details
//  1.0      |08/25/16  |Steve Veloudos   |Initial Release
//  1.1      |08/29/16  |Steve Veloudos   |Added Std Condition 
//  1.2      |10/26/16  |Steve Veloudos   |Added workflow and address per Mong
/*==================================================================*/

try {
      var FromEmail = "noreply@mesaaz.gov";
      var ToEmail = lookup("EMAIL_RECIPIENTS","ITS_Group");
      var vEParams = aa.util.newHashtable();
      var RestrictionStart;
      var RestrictionEnd;
      var TrafficRestriction = "";
      var SigIntersection;
	  var Intersection = AInfo["Intersection"];
      var Address;
      var PermitIssued = 0;
	  var PermitExtended = 0;
	 

      //Find the workflow
       if (wfTask == "Permit Issuance" && wfStatus == "Issued")
      {
       PermitIssued = 1;
      }
	  
	  if (wfTask == "Inspections" && wfStatus == "Extend Permit")
      {
       PermitExtended = 1;
      }
           
       SigIntersection = AInfo["Signalized Intersection"];
       if(SigIntersection =="Yes")
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

            //Get Traffic Restrictions
            loadASITables();
            tInfo = ROADWAYRESTRICTIONINFO;
            rowCount = ROADWAYRESTRICTIONINFO.length;
            if(rowCount!=0)
            {
                for (x in tInfo) 
                    {
                    //Put one line for each row of data
                    TrafficRestriction = TrafficRestriction + " " + (tInfo[x]["Street Name"] + " " + tInfo[x]["Direction of Travel"] + " " + tInfo[x]["No. of Lanes Closed in this Direction"] + " " + tInfo[x]["Lane Type"] + " " + tInfo[x]["Notes"]);
                    }
            }
            
            //Convert to strings
            var RStart = String(RestrictionStart);
            var REnd = String(RestrictionEnd);
            var TRestriction = String(TrafficRestriction);
			var IntersectionFld = String(Intersection);
            
            //Add Params
            addParameter(vEParams,"$$RECORDID$$",capIDString);
            addParameter(vEParams,"$$RESTRICTIONSTART$$",RStart);
            addParameter(vEParams,"$$RESTRICTIONEND$$",REnd);
            addParameter(vEParams,"$$ADDRESS$$",Address);
			addParameter(vEParams,"$$INTERSECTION$$",IntersectionFld);
            addParameter(vEParams,"$$TRAFFICRESTRICTIONASIT$$",TRestriction);
						
            
            //Send email
            if(PermitIssued == 1 || PermitExtended == 1)
            {
            sendNotification(FromEmail, ToEmail, "", "TRA_TTC_SIGNALIZED_INTERSECTION", vEParams, null, capId);
            }
       }
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }