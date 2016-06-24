//*===================================================================
//
// Script Number: 146
// Script Name: PMT_MobileHomeStormwaterImpactFee.js 
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
// 		When “Y” is chosen for ASI field “Stormwater” 
//              in ASI subgroup “Impact Fees” and
//              (1) value of “New Mobile Home” is chosen for ASI dropdown field “Type of Work”
//              (2) value of “New Park Model” is chosen for ASI dropdown field “Type of Work”
//              then
//                (a) assess Storm Water - Single Family Detached/Mobile Home (on plotted land) 
//                Impact Fee using #DUs entered into ASI field "Dwelling Units" in 
//                Additional Info Section.
//                  Fee item Code: RDIF290
//                  Fee Schedule: PMT_RDIF
//                  Fee Period = Final
//                (b) assess Storm Water - Single Family Detached/Mobile Home (on plotted land) 
//                Impact Fee using #DUs entered into ASI field "Dwelling Units" in 
//                Additional Info Section.
//                  (this Fee Code does not exist, seems to be a dup of the above Fee Code)
//                  Fee item Code: USF291
//                  Fee Schedule: PMT_RDIF
//                  Fee Period = Final
//
// Script Run Event: ASA / ASIUA
// Script Parents:
//              ASA;Permits/Residential/Mobile Home/NA
//              ASIUA;Permits/Residential/Mobile Home/NA
// 
//==================================================================*/


try
{
  var isStormWater = Boolean(AInfo["Storm Water"]);
  var typeOfWork = AInfo["Type of Work"];
  var housingUnits = 2;  // verify this is correct field
  var x = 0;

  if (isStormWater)
  {
    if ((typeOfWork == "New Mobile Home") || (typeOfWork == "New Park Model"))
    {
      for (x=1;x<=housingUnits;x++)
      {
        // syntax: addFee(fcode,fsched,fperiod,fqty,finvoice)
        addFee("RDIF290","PMT_RDIF", "FINAL",  1, "N");
      }

    }
  }
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}



