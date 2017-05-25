//*===================================================================
//
// Script Number: 70
// Script Name: PLN_NetSiteSize.js
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
// 		calculate the ASI fields Net Site Size (sq ft) and Net Site Size (acres).
//		Net Site Size (sqft) = Net Site Size (acres) * 43560)
//		Net Site Size (acres) = Net Site Size (sqft) / 43560)
//
//              Version 2: updated the way the acres value is grabbed
//              due to a change in system configuration. (bodell)
//
// Script Run Event: ASA, ASIUA
// Script Parents:
//              ASA;Planning/~/~/~
//		ASIUA;Planning/~/~/~
// 
//==================================================================*/


try
{
  if (appTypeArray[0] == "Planning")
  {    
    
    // this is a temp Accela fix for the parcelArea global variable bug
    loadParcelArea();

    var acres = AInfo["Net Site Size (acres)"];  // old way
    var pAcres = parcelArea;
    var sqft = AInfo["Net Site Size (sqft)"];
    
    if (acres == null)
    {
      if (sqft != null)
      {
        acres = sqft/43560;
      }
      else
      {
        acres = pAcres;
      }
      editAppSpecific("Net Site Size (acres)", acres);
    }
    
    if (sqft == null)
    {
      if (acres != null)
      {
        sqft = acres*43560;
      }
      else
      {
        sqft = pAcres*43560;
      }
      editAppSpecific("Net Site Size (sqft)", sqft);
    }

  }
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}



