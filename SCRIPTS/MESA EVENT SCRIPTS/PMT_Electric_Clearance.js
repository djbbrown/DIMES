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
// PMT16-00392 For testing
// Version   |Date      |Engineer         |Details
//  1.0      |08/26/16  |Steve Veloudos   |Initial Release
//  1.1      |08/28/16  |Steve Veloudos   |Added parms for ASIT values
//  1.2      |08/29/16  |Steve Veloudos   |Added Std Choices for Email Addresses
//  1.3      |09/01/16  |Steve Veloudos   |Fixed issues with a few ASIT fields
/*==================================================================*/

try {
      var FromEmail = "noreply@mesaaz.gov";
      var ToEmail = "noreply@mesaaz.gov";
      var vEParams = aa.util.newHashtable();
      var ComDesc = workDescGet(capId);
      var ServiceType;
      var ServiceSize
      var MeterSize;
      var BTULoadNumber;
      var ClearanceTo;
      var ClearanceDate2;
      var QtyofMeters;
      var WarrantyStatus;
      var Comments;
      
      //Get the Inspection results
      var getInspectionsResult = aa.inspection.getInspections(capId);

      //Test if script can get an inspection
      if (getInspectionsResult.getSuccess()) 
      {
	    var inspectionScriptModels = getInspectionsResult.getOutput();
	    var inspectionScriptModel = null;

        //Check if Inspection is Electrical Final 
                for (inspectionScriptModelIndex in inspectionScriptModels)
                {
                    inspectionScriptModel = inspectionScriptModels[inspectionScriptModelIndex];
                    if (inspectionScriptModel.getInspectionType().toUpperCase() == "ELECTRICAL FINAL")
                    {
                       //Check for APPROVED - UTL CLEARANCE REQ status
                       if (inspectionScriptModel.getInspectionStatus().toUpperCase() == "APPROVED - UTL CLEARANCE REQ")
                       {
                        //Check if Approved and ASIT Clearance Date is the same current date --Verified working need remaining fields & logic --
                        loadASITables();
                        var tInfo = UTILITYSERVICEINFO;
                           
                        if (UTILITYSERVICEINFO.length > 0) 
                            {
                            for (x in tInfo) 
                                {
                                var Cdate  = (tInfo[x]["Clearance Date"]);
                                var ClearanceDate = String(Cdate);
                                var d = new Date();
                                var d2 = jsDateToASIDate(d);
                                var currentDate = String(d2);
                                ServiceType = "Service Type: " + (tInfo[x]["Service Type"]);
                                ServiceSize = "Service Size: "  + (tInfo[x]["Service Size"]); 
                                MeterSize = "Meter Size: "  + (tInfo[x]["Meter Size"]);
                                BTULoadNumber = "BTU Load Number: "  + (tInfo[x]["BTU Load"]); 
                                ClearanceTo =  "Clearance To: "  + (tInfo[x]["Clearance To"]);
                                ClearanceDate2 = "Clearance Date: " + ClearanceDate;
                                QtyofMeters = "Qty of Meters: "  + (tInfo[x]["Qty of Meters"]);
                                WarrantyStatus = "Warranty Status: "  + (tInfo[x]["Warranty Status"]);
                                Comments =  "Comments: "  + (tInfo[x]["Comments"]);
                                
                                var Clearance = (tInfo[x]["Clearance To"]);
                                    //Set to Email
                                    if (Clearance == "City of Mesa")
                                    {
                                        ToEmail =lookup("EMAIL_RECIPIENTS","Billing Info");
                                    }
                                    if (Clearance == "Salt River Project")
                                    {
                                        ToEmail =lookup("EMAIL_RECIPIENTS","SRP");
                                    }
                               
                                    //Compare dates 
                                    if( currentDate == ClearanceDate )
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
                                            var city = addrArray[0].getCity();
                                            var state = addrArray[0].getState();
                                            var zip = addrArray[0].getZip();
                                        
                                            var theAddress = hseNum + " " + streetDir + " " + streetName + " " + streetSuffix + " " + city + ", " + state + " " + zip;
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
                                    
                                    //Send the email
                                    sendNotification(FromEmail, ToEmail, "", "PMT_ELECTRIC_CLEARANCE", vEParams, null, capId);    
                                    }
                                } 

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