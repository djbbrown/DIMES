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
copyParcelGisObjects();

if (inspResult == "Roll Over") {
	var InspectionArea;
	var inspectorId;
	
	// get the inspector's ID for specific area
	InspectionArea = getGISInfo("MESA","Building_Inspection_Areas","BSDIA");
	InspectionArea = "Building_Inspection_Areas-" + InspectionArea;
	inspectorId = lookup("USER_DISTRICTS", InspectionArea);
	
	logDebug("The Inspection Area is: " + InspectionArea + ".");
	logDebug("The Inspector is: " + inspectorId + ".");
	
	scheduleInspectionDateWithInspector(inspType, nextWorkDay(), inspectorId);	
}