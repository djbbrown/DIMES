/*===================================================================
// Script Number: 170
// Script Name: PMT_SignPermitFee.js
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: "Ready to Issue" status is applied to "Plans Coordination" wf task - When status of  "Ready to Issue" status is applied to "Plans Coordination" wf task then Calculate "Sign Permit Fee" using base fee of $102.40 and adding  3% of total sign valuation (value entered into ASI field "Total Sign Valuation") and also adding $0.30 per square foot (include total square feet in multiple ASIT fields "Sign Square Footage")
// Script Run Event: WTUA
// Script Parents:
//            WTUA;Permits!Sign!NA!NA
/*==================================================================*/
showDebug = true;
if	(
		(wfTask == "Plans Coordination" && wfStatus == "Ready to Issue")
		|| (wfTask == "Application Submittal" && wfStatus == "Accepted - Plan Review Not Req")
	){
	var pmtSignDep = 0;
	pmtSignDep = feeAmount("SGN010","NEW","INVOICED");
	var pmtSignDepExp = 0;
	pmtSignDepExp = feeAmount("SGN130","NEW","INVOICED");
	//logDebug("pmtSignDepExp = " + pmtSignDepExp);
	var pmtSignDepSupExp = 0;
	pmtSignDepSupExp = feeAmount("SGN140","NEW","INVOICED");
	//logDebug("pmtSignDepSupExp = " + pmtSignDepSupExp);
	var totalSignValuation = AInfo["Total Sign Valuation"];
	var totalSignSqFt = AInfo["Total Sign Square Footage"];
	var totalFee = 102.4 + 0.03 * totalSignValuation + 0.3 * totalSignSqFt;
	//logDebug("totalFee = " + totalFee);
	//var totalFeeExp = getSubGrpFeeAmt("EXPIDITE","NEW");
	//var totalFeeSupExp = getSubGrpFeeAmt("SUPEXP","NEW");
	var totalAdjFee = totalFee - pmtSignDep;
	var totalAdjFeeExp = totalFee - pmtSignDepExp;
	var totalAdjFeeSupExp = ((totalFee * 2) - pmtSignDepSupExp);
	//logDebug("totalAdjFee = " + totalAdjFee);
	//logDebug("totalAdjFeeExp = " + totalAdjFeeExp);
	//logDebug("totalAdjFeeSupExp = " + totalAdjFeeSupExp);
	
	var signTypeFound = false;
	var signInfo = loadASITable("SIGN INFO");
	
	if (signInfo != null) {
		for (x in signInfo) {
			var row = signInfo[x];
			var	signType = row["Type of Work"];
			if (matches(signType,"Sign","Freeway Landmark Monument")) signTypeFound = true;
		}
	}
	
	logDebug("signTypeFound = " + signTypeFound);
	if (signTypeFound){
		updateFee("SGN020", "PMT_SIGNS", "FINAL", totalAdjFee, "N");
		// Expedite Fee
		if(AInfo["Expedite"]=="Expedite"){
		// Add the extra fee for expedite
		updateFee("SGN110", "PMT_SIGNS", "FINAL", totalAdjFeeExp, "N");
		}
		// Super Expedite Fee
		if(AInfo["Expedite"]=="Super Expedite"){
		// Add the extra fee for expedite
		updateFee("SGN120", "PMT_SIGNS", "FINAL", totalAdjFeeSupExp, "N");
		}
	}
	
}