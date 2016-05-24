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
// Below is an if statement the "else" should be to remove all fees...
if (tmpTable) { 
	//define variables to use
	// Gas ASIT
	var countGasServiceMeter = countASITRows(tmpTable, "Service Type", "Gas Service and Meter" );
	var countGasMeter = countASITRows(tmpTable, "Service Type", "Gas Meter" );
	var countGasServMeterCommercial = countASITRows(tmpTable, "Service Type", "Gas Service/Meter - Commercial" );
	var countGasServMeterResLarge = countASITRows(tmpTable, "Service Type", "Gas Service/Meter - Large Residential");
	var countGasRelocationRetrofit = countASITRows(tmpTable, "Service Type", "Gas  Relocation/Retrofit");	
	// Water ASIT
	var countWaterMeterAdapter = countASITRows(tmpTable, "Service Type", "Water Meter: Adapter" );
	var countWaterMeterDom = countASITRows(tmpTable, "Service Type", "Water Meter: Domestic" );
	var countWaterMeterLand = countASITRows(tmpTable, "Service Type", "Water Meter: Landscaping" );
	var countWaterRelocation = countASITRows(tmpTable, "Service Type", "Water Relocation" );
	var countWaterService = countASITRows(tmpTable, "Service Type", "Water Service");
	// Electric ASIT
	var countTempElec = countASITRows(tmpTable, "Service Type", "Temporary Electric" );
	var countElecServTurn = countASITRows(tmpTable, "Service Type", "Electric Service Turn on Same Day" );
	// Pavement ASIT
	var countPavReplLocal = countASITRows(tmpTable, "Service Type", "Pavement Replacement - Local Roadway");
	var countPavReplColl = countASITRows(tmpTable, "Service Type", "Pavement Replacement - Collector Roadway");
	var countPavReplArt = countASITRows(tmpTable, "Service Type", "Pavement Replacement - Arterial Roadway");


	// Gas Service and Meter - USF010
		if (countGasServiceMeter == 0 && feeExists("USF010")) removeFee("USF010", "FINAL");
		if (countGasServiceMeter > 0) updateFee("USF010","PMT_UTL_SERV", "FINAL",  countGasServiceMeter, "N");
	//Gas Service and Meter - USF020
		if (countGasMeter == 0 && feeExists("USF020")) removeFee("USF020", "FINAL");
		if (countGasMeter > 0) {
			var sumQtyMeters = sumASITColumn(tmpTable, "Qty of Meters", "INCLUDE", "Service Type", "Gas Meter");
			updateFee("USF020","PMT_UTL_SERV", "FINAL",  sumQtyMeters, "N");
			}
	//Gas Service and Meter - USF030
		if (countGasServMeterCommercial == 0 || countGasServMeterResLarge == 0 || countGasRelocationRetrofit == 0 ) {
			var tempSum9 = 0;
			for (var rowIndex in tmpTable) {
				thisRow = tmpTable[rowIndex];
				if (thisRow["Service Type"].fieldValue == "Gas Service/Meter - Commercial" )  {    
					if (!isNaN(parseFloat(thisRow["Qty of Meters"].fieldValue)))
						tempSum9 = tempSum9 + parseFloat(thisRow["Qty of Meters"].fieldValue);		
				}
				if (thisRow["Service Type"].fieldValue == "Gas Service/Meter - Large Residential" )  {    
					if (!isNaN(parseFloat(thisRow["Qty of Meters"].fieldValue)))
						tempSum9 = tempSum9 + parseFloat(thisRow["Qty of Meters"].fieldValue);		
				}
				if (thisRow["Service Type"].fieldValue == "Gas Relocation/Retrofit" )  {    
					if (!isNaN(parseFloat(thisRow["Qty of Meters"].fieldValue)))
						tempSum9 = tempSum9 + parseFloat(thisRow["Qty of Meters"].fieldValue);		
				}
			}
			if (tempSum9 > 0)	updateFee("USF030","PMT_UTL_SERV", "FINAL",  tempSum9, "N");		
		}
		if (tempSum9 == 0 && feeExists("USF030")) removeFee("USF030", "FINAL");

	//Water Meter: Adapter - USF040  - Service Size - Water Meter Adapter A24
		if (countWaterMeterAdapter > 0) {
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
		if (countWaterMeterAdapter == 0 && feeExists("USF040")) removeFee("USF040", "FINAL");
		
	//USF050 Service Type - Water Meter: Domestic or Water Meter: Landscaping   
	// Service Size - Water - 3/4" or Water 1.0"
		if (countWaterMeterDom > 0 || countWaterMeterLand > 0) {
			var tempSum1=0;
			for (var rowIndex in tmpTable) {
				thisRow = tmpTable[rowIndex];
				if ((thisRow["Service Type"].fieldValue == "Water Meter: Domestic" || thisRow["Service Type"].fieldValue == "Water Meter: Landscaping") && (thisRow["Service Size"].fieldValue == 'Water 3/4' || thisRow["Service Size"].fieldValue == 'Water 1.0' || thisRow["Service Size"].fieldValue == 'Water 1.0\\"'))  {    
					if (!isNaN(parseFloat(thisRow["Qty of Meters"].fieldValue)))
						tempSum1 = tempSum1 + parseFloat(thisRow["Qty of Meters"].fieldValue);		
				}
			}
			if (tempSum1 > 0)	updateFee("USF050","PMT_UTL_SERV", "FINAL",  tempSum1, "N");		
		}
		if (tempSum1 == 0 && feeExists("USF050")) removeFee("USF050", "FINAL");
	//
	//USF060 Service Type - Water Meter: Domestic or Water Meter: Landscaping   
	// Service Size - Water - 1 1/2"
		if (countWaterMeterDom > 0 || countWaterMeterLand > 0) {
			var tempSum2=0;
			for (var rowIndex in tmpTable) {
				thisRow = tmpTable[rowIndex];
				if ((thisRow["Service Type"].fieldValue == "Water Meter: Domestic" || thisRow["Service Type"].fieldValue == "Water Meter: Landscaping") && (thisRow["Service Size"].fieldValue == 'Water 1 1/2' || thisRow["Service Size"].fieldValue == 'Water 1 1/2\\"') )  {    
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
				if ((thisRow["Service Type"].fieldValue == "Water Meter: Domestic" || thisRow["Service Type"].fieldValue == "Water Meter: Landscaping") && (thisRow["Service Size"].fieldValue == 'Water 2.0' || thisRow["Service Size"].fieldValue == 'Water 2.0\\"'))  {    
					if (!isNaN(parseFloat(thisRow["Qty of Meters"].fieldValue)))
						tempSum3 = tempSum3 + parseFloat(thisRow["Qty of Meters"].fieldValue);		
				}
			}
			//logDebug(tempSum3);
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
				if ((thisRow["Service Type"].fieldValue == "Water Meter: Domestic" || thisRow["Service Type"].fieldValue == "Water Meter: Landscaping") && (thisRow["Service Size"].fieldValue == 'Water - 4"' || thisRow["Service Size"].fieldValue == 'Water - 4\\"'))  {    
					if (!isNaN(parseFloat(thisRow["Qty of Meters"].fieldValue)))
						tempSum4 = tempSum4 + parseFloat(thisRow["Qty of Meters"].fieldValue);		
				}
			}
			//logDebug(tempSum4);
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
				if ((thisRow["Service Type"].fieldValue == "Water Meter: Domestic" || thisRow["Service Type"].fieldValue == "Water Meter: Landscaping") && (thisRow["Service Size"].fieldValue == 'Water - 6"' || thisRow["Service Size"].fieldValue == 'Water - 6\\"'))  {    
					if (!isNaN(parseFloat(thisRow["Qty of Meters"].fieldValue)))
						tempSum6 = tempSum6 + parseFloat(thisRow["Qty of Meters"].fieldValue);		
				}
			}
			//logDebug(tempSum6);
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
				if ((thisRow["Service Type"].fieldValue == "Water Meter: Domestic" || thisRow["Service Type"].fieldValue == "Water Meter: Landscaping") && (thisRow["Service Size"].fieldValue == 'Water - 8"' || thisRow["Service Size"].fieldValue == 'Water - 8\\"'))  {    
					if (!isNaN(parseFloat(thisRow["Qty of Meters"].fieldValue)))
						tempSum8 = tempSum8 + parseFloat(thisRow["Qty of Meters"].fieldValue);		
				}
			}
			//logDebug(tempSum8);
			if (tempSum8 > 0)
				updateFee("USF100","PMT_UTL_SERV", "FINAL",  tempSum8, "N");
			}
		if (tempSum8 == 0 && feeExists("USF100")) removeFee("USF100", "FINAL");
	//
					
	//Water relocation - USF120
		if (countWaterRelocation == 0 && feeExists("USF120")) removeFee("USF120", "FINAL");
		if (countWaterRelocation > 0) {
			var sumQtyMeters = sumASITColumn(tmpTable, "Qty of Meters", "INCLUDE", "Service Type", "Water Relocation");
			updateFee("USF120","PMT_UTL_SERV", "FINAL",  sumQtyMeters, "N");
			}
			
	//Electric Service Turn on Same Day - USF130
		if (countElecServTurn == 0 && feeExists("USF130")) removeFee("USF130", "FINAL");
		if (countElecServTurn > 0) {
			var sumQtyMeters = sumASITColumn(tmpTable, "Qty of Meters", "INCLUDE", "Service Type", "Electric Service Turn on Same Day");
			updateFee("USF130","PMT_UTL_SERV", "FINAL",  sumQtyMeters, "N");
			}	
					
	//Temporary Electric - USF150
		if (countTempElec == 0 && feeExists("USF150")) removeFee("USF150", "FINAL");
		if (countTempElec > 0) {
			var sumQtyMeters = sumASITColumn(tmpTable, "Qty of Meters", "INCLUDE", "Service Type", "Temporary Electric");
			updateFee("USF150","PMT_UTL_SERV", "FINAL",  sumQtyMeters, "N");
			}	
					
	//Pavement Replacement – Local Roadway- USF160
	//   logDebug(countPavReplLocal);
		if (countPavReplLocal == 0 && feeExists("USF160")) removeFee("USF160", "FINAL");
		if (countPavReplLocal > 0) {
			var sumQtyMeters = sumASITColumn(tmpTable, "Qty of Meters", "INCLUDE", "Service Type", "Pavement Replacement - Local Roadway");
			updateFee("USF160","PMT_UTL_SERV", "FINAL",  sumQtyMeters, "N");
			}	
	//Pavement Replacement – Collector Roadway - USF170

		if (countPavReplColl == 0 && feeExists("USF170")) removeFee("USF170", "FINAL");
		if (countPavReplColl > 0) {
			var sumQtyMeters = sumASITColumn(tmpTable, "Qty of Meters", "INCLUDE", "Service Type", "Pavement Replacement - Collector Roadway");
			updateFee("USF170","PMT_UTL_SERV", "FINAL",  sumQtyMeters, "N");
			}					
					
	//Pavement Replacement – Arterial Roadway - USF180
		if (countPavReplArt == 0 && feeExists("USF180")) removeFee("USF180", "FINAL");
		if (countPavReplArt > 0) {
			var sumQtyMeters = sumASITColumn(tmpTable, "Qty of Meters", "INCLUDE", "Service Type", "Pavement Replacement – Arterial Roadway");
			updateFee("USF180","PMT_UTL_SERV", "FINAL",  sumQtyMeters, "N");
			}					
					
					
	//USF190 Service Type - Water Service 
	// Service Size - Water - 3/4 or 1.0
		if (countWaterService > 0) {
			var waterSum1 = 0;
			for (var rowIndex in tmpTable) {
			thisRow = tmpTable[rowIndex];
			if ((thisRow["Service Type"].fieldValue == "Water Service") && (thisRow["Service Size"].fieldValue == 'Water 3/4' || thisRow["Service Size"].fieldValue == 'Water 1.0'))  {    
			if (!isNaN(parseFloat(thisRow["Qty of Meters"].fieldValue)))
				waterSum1 = waterSum1 + parseFloat(thisRow["Qty of Meters"].fieldValue);		
			 }
			}							
			if (waterSum1 > 0)
			updateFee("USF190","PMT_UTL_SERV", "FINAL",  waterSum1, "N");
		}
		if (waterSum1 == 0 && feeExists("USF190")) removeFee("USF190", "FINAL");
					
	//USF200 Service Type - Water Service 
	// Service Size - Water - 1 1/2
		if (countWaterService > 0) {
			var waterSum2 = 0;
			for (var rowIndex in tmpTable) {
				thisRow = tmpTable[rowIndex];
				if ((thisRow["Service Type"].fieldValue == "Water Service") && thisRow["Service Size"].fieldValue == 'Water 1 1/2' )  {    
				if (!isNaN(parseFloat(thisRow["Qty of Meters"].fieldValue)))
					waterSum2 = waterSum2 + parseFloat(thisRow["Qty of Meters"].fieldValue);		
				 }
				}							
				if (waterSum2 > 0)
					updateFee("USF200","PMT_UTL_SERV", "FINAL",  waterSum2, "N");
		}
		if (waterSum2 == 0 && feeExists("USF200")) removeFee("USF200", "FINAL");		
	//USF210 Service Type - Water Service 
	// Service Size - Water - 2.0
		if (countWaterService > 0) {
			var waterSum3 = 0;
			for (var rowIndex in tmpTable) {
				thisRow = tmpTable[rowIndex];
				if ((thisRow["Service Type"].fieldValue == "Water Service") && thisRow["Service Size"].fieldValue == 'Water 2.0' )  {    
				if (!isNaN(parseFloat(thisRow["Qty of Meters"].fieldValue)))
					waterSum3 = waterSum3 + parseFloat(thisRow["Qty of Meters"].fieldValue);		
				 }
				}							
				if (waterSum3 > 0)
					updateFee("USF210","PMT_UTL_SERV", "FINAL",  waterSum3, "N");
		}
		if (waterSum3 == 0 && feeExists("USF210")) removeFee("USF210", "FINAL");
}
// This should really only execute if the table fails to load
// which would be exactly what we woulhd want.
else {
	// 010
	if (feeExists("USF010")) removeFee("USF010", "FINAL");
	// 020
	if (feeExists("USF020")) removeFee("USF020", "FINAL");
	// 030
	if (feeExists("USF030")) removeFee("USF030", "FINAL");
	// 040
	if (feeExists("USF040")) removeFee("USF040", "FINAL");
	// 050
	if (feeExists("USF050")) removeFee("USF050", "FINAL");
	// 060
	if (feeExists("USF060")) removeFee("USF060", "FINAL");
	// 070
	if (feeExists("USF070")) removeFee("USF070", "FINAL");
	// 080
	if (feeExists("USF080")) removeFee("USF080", "FINAL");
	// 090
	if (feeExists("USF090")) removeFee("USF090", "FINAL");
	// 100
	if (feeExists("USF100")) removeFee("USF100", "FINAL");
	// 110 Doesn't Exist
	// 120
	if (feeExists("USF120")) removeFee("USF120", "FINAL");
	// 130
	if (feeExists("USF130")) removeFee("USF130", "FINAL");
	// 140
	// 150
	if (feeExists("USF150")) removeFee("USF150", "FINAL");
	// 160
	if (feeExists("USF160")) removeFee("USF160", "FINAL");
	// 170
	if (feeExists("USF170")) removeFee("USF170", "FINAL");
	// 180
	if (feeExists("USF180")) removeFee("USF180", "FINAL");
	// 190
	if (feeExists("USF190")) removeFee("USF190", "FINAL");
	// 200
	if (feeExists("USF200")) removeFee("USF200", "FINAL");
	// 210
	if (feeExists("USF210")) removeFee("USF210", "FINAL");
}