/*===================================================================
// Script Number: 216
// Script Name: PMT_ResubmittalFee.js
// Script Developer: Bryan de Jesus
// Script Agency: Woolpert
// Script Description: Assess when a status of "Resubmitted" is set on the "Plan Distribution" task on the 4th resubmittal and every resubmittal after. ASI field "Submittal Cycle" holds the number of resubmittals.
// Script Run Event: WTUA
// Script Parents:
//            WTUA;Permits!Residential!NA!NA
//            WTUA;Permits!Commercial!NA!NA
/*==================================================================*/
var submittalCycle = parseInt(AInfo["Submittal Cycle"]);
var feeQty = submittalCycle - 3;
if (wfTask == "Plans Distribution" && wfStatus == "Revisions Received" && submittalCycle >= 4){
	logDebug("Assessing fee");
	logDebug("Fee quantity: " + feeQty);
	// Permits/Commercial/NA/NA
	if (appMatch("Permits/Commercial/NA/NA")){
		if (feeExists("COM130", "INVOICED")) voidRemoveFee("COM130");
		updateFee("COM130", "PMT_COM", "FINAL", feeQty, "N");
	}
	// Permits/Residential/NA/NA
	if (appMatch("Permits/Residential/NA/NA")){
		if (feeExists("RES170", "INVOICED")) voidRemoveFee("RES170");
		updateFee("RES170", "PMT_RES", "FINAL", feeQty, "N");
	}
	//============ NEW 2016/11/10 ============
	// Permits/Master Plan/NA/NA
	if (appMatch("Permits/Master Plan/NA/NA")){
		if (feeExists("MST030", "INVOICED")) voidRemoveFee("MST030");
		updateFee("MST030", "PMT_MST", "FINAL", feeQty, "N");
	}
	// Permits/Sign/NA/NA
	if (appMatch("Permits/Sign/NA/NA")){
		if (feeExists("SGN170", "INVOICED")) voidRemoveFee("SGN170");
		updateFee("SGN170", "PMT_SIGNS", "FINAL", feeQty, "N");
	}
	// Permits/Residential/Mobile Home/NA
	if (appMatch("Permits/Residential/Mobile Home/NA")){
		if (feeExists("MH100", "INVOICED")) voidRemoveFee("MH100");
		updateFee("MH100", "PMT_MOBILE HOME", "FINAL", feeQty, "N");
	}
	// Permits/Addenda or Deferred/NA/NA
	if (appMatch("Permits/Addenda or Deferred/NA/NA")){
		if (feeExists("PMT120", "INVOICED")) voidRemoveFee("PMT120");
		updateFee("PMT120", "PMT_ADD", "FINAL", feeQty, "N");
	}
	//========== END NEW 2016/11/10 ==========
}