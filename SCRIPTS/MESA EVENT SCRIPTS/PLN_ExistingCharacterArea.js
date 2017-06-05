/*===================================================================
// Script Number: 152
// Script Name: PLN_ExistingCharacterArea.js
// Script Developer: Bryan de Jesus
// Script Agency: Woolpert
// Script Description: Script to Populated by GIS Character Area layer.
// The current valid values are:
// Downtown
// Employment District
// Mixed Use Activity District
// Mixed Use Community
// Neighborhood
// Neighborhood Village Center
// Park/Open Space
// Specialty District
// Transit District
// Script Run Event: ASA
// Script Parents:
//            ASA;Planning!Design Review!NA!NA  
/*==================================================================*/
var charArea = getGISInfo("Planning/GeneralPlan", "GeneralPlan2040", "CharacterArea");
logDebug("Existing character area: " + charArea);
if(charArea != undefined){
	if(matches(appTypeArray[1],"Board of Adjustment","General Plan Amendment - Major","Planning and Zoning")){
		editAppSpecific("Exist. GP Designation", charArea);
	}
	if(appTypeArray[1] == "Design Review"){
		editAppSpecific("Existing Character Area", charArea);
	}
	if(matches(appTypeArray[1],"Pre-Submittal","Subdivision")){
		editAppSpecific("GP Character Area", charArea);
	}
}
if(charArea == undefined){
	showMessage=true;
	comment("GIS Obejct could not be located");
}