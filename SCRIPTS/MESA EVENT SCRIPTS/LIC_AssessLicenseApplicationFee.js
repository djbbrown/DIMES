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
//            ASA;Licenses!General!BingoHall!Application
/*==================================================================*/

// Get the ASI Field Value
var subType = getAppSpecific ("Sub-Type",capId);

if (subType == "Class A" && !feeExists("LIC_010", "NEW", "INVOICED")){
	// Add the Fee addFee("LIC_010","LIC_BINGO_APP","FINAL",1,"N");
	addFee("LIC_010","LIC_BINGO_APP","FINAL",1,"N");
}
if (subType == "Class B" && !feeExists("LIC_020", "NEW", "INVOICED")){
	// Add the Fee addFee("LIC_020","LIC_BINGO_APP","FINAL",1,"N");
	addFee("LIC_020","LIC_BINGO_APP","FINAL",1,"N");
}
if (subType == "Class C" && !feeExists("LIC_030", "NEW", "INVOICED")){
	// Add the Fee addFee("LIC_030","LIC_BINGO_APP","FINAL",1,"N");
	addFee("LIC_030","LIC_BINGO_APP","FINAL",1,"N");
}

/*
if (use == "Multi-Residence" || use == "Non-Residential"){
	//if (!feeExists("PA010", "NEW", "INVOICED")) addFee("PA010","PLN_PREAPP","FINAL",1,"N");
	//if (!feeExists("PA020", "NEW", "INVOICED")) addFee("PA020","PLN_PREAPP","FINAL",1,"N");
}
//*/