/*===================================================================
// Script Number: 171
// Script Name: PMT_ElectricalFeeforSigns.js 
// Script Developer: Raminder Gill
// Script Agency: Accela
// Script Description: Assess an Electrical fee with Fee code = SGN030 for “Sign Type” of “Illuminated”.
// Script Run Event: ASA
// Script Parents:
// 	ASA:Permits/Sign/NA/NA
//	
/*==================================================================*/

var tmpTable = loadASITable("SIGN INFO");  
if (tmpTable) {
	var countSignIlluminated = countASITRows(tmpTable, "Type of Sign", "Illuminated" );
	logDebug(countSignIlluminated);
	if (countSignIlluminated == 0 && feeExists("SGN030", "NEW")) removeFee("SGN030", "FINAL");
	if (countSignIlluminated == 0 && feeExists("SGN030", "INVOICED")) voidRemoveFee("SGN030");
	if (countSignIlluminated > 0) {
		var sumQuantity = sumASITColumn(tmpTable, "Quantity(Number)", "INCLUDE", "Type of Sign", "Illuminated");
		updateFee("SGN030","PMT_SIGNS", "FINAL",  sumQuantity, "N");
		}
}

