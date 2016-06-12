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
// check for presence in flood plain
var floodPlainId = getGISInfo("Accela/Accela_Base", "Flood Plain Area", "Accela_TAGS.OBJECTID");
if (!!floodPlainId) {
	addStdCondition("BuildingPermit", "Flood Plain Authorization");
	addStdCondition("BuildingPermit", "Footing/Foundation Elevation");
	addStdCondition("BuildingPermit", "Elevation Certificate");
}