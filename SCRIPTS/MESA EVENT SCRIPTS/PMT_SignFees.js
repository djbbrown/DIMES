/*===================================================================
// Script Number: 172
// Script Name: PMT_SignFees.js
// Script Developer: Bryan de Jesus
// Script Agency: Woolpert
// Script Description: “Ready to Issue” status is applied to “Plans Coordination” wf task - When status of  “Ready to Issue” status is applied to “Plans Coordination” wf task then Calculate “Sign Permit” Fee” using base fee of $102.40 and adding  3% of total sign valuation (value entered into ASI field “Total Sign Valuation”) and also adding $0.30 per square foot (include total square feet in multiple ASIT fields “Sign Square Footage”)
// Script Run Event: ASA, ASIUA
// Script Parents:
//            ASA;Permits!Sign!NA!NA
//			  ASIUA;Permits!Sign!NA!NA
/*==================================================================*/
showDebug = true;
var t = loadASITable("SIGN INFO");
if (!!t){
	logDebug(t);
} else {
	logDebug("Did not find table 'SIGN INFO'");
}