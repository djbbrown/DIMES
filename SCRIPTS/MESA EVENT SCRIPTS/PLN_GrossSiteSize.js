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
  if (appTypeArray[0] == "Planning")
  {    
    
    // this is a temp Accela fix for the parcelArea global variable bug
    loadParcelArea();

    //var acres = AInfo["Gross Site Size (acres)"];  // used in original spec
    //var sqft = AInfo["Gross Site Size (sqft)"];  // used in original spec

    //var acres = AInfo["ParcelAttribute.SIZE(ACRES)"];  // version 2 acres value grab
	var totAcres = 0;
	var totSqft = 0;
    var acres = parcelArea;
    var sqft = parseFloat(acres*43560).toFixed(2);
    
    comment("acres: "+ acres);
    comment("sqft: "+sqft);
	
	// ACA retrieve addtl parcel numbers area 
	var rAddtlPrcNmbrArea = 0;
	if(publicUser){
		var addtlParNmbrs = loadASITable("ADDITIONAL PARCEL NUMBERS");
		if(addtlParNmbrs.length > 0){
		for(xxx in addtlParNmbrs) { 
			rAddtlPrcNmbrArea+=parseFloat(getParcelAreaFromRefParcel(addtlParNmbrs[xxx]["Parcel Number"]));
			//logDebug("rAddtlPrcNmbrArea = " + rAddtlPrcNmbrArea);
		}
	}
	//logDebug("rAddtlPrcNmbrArea = " + rAddtlPrcNmbrArea);
	}

	totAcres = Math.ceil(acres) + Math.ceil(rAddtlPrcNmbrArea);
	totSqft = Math.ceil(sqft) + Math.ceil((rAddtlPrcNmbrArea*43560).toFixed(2));
	
	//logDebug("totAcres = " + totAcres);
	//logDebug("totSqft = " + totSqft);
	
    editAppSpecific("Gross Site Size (acres)", totAcres);
    editAppSpecific("Gross Site Size (sqft)", totSqft);

  }
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}