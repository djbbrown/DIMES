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
/* test with PMT16-01064 */

try
{

	if (wfTask == "Application Submittal" && wfStatus == "Ready To Issue") {
		if (matches(getAppSpecific("Same Day Turn On - Gas"), "Y", "CHECKED")) {
			if (feeExists("ONL080", "NEW")) { voidRemoveFee("ONL080"); }
			addFee("ONL080", "PMT_ONL", "FINAL", 1, "N");
		}
		if (matches(getAppSpecific("Same Day Turn On - Electric"), "Y", "CHECKED")) {
			if (feeExists("ONL090", "NEW")) { voidRemoveFee("ONL090"); }
			addFee("ONL090", "PMT_ONL", "FINAL", 1, "N");
		}
	}
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}
