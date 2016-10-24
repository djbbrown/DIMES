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


    var acres = 0.0;
    var newDwellingUnits = 0.0;
    var duac = 0.0;
    
    if (AInfo["Total New Dwelling Units"] == null)
    {
      newDwellingUnits = 0.0;
    }
    else
    {
      newDwellingUnits = parseFloat(AInfo["Total Existing Lots"]);
    }    

    if (AInfo["Net Site Size (acres)"] == null)
    {
      acres = 0.0;
    }
    else
    {
      acres = parseFloat(AInfo["Net Site Size (acres)"]);
    }

    if (acres > 0)
    {
      duac = (newDwellingUnits / acres).toFixed(2);
    }

    editAppSpecific("Net DU/AC", duac);
    
  }
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}



