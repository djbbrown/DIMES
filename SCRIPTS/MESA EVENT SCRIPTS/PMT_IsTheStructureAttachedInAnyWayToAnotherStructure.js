/*===================================================================
// Script Number: 107
// Script Name: PMT_IsTheStructureAttachedInAnyWayToAnotherStructure.js
// Script Developer: Bryan de Jesus
// Script Agency: Woolpert
// Script Description: If ASI field “Is the structure attached in any 
// 		way to another structure?” is “Yes” then applicant should not 
//		be allowed to submit application. Instead they would need to 
//		apply for a Remodel permit.
// Script Run Event: ASB
// Script Parents:
//            ASB;Permitting!Demolition!NA!NA
/*==================================================================*/

if (getAppSpecific("Is the structure attached in any way to another structure?", capId) === "Yes") {
	showMessage = true; 
	comment("The applicant must apply for a Remodel permit when demolishing a structure that is attached to another structure."); 
	cancel = true;
}