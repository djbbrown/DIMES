/*===================================================================*/
/* Script Number: 135
// Script Name: PMT_Water_Clearance_Email.js
// Script Description: Send email if ASIT field Utility Service Info comtains values Permit Issuance is Issued & Fees have been paid  
// Script Run Event: WTUA
// Script Parents:	WTUA;Permits/Commercial/NA/NA
// 					WTUA;Permits/Residential/NA/NA
// 					WTUA;Permits/Residential/Mobile Home/NA
// 
// Version   |Date      |Engineer         |Details
//  1.0      |09/01/16  |Steve Veloudos   |Initial Release
//  2.0      |09/29/16  |Steve Veloudos   |Fixed Inconsistant UTILITY SERVICE INFO ASIT
//  3.0      |09/29/16  |Steve Veloudos   |Fixed to look for Permit Issuance that Issued workflow
//  4.0      |08/28/17  |Steve Allred     |Added Subdivision, Unit and Invoice number
//==================================================================*/

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
    var tStatus = "Issued";
    var tName = "Permit Issuance";  
	var AddrUnit;
	var Subdivision;
    var lotNumbers;
    var SewerAvailable = "";
    
   //Get WF Task
   var tasks = aa.workflow.getTasks(capId).getOutput();
       for (t in tasks) 
        {
            //Check task name and status
            if (tasks[t].getDisposition() == tStatus && tasks[t].getTaskDescription() == tName)
            {

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
                        ServiceTypeValue = (tInfo[x]["Service Type"]);
                        if(ServiceTypeValue == "Water Meter: Domestic" || ServiceTypeValue == "Water Meter: Landscaping" || ServiceTypeValue == "Water Service")
                            {
							//logDebug("Service Type = " + ServiceType);
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
				AddrUnit = addrArray[0].getUnitStart();
				
				//Get Subdivision
				Subdivision = aa.parcel.getParcelDailyByCapID(capId,null).output[0].parcelModel.subdivision; 
                //logDebug("Subdivision = " + Subdivision);
           
                Address = hseNum + " " + streetDir + " " + streetName + " " + streetSuffix;
                //logDebug("Address = " + Address);
                
                //Get Lot Numbers
                var fcapParcelObj = null;
                var capParcelResult = aa.parcel.getParcelandAttribute(capId, null);
                if (capParcelResult.getSuccess())
                    var fcapParcelObj = capParcelResult.getOutput().toArray();
                else
                      logDebug("**ERROR: Failed to get Parcel object: " + capParcelResult.getErrorType() + ":" + capParcelResult.getErrorMessage())
                
                for (i in fcapParcelObj){
                        if (fcapParcelObj.length > 1){
                            lotNumbers = lotNumbers +" "+fcapParcelObj[i].getLot();
                        }
                        else {
                            lotNumbers = fcapParcelObj[i].getLot();
                        }
                    }
                }

				//Get Invoice Number
				var invoices = aa.finance.getInvoiceByCapID(capId, null).getOutput();
				var feecodes = ['USF050','USF060','USF070','USF080','USF090','USF100','USF110']
				var foundInvoices = '';
    
				for(i in invoices) {
					var thefees = aa.invoice.getFeeItemInvoiceByInvoiceNbr(invoices[i].invNbr);
					if(thefees.getSuccess()) {
						var fees = thefees.output;
						for(f in fees) {
							if(fees[f].feeitemStatus == 'INVOICED' && IsStrInArry(fees[f].feeCode, feecodes))
							{
								if(foundInvoices.indexOf(invoices[i].invNbr) == -1)
									foundInvoices = foundInvoices + invoices[i].invNbr + ', ';
							} 
						} 
					} 
				}
				foundInvoices = foundInvoices.substring(0, foundInvoices.length - 2); 
                //logDebug("Invoices = " + foundInvoices);
                
                //Need to loop through record as special character in Sewer Available not visible to javascript
                  for (loopGlob in AInfo){
                    if ( loopGlob.match("Sewer(.*)Available?") ) {
                        SewerAvailable = AInfo[loopGlob];      
                    }
                }
				
                //Get balance due
                var BalanceDue = balanceDue;
                    if (BalanceDue > 0) 
                    {
                    BalanceDueFlag = 1;
                    }

                    addParameter(vEParams,"$$RECORDID$$",capIDString);
                    addParameter(vEParams,"$$ADDRESS$$",Address);

                    //Adding only if there is a lot number associated.
                    if (lotNumbers){
                        addParameter(vEParams,"$$LOTNUMBER$$","Lot Number (s) : "+lotNumbers);
                    }
                    
                    addParameter(vEParams,"$$ServiceType$$",ServiceType);
                    addParameter(vEParams,"$$ServiceSize$$",ServiceSize);
                    addParameter(vEParams,"$$MeterSize$$",MeterSize);
                    addParameter(vEParams,"$$BTULoadNumber$$",BTULoadNumber);
                    addParameter(vEParams,"$$ClearanceTo$$",ClearanceTo);
                    addParameter(vEParams,"$$ClearanceDate2$$",ClearanceDate2);
                    addParameter(vEParams,"$$QtyofMeters$$",QtyofMeters);
                    addParameter(vEParams,"$$WarrantyStatus$$",WarrantyStatus);
                    addParameter(vEParams,"$$Comments$$",Comments);
                    addParameter(vEParams,"$$Unit$$",AddrUnit);
                    addParameter(vEParams,"$$Subdivision$$",Subdivision);
                    addParameter(vEParams,"$$InvoiceNbr$$",foundInvoices);
                    addParameter(vEParams,"$$SEWERAVAILABLE$$",SewerAvailable);
                    
					
                //Send Email if conditions are correct
                if(ServiceTypeFlag == 1 && BalanceDueFlag != 1)
                {
                ToEmail = lookup("EMAIL_RECIPIENTS","City_of_Mesa_Utility");
				//logDebug("ToEmail = " + ToEmail);
                sendNotification(FromEmail, ToEmail, "", "PMT_WATER_CLEARANCE2", vEParams, null, capId);
                }  

            break;
            } //End If
        } //End For Loop Tasks    

    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }