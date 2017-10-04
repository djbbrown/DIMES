/*===================================================================*/
// Script Number: 148
// Script Name: PMT_New_CM_Sewer.js
// Script Description: Send an email if Parcel located in COM Sewer GIS layer and Building Inspection is resulted as Approved.
// Script Run Event: IRSA
// Script Parents: IRSA;Permits/Residential/NA/NA
// IRSA;Permits/Commercial/NA/NA
// Testing record:  PMT16-00480
// Version   |Date      |Engineer         |Details
//  1.0      |08/29/16  |Steve Veloudos   |Initial Release
//  2.0      |11/22/16  |Steve Veloudos   |Adj for only Sewer to Building and Approved
/*==================================================================*/

try {
    var FromEmail = "noreply@mesaaz.gov";
    var vEParams = aa.util.newHashtable();
    var ToEmail = lookup("EMAIL_RECIPIENTS","Billing_Info");
    var InComSewer = 0;
    var ProposedUse;
    var TofWork;
    var InsName;
    var InsDate;
    var SewerAvailable = "";

    //Get GIS Data
    var tInfo = getGISInfoArray("Accela/AccelaTAGS", "Accela_TAGS", "Accela_TAGS.TAG");
    var rowCount = tInfo.length;
    var x = 0;

    //Iternate for GIS Tags
    for (x=0;x<=(rowCount-1);x++)
        {
            TagValue = tInfo[x];
            
            //Check For COM Sewer
            if(TagValue == "COMS")
            {
                InComSewer = 1;
            }
        }

        //Check the inspection & results
        if (InComSewer == 1 && inspType.toUpperCase() == "SEWER TO BUILDING"  && inspResult.toUpperCase() == "APPROVED")
        {
            
            //Get the inspector's name
			var inspID = getLastInspector(inspType);
			logDebug("InspectorID = " + inspID);
			
            inspInspectorObj = aa.person.getUser(inspID).getOutput();
			if (inspInspectorObj) {
				var InspectorFirstName = inspInspectorObj.getFirstName();
				var InspectorLastName = inspInspectorObj.getLastName();
			} 

			InsName = InspectorFirstName + " " + InspectorLastName;
            logDebug("InspectorName = " + InspectorFirstName + " " + InspectorLastName);
			
            //Get the inspection date         
            InsDate = inspResultDate;
                        
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
                    else
                        {
                        //Break Out each element of the address
                        var hseNum = addrArray[0].getHouseNumberStart();
                        var streetDir = addrArray[0].getStreetDirection();
                        var streetName = addrArray[0].getStreetName();
                        var streetSuffix = addrArray[0].getStreetSuffix();
                        var city = addrArray[0].getCity();
                        var state = addrArray[0].getState();
                        var zip = addrArray[0].getZip();
                        var unit = addrArray[0].getUnitStart();
                        
                        var theAddress = hseNum + " " + streetDir + " " + streetName + " " + streetSuffix + " " + city + ", " + state + " " + zip;
                        }
                    }
                //Get remaining values
                ProposedUse = AInfo["Proposed Use"];
                TofWork = AInfo["Type of work"];

                //Need to loop through record as special character in Sewer Available not visible to javascript
                for (loopGlob in AInfo){
                    if ( loopGlob.match("Sewer(.*)Available?") ) {
                        SewerAvailable = AInfo[loopGlob];      
                    }
                }

                //Add parameters
                addParameter(vEParams,"$$RECORDID$$",capIDString);
                addParameter(vEParams,"$$ADDRESS$$",theAddress);
                if (unit){
                    addParameter(vEParams,"$$UNIT$$","Unit: "+unit);
                }
                addParameter(vEParams, "$$SEWERAVAILABLE$$",SewerAvailable);
                addParameter(vEParams,"$$USE$$",ProposedUse);
                addParameter(vEParams,"$$TYPEOFWORK$$",TofWork);
                addParameter(vEParams,"$$NAME$$",InsName);
                addParameter(vEParams,"$$DATE$$",InsDate);
                
                //Check and send email
                if(InComSewer == 1)
                {
                sendNotification(FromEmail, ToEmail, "", "PM_NEW_CM_SEWER", vEParams, null, capId); 
                } 
        }  
    }
    catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }