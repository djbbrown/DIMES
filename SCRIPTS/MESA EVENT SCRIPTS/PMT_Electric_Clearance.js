/*===================================================================
// Script Number: 103
// Script Name: PMT_Electric_Clearance.js
// Script Description: Send an email when Electrical Final inspection is resulted with Approved 
// - Utility Clearance Required AND the Clearance Date in the ASIT is the current date.
// Script Run Event: ISRA
// Script Parents:ISRA;Permits!Online!~!~
// Permits/Sign/NA/NA
// Permits/Residential/NA/NA
// Permits/Commercial/NA/NA
// Permits/Residential/Mobile Home/NA
// PMT16-00392 For testing
// Version   |Date      |Engineer         |Details
//  1.0      |08/26/16  |Steve Veloudos   |Initial Release
//  1.1      |08/28/16  |Steve Veloudos   |Added parms for ASIT values
//  1.2      |08/29/16  |Steve Veloudos   |Added Std Choices for Email Addresses
//  1.3      |09/01/16  |Steve Veloudos   |Fixed issues with a few ASIT fields
//  1.4      |09/22/16  |Steve Veloudos   |Changed to ELECTRIC FINAL per Steve A
//  1.5      |09/26/16  |Steve Veloudos   |Adjust standard choice to Billing_Info
//  1.6      |09/27/16  |Steve Veloudos   |UTILITYSERVICEINFORMATION was incorrect
//  1.7      |09/29/16  |Steve Veloudos   |Added Service Type starting with Electric only
//  1.8      |10/06/16  |Steve Veloudos   |Added break on for loop for ASIT table. Per Taryn Martinez only one email needs to be sent
//  1.9      |10/10/16  |Steve Veloudos   |Removed break on for loop for ASIT table. Per Taryn Martinez multipule emails need to be sent
//  1.10     |11/01/16  |Steve Veloudos   |Added Temporary Electric inspection type & Added Permits/Residential/Mobile Home/NA
//  1.11     |11/08/16  |Steve Veloudos   |Added Unit Info & adjusted date compare
/*==================================================================*/

try {
      var FromEmail = "noreply@mesaaz.gov";
      var ToEmail = "noreply@mesaaz.gov";
      var vEParams = aa.util.newHashtable();
      var ComDesc = workDescGet(capId);
      var ServiceType;
      var ServiceType2;
      var ServiceSize
      var MeterSize;
      var BTULoadNumber;
      var ClearanceTo;
      var ClearanceDate2;
      var QtyofMeters;
      var WarrantyStatus;
      var Comments;

    //Check inspection type and results
    if ((inspType == "Electric Final" || inspType == "Temporary Electric") && inspResult == "Approved - Utl Clearance Req")
    {
    //Check if Approved and ASIT Clearance Date is the same current date
    var tmpTable = loadASITable("UTILITY SERVICE INFORMATION");
    if (!tmpTable) tmpTable = loadASITable("UTILITY SERVICE INFO");

    var tInfo = tmpTable;
        
    if (tInfo.length > 0) 
        {
        for (x in tInfo) 
            {
            var Cdate  = (tInfo[x]["Clearance Date"]);
            var ClearanceDate = String(Cdate);
            var d = new Date();
            var d2 = jsDateToASIDate(d);
            var currentDate = String(d2);
            ServiceType = "Service Type: " + (tInfo[x]["Service Type"]);
            ServiceType2 = ServiceType.substring(14, 22);
            ServiceSize = "Service Size: "  + (tInfo[x]["Service Size"]); 
            MeterSize = "Meter Size: "  + (tInfo[x]["Meter Size"]);
            BTULoadNumber = "BTU Load Number: "  + (tInfo[x]["BTU Load"]); 
            ClearanceTo =  "Clearance To: "  + (tInfo[x]["Clearance To"]);
            ClearanceDate2 = "Clearance Date: " + ClearanceDate;
            QtyofMeters = "Qty of Meters: "  + (tInfo[x]["Qty of Meters"]);
            WarrantyStatus = "Warranty Status: "  + (tInfo[x]["Warranty Status"]);
            Comments =  "Comments: "  + (tInfo[x]["Comments"]);
            
            //Check for Electric if not go onto the next record
            if(ServiceType2 == "Electric")
            {
                        //Compare dates 
                        if(ClearanceDate == currentDate)
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
                            else
                                {
                                //Break Out each element of the address
                                var hseNum = addrArray[0].getHouseNumberStart();
                                var streetDir = addrArray[0].getStreetDirection();
                                var streetName = addrArray[0].getStreetName();
                                var streetSuffix = addrArray[0].getStreetSuffix();
                                var unitType = addrArray[0].getUnitType();
                                var unitNumber = addrArray[0].getUnitStart(); 
                                var city = addrArray[0].getCity();
                                var state = addrArray[0].getState();
                                var zip = addrArray[0].getZip();
                            
                                var theAddress = hseNum + " " + streetDir + " " + streetName + " " + streetSuffix + " " + unitType + " " + unitNumber + " "  + city + ", " + state + " " + zip;
                                }
                            }

                        addParameter(vEParams,"$$RECORDID$$",capIDString);
                        addParameter(vEParams,"$$Address$$",theAddress);
                        addParameter(vEParams,"$$ServiceType$$",ServiceType);
                        addParameter(vEParams,"$$ServiceSize$$",ServiceSize);
                        addParameter(vEParams,"$$MeterSize$$",MeterSize);
                        addParameter(vEParams,"$$BTULoadNumber$$",BTULoadNumber);
                        addParameter(vEParams,"$$ClearanceTo$$",ClearanceTo);
                        addParameter(vEParams,"$$ClearanceDate2$$",ClearanceDate2);
                        addParameter(vEParams,"$$QtyofMeters$$",QtyofMeters);
                        addParameter(vEParams,"$$WarrantyStatus$$",WarrantyStatus);
                        addParameter(vEParams,"$$Comments$$",Comments);
                        
                            var Clearance = (tInfo[x]["Clearance To"]);
                        //Set to Email
                        if (Clearance == "City of Mesa")
                        {
                            ToEmail =lookup("EMAIL_RECIPIENTS","Billing_Info");
                        }
                        if (Clearance == "Salt River Project")
                        {
                            ToEmail =lookup("EMAIL_RECIPIENTS","SRP");
                        }

                        //Send the email
                        sendNotification(FromEmail, ToEmail, "", "PMT_ELECTRIC_CLEARANCE", vEParams, null, capId);    
                        }
                    } 

                }
                    
            }
        }
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }
