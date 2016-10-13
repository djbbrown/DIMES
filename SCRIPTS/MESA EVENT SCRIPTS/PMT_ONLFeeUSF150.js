/*===================================================================
// Script Number: Fee 010
// Script Name: PMT_ONLFeeUSF150
// Script Developer: Kevin Ford
// Script Agency: Accela
// Script Description:
	Auto Assess at application submittal based off of the ASIT
// Script Run Event: ASA 
// Script Parents:
//            ASA;Permit/Online/NA/NA
//            ASIUA;Permit/Online/NA/NA
===================================================================*/
//Temporary Electric - USF150
// Load the table.
var tmpTable;
tmpTable = loadASITable("UTILITY SERVICE INFORMATION");
if(!tmpTable){
	tmpTable = loadASITable("UTILITY SERVICE INFO");
}
// Start parsing info
var countTempElec = countASITRows(tmpTable, "Service Type", "Temporary Electric" );
// Remove just in case it already exists
if (countTempElec == 0 && feeExists("USF150")) removeFee("USF150", "FINAL");
if (countTempElec > 0) {
	var sumQtyMeters = sumASITColumn(tmpTable, "Qty of Meters", "INCLUDE", "Service Type", "Temporary Electric");
	updateFee("USF150","PMT_UTL_SERV", "FINAL",  sumQtyMeters, "N");
}	