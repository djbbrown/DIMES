/*===================================================================*/
// Script Number: 222
// Script Name: PMT_Stop_Work_Order.js
// Script Description: Send email When a stop work order lock (condition) is added to the record
// Script Run Event: ACAA ASIUA
// Script Parents:ACAA ASIUA;Permits/NA/NA/NA
// Test Record: PMT16-00507
// Version   |Date      |Engineer         |Details
//  1.0      |09/01/16  |Steve Veloudos   |Initial Release
//  1.1      |10/06/16  |Steve Veloudos   |Switched from ASIUA to ACAA ApplicationConditionAddAfter
/*==================================================================*/

try {
    var FromEmail = "noreply@mesaaz.gov";
    var ToEmail;
    var vEParams = aa.util.newHashtable();

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

	var condResult = aa.capCondition.getCapConditions(capId);
        if (condResult.getSuccess())
        {
            var capConds = condResult.getOutput();
            for (cc in capConds) 
            {
		    var thisCond = capConds[cc];
		    var cDesc = thisCond.getConditionDescription().toUpperCase();
            if(cDesc == "STOP WORK ORDER")
                {
                //Add Parms
                addParameter(vEParams,"$$ADDRESS$$",Address);
       
                //Send Email 
                ToEmail = lookup("EMAIL_RECIPIENTS","City_Building_Official");
                sendNotification(FromEmail, ToEmail, "", "STOP_WORK_ORDER", vEParams, null, capId); 
                ToEmail = lookup("EMAIL_RECIPIENTS","Permits_Supervisor");
                sendNotification(FromEmail, ToEmail, "", "STOP_WORK_ORDER", vEParams, null, capId); 

                break;
                }
            }
        }         
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }