/*===================================================================
// Script Number: XXX 
// Script Name: TRA_TTC_ModStatusEmail.js
// Script Developer: Mong Ward 
// Script Agency: Mesa 
// Script Description: When application status is updated approved or not approved, Send Modification status email notification to: 
//                     Applicant, Barricade Contact, Contractor, Barricade Company contact.
// Script Run Event: WTUA
// Script Parents:WTUA;Transportation!~!~!~.js
// Record Testing:  
/*==================================================================*/

try {
      var FromEmail = "noreply@mesaaz.gov";
	  var ToGenEmail;
	  //var ToROWEmail = lookup("EMAIL_RECIPIENTS","ENG_ChiefInspectors");
	  //var ToTrafficEngEmail = lookup("EMAIL_RECIPIENTS","Traffic_Engineer");
	  //var toUTL = lookup("EMAIL_RECIPIENTS","ENG_UTL_Email");
	  var AppToEmail = "";
      var vEParams = aa.util.newHashtable();
      var Url = lookup("Agency_URL","ACA");
	  var associatedPermitType = AInfo["Associated Work Permit Type"];
      var ttcParent = AInfo["Parent TTC Permit #"];
      var Address;
	  var BCompany;
	  var contactBCompany;
	  var contractorEmail;
	  var StatusType = 0;

	  
	     //Check WF
     //Set status type
    if (capStatus == "Approved")
        {
        StatusType = 1;
        }
    
    if (capStatus == "Not Approved")
        {
        StatusType = 2;
        }

 
      
	//Send Email if correct record status
    if(StatusType != 0)  {
		
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
	  
                           
        
		
			//Convert to strings
			//var TrafficEng = String(ToTrafficEngEmail)
									
		

			//Add Params
				addParameter(vEParams,"$$ADDRESS$$",Address);
				addParameter(vEParams,"$$RECORDID$$",capIDString);
				addParameter(vEParams,"$$URLOFRECORDID$$",Url);
				//addParameter(vEParams,"$$TRAFFICENGINEER$$",TrafficEng);
				addParameter(vEParams,"$$TTCPARENTPERMIT$$",ttcParent);
				addParameter(vEParams,"$$APPLICATIONSTATUS$$",capStatus);
				
		
			
			
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
					if(ConType == "Barricade Company Contact" )
                    {
                    var contactBCompany = tInfo[x]["email"];
                    }
				
			}     
			

			
			
			
			//Add Contacts
                 ToGenEmail =  AppToEmail + "," + BCompany + "," + contactBCompany;

				 //toUTL =  toUTL + "," + AppToEmail + "," + BCompany + "," + BCoordinator;
				 
				 //ToROWEmail = ToROWEmail + "," + AppToEmail + "," + BCompany + "," + BCoordinator + "," + EngInsp;
			
			//Send email
                if(StatusType == 1)
                {
					
					sendNotification(FromEmail, ToGenEmail, "", "TRA_TTC_MOD_APPROVED", vEParams, null, capId);
												
				}
				
				//else if(StatusType == 1 && associatedPermitType == "UTL - Utility")
                //{
				//	sendNotification(FromEmail, toUTL, "", "TRA_TTC_MOD_APPROVED", vEParams, null, capId);
											
				//}
				
				//else if(StatusType == 1 && associatedPermitType == "ROW - Right-of-Way")
                //{
				//	sendNotification(FromEmail, ToROWEmail, "", "TRA_TTC_MOD_APPROVED", vEParams, null, capId);
												
				//}
				
				else if (StatusType == 2)
                {
					
					sendNotification(FromEmail, ToGenEmail, "", "TRA_TTC_MOD_NOT_APPROVED", vEParams, null, capId);
												
				}
				
				//else if(StatusType == 2 && associatedPermitType == "UTL - Utility")
                //{
				//	sendNotification(FromEmail, toUTL, "", "TRA_TTC_MOD_NOT_APPROVED", vEParams, null, capId);
											
				//}
				
				//else if(StatusType == 2 && associatedPermitType == "ROW - Right-of-Way")
                //{
				//	sendNotification(FromEmail, ToROWEmail, "", "TRA_TTC_MOD_NOT_APPROVED", vEParams, null, capId);
												
				//}
				
				

			
				
	}

}
		
        
    
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }