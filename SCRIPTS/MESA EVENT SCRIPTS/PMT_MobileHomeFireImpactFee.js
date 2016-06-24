//*===================================================================
//
// Script Number: 144
// Script Name: PMT_MobileHomeFireImpactFee.js 
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
// 		When ASI field “Fire” is checked in ASI subgroup “Impact Fees”
//              and
//                1) value of “New Mobile Home” is chosen for ASI dropdown field “Type of Work”
//                2) value of “New Park Model” is chosen for ASI dropdown field “Type of Work”
//              then 
//
//              (1) assess "Fire - Single Residence Attached/Multi-Family Impact Fee" using 
//              #DUs entered into ASI field "Dwelling Units" in Additional Info Section.
//                (this Fee Code do not exist, using RDIF170)
//                Fee item Code: RDIF190
//                Fee Schedule: PMT_RDIF
//                Fee Period = Final
//
//              (2) assess "Public Safety - Single Family Detached/Mobile Home (on plotted land) Impact Fee"
//              using #DUs entered into ASI field "Dwelling Units" in Additional Info Section. 
//                (this Fee Code do not exist, using RDIF210)
//                Fee item Code: USF200
//                Fee Schedule: PMT_RDIF
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
  var isFire = Boolean(AInfo["Fire"]);
  var typeOfWork = AInfo["Type of Work"];
  var housingUnits = 2;

  if (isFire)
  {
    if ((typeOfWork == "New Mobile Home") || (typeOfWork == "New Park Model"))
    {
      for (x=1;x<=housingUnits;x++)
      {
        // syntax: addFee(fcode,fsched,fperiod,fqty,finvoice)
        addFee("RDIF170","PMT_RDIF", "FINAL",  1, "N");
        addFee("RDIF210","PMT_RDIF", "FINAL",  1, "N");
      }

    }
  }
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}



