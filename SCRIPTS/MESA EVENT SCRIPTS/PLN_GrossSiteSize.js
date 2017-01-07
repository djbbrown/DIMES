//*===================================================================
//
// Script Number: 69
// Script Name: PLN_GrossSiteSize.js
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
// 		Set the ASI fields "Gross Site Size (sq ft) and 
//		"Gross Site Size (acres). 
//		Gross Site Size (sqft) = Gross Site Size (acres) * 43560)
//		Gross Site Size (acres) = Gross Site Size (sqft)/ 43560)
//
//		Spec Update (10/17/2016)
//		Grab the Gross Site Size (acres) from the Parcel information
//		field "ParcelAttribute.SIZE(ACRES)", and reset the Gross Site
//		Size (acres) ASI field value as well as calculate/update the 
//		Gross Site Size (sqft) ASI field.
//
//              Version 3: updated the way the acres value is grabbed
//              due to a change in system configuration. (bodell)
//
// Script Run Event: ASA, ASIUA
// Script Parents:
//              ASA;Planning/~/~/~
//		ASIUA;Planning/~/~/~
// 
//==================================================================*/


try
{
  if (
	(appMatch("Planning/Design Review/NA/NA")) ||
	(appMatch("Planning/Board of Adjustment/NA/NA")) ||
	(appMatch("Planning/Planning and Zoning/NA/NA"))
	)
  {    
    
    //var acres = AInfo["Gross Site Size (acres)"];  // used in original spec
    //var sqft = AInfo["Gross Site Size (sqft)"];  // used in original spec

    //var acres = AInfo["ParcelAttribute.SIZE(ACRES)"];  // version 2 acres value grab
    var acres = parcelArea;
    var sqft = parseFloat(acres*43560).toFixed(2);
    
    comment("acres: "+ acres);
    comment("sqft: "+sqft);

    editAppSpecific("Gross Site Size (acres)", acres);
    editAppSpecific("Gross Site Size (sqft)", sqft);

  }
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}



