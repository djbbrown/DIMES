//*===================================================================
//
// Script Number: 72
// Script Name: PLN_NetDUACCalc.js
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
// 		Calculate "Net DU/AC" ASI field. 
//		Calculation =  ((�Total Existing Lots� + �Existing Units�) / ""Net Site Size (acres)�) 
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

    var acres = parseFloat(AInfo["Net Site Size (acres)"]);
    var existingLots = parseFloat(AInfo["Total Existing Lots"]);
    var existingUnits = parseFloat(AInfo["Existing Dwelling Units"]);
    var duac = 0.0;
    
    if ((existingLots == null) || (existingLots == "Nan"))
    {
      existingLots = 0;
    } 
    
    if ((existingUnits == null) || (existingUnits == "Nan"))
    {
      existingUnits = 0;
    }

    if ((acres != null) && (acres > 0) && (acres != "Nan"))
    {
      showMessage = true;
      comment("("+existingLots+" + "+existingUnits+") / "+acres +"");
      comment(""+ ((existingLots + existingUnits) / acres) + "");
      duac = ((existingLots + existingUnits) / acres).toFixed(2);
      comment("duac: " + duac);
    }

    editAppSpecific("Net DU/AC", duac);
    
  }
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}



