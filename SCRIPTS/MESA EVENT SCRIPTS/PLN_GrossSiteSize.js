//*===================================================================
//
// Script Number: 69
// Script Name: PLN_GrossSiteSize.js
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
// 		Set the ASI fields "Gross Site Size (sq ft) and 
//		"Gross Site Size (acres). 
//		Gross Site Size (sqft) = Gross Site Size (acres) * 43560)
//		Gross Site Size (acres) = Gross Site Size (sqft)/ 43560)
//
// Script Run Event: ASA, ASIUA
// Script Parents:
//              ASA;Planning/~/~/~
//		ASIUA;Planning/~/~/~
// 
//==================================================================*/


try
{
  if (
	(appMatch("Planning/Design Review/NA/NA")) ||
	(appMatch("Planning/Board of Adjustment/NA/NA")) ||
	(appMatch("Planning/Planning and Zoning/NA/NA"))
	)
  {    
    
    var acres = AInfo["Gross Site Size (acres)"];
    var sqft = AInfo["Gross Site Size (sqft)"];
    
    if (acres == null)
    {
      if (sqft != null)
      {
        acres = sqft/43560;
      }
      editAppSpecific("Gross Site Size (acres)", acres);
    }
    
    if (sqft == null)
    {
      if (acres != null)
      {
        sqft = acres*43560;
      }
      editAppSpecific("Gross Site Size (sqft)", sqft);
    }

  }
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}



