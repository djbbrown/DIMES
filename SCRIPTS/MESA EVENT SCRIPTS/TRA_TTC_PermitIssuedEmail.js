/*===================================================================
// Script Number: 408 
// Script Name: TRA_TTC_PermitIssuedEmail.js
// Script Developer: Mong Ward 
// Script Agency: Mesa 
// Script Description: When Permit Issuance WF task is statused as Issued, Send Permit is Issued email notification to: 
//                     Applicant, Barricade Contact, Contractor, Barricade Coordinator, Engineering Inspector, Other Contact, Traffic Engineer
// Script Run Event: WTUA
// Script Parents:WTUA;Transportation!Temporary Traffic Control!NA!NA.js
// Record Testing:  
/*==================================================================*/

try {
      var FromEmail = "noreply@mesaaz.gov";
      var ToEmail = lookup("EMAIL_RECIPIENTS","Traffic_Engineer");
	  var ToUTLEmail = lookup("EMAIL_RECIPIENTS","ENG_UTL_Email");
	  var AppToEmail = "";
      var vEParams = aa.util.newHashtable();
      var Url = lookup("Agency_URL","ACA");
	  var associatedPermitType = AInfo["Associated Work Permit Type"];
	  var TrafficRestriction = "";
	  var RestrictionStart;
      var RestrictionEnd;
      var DetailedDesc;
      var Address;
	  var BCompany;
	  var BCoordinator;
	  var EngInsp;
	  var ChiefEngInsp;
	  var OtherContact;
	  var PermitIssued = 0;
      
       
      //Iterate through workflows
      var tasks = aa.workflow.getTasks(capId).getOutput();
      for (t in tasks) 
            {
            //Look for Permit Issuance
            if (tasks[t].getTaskDescription() == "Permit Issuance")
                { 
                    //Set flag if permit issued
                    if(tasks[t].getDisposition() == "Issued")
                    {
                    PermitIssued = 1; 
                    }
                }
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
                    TrafficRestriction = TrafficRestriction + " " + (tInfo[x]["Street Name"] + " " + tInfo[x]["Direction of Travel"] + " " + tInfo[x]["No. of Lanes Closed in this Direction"] + " " + tInfo[x]["Lane Type"] + " " + tInfo[x]["Notes"]);
                    }
            }    

        //get the restriction dates
                                 
            RestrictionStart =  AInfo["Permit Start Date"];
            RestrictionEnd =  AInfo["Permit Expiration Date"];			

   
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
			var TRestriction = String(TrafficRestriction);
						
		

		//Add Params
				addParameter(vEParams,"$$ADDRESS$$",Address);
				addParameter(vEParams,"$$RECORDID$$",capIDString);
				addParameter(vEParams,"$$RESTRICTIONSTART$$",RStart);
				addParameter(vEParams,"$$RESTRICTIONEND$$",REnd);
				addParameter(vEParams,"$$DETAILEDDESCRIPTION$$",DDesc);
				addParameter(vEParams,"$$TRAFFICRESTRICTIONASIT$$",TRestriction);
		
		//Get other contact Info
		OtherContact = AInfo["Department/Company Contact Email Address"]

        //Get the contact info
			var tInfo = getContactArray();
			var rowCount = tInfo.length;
			var x = 0;

		//Get Email of Contacts
			for (x=0;x<=(rowCount-1);x++)
			{
					ConType = tInfo[x]["contactType"];
					//Applicant
					if(ConType == "Applicant" )
					{
					var AppToEmail = tInfo[x]["email"];
					}
					//Barricade Company
					if(ConType == "Barricade Company" )
					{
					var BCompany = tInfo[x]["email"];
					}
					//Barricade Coordinator
					if(ConType == "Barricade Coordinator" )
					{
					var BCoordinator = tInfo[x]["email"];
					}
					//Engineering Inspector
					if(ConType == "Engineering Inspector" )
					{
					var EngInsp = tInfo[x]["email"];
					}
					//Chief Engineering Inspector
					if(ConType == "Chief Engineering Inspector" )
					{
					var ChiefEngInsp = tInfo[x]["email"];	
					}
				
			}     
		//Add Contacts
                 ToEmail =  ToEmail + "," + AppToEmail + "," + BCompany + "," + BCoordinator + EngInsp + "," + OtherContact + "," + ChiefEngInsp;	  
			
        //Send email
                if(PermitIssued == 1)
                {
					sendNotification(FromEmail, ToEmail, "", "TRA_TTC_PermitIssuedEmail", vEParams, null, capId);
												
				}
				
				if(PermitIssued == 1 && associatedPermitType == "UTL - Utility")
                {
					sendNotification(FromEmail, ToUTLEmail, "", "TRA_TTC_PermitIssuedEmail", vEParams, null, capId);
												
				}
				

						
	}
		
        
    
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }