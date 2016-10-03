/*===================================================================*/
// Script Number: 135
// Script Name: PMT_Water_Clearance_Email.js
// Script Description: Send email if ASIT field Utility Service Info comtains values Permit Issuance is Issued & Fees have been paid  
// Script Run Event: ASIUA
// Script Parents:ASIUA;Permits/Commercial/NA/NA
// ASIUA;Permits/Residential/NA/NA
// Test Record: PMT16-00507
// Version   |Date      |Engineer         |Details
//  1.0      |09/01/16  |Steve Veloudos   |Initial Release
//  2.0      |09/29/16  |Steve Veloudos   |Fixed Inconsistant UTILITY SERVICE INFO ASIT
/*==================================================================*/

try {
    var FromEmail = "noreply@mesaaz.gov";
    var ToEmail;
    var vEParams = aa.util.newHashtable();
    var ServiceTypeFlag = 0;
    var BalanceDueFlag = 0;
    var Cdate;
    var ClearanceDate;
    var Address;
    var ServiceType;
    var ServiceSize
    var MeterSize;
    var BTULoadNumber;
    var ClearanceTo;
    var ClearanceDate2;
    var QtyofMeters;
    var WarrantyStatus;
    var Comments;   
    
    //Get current date
    var d = new Date();
    var d2 = jsDateToASIDate(d);
    var CurrentDate = String(d2);  
    
    //Get the values from ASIT   
    var tmpTable = loadASITable("UTILITY SERVICE INFORMATION");
	if (!tmpTable) tmpTable = loadASITable("UTILITY SERVICE INFO");
    var tInfo = tmpTable;
    var rowCount = tInfo.length;
    var x = 0;
    var i = 0;

    //Iterate through table
    for (x=0;x<=(rowCount-1);x++)
    {
        //Check servicetype and clearancedate & get data
        Cdate  = (tInfo[x]["Clearance Date"]);
        ClearanceDate = String(Cdate);
            if(ClearanceDate == CurrentDate)
            {
            ServiceType = (tInfo[x]["Service Type"]);
            if(ServiceType == "Water Meter: Domestic" || ServiceType == "Water Meter: Landscaping"|| ServiceType == "Water Meter: Landscaping" || ServiceType == "Water Service")
                {
                ServiceTypeFlag = 1;
                i = i + 1;
                    if(i == 1)
                    {
                    ServiceType = "Service Type: " + (tInfo[x]["Service Type"]);
                    ServiceSize = "Service Size: "  + (tInfo[x]["Service Size"]); 
                    MeterSize = "Meter Size: "  + (tInfo[x]["Meter Size"]);
                    BTULoadNumber = "BTU Load Number: "  + (tInfo[x]["BTU Load"]); 
                    ClearanceTo =  "Clearance To: "  + (tInfo[x]["Clearance To"]);
                    ClearanceDate2 = "Clearance Date: " + ClearanceDate;
                    QtyofMeters = "Qty of Meters: "  + (tInfo[x]["Qty of Meters"]);
                    WarrantyStatus = "Warranty Status: "  + (tInfo[x]["Warranty Status"]);
                    Comments =  "Comments: "  + (tInfo[x]["Comments"]);
                    }
                    else
                    {
                      ServiceType = ServiceType + ", " + (tInfo[x]["Service Type"]);
                      ServiceSize = ServiceSize + ", " + (tInfo[x]["Service Size"]);
                      MeterSize = MeterSize + ", " + (tInfo[x]["Meter Size"]);
                      BTULoadNumber = BTULoadNumber + ", " + (tInfo[x]["BTU Load"]);
                      ClearanceTo = ClearanceTo + ", " + (tInfo[x]["Clearance To"]);
                      ClearanceDate2 = ClearanceDate2 + ", " + ClearanceDate;
                      QtyofMeters = QtyofMeters + ", " + (tInfo[x]["Qty of Meters"]);
                      WarrantyStatus = WarrantyStatus + ", " + (tInfo[x]["Warranty Status"]);
                      Comments = Comments + ", " + (tInfo[x]["Comments"]);
                    }
           
                }//End ServiceType
            }//End Clearancedate
    }//End for loop

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

      //Get balance due
      var BalanceDue = balanceDue;
        if (BalanceDue > 0) 
        {
        BalanceDueFlag = 1;
        }

        addParameter(vEParams,"$$RECORDID$$",capIDString);
        addParameter(vEParams,"$$ADDRESS$$",Address);
        addParameter(vEParams,"$$ServiceType$$",ServiceType);
        addParameter(vEParams,"$$ServiceSize$$",ServiceSize);
        addParameter(vEParams,"$$MeterSize$$",MeterSize);
        addParameter(vEParams,"$$BTULoadNumber$$",BTULoadNumber);
        addParameter(vEParams,"$$ClearanceTo$$",ClearanceTo);
        addParameter(vEParams,"$$ClearanceDate2$$",ClearanceDate2);
        addParameter(vEParams,"$$QtyofMeters$$",QtyofMeters);
        addParameter(vEParams,"$$WarrantyStatus$$",WarrantyStatus);
        addParameter(vEParams,"$$Comments$$",Comments);

      //Send Email if conditions are correct
      if(ServiceTypeFlag == 1 && BalanceDueFlag != 1)
      {
      ToEmail = lookup("EMAIL_RECIPIENTS","City_of_Mesa_Utility");
      sendNotification(FromEmail, ToEmail, "", "PMT_WATER_CLEARANCE2", vEParams, null, capId);
      }      

    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }