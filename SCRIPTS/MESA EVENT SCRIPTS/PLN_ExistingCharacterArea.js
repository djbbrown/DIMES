/*===================================================================
// Script Number: 152
// Script Name: PLN_ExistingCharacterArea.js
// Script Developer: Bryan de Jesus
// Script Agency: Woolpert
// Script Description: Script – Populated by GIS Character Area layer.
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
var charArea = getGISInfo("Accela_Base", "GeneralPlan2040", "CharacterArea");
editAppScpecific("Existing Character Area", charArea);