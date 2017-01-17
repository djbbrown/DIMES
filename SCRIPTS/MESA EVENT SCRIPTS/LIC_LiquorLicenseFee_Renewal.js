/*===================================================================
// Script Number: 087
// Script Name: LIC_LiquorLicenseFee_Renewal.js 
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: 
// 		On a Licenses/Liquor/Liquor/Renewal, assess and invoice the annual liquor license fee 
// 		
// Script Run Event: ASA
// Script Parents:
// ASA: Licenses/Liquor/Liquor/Renewal 
// 
/*==================================================================*/

var valSeries = getAppSpecific("Series Type");


if (wfTask == "Renewal Intake" && wfStatus == "Submitted"){

	
//Annual Fee Series 1-4,8 and 13
if ((valSeries== "1" ||  valSeries== "2" || valSeries== "3" || valSeries== "4" || valSeries== "8" || valSeries== "11" || valSeries== "12" || valSeries== "13") && !feeExists("L010")) 
	{
		addFee("L010","LIC_LIQ_RNWL", "FINAL",  1, "Y");
	}
// Annual Fee Series 6,7,8,10,14
if ((valSeries== "6" ||  valSeries== "7" || valSeries== "9" || valSeries== "10" || valSeries== "14") && !feeExists("L020")) 
	{
		addFee("L020","LIC_LIQ_RNWL", "FINAL",  1, "Y");
	}



