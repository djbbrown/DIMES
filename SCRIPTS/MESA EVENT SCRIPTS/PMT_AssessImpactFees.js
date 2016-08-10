//*===================================================================
//
// Script Number: N/A
// Script Name: PMT_AssessImpactFees.js 
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
// 		This script maps Impact Fees from PMT_RDIF Fee Schedule
//		to their respective ASI field for the Record Types notated
//		**Note: PMT_RDIF is a generic/general purpose Fee Schedule
//			used for many Record Types
//
// Script Run Event: ASA / ASIUA
// Script Parents:
//              ASA;Permits/Residential/Mobile Home/NA
//              ASIUA;Permits/Residential/Mobile Home/NA
//              ASA;Permits/Residential/NA/NA
//              ASIUA;Permits/Residential/NA/NA
// 
//==================================================================*/

// switch statement not supported by JS engine (b odell)

try
{
  var classification = AInfo["Classification"];
  var numberOfUnits = AInfo["Number of Units"];


  // syntax: addFee(fcode,fsched,fperiod,fqty,finvoice)
  // example: addFee("RDIF170","PMT_RDIF", "FINAL",  1, "N");
  
  if (matches(classification, "Single Family-Detached (per dwelling unit)"))
  {
    addFee("RDIF010","PMT_RDIF", "FINAL",  1, "N");
    addFee("RDIF060","PMT_RDIF", "FINAL",  1, "N");
    addFee("RDIF160","PMT_RDIF", "FINAL",  1, "N");
    addFee("RDIF210","PMT_RDIF", "FINAL",  1, "N");
    addFee("RDIF260","PMT_RDIF", "FINAL",  1, "N");
    addFee("RDIF310","PMT_RDIF", "FINAL",  1, "N");
  }




  
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}



