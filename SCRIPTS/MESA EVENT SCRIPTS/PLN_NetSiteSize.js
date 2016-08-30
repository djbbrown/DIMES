//*===================================================================
//
// Script Number: 70
// Script Name: PLN_NetSiteSize.js
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
// 		calculate the ASI fields Net Site Size (sq ft) and 
//		Net Site Size (acres).
//		Net Site Size (sqft)= Net Site Size (acres) * 43560)
//		Net Site Size (acres) = Net Site Size (sqft)/43560)
//
// Script Run Event: ASA, ASIUA
// Script Parents:
//              ASA;
//		ASIUA;
// 
//==================================================================*/


try
{
  if (
	(appMatch("Planning/Annexation/NA/NA")) ||
	(appMatch("Planning/Design Review/NA/NA")) ||
	(appMatch("Planning/Board of Adjustment/NA/NA")) ||
	(appMatch("Planning/Planning and Zoning/NA/NA")) ||
	(appMatch("Planning/General Plan Amendment-Major/NA/NA")) ||
	(appMatch("Planning/Admin Review/NA/NA"))
	)
  {    
    
  }
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}



