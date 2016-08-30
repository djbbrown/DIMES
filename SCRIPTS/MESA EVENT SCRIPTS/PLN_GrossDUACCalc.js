//*===================================================================
//
// Script Number: 71
// Script Name: PLN_GrossDUACCalc.js
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
// 		Calculate "Gross DU/AC" ASI field. 
//		Calculation =  ((“Total New Lots” + “Total New Units”) / “Net Site Size (acres)”)
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
    var newLots = AInfo["Total New Lots, Tracts, Parcels"];
    var newUnits = AInfo["Total New Dwelling Units"];
    var duac = 0.0;

    if (newLots == null)
    {
      newLots = 0;
    }
    
    if (newUnits == null)
    {
      newUnits = 0;
    }
    
    if ((acres != null) && (acres > 0))
    {
      duac = ((newLots + newUnits) / acres).toFixed(2);
    }

    editAppSpecific("Gross DU/AC", duac);

  }
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}



