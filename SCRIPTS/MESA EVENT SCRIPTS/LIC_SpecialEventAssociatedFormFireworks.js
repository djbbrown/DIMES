/*===================================================================
// Script Number: TBD
// Script Name: LIC_SpecialEventAssociatedFormFireworks.js
// Script Developer: Bryan de Jesus
// Script Agency: Woolpert
// Script Description: If the ASI field "Liquor" has a value of Yes, create the associated form for Licenses/General/Fireworks/Application) 
// Script Run Event: ASA
// Script Parents:
//            ASA;Licenses!General!SpecialEvent!Application
/*==================================================================*/

if (AInfo["Fireworks"] == "Yes"){
	var childId = childGetByCapType("Licenses/General/Fireworks/Application");
	if (!childId){
		childId = createChild("Licenses", "General", "Fireworks", "Application", "Fireworks Application for " + capIDString);
	}
} 
