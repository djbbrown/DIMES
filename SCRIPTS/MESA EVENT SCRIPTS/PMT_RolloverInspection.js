/*===================================================================
// Script Number: 95
// Script Name: PMT_RolloverInspection.js
// Script Developer: Bryan de Jesus
// Script Agency: Woolpert
// Script Description: When an inspection of any type is resulted with a status of "Roll Over", schedule a new inspection of the same type.
// Script Run Event: IRSA
// Script Parents:
//            IRSA;Permits!Online!NA!NA
//            IRSA;Permits!Demolition!NA!NA
//            IRSA;Permits!Residential!Mobile Home!NA
//            IRSA;Permits!Sign!NA!NA
//            IRSA;Permits!Residential!NA!NA
//            IRSA;Permits!Commercial!NA!NA
/*==================================================================*/
if (inspResult == "Roll Over") {
	// get the last inspector's ID
	var inspectorId = getLastInspector(inspType);
	scheduleInspectionDateWithInspector(inspType, nextWorkDay(), inspectorId);
}