//*===================================================================
//
// Script Number: 332
// Script Name: PLN_NumberOfElevationsReq.js
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
//		The Number Of Elevations ASIT field is required when 
//		"Product Approval" is selected in Type of Process (ASI)
//
// Script Run Event: ASB, ASIUB
// Script Parents:
//		ASB;Planning!Admin Review!NA!NA.js
//		ASIUB;Planning!Admin Review!NA!NA.js
// 
//==================================================================*/

try
{
  var typeOfProcess = AInfo["Type of Process"];
  //mkyOutput += "typeOfProcess: "+typeOfProcess+" \r";

  if (typeOfProcess == "Product Approval")
  {

    //mkyOutput += "Looking for ASIT record \r";

    loadASITable("PRODUCT PLAN DATA");
    var tInfo = PRODUCTPLANDATA;
    var tInfoCount = tInfo.length;
    var x =0;
    var numOfElevations = 0;

    //mkyOutput += "tInfoCount: "+tInfoCount+" \r";

    if (tInfoCount > 0)
    {
      for (x=0;x<tInfoCount;x++)
      {
        numOfElevations = tInfo[x]["Number of Elevations"];
        //mkyOutput += "numOfElevations: "+numOfElevations+" \r";

        if (numOfElevations == null)
        {
          showMessage = true;
          comment("The table PRODUCT PLAN DATA must have a 'Number of Elevations' entry when the Type Of Process field is set to 'Product Approval'. Please add the table entry and try submitting again.");
          cancel = true;
        }
      }
    }
    else
    {
      //mkyOutput += "The table PRODUCT PLAN DATA must have a 'Number of Elevations' entry when the Type Of Process field is set to 'Product Approval'. Please add the table entry and try submitting again. \r";
      showMessage = true;
      comment("The table PRODUCT PLAN DATA must have a 'Number of Elevations' entry when the Type Of Process field is set to 'Product Approval'. Please add the table entry and try submitting again.");
      cancel = true;
    }

  }


}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}





