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
showDebug = true;
var submittalCycle = AInfo["Submittal Cycle"];
logDebug(typeof(submittalCycle));
logDebug(AInfo["Submittal Cycle"]);
if (wfTask == "Plans Distribution" && wfStatus == "Revisions Received" && submittalCycle >= 4){
	logDebug("Assessing fee");
	logDebug("Fee quantity: " + submittalCycle-3);
	if (appMatch("Permits/Commercial/NA/NA")){
		if (feeExists("COM130", "INVOICED")) voidRemoveFee("COM130");
		updateFee("COM130", "PMT_COM", "FINAL", submittalCycle-3, "N");
	}
	if (appMatch("Permits/Residential/NA/NA")){
		if (feeExists("RES170", "INVOICED")) voidRemoveFee("RES170");
		updateFee("RES170", "PMT_RES", "FINAL", submittalCycle-3, "N");		
	}
}
	