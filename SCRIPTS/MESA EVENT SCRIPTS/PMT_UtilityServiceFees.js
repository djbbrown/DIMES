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
if (tmpTable) { 
//define variables to use
var countGasServiceMeter = countASITRows(tmpTable, "Service Type", "Gas Service and Meter" );
var countGasMeter = countASITRows(tmpTable, "Service Type", "Gas Meter" );
var countGasServMeterCommercial = countASITRows(tmpTable, "Service Type", "Gas Service/Meter – Commercial" );
var countGasServMeterResLarge = countASITRows(tmpTable, "Service Type", "Gas Service/Meter – Large Residential");
var countGasRelocationRetrofit = countASITRows(tmpTable, "Service Type", "Gas  Relocation/Retrofit");
var countGasMeterAdapter = countASITRows(tmpTable, "Service Type", "Water Meter: Adapter" );
var len = tmpTable.length;
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
//Water Meter: Adapter - USF040  - Service Size - Water Meter Adapter A24

if (countGasMeterAdapter > 0) {
	var tempSum=0;
	for (var rowIndex in tmpTable) {
        thisRow = tmpTable[rowIndex];
        if (thisRow["Service Type"].fieldValue == "Water Meter: Adapter" && thisRow["Service Size"].fieldValue == "Water Meter Adapter A24")  {    
        	if (!isNaN(parseFloat(thisRow["Qty of Meters"].fieldValue)))
        		tempSum = tempSum + parseFloat(thisRow["Qty of Meters"].fieldValue);		
        }
	}
	if (tempSum > 0)
		updateFee("USF040","PMT_UTL_SERV", "FINAL",  tempSum, "N");
	else {
		if (feeExists("USF040")) removeFee("USF040", "FINAL");
	}
}
	
//USF050 Service Type - Water Meter: Domestic or Water Meter: Landscaping   
// Service Size - Water - 3/4" or Water 1.0"

if (countGasMeterAdapter > 0) {
	var tempSum=0;
	for (var rowIndex in tmpTable) {
        thisRow = tmpTable[rowIndex];
        if ((thisRow["Service Type"].fieldValue == "Water Meter: Domestic" || thisRow["Service Type"].fieldValue == "Water Meter: Landscaping") && (thisRow["Service Size"].fieldValue == 'Water - 3/4"' || thisRow["Service Size"].fieldValue == 'Water 1.0"'))  {    
        	if (!isNaN(parseFloat(thisRow["Qty of Meters"].fieldValue)))
        		tempSum = tempSum + parseFloat(thisRow["Qty of Meters"].fieldValue);		
        }
	}
	if (tempSum > 0)
		updateFee("USF050","PMT_UTL_SERV", "FINAL",  tempSum, "N");
	else {
		if (feeExists("USF050")) removeFee("USF040", "FINAL");
	}
}
	
//
 }


       
		




	




