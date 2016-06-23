/*===================================================================*/
// Script Number: 061
// Script Name:ENG_preventFinalInspectionScheduling
// Script Developer: Chris Godwin
// Script Agency: Woolpert
// Script Description: Prevent the scheduling of an inspection of type "Final" if the workflow task "Inspections" is active and fees are due.
// 
// Script Run Event: ISB
// Script Parents:
//	ISB;Engineering!Right of Way!~!~.js
/*===================================================================*/

if(inspType == "Final Inspection" && isTaskActive("Inspections") && (balanceDue > 0 || feeTotalByStatus("NEW") > 0)){
	showMessage = true;
	message = "";
	comment("The Final Inspection cannot be scheduled while there is a balance due");
	cancel = true;
}