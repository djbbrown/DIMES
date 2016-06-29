/*===================================================================
// Script Number: 90
// Script Name: PMT_FloodControlPermit.js
// Script Developer: Bryan de Jesus
// Script Agency: Woolpert
// Script Description: "If the parcel tag is in flood district, this will show and is required".
// Script Run Event: ASA
// Script Parents:
// 		ASA;Permits!Online!NA!NA
//		ASA;Permits!Commercial!NA!NA
//		ASA;Permits!Residential!NA!NA
//		ASA;Permits!Demolition!NA!NA
//		ASA;Permits!Residential!Mobile Home!NA
//		ASA;Permits!Sign!NA!NA
/*==================================================================*/
showDebug = false;
// check for presence in flood plain
var floodPlainId = getGISInfo("Accela/Accela_Base", "Flood Plain Area", "Accela_TAGS.OBJECTID");
if (!!floodPlainId) {
	addStdCondition("Building Permit", "Flood Plain Authorization");
	addStdCondition("Building Permit", "Footing/Foundation Elevation");
	addStdCondition("Building Permit", "Elevation Certificate");
}