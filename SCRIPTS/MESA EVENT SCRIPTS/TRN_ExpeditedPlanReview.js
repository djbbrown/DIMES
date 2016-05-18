/*===================================================================
// Script Number: 59
// Script Name: TRN_ExpeditedPlanReview
// Script Developer: Bryan de Jesus
// Script Agency: Woolpert
// Script Description: On ASA and ASIUA, if the ASI checkbox "Expedited" is checked assess the Expedited Plan Review fee. If it is not checked and the fee is on the record, remove it.
// Script Run Event: ASA, ASIUA
// Script Parents:
//            ASA;Transportation!Temporary Traffic Control!~!~
//            ASIUA;Transportation!Temporary Traffic Control!~!~
/*==================================================================*/
showDebug = true;
if (AInfo["Expedited"] == "CHECKED"){
	updateFee("TTC050", "TTC_GEN", "FINAL", 1, "N", "N");
} else if (feeExists("TTC050", "NEW", "INVOICED")) {
	voidRemoveFee("TTC050");
}