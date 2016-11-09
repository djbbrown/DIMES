/*===================================================================
// Script Number: 05
// Script Name: LIC_AssessLicenseFees.js
// Script Developer: Chris Godwin
// Script Agency: Woolpert
// Script Description: Assess license fees when ready to issue
// Script Run Event: WTUA
// Script Parents:
//            WTUA;Licensing!General!~!Application
//==================================================================*/

if (matches(wfTask,"Issue License","License Issuance") && wfStatus == "Ready to Issue"){
	if (appTypeArray[2] == "FortuneTeller"){
		if (!feeExists("L030")) addFee("L030","LIC_FORTUNE","FINAL",1,"N");
	}
	if (appTypeArray[2] == "OffTrackBetting"){
		if (!feeExists("L020")) addFee("L020","LIC_OTB","FINAL",1,"N");
	}
	if (appTypeArray[2] == "ParkandSwap"){
		if (!feeExists("L020")) addFee("L020","LIC_PARK_APP","FINAL",1,"N");
	}
	if (matches(appTypeArray[2], "AntiqueDealer", "Auction House", "Auctioneer", "MassageEstablishment", "PawnBroker", "ScrapMetal", "SecondHand")){
		if (!feeExists("L030")) addFee("L030","LIC_PASS","FINAL",1,"Y");
	}
	if (appTypeArray[2] == "Peddler"){
		if (!feeExists("LIC_04")) addFee("LIC_04","LIC_PEDDLER_APP","FINAL",1,"N");
	}
}