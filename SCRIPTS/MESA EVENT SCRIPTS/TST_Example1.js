/*===================================================================
// Script Number: 00000
// Script Name: TST_Example1.js
// Script Developer: 
// Script Agency: Mesa
// Script Description: 
//		Brown Bag Example 1
//
//
// Script Run Event: ASIUA
// Script Parents:
//            ASIUA;Permits!Master Plan!NA!NA
/*==================================================================*/

try
{
  

loadASITables();
var tInfo = OCCUPANCYINFORMATION;
var rowCount = OCCUPANCYINFORMATION.length;

var typeOfConstruction = "";
var totalSqFt = 0;


  for (x=0;x<=(rowCount-1);x++)
  {
    typeOfConstruction = tInfo[x]["Type of Construction"];
    //mkyOutput += "typeOfConstruction = "+typeOfConstruction+" \r";
    comment("typeOfConstruction = "+typeOfConstruction);

    totalSqFt += parseInt(tInfo[x]["Sq Ft"]);
    //mkyOutput += "totalSqFt = "+totalSqFt+" \r";    
    comment("totalSqFt = "+totalSqFt);
  }

comment("totalSqFt = "+totalSqFt);
editAppSpecific("Submittal Cycle", totalSqFt);
  
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}



