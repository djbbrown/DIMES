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
//  1.1      |08/29/16  |Steve Veloudos   |Adj Std Choices
//  1.2      |11/30/16  |Steve Veloudos   |Adj for Mobile & Business phone numbers
//  1.3      |12/08/16  |Steve Veloudos   |Added getMesaContactArray()
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
      var tInfo = getMesaContactArray();
      var rowCount = tInfo.length;
      var x = 0;

      //Get Applicant info
      for (x=0;x<=(rowCount-1);x++)
          {
          Type = tInfo[x]["contactType"];
          if(Type == "Applicant" )
             {
                if(tInfo[x]["phone2"] != null)
                {
                 Phone = "Mobile: " + tInfo[x]["phone2"] +" ";
                }
                if(tInfo[x]["phone3"] != null)
                {
                 Phone = Phone + "Business: " + tInfo[x]["phone3"];
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
      ToEmail = lookup("EMAIL_RECIPIENTS","DS_City_Electric_Zone");
      sendNotification(FromEmail, ToEmail, "", "PMT_CM_ELECTRIC", vEParams, null, capId);
      }
      
      //Send Email For Gas
      if(GasFlag == 1)
      {
      ToEmail = lookup("EMAIL_RECIPIENTS","BSD_Development_Planning");
      sendNotification(FromEmail, ToEmail, "", "PMT_CM_GAS", vEParams, null, capId);
      }
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }

    function getMesaContactArray()
	{
	// Returns an array of associative arrays with contact attributes.  Attributes are UPPER CASE
	// optional capid
	// added check for ApplicationSubmitAfter event since the contactsgroup array is only on pageflow,
	// on ASA it should still be pulled normal way even though still partial cap
	var thisCap = capId;
	if (arguments.length == 1) thisCap = arguments[0];

	var cArray = new Array();

	if (arguments.length == 0 && !cap.isCompleteCap() && controlString != "ApplicationSubmitAfter") // we are in a page flow script so use the capModel to get contacts
		{
		capContactArray = cap.getContactsGroup().toArray() ;
		}
	else
		{
		var capContactResult = aa.people.getCapContactByCapID(thisCap);
		if (capContactResult.getSuccess())
			{
			var capContactArray = capContactResult.getOutput();
			}
		}

	if (capContactArray)
		{
		for (yy in capContactArray)
			{
			var aArray = new Array();
			aArray["lastName"] = capContactArray[yy].getPeople().lastName;
			aArray["refSeqNumber"] = capContactArray[yy].getCapContactModel().getRefContactNumber();
			aArray["firstName"] = capContactArray[yy].getPeople().firstName;
			aArray["middleName"] = capContactArray[yy].getPeople().middleName;
			aArray["businessName"] = capContactArray[yy].getPeople().businessName;
			aArray["contactSeqNumber"] =capContactArray[yy].getPeople().contactSeqNumber;
			aArray["contactType"] =capContactArray[yy].getPeople().contactType;
			aArray["relation"] = capContactArray[yy].getPeople().relation;
			aArray["phone1"] = capContactArray[yy].getPeople().phone1;
			aArray["phone2"] = capContactArray[yy].getPeople().phone2;
            aArray["phone3"] = capContactArray[yy].getPeople().phone3;
			aArray["email"] = capContactArray[yy].getPeople().email;
			aArray["addressLine1"] = capContactArray[yy].getPeople().getCompactAddress().getAddressLine1();
			aArray["addressLine2"] = capContactArray[yy].getPeople().getCompactAddress().getAddressLine2();
			aArray["city"] = capContactArray[yy].getPeople().getCompactAddress().getCity();
			aArray["state"] = capContactArray[yy].getPeople().getCompactAddress().getState();
			aArray["zip"] = capContactArray[yy].getPeople().getCompactAddress().getZip();
			aArray["fax"] = capContactArray[yy].getPeople().fax;
			aArray["notes"] = capContactArray[yy].getPeople().notes;
			aArray["country"] = capContactArray[yy].getPeople().getCompactAddress().getCountry();
			aArray["fullName"] = capContactArray[yy].getPeople().fullName;
			aArray["peopleModel"] = capContactArray[yy].getPeople();

			var pa = new Array();

			if (arguments.length == 0 && !cap.isCompleteCap()) {
				var paR = capContactArray[yy].getPeople().getAttributes();
				if (paR) pa = paR.toArray();
				}
			else
				var pa = capContactArray[yy].getCapContactModel().getPeople().getAttributes().toArray();
	                for (xx1 in pa)
                   		aArray[pa[xx1].attributeName] = pa[xx1].attributeValue;

        	cArray.push(aArray);
			}
		}
	return cArray;
	}