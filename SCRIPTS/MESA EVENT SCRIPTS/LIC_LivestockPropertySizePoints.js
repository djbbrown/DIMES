//*===================================================================
//
// Script Number: 48
// Script Name: LIC_LivestockPropertySizePoints.js
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
// 		Populate the ASI field "Property Size Points" with 
//		a value calculated based on "Property Size" ASI field 
//		value.
//		Calculations:
//		  Non-Lehi
//			35,000-43,560 sq ft => 1 pt
//			each additional 10,890 sq ft => 1pt
//		  Lehi
//			35,000-43,560 sq ft => 1 pt
//			each additional 5,445 sq ft => 1pt
//
// Script Run Event: ASA / ASIUA
// Script Parents:
//             ASA:Licenses/General/Livestock/Application
//             ASIUA:Licenses/General/Livestock/Application
// 
//==================================================================*/


try
{
  var propertySqFt = AInfo["Property Size"];
  var propertySizePoints = 0;
  var inLehi = AInfo["In Lehi Sub Area"];

  if (propertySqFt >= 35000)
  {
    propertySizePoints = 1;
    propertySqFt = propertySqFt - 43500;

    if (inLehi == "No")
    {
      while (propertySqFt >= 10890)
      {
        propertySizePoints++;
        propertySqFt = propertySqFt - 10890;
      }
    }
    else
    {
      while (propertySqFt >= 5445)
      {
        propertySizePoints++;
        propertySqFt = propertySqFt - 5445;
      }
    }
  }
  
  editAppSpecific("Property Size Points", propertySizePoints);

}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}





