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
tagFieldArray = getGISInfoArray("Accela/AccelaTAGS", "Accela_TAGS", "Accela_TAGS.TAG");
if (tagFieldArray && tagFieldArray.length > 0) {
	if (IsStrInArry("FLDP", tagFieldArray)) {
		addStdCondition("Building Permit", "Flood Plain Authorization");
		addStdCondition("Building Permit", "Footing/Foundation Elevation");
		addStdCondition("Building Permit", "Elevation Certificate");
		editAppSpecific("Flood Zone", "Yes");
	}
}
