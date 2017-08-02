/*===================================================================
// Script Number: 
// Script Name: TRA_TTC_FeesDueEmail.js
// Script Developer: Mong Ward 
// Script Agency: Mesa 
// Script Description: When Traffic Review WF task is statused as Approved - Fees Due, Send Permit is Issued email notification to: 
//                     Applicant, Barricade Company, Other Contact
// Script Run Event: WTUA
// Script Parents:WTUA;Transportation!~!~!~.js
// Record Testing:  
/*==================================================================*/

try {
      var FromEmail = "noreply@mesaaz.gov";
      var ToEmail = lookup("EMAIL_RECIPIENTS","TTC_Staff");
	  var AppToEmail = "";
      var vEParams = aa.util.newHashtable();
      var Url = lookup("Agency_URL","ACA");
      var Address;
	  var BCompany;
	  var OtherContact;
	  var FeesDue = 0;
      
       
      //Iterate through workflows
      var tasks = aa.workflow.getTasks(capId).getOutput();
      for (t in tasks) 
            {
            //Look for Fees Due
            if (tasks[t].getTaskDescription() == "Traffic Review")
                { 
                    //Set flag if Fees Due
                    if(tasks[t].getDisposition() == "Approved - Fees Due")
                    {
                    FeesDue = 1; 
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
	  
 
		
		//Add Params
				addParameter(vEParams,"$$ADDRESS$$",Address);
				addParameter(vEParams,"$$RECORDID$$",capIDString);

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
									
			}     
		
		//Add Contacts
                 ToEmail =  ToEmail + "," + AppToEmail + "," + BCompany + "," + OtherContact;		
			
        //Send email
                if(FeesDue == 1)
                {	
					sendNotification(FromEmail, ToEmail, "", "TRA_TTC_PermitIssuedEmail", vEParams, null, capId);									
				}
	
					
	}
		
        
    
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }