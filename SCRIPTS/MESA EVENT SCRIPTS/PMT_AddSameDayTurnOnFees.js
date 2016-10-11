/*===================================================================
// Script Number: 348
// Script Name: PMT_AddSameDayTurnOnFees.js
// Script Developer: Jody Bearden
// Script Agency: Mesa
// Script Description: When wfTask "Application Submittal" has
//                     wfTaskStatus = 'Ready To Issue': If ASI field
//                     "Same Day Turn On - Gas" = 'Y', add 'Same Day
//                     Turn On' Fee, fee schedule = PMT_ONL,
//                     fee code = 'ONL080'. If ASI field "Same Day
//                     Turn On - Electric" = 'Y', add 'Same Day Turn
//                     On Fee', fee schedule = PMT_ONL, fee code = 'ONL090'.
//
// Script Run Event: WTUA
// Script Parents:
//             WTUA;Permits!Online!NA!NA
/*==================================================================*/
/* test with PMT16-00738, PMT16-01007, PMT16-00932, PMT16-01046, PMT16-01052 */

try
{
	//logDebug("Script348 called...");
	if (wfTask == "Application Submittal" && wfStatus == "Ready To Issue") {
		if (matches(getAppSpecific("Same Day Turn On - Gas"), "Y", "CHECKED")) {
			if (feeExists("ONL080", "NEW")) { voidRemoveFee("ONL080"); }
			logDebug("Adding fee ONL080");
			addFee("ONL080", "PMT_ONL", "FINAL", 1, "N");
		} else { logDebug("Same Day Turn On - Gas not checked"); }
		if (matches(getAppSpecific("Same Day Turn On - Electric"), "Y", "CHECKED")) {
			if (feeExists("ONL090", "NEW")) { voidRemoveFee("ONL090"); }
			logDebug("Adding fee ONL090");
			addFee("ONL090", "PMT_ONL", "FINAL", 1, "N");
		} else { logDebug("Same Day Turn On - Electric not checked"); }
	} else { logDebug("Script 348 - not set to: wfTask Application Submittal and wfStatus Ready to Issue"); }
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}
