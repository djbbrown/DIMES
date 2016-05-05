/*===================================================================
// Script Number: 05
// Script Name: LIC_AssessLicenseFees.js
// Script Developer: Chris Godwin
// Script Agency: Woolpert
// Script Description: Assess license fees when ready to issue
// Script Run Event: WTUA
// Script Parents:
//            WTUA;Licensing!General!~!Application
/*==================================================================*/

if (matches(""+appTypeArray[2], "SecondHand", "ScrapMetal", "PawnBroker", "Auction House") && wfTask == "Issue License" && wfStatus == "Ready to Issue") {
	if (!feeExists("L030")) addFee("L030","LIC_PASS","FINAL",1,"Y");
}

if (matches(""+appTypeArray[2], "ParkandSwap") && wfTask == "License Issuance" && wfStatus == "Ready to Issue") {
	if (!feeExists("L020")) addFee("L020","LIC_PARK_APP","FINAL",1,"Y");
}

if (matches(""+appTypeArray[2], "Peddler") && wfTask == "Issue License" && wfStatus == "Ready to Issue") {
	if (!feeExists("LIC_04")) addFee("LIC_04","LIC_PEDDLER_APP","FINAL",1,"Y"); 
}