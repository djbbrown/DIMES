/*===================================================================
// Script Number: 359
// Script Name: ANI_UpdateWorkfowOnInspectionResult.js
// Script Developer: Jody Bearden
// Script Agency: Mesa
// Script Description: When any inspection is resulted with any
//                     result, update the workflow task "Animal
//                     Control Officer" to the same status.
// Script Run Event: ISA
// Script Parents:
//            ISA;Animal Control!~!~!~
===================================================================*/
/* test with  ANI16-00033 */

try
{
	logDebug("ANI_UpdateWorkfowOnInspectionResult.js called...");
	// get result of currently resulted inspection
	var status = inspResult;
	logDebug("status: " + status);
	if (status) {
		// update WF task
		logDebug("status: " + status);
		setTask("Animal Control Officer", "Y", "N");
		updateTask("Animal Control Officer", status, "Updated by script.", "Updated by script.");
	}
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}