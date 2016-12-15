/*===================================================================
// Script Number: 004
// Script Name: LIC Assess License Application Fee
// Script Developer: Kevin Ford
// Script Agency: Accela
// Script Description:
//		Assess the license application fee on submittal. Fee schedule = "LIC_PASS", Fee Code = L010 if class A; Fee Code = L020 if class B; or Fee Code =L030 if class C license
//			When the application is completed and submitted, check ASI(Data Fields) “subType” when “Class A” 
// 			•	Asses fee of fee code “LIC_010” “Application Fee”
//			When the application is completed and submitted, check ASI(Data Fields) “subType” when “Class B” 
// 			•	Asses fee of fee code “LIC_020” “Application Fee”
// 			When the application is completed and submitted, check ASI(Data Fields) “subType” when “Class C” 
// 			•	Asses fee of fee code “LIC_030” “Application Fee”

// Script Run Event: 
// Script Parents:
//		ASA;Licenses!General!BingoHall!Application
//		** My Question is what happens if they forgot or need to choose another Class?
//		** I think that this may be a good thing to look into.
//		ASIUA:Licenses!General!BingoHall!Application
// 12/15/2016 nalbert - adding to ASA:Licenses/General/SpecialEvent/Application
/*==================================================================*/

// Get the ASI Field Value
var subType = getAppSpecific ("Sub-Type",capId);

if (subType == "Class A" && !feeExists("LIC_010", "NEW", "INVOICED")){
	if(feeExists("LIC_020","NEW","Invoiced")) {voidRemoveFee("LIC_020")} // Remove LIC_020
	if(feeExists("LIC_030","NEW","Invoiced")) {voidRemoveFee("LIC_030")} // Remove LIC_030
	addFee("LIC_010","LIC_BINGO_APP","FINAL",1,"Y");
}
if (subType == "Class B" && !feeExists("LIC_020", "NEW", "INVOICED")){
	if(feeExists("LIC_010","NEW","Invoiced")) {voidRemoveFee("LIC_010")} // Remove LIC_010
	if(feeExists("LIC_030","NEW","Invoiced")) {voidRemoveFee("LIC_030")} // Remove LIC_030
	addFee("LIC_020","LIC_BINGO_APP","FINAL",1,"Y");
}
if (subType == "Class C" && !feeExists("LIC_030", "NEW", "INVOICED")){
	if(feeExists("LIC_010","NEW","Invoiced")) {voidRemoveFee("LIC_010")} // Remove LIC_010
	if(feeExists("LIC_020","NEW","Invoiced")) {voidRemoveFee("LIC_020")} // Remove LIC_020
	addFee("LIC_030","LIC_BINGO_APP","FINAL",1,"Y");
}



/*
if (use == "Multi-Residence" || use == "Non-Residential"){
	//if (!feeExists("PA010", "NEW", "INVOICED")) addFee("PA010","PLN_PREAPP","FINAL",1,"N");
	//if (!feeExists("PA020", "NEW", "INVOICED")) addFee("PA020","PLN_PREAPP","FINAL",1,"N");
}
//*/

if (appTypeArray[2] == "SpecialEvent"){
	var qty;
	var nbrDays = AInfo["Number of Event Days"];
	
	if (!feeExists("L010")) {
		if (matches(nbrDays,1,2,3)) {
			qty = nbrDays;
		}else{
			qty = 3;   // max = $300
		}
	}
	
	addFee("L010","LIC_SE","FINAL",qty,"Y");

}