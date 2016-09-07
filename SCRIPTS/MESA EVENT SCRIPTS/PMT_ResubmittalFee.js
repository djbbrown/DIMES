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
	if (appMatch("Permits/Commercial/NA/NA")){
		if (feeExists("COM130", "INVOICED")) voidRemoveFee("COM130");
		updateFee("COM130", "PMT_COM", "FINAL", feeQty, "N");
	}
	if (appMatch("Permits/Residential/NA/NA")){
		if (feeExists("RES170", "INVOICED")) voidRemoveFee("RES170");
		updateFee("RES170", "PMT_RES", "FINAL", feeQty, "N");		
	}		
}
	