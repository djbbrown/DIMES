//*===================================================================
//
// Script Number: 71
// Script Name: PLN_GrossDUACCalc.js
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
// 		Calculate "Gross DU/AC" ASI field. 
//		Calculation =  ((“Total New Lots” + “Total New Units”) / “Gross Site Size (acres)”)
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

    var acres = 0.0;
    var newLots = 0.0;
    var newUnits = 0.0;
    var duac = 0.0;

    if (AInfo["Total New Lots, Tracts, Parcels"] == null)
    {
      newLots = 0.0;
    }
    else
    {
      newLots = parseFloat(AInfo["Total New Lots, Tracts, Parcels"]);
    }

    
    if (AInfo["Total New Dwelling Units"] == null)
    {
      newUnits = 0.0;
    }
    else
    {
      newUnits = parseFloat(AInfo["Total New Dwelling Units"]);
    }

  
    if (AInfo["Gross Site Size (acres)"] == null)
    {
      acres = 0.0;
    }
    else
    {
      acres = parseFloat(AInfo["Gross Site Size (acres)"]);
    }

    
    if (acres > 0)
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



