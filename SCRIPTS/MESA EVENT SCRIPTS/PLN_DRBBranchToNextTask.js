/*===================================================================
// Script Number: 360
// Script Name: PLN_DRBBranchToNextTask.js
// Script Developer: Jody Bearden
// Script Agency: Mesa
// Script Description: When wfTask "Review Consolidation" has task
//                     status "DR Board"
//                     1) set wfTask "Review Consolidation" as
//                        completed and not active
//                     2) activate task "Staff Report".
// Script Run Event: WTUA
// Script Parents:
//            WTUA;Planning!Design Review!NA!NA
===================================================================*/
/* test with DRB16-00337 */

try
{
	if (wfTask == "Review Consolidation" && wfStatus == "DR Board") {
		setTask("Review Consolidation", "N", "Y");
		setTask("Staff Report", "Y", "N");
	}
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}