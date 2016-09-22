//*===================================================================
//
// Script Number: 140
// Script Name: PMT_MobileHomeUtilityServiceFeeGasServiceOther.js 
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
// 		When value of “Gas Service/Meter – Large Residential”, 
//              “Gas Service/Meter – Commercial”, “Gas Relocation/Retrofit”
//              is chosen in ASIT dropdown field “Service Type” 
//              (in ASIT subgroup "Utility Service Info") assess the 
//              following fee item:
//                Fee item Code: USF030
//                Fee Name: Gas Service/Meter Other
//                Fee Schedule: PMT_UTL_SERV
//                Fee Period = Final
//
// Script Run Event: ASA / ASIUA
// Script Parents:
//              ASA;Permits/Residential/Mobile Home/NA
//              ASIUA;Permits/Residential/Mobile Home/NA
// 
//==================================================================*/

try
{
  loadASITable("UTILITY SERVICE INFO");
  var tInfo = UTILITYSERVICEINFO;
  var rowCount = 0;
  var serviceType = "";
  var x = 0;
  var exists = feeExists("USF030");

  if ((tInfo == null) || (exists))
  {
    // do nothing at this time
    // fee currently only to be assessed once
  }
  else
  {
    rowCount = UTILITYSERVICEINFO.length;

    for (x=0;x<=(rowCount-1);x++)
    {
      serviceType = UTILITYSERVICEINFO[x]["Service Type"];
      if ((serviceType == "Gas Service/Meter - Large Residential") ||
          (serviceType == "Gas Service/Meter - Commercial") ||
          (serviceType == "Gas Relocation/Retrofit"))
      {
        // syntax: addFee(fcode,fsched,fperiod,fqty,finvoice)
        addFee("USF030","PMT_UTL_SERV", "FINAL",  1, "N");
        x = rowCount;
      }
    }
  }
} 
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}


