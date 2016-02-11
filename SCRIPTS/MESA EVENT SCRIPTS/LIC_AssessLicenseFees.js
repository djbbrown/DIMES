/*===================================================================
// Script Number: 05
// Script Name: 
// Script Developer: 
// Script Agency: (Mesa/Accela/Woolpert)
// Script Description: 
// Script Run Event: 
// Script Parents:
//            ASA;Planning!Group Home-Daycare!Application!NA  (example)
//            ASA;Licensing!General!ParkAndSwap!NA  (example)
/*==================================================================*/

if (matches(""+appTypeArray[2], "Secondhand Dealer", "ScrapMetal", "Pawn Broker", "ParkandSwap", "Peddler", "Auction House") && wfTask == "License Issuance" && wfStatus == "Ready to Issue") {
	if (!feeExists("L030")) addFee("L030","LIC_PASS","FINAL",1,"Y"); 
	if (!feeExists("L020")) addFee("L020","LIC_PARK","FINAL",1,"Y"); 
	if (!feeExists("LIC_04")) addFee("LIC_04","LIC_PEDDLER","FINAL",1,"Y"); 
}
