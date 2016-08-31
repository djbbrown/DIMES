//*===================================================================
//
// Script Number: 72
// Script Name: PLN_NetDUACCalc.js
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
// 		Calculate "Net DU/AC" ASI field. 
//		Calculation =  ((“Total Existing Lots” + “Existing Units”) / ""Net Site Size (acres)”) 
//
// Script Run Event: ASA, ASIUA
// Script Parents:
//              ASA;Planning/~/~/~
//		ASIUA;Planning/~/~/~
// 
//==================================================================*/

//(appMatch("Planning/Design Review/NA/NA"))

// waiting on configuration changes to include other record types

try
{
  if (
      (appMatch("Planning/Planning and Zoning/NA/NA"))
     )
  { 

    var acres = AInfo["Net Site Size (acres)"];
    var existingLots = AInfo["Total Existing Lots"];
    var existingUnits = AInfo["Existing Dwelling Units"];
    var duac = 0.0;
    
    if (existingLots == null)
    {
      existingLots = 0;
    }
    
    if (existingUnits == null)
    {
      existingUnits = 0;
    }

    if ((acres != null) && (acres > 0))
    {
      duac = ((existingLots + existingUnits) / acres).toFixed(2);
    }

    editAppSpecific("Net DU/AC", duac);
    
  }
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}



