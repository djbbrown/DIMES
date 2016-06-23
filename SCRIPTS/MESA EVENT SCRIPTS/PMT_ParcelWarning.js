/*===================================================================
// Script Number: 98
// Script Name: PMT_ParcelWarning.js
// Script Developer: Bryan de Jesus
// Script Agency: Woolpert
// Script Description: 	If the parcel tag is one of the following put a warning flag on this record: Az Water ASU
// Script Run Event: ASA
// Script Parents:
// 		ASA;Permits!~!~!~
/*==================================================================*/
// check for GIS tag
var gisTags = getGISInfoArray("Accela/AccelaTAGS", "Accela_TAGS", "Accela_TAGS.TAG");
for (tag in gisTags){
	if (gisTags[tag] == "AWCP")
		addStdCondition("BuildingPermit", "Arizona Water Company");
	else if (gisTags[tag] == "ASU" || gisTags[tag] == "ASUE")
		addStdCondition("BuildingPermit", "ASU Impact Fee");
}