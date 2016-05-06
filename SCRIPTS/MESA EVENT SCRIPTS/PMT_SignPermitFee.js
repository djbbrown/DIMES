/*===================================================================
// Script Number: 170
// Script Name: PMT_SignPermitFee.js
// Script Developer: Bryan de Jesus
// Script Agency: Woolpert
// Script Description: “Ready to Issue” status is applied to “Plans Coordination” wf task - When status of  “Ready to Issue” status is applied to “Plans Coordination” wf task then Calculate “Sign Permit” Fee” using base fee of $102.40 and adding  3% of total sign valuation (value entered into ASI field “Total Sign Valuation”) and also adding $0.30 per square foot (include total square feet in multiple ASIT fields “Sign Square Footage”)
// Script Run Event: WTUA
// Script Parents:
//            WTUA;Permits!Sign!NA!NA
/*==================================================================*/
showDebug = true;
if	(wfTask == "Plans Coordination" && wfStatus == "Ready to Issue") {
	var totalSignValuation = AInfo["Total Sign Valuation"];
	var totalSignSqFt = AInfo["Total Sign Square Footage"];
	var totalFee = 102.4 + 0.03 * totalSignValuation + 0.3 * totalSignSqFt;
	logDebug("Total Fee: " + totalFee);
	var fees = loadFees();
	var feeSeq;
	if (!!fees) {
		for (var i=0; i<fees.length; i++){
			if (fees[i].code.equals("SGN020")){
				feeSeq = fees[i].sequence;
				var fee = aa.fee.getFeeItemByPK(capId, feeSeq);
				if (!!fee){
					logDebug("Setting fee amount $" + totalFee);
					fee.setFee(totalFee);
				}
			}
		}
	}
	
}
 