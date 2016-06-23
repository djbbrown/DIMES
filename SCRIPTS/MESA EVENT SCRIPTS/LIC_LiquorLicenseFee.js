/*===================================================================
// Script Number: 087
// Script Name: LIC_LiquorLicenseFee.js 
// Script Developer: Raminder Gill
// Script Agency: Accela
// Script Description: 
// 		On a Licenses/Liquor/Liquor/Application, assess and invoice the annual liquor license fee 
// 		when the workflow task “Issue License” is set to a status of “Ready to Issue”. 
// 		On a Licenses/Liquor/Liquor/Renewal, assess and invoice the annual liquor license fee 
// 		when the workflow task “Renewal Intake” is set to a status of “Submitted”, set by Mesa.
// Script Run Event: WTUA
// Script Parents:
// WTUA: Licenses/Liquor/Liquor/Application 
// WTUA: Licenses/Liquor/Liquor/Renewal 
// 
/*==================================================================*/

var valSeries = getAppSpecific("Series Type");

if (wfTask == "Issue License" && wfStatus == "Ready To Issue"){
if ((valSeries== "1" ||  valSeries== "2" || valSeries== "3" || valSeries== "4" || valSeries== "13") && !feeExists("L030")) 
{
	addFee("L030","LIC_LIQUOR", "FINAL",  1, "N");
}
if ((valSeries== "6" ||  valSeries== "7" || valSeries== "8" || valSeries== "10" || valSeries== "14") && !feeExists("L040")) 
{
	addFee("L040","LIC_LIQUOR", "FINAL",  1, "N");
}
}

if (wfTask == "Renewal Intake" && wfStatus == "Submitted"){
if ((valSeries== "1" ||  valSeries== "2" || valSeries== "3" || valSeries== "4" || valSeries== "13") && !feeExists("L010")) 
{
	addFee("L010","LIC_LIQ_RNWL", "FINAL",  1, "N");
}
if ((valSeries== "6" ||  valSeries== "7" || valSeries== "8" || valSeries== "10" || valSeries== "14") && !feeExists("L020")) 
{
	addFee("L020","LIC_LIQ_RNWL", "FINAL",  1, "N");
}
}