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
  
  
  var modelNumber = AInfo["Model Number"];
  //mkyOutput += "modelNumber: "+modelNumber+" \r";
  comment("modelNumber: "+modelNumber);

  if (modelNumber == "1600")
  {
    editAppSpecific("Builder Name", "JPL")
    //mkyOutput += "Builder Name = JPL \r";
    comment("Builder Name = JPL");
  }

  if (modelNumber == "1500")
  {
    editAppSpecific("Builder Name", "PULTE")
    //mkyOutput += "Builder Name = PULTE \r";
    comment("Builder Name = PULTE");
  }

}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}



