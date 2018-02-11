/*===================================================================
// Sharepoint Issue Number: 258
// Script Name: TRA_TTC_PoliceNotification.js
// Script Description: If Off-Duty Officer Required ASI field is marked "Y" then send Email notification to Off_DutyPD_Notification group at Issuance and at permit extension
					   If Is this a Special Event ASI field is marked "Y" then send email notification to Traffic_Lieutenant" group at Issuance
// Script Run Event: WTUA
// Script Parents:WTUA;Transportation!~!~!~.js
// Version   |Date      |Devloper         |Details
//  1.0      |02/02/18  |Mong Ward		  |Initial Release
//
/*==================================================================*/

try {
      var FromEmail = "noreply@mesaaz.gov";
      var ToODPDEmail = lookup("EMAIL_RECIPIENTS","Off_DutyPD_Notification");
	  var ToTrafficLTEmail = lookup("EMAIL_RECIPIENTS","Traffic_Lieutenant");
      var vEParams = aa.util.newHashtable();
	  var Url = lookup("Agency_URL","ACA");
      var RestrictionStart = AInfo["Permit Start Date"];
      var RestrictionEnd = AInfo["Permit Expiration Date"];
      var TrafficRestriction = "";
      var SigIntersection = AInfo["Signalized Intersection"];	  
	  var Intersection = AInfo["Intersection"];
	  var spEvent = AInfo["Is this a Special Event"];
	  var offDuty = AInfo["Off-Duty Officer Required"];
	  var offInstructions = AInfo["Officer Instructions"];
	  var prjName = getAppName();
	  var DetailedDesc = AInfo["Description of Work"];
	  var Address;
	  var tccFirst;
	  var tccLast;
	  var tccMobile;
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
            
            //Get Traffic Restrictions
            loadASITables();
            tInfo = ROADWAYRESTRICTIONINFO;
            rowCount = ROADWAYRESTRICTIONINFO.length;
            if(rowCount!=0)
            {
                for (x in tInfo) 
                    {
                    //Put one line for each row of data
                    TrafficRestriction = TrafficRestriction + "		" + (tInfo[x]["Street Name"] + "	" + tInfo[x]["Direction of Travel"] + "		" + tInfo[x]["No. of Lanes Closed in this Direction"] + "	 " + tInfo[x]["Lane Type"] + "	 " + tInfo[x]["Notes"]);
                    }
            }
            
			//Get the contact info
			var tInfo = getContactArray();
			var rowCount = tInfo.length;
			var x = 0;

			//Get Email of Contacts
			for (x=0;x<=(rowCount-1);x++)
			{
					ConType = tInfo[x]["contactType"];
					var tccFirst = "";
                    var tccLast = "";
					var tccMobile = "";
					//Traffic Control Coordinator
					if(ConType == "Traffic Control Coordinator" )
					{
					var tccFirst = tInfo[x]["firstName"];
					var tccLast = tInfo[x]["lastName"];
					var tccMobile = tInfo[x]["phone2"];
					}
			}
			
			
            //Convert to strings
            var rStart = String(RestrictionStart);
            var rEnd = String(RestrictionEnd);
            var tRestriction = String(TrafficRestriction);
			var intersectionFld = String(Intersection);
			var odOfficer = String(offDuty);
            var offInst = String(offInstructions);
			var eventName = String(prjName);
			var DDesc = String(DetailedDesc);
			var tccFirstName = String(tccFirst);
			var tccLastName = String(tccLast);
			var tccMobilePhone = String(tccMobile);
			
			
            //Add Params
            addParameter(vEParams,"$$RECORDID$$",capIDString);
            addParameter(vEParams,"$$RESTRICTIONSTART$$",rStart);
            addParameter(vEParams,"$$RESTRICTIONEND$$",rEnd);
            addParameter(vEParams,"$$ADDRESS$$",Address);
			addParameter(vEParams,"$$INTERSECTION$$",intersectionFld);
            addParameter(vEParams,"$$ROADWAYRESTRICTIONASIT$$",tRestriction);
			addParameter(vEParams,"$$DETAILEDDESCRIPTION$$",DDesc);
			addParameter(vEParams,"$$OFFDUTYOFFICER$$",odOfficer);
			addParameter(vEParams,"$$OFFICERINSTRUCTIONS$$",offInst);
			addParameter(vEParams,"$$EVENTNAME$$",eventName);
			addParameter(vEParams,"$$URLOFRECORDID$$",Url);
			addParameter(vEParams,"$$TCCFIRSTNAME$$",tccFirstName);
			addParameter(vEParams,"$$TCCLASTNAME$$",tccLastName);
			addParameter(vEParams,"$$TCCMOBILEPHONE$$",tccMobilePhone);
						
			
			//Send email
			if(spEvent == "Yes" && PermitIssued == 1)
			{        
				sendNotification(FromEmail, ToTrafficLTEmail, "", "TRA_TTC_Traffic_LT_Notification", vEParams, null, capId);
			}
			
			else if(spEvent == "No" && offDuty == "Yes" && PermitIssued == 1)
			{        
				sendNotification(FromEmail, ToODPDEmail, "", "TRA_TTC_OffDutyOfficer_Notification", vEParams, null, capId);
			}
       
}
catch (err)
    {
      logDebug("A JavaScript Error occurred: " + err.message);
    }