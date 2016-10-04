//*===================================================================
//
// Script Number: 144
// Script Name: PMT_MobileHomeFireImpactFee.js 
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
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
//		WTUA;Permits!Residential!Mobile Home!NA (updated spec - added to)
//              ASA;Permits/Residential/Mobile Home/NA (org spec - removed from)
//              ASIUA;Permits/Residential/Mobile Home/NA (org spec - removed from)
// 
//==================================================================*/

// put this back in if we decide to removed Invoiced fees
// if (feeExists("RDIF190", "NEW", "INVOICED"))


try
{

  if ((wfTask == "Plans Coordination") && (wfStatus == "Ready to Issue"))
  {

    var isFire = Boolean(AInfo["Fire"]);
    var classification = AInfo["Classification"];
    var housingUnits = AInfo["Number of Units"];

    if ((isFire) && (housingUnits > 0))
    {

      // since Classification might have changed, move both fees and re-assess
      if (feeExists("RDIF190", "NEW"))
      {
        voidRemoveFee("RDIF190");
      }
      if (feeExists("RDIF200", "NEW"))
      {
        voidRemoveFee("RDIF200");
      }

      if ((classification  == "Manufactured Home (on platted lot)")
        && (!(feeExists("RDIF190", "INVOICED", "VOIDED", "CREDITED"))))
      {
        addFee("RDIF190","PMT_RDIF", "FINAL", housingUnits, "N");
      }

      if ((classification  == "Mfg. Home/Park Model/RV (per space or lot)")
        && (!(feeExists("RDIF200", "INVOICED", "VOIDED", "CREDITED"))))
      {
      
        addFee("RDIF200","PMT_RDIF", "FINAL", housingUnits, "N");
      }
    }

  }

}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}



