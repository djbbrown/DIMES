/*===================================================================
// Script Number: 223
// Script Name: PMT_UtilityServiceFees
// Script Developer: Raminder Gill
// Script Agency: Accela
// Script Description: Assess fees in the PMT_UTL_SERV fee schedule based on ASIT fields. 
// Script Run Event: ASIUA & ASA
// Script Parents:
//    ASA;Permits!Residential!~!~   
//	  ASA;Permits!Commercial!~!~      
//    ASIUA;Permits!Residential!~!~   
//	  ASIUA;Permits!Commercial!~!~          
/*==================================================================*/

var tmpTable = loadASITable("UTILITY SERVICE INFORMATION");  

var tmpTable = loadASITable("UTILITY SERVICE INFORMATION");  
if (tmpTable) { 
//define variables to use
var countGasServiceMeter = countASITRows(tmpTable, "Service Type", "Gas Service and Meter" );
var countGasMeter = countASITRows(tmpTable, "Service Type", "Gas Meter" );
var countGasServMeterCommercial = countASITRows(tmpTable, "Service Type", "Gas Service/Meter – Commercial" );
var countGasServMeterResLarge = countASITRows(tmpTable, "Service Type", "Gas Service/Meter – Large Residential");
var countGasRelocationRetrofit = countASITRows(tmpTable, "Service Type", "Gas  Relocation/Retrofit");


logDebug(countGasServiceMeter);
// Gas Service and Meter - USF010
if (countGasServiceMeter == 0 && feeExists("USF010")) removeFee("USF010", "FINAL");
if (countGasServiceMeter > 0) updateFee("USF010","PMT_UTL_SERV", "FINAL",  1, "N");
//Gas Service and Meter - USF020
if (countGasMeter == 0 && feeExists("USF020")) removeFee("USF020", "FINAL");
if (countGasMeter > 0) {
	var sumQtyMeters = sumASITColumn(tmpTable, "Qty of Meters", "INCLUDE", "Service Type", "Gas Meter");
	updateFee("USF020","PMT_UTL_SERV", "FINAL",  sumQtyMeters, "N");
	}
//Gas Service/Meter – Commercial, Gas Service/Meter – Large Residential,Gas  Relocation/Retrofit  - USF030
if (countGasMeter == 0 && feeExists("USF020")) removeFee("USF020", "FINAL");
if (countGasServMeterCommercial > 0 || countGasServMeterResLarge || countGasRelocationRetrofit ) {
	//var sumQtyMeters = sumASITColumn(tmpTable, "Qty of Meters", "INCLUDE", "Service Type", "Gas Meter");
	updateFee("USF030","PMT_UTL_SERV", "FINAL",  1, "N");
	}

 }
//
       
		




	




