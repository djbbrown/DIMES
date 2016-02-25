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

var tmpTable = loadASITable("UTILITY SERVICE INFORMATION");  // array of rows
if (tmpTable) {
	countGasServiceMeter = countASITRows(tmpTable, "Service Type", "Gas Service and Meter" );
	if (countGasServiceMeter > 0)
			updateFee("Gas Service & Meter", "USF010", "FINAL", 1, "N");
	}
	if (countGasServiceMeter = 0 && feeExists(USF010))
		removeFee("USF010");
	
	//3
	//sumQtyMeters = sumASITColumn(tmpTable, "Qty of Meters", "INCLUDE", "Service Type", "Gas Meter");
	//if (sumQtyMeters > 0) {
		//updateFee("USF020", "", "FINAL", sumQtyMeters, "N");
		
	//}
		
}

	




