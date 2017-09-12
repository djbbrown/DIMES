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
/* MODIFICATIONS
// DATE         ENGINEER            DESCRIPTION
// 08/23/2017   Steve Allred        Removed the setTask code per Shannon Gross.
//
//
/* test with  ANI16-00033 */

try
{
	// get result of currently resulted inspection
	var status = inspResult;
	if (status) {
		// update WF task
		//setTask("Animal Control Officer", "Y", "N");
		updateTask("Animal Control Officer", status, "Updated by script.", "Updated by script.");
		closeWorkflow();
	}
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}