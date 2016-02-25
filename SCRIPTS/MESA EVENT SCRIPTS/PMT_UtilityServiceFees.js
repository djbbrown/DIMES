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
		for (rowIndex in tmpTable) {
			thisRow = tmpTable[rowIndex]; // array of columns
			serviceType = thisRow["Service Type"].fieldValue;
			if serviceType = "Gas Service and Meter" {
					addFee("Feename", "USF010", "FINAL",1,"N")
			}
		}
	}
	




