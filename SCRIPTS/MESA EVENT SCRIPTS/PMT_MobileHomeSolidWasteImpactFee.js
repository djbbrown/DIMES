/*===================================================================
// Script Number: 147
// Script Name: PMT_MobileHomeSolidWasteImpactFee.js
// Script Developer: Bryan de Jesus
// Script Agency: Woolpert
// Script Description: On application submittal or ASI update if “Y” is chosen for ASI field “Res. Dev. Tax” and ASI dropdown value is “New Mobile Home” or “New Park Model” for field “Type of Work,” then assess appropriate fee. 
// Script Run Event: ASA, ASIUA
// Script Parents:
//            ASA;Permits!Residential!Mobile Home!NA 
//            ASIUA;Permits!Residential!Mobile Home!NA
===================================================================*/
showDebug = true;
try {
	var resDevTax = AInfo["Res. Dev. Tax"] || "";
	var typeOfWork = AInfo["Type of Work"] || "";
	var numOfUnits = AInfo["Number of Units"] || 0;
	if (resDevTax == "CHECKED"){		
		if (typeOfWork == "New Mobile Home"){
			logDebug("Assessing Solid Waste – Single Family Detached/Mobile Home (on plotted land) Impact Fee...");			
			// remove any other similar fee
			if (feeExists("RDIF350", "NEW", "INVOICED")) voidRemoveFee("RDIF350");
			
			// check if the correct fee code has been assessed with a different qty
			if (feeExists("RDIF340", "NEW", "INVOICED") && feeQty("RDIF340") != numOfUnits) {
				voidRemoveFee("RDIF340");
			} 
			
			// assess new fee
			if (!feeExists("RDIF340", "NEW", "INVOICED") && numOfUnits > 0) {
				addFee("RDIF340", "PMT_RDIF", "FINAL", numOfUnits, "N");
			}			
		} else if (typeOfWork == "New Park Model"){
			logDebug("Assessing Solid Waste – Manufactured home or Recreational Vehicle Impact Fee...");
			
			// remove any other similar fee
			if (feeExists("RDIF340", "NEW", "INVOICED")) voidRemoveFee("RDIF340");
			
			// check if the correct fee code has been assessed with a different qty
			if (feeExists("RDIF350", "NEW", "INVOICED") && feeQty("RDIF350") != numOfUnits) {
				voidRemoveFee("RDIF350");
			} 
			
			// assess new fee
			if (!feeExists("RDIF350", "NEW", "INVOICED") && numOfUnits > 0) {
				addFee("RDIF350", "PMT_RDIF", "FINAL", numOfUnits, "N");
			}
		}
	}
} catch (error){
	logDebug("A JavaScript Error occured: " + err.message);
}