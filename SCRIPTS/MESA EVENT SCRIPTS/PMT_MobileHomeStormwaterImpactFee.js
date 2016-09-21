//*===================================================================
//
// Script Number: 146
// Script Name: PMT_MobileHomeStormwaterImpactFee.js 
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
// 		When “Y” is chosen for ASI field “Storm Water” 
//		in ASI subgroup “Impact Fees” 
//		and...
//
//		1) value of “Manufactured Home (on platted lot)” is chosen for 
//		ASI dropdown field “Classification” then…
//
//		assess Storm Water - Mobile Home (on plotted land) Impact Fee 
//		using #DUs entered into ASI field Number of Units in General Section
//		Fee item Code: RDIF290
//		Fee Schedule: PMT_RDIF
//		Fee Period = Final
//
//		2) value of “Mfg. Home/Park Model/RV (per space or lot)” is 
//		chosen for ASI dropdown field “Classification” then…
//
//		assess Storm Water - Manufactured Home or Recreational Vehicle 
//		Impact Fee using #DUs entered into ASI field 
//		Number of Units in General Section
//		Fee item Code: RDIF300
//		Fee Schedule: PMT_RDIF
//		Fee Period = Final
//
//		Additional criteria: Fire when workflow task Permit Issuance is 
//		activated AND/OR on ApplicationSpecificInfoUpdateAfter ONLY IF 
//		workflow task Permit Issuance is activated
//
// Script Run Event: ASA / ASIUA
// Script Parents:
//              ASA;Permits/Residential/Mobile Home/NA  (remove)
//              ASIUA;Permits/Residential/Mobile Home/NA
//              WTUA;Permits/Residential/Mobile Home/NA
// 
//==================================================================*/


try
{
  var isStormWater = Boolean(AInfo["Storm Water"]);
  var isActive = isTaskActive("Permit Issuance");
  var classification = AInfo["Classification"];

  var typeOfWork = AInfo["Type of Work"];  // is this still needed???
  var housingUnits = AInfo["Number of Units"];
  var x = 0;

  if ((isStormWater) && (isActive))
  {

    comment("Storm Water is true / Permit Issuance task is active");

    if (housingUnits == null)
    {
      housingUnits = 0;
    }

    comment("Housing Units: " + housingUnits);

    // remove any existing fees related to this script
    if ((classification == "Manufactured Home (on platted lot)")
        || (classification == "Mfg. Home/Park Model/RV (per space or lot)"))
    {
      if (feeExists("RDIF290", "NEW"))
      {
        voidRemoveFee("RDIF290");
      }

      if (feeExists("RDIF300", "NEW"))
      {
        voidRemoveFee("RDIF300");
      }      
    }    

    // add new fees if applicable
    if (classification == "Manufactured Home (on platted lot)")
    {
      addFee("RDIF290","PMT_RDIF", "FINAL", housingUnits, "N");
    }

    if (classification == "Mfg. Home/Park Model/RV (per space or lot)")
    {
      addFee("RDIF300","PMT_RDIF", "FINAL", housingUnits, "N");
    }

  }

}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}



