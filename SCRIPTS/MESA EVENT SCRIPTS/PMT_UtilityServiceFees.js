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
var countWaterMeterDom = countASITRows(tmpTable, "Service Type", "Water Meter: Domestic" );
var countWaterMeterLand = countASITRows(tmpTable, "Service Type", "Water Meter: Landscaping" );

logDebug(countWaterMeterDom);
logDebug(countWaterMeterLand);
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
	if (tempSum > 0) updateFee("USF040","PMT_UTL_SERV", "FINAL",  tempSum, "N");	
}
if (countGasMeterAdapter == 0 && feeExists("USF040")) removeFee("USF040", "FINAL");
	
//USF050 Service Type - Water Meter: Domestic or Water Meter: Landscaping   
// Service Size - Water - 3/4" or Water 1.0"

	if (countWaterMeterDom > 0 || countWaterMeterLand > 0) {
		var tempSum1=0;
		for (var rowIndex in tmpTable) {
	        thisRow = tmpTable[rowIndex];
	        if ((thisRow["Service Type"].fieldValue == "Water Meter: Domestic" || thisRow["Service Type"].fieldValue == "Water Meter: Landscaping") && (thisRow["Service Size"].fieldValue == 'Water 3/4' || thisRow["Service Size"].fieldValue == 'Water 1.0'))  {    
	        	if (!isNaN(parseFloat(thisRow["Qty of Meters"].fieldValue)))
	        		tempSum1 = tempSum1 + parseFloat(thisRow["Qty of Meters"].fieldValue);		
	        }
		}
	
		if (tempSum1 > 0)	updateFee("USF050","PMT_UTL_SERV", "FINAL",  tempSum1, "N");		
	}
	
	if (tempSum1 == 0 && feeExists("USF050")) removeFee("USF050", "FINAL");
//
	//USF060 Service Type - Water Meter: Domestic or Water Meter: Landscaping   
	// Service Size - Water - 3/4" or Water 1.0"

		if (countWaterMeterDom > 0 || countWaterMeterLand > 0) {
			var tempSum2=0;
			for (var rowIndex in tmpTable) {
		        thisRow = tmpTable[rowIndex];
		        if ((thisRow["Service Type"].fieldValue == "Water Meter: Domestic" || thisRow["Service Type"].fieldValue == "Water Meter: Landscaping") && thisRow["Service Size"].fieldValue == 'Water 1 1/2' )  {    
		        	if (!isNaN(parseFloat(thisRow["Qty of Meters"].fieldValue)))
		        		tempSum2 = tempSum2 + parseFloat(thisRow["Qty of Meters"].fieldValue);		
		        }
			}
			
			if (tempSum2 > 0)
				updateFee("USF060","PMT_UTL_SERV", "FINAL",  tempSum2, "N");
			}
	
		if (tempSum2 == 0 && feeExists("USF060")) removeFee("USF060", "FINAL");
		
	//
		//USF070 Service Type - Water Meter: Domestic or Water Meter: Landscaping   
		// Service Size - Water - 2.0

			if (countWaterMeterDom > 0 || countWaterMeterLand > 0) {
				var tempSum3=0;
				for (var rowIndex in tmpTable) {
			        thisRow = tmpTable[rowIndex];
			        if ((thisRow["Service Type"].fieldValue == "Water Meter: Domestic" || thisRow["Service Type"].fieldValue == "Water Meter: Landscaping") && thisRow["Service Size"].fieldValue == 'Water 2.0' )  {    
			        	if (!isNaN(parseFloat(thisRow["Qty of Meters"].fieldValue)))
			        		tempSum3 = tempSum3 + parseFloat(thisRow["Qty of Meters"].fieldValue);		
			        }
				}
				
				if (tempSum3 > 0)
					updateFee("USF070","PMT_UTL_SERV", "FINAL",  tempSum3, "N");
				}
			if (tempSum3 == 0 && feeExists("USF070")) removeFee("USF070", "FINAL");
	//
			//not tested yet		//USF080 Service Type - Water Meter: Domestic or Water Meter: Landscaping   
			// Service Size - Water - 4

				if (countWaterMeterDom > 0 || countWaterMeterLand > 0) {
					var tempSum4=0;
					for (var rowIndex in tmpTable) {
				        thisRow = tmpTable[rowIndex];
				        if ((thisRow["Service Type"].fieldValue == "Water Meter: Domestic" || thisRow["Service Type"].fieldValue == "Water Meter: Landscaping") && thisRow["Service Size"].fieldValue == 'Water – 4”' )  {    
				        	if (!isNaN(parseFloat(thisRow["Qty of Meters"].fieldValue)))
				        		tempSum4 = tempSum4 + parseFloat(thisRow["Qty of Meters"].fieldValue);		
				        }
					}
					logDebug(tempSum4);
					if (tempSum4 > 0)
						updateFee("USF080","PMT_UTL_SERV", "FINAL",  tempSum4, "N");
					}
				if (tempSum4 == 0 && feeExists("USF080")) removeFee("USF080", "FINAL");
				//USF090 Service Type - Water Meter: Domestic or Water Meter: Landscaping 
				// Service Size - Water - 6

				if (countWaterMeterDom > 0 || countWaterMeterLand > 0) {
					var tempSum6=0;
					for (var rowIndex in tmpTable) {
				        thisRow = tmpTable[rowIndex];
				        if ((thisRow["Service Type"].fieldValue == "Water Meter: Domestic" || thisRow["Service Type"].fieldValue == "Water Meter: Landscaping") && thisRow["Service Size"].fieldValue == 'Water – 6' )  {    
				        	if (!isNaN(parseFloat(thisRow["Qty of Meters"].fieldValue)))
				        		tempSum6 = tempSum6 + parseFloat(thisRow["Qty of Meters"].fieldValue);		
				        }
					}
					logDebug(tempSum6);
					if (tempSum6 > 0)
						updateFee("USF090","PMT_UTL_SERV", "FINAL",  tempSum6, "N");
					}
					
				if (tempSum6 == 0 && feeExists("USF090")) removeFee("USF090", "FINAL");
		//
				//USF100 Service Type - Water Meter: Domestic or Water Meter: Landscaping 
				// Service Size - Water - 8

				if (countWaterMeterDom > 0 || countWaterMeterLand > 0) {
					var tempSum8=0;
					for (var rowIndex in tmpTable) {
				        thisRow = tmpTable[rowIndex];
				        if ((thisRow["Service Type"].fieldValue == "Water Meter: Domestic" || thisRow["Service Type"].fieldValue == "Water Meter: Landscaping") && thisRow["Service Size"].fieldValue == 'Water – 8"' )  {    
				        	if (!isNaN(parseFloat(thisRow["Qty of Meters"].fieldValue)))
				        		tempSum8 = tempSum8 + parseFloat(thisRow["Qty of Meters"].fieldValue);		
				        }
					}
					logDebug(tempSum8);
					if (tempSum8 > 0)
						updateFee("USF100","PMT_UTL_SERV", "FINAL",  tempSum8, "N");
					}
				if (tempSum8 == 0 && feeExists("USF100")) removeFee("USF100", "FINAL");
		//
 }


    
		




	




