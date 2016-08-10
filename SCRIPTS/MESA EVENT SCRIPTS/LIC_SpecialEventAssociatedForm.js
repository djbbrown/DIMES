/*===================================================================
// Script Number: 180
// Script Name: LIC_SpecialEventAssociatedForm.js
// Script Developer: Bryan de Jesus
// Script Agency: Woolpert
// Script Description: If the ASI field "Liquor" has a value of Yes, create the associated form for Licenses/Liquor/LiquorSE/Application) 
// Script Run Event: ASA, ASIUA
// Script Parents:
//            ASA;Licenses!General!SpecialEvent!Application
//            ASIUA;Licenses!General!SpecialEvent!Application
/*==================================================================*/

if (AInfo["Liquor"] == "Yes"){
	var childId = childGetByCapType("Licenses/Liquor/LiquorSpecialEvent/Application");
	if (!childId){
		childId = createChild("Licenses", "Liquor", "LiquorSpecialEvent", "Application", "Special Event Liquor License for " + capId.getCustomID());
		addFee("L010", "LIC_LIQSE", "FINAL", 1, "N", childId);
	}
} 