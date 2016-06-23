/*===================================================================
// Script Number: 57
// Script Name: ENG_RolloverInspectionResult
// Script Developer: Bryan de Jesus
// Script Agency: Woolpert
// Script Description: If an inspection of any type is resulted with a status of "Roll Over" and a pending inspection to the record of the same type.
// Script Run Event: IRSA
// Script Parents:
//          IRSA;Engineering!~!~!~
/*==================================================================*/

if (inspResult == "Roll Over") {
	scheduleInspectDate(inspType, nextWorkDay());
}