/*===================================================================
// Script Number: 59
// Script Name: ENG_ExpeditedPlanReview
// Script Developer: Bryan de Jesus
// Script Agency: Woolpert
// Script Description: On ASA and ASIUA, if the ASI checkbox "Expedited" is checked assess the Expedited Plan Review fee. If it is not checked and the fee is on the record, remove it.
// Script Run Event: ASA, ASIUA
// Script Parents:
//            ASA;Engineering!Utilities!Non City!~
//            ASIUA;Engineering!Utilities!Non City!~
/*==================================================================*/
if (AInfo["Expedited"] == "CHECKED" && !feeExists("UTL0130", "NEW", "INVOICED")){
	addFee("UTL0130", "ENG_NON-CITY UTILITIES", "FINAL", 1, "N");
} else if (feeExists("UTL0130", "NEW", "INVOICED")) {
	voidRemoveFee("UTL0130");
}