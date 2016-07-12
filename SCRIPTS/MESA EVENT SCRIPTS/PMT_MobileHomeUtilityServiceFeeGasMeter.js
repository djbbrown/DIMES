//*===================================================================
//
// Script Number: 139
// Script Name: PMT_MobileHomeUtilityServiceFeeGasMeter.js 
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
// 		When value of “Gas Meter” is chosen in ASIT dropdown field “Service Type” 
//              (in ASIT subgroup "Utility Service Info") assess the following fee item:
//                Fee item Code: USF020
//                Fee Name: Gas Meter
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
  loadASITable("UTILITY SERVICE INFO;");
  var tInfo = UTILITYSERVICEINFO;
  var rowCount = 0;
  var serviceType = "";
  var x = 0;
  var exists = feeExists("USF020");

  if ((tInfo == null) || (exists))
  {
    // do nothing at this time
  }
  else
  {
    rowCount = UTILITYSERVICEINFO.length;

    for (x=0;x<=(rowCount-1);x++)
    {
      serviceType = UTILITYSERVICEINFO[x]["Service Type"];
      if (serviceType == "Gas Meter")
      {
        // syntax: addFee(fcode,fsched,fperiod,fqty,finvoice)
        addFee("USF020","PMT_UTL_SERV", "FINAL",  1, "N");
        x = rowCount;
      }
    }
  }
} 
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}


