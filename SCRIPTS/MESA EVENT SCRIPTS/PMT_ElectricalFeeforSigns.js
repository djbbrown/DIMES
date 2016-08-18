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
// 2016.06.03 request to update.
// 1.2.	If the Type of Work field = “Sign” or “Freeway Landmark” – fee should not be added 
// for any other Type of Work options, even if the Type of Sign = “Illuminated”.
/*==================================================================*/

var tmpTable = loadASITable("SIGN INFO");
if (tmpTable && wfTask == "Plans Coordination" && wfStatus == "Ready to Issue") {
	var countException = 0;
	// Count the number of "Illuminated" for types of Sign
	var countSignIlluminated = countASITRows(tmpTable, "Type of Sign", "Illuminated" );
	countException += countASITRows(tmpTable, "Type of Work", "Sign" );
	countException += countASITRows(tmpTable, "Type of Work", "Freeway Landmark Monument" );
	// If there are no Illuminated signs lets remove all fees
	// Also remove fees if the type of Work isn't "Sign" or "Freeway Landmark Monument"
	// if (countSignIlluminated == 0 && feeExists("SGN030", "NEW")) removeFee("SGN030", "FINAL");
	// if (countSignIlluminated == 0 && feeExists("SGN030", "INVOICED")) voidRemoveFee("SGN030");
	if ((countSignIlluminated == 0 || countException == 0) && feeExists("SGN030", "NEW")) removeFee("SGN030", "FINAL");
	if ((countSignIlluminated == 0 || countException == 0) && feeExists("SGN030", "INVOICED")) voidRemoveFee("SGN030");
	// Else were going to add the fees.
	if (countSignIlluminated > 0 &&  countException > 0 ) {
		// If there are "Illuminated" signs we are going to sum the Quantity of "Illuminated"
		var sumQuantity = sumASITColumn(tmpTable, "Quantity", "INCLUDE", "Type of Sign", "Illuminated");
		// Does update also add the feeitem?
		updateFee("SGN030","PMT_SIGNS", "FINAL",  sumQuantity, "N");
	}
}

