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
//
//		=== update specs ===
//		
//		When “Y” is chosen for ASI field “Fire” in ASI subgroup “Impact Fees” then
//		  if value of “Manufactured Home (on platted lot)” is chosen for ASI dropdown field “Classification” 
//		  then 
//		    assess Fire - Mobile Home (on plotted land) Impact Fee using # entered into 
//		    ASI field "Number of Units" in GENERAL ASI Section.
//		      Fee item Code: RDIF190
//		      Fee Schedule: PMT_RDIF
//		      Fee Period = Final
//
//		  if value of “Mfg. Home/Park Model/RV (per space or lot)” is chosen for 
//		  ASI dropdown field “Classification” 
//		  then 
//		    assess Fire - Manufactured Home or Recreational Vehicle Impact Fee using # entered into ASI field 
//		    "Number of Units" in GENERAL ASI Section.  
//		      Fee item Code: RDIF200
//		      Fee Schedule: PMT_RDIF
//		      Fee Period = Final
//
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
  var classification = AInfo["Classification"];
  var housingUnits = AInfo["Number of Units"];

  if (isFire)
  {
    if (classification  == "Manufactured Home (on platted lot)")
    {
      //for (x=1;x<=housingUnits;x++)
      //{
        // syntax: addFee(fcode,fsched,fperiod,fqty,finvoice)
        //addFee("RDIF190","PMT_RDIF", "FINAL", 1, "N");  // org
        addFee("RDIF190","PMT_RDIF", "FINAL", housingUnits, "N");
      //}
    }

    if (classification  == "Mfg. Home/Park Model/RV (per space or lot)")
    {
      //for (x=1;x<=housingUnits;x++)
      //{
        // syntax: addFee(fcode,fsched,fperiod,fqty,finvoice)
        addFee("RDIF200","PMT_RDIF", "FINAL", housingUnits, "N");
      //}
    }
  }
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}



