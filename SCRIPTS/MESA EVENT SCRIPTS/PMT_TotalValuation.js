/*===================================================================
// Script Number: 125
// Script Name: PMT_TotalValuation.js
// Script Developer: Bryan de Jesus
// Script Agency: Woolpert
// Script Description: When an entry is made in the Occupancy ASIT – Where “Occupancy Classification” and “Type of Construction” are not null and “Sq Ft” > 0, Find the rate (g3_unit_value) in GVALUATN where g3_use_type = the value of the “Occupancy Classification” column and g3_con_typ = the value of the “Type of Construction” column, then multiply that rate by the number of square feet (value of the “Sq Ft” column).  The total valuation should be the sum of all the different occupancies.
// Script Run Event: ASIUA
// Script Parents:
//            ASIUA;Permits!Residential!Mobile Home!NA
//            ASIUA;Permits!Residential!NA!NA
//            ASIUA;Permits!Commercial!NA!NA
===================================================================*/
showDebug=true;

try {
	var occupancyTable = loadASITable("OCCUPANCY INFORMATION");
	if (!occupancyTable) occupancyTable = loadASITable("OCCUPANCY INFO");
	if (!occupancyTable || occupancyTable.length == 0) logDebug("Unable to load occupancy information table or table is empty.");
	else {
		var totalValuation = 0.0;
		for (var rowIndex in occupancyTable){
			var row = occupancyTable[rowIndex];
			var occupancyClassification = row['Occupancy Classification'];
			if (!occupancyClassification) logDebug("Warning: 'Occupancy Classification' is not entered. Valuation for row cannot be calculated.");
			var typeOfConstruction = row['Type of Construction'];
			if (!typeOfConstruction) logDebug("Warning: 'Type of Construction' is not entered. Valuation for row cannot be calculated.");
			var sqFt = row['Sq Ft'];
			if (!sqFt) logDebug("Warning: 'Sq Ft' is not entered. Valuation for row cannot be calculated.");
			if (!occupancyClassification || !typeOfConstruction || !sqFt){
				logDebug("Skipping row valuation...");
			} else {
				logDebug("Calculating row valuation...");
				
				// get unit value based on use and construction types
				var unitValue = 0.0, rowValuation = 0.0;
				var initialContext = aa.proxyInvoker.newInstance("javax.naming.InitialContext", null).getOutput();
				var ds = initialContext.lookup("java:/AA");
				var conn = ds.getConnection();
				var selectString = "select G3_UNIT_VALUE from GVALUATN where SERV_PROV_CODE = ? and G3_USE_TYP = ? and G3_CON_TYP = ?"; 
				var sStmt = conn.prepareStatement(selectString);
				sStmt.setString(1, servProvCode);
				sStmt.setString(2, occupancyClassification);
				sStmt.setString(3, typeOfConstruction)
				var rSet = sStmt.executeQuery();
				if (rSet.next()) unitValue = rSet.getDouble('G3_UNIT_VALUE');
				sStmt.close();
				conn.close();
				
				if (unitValue <= 0) logDebug("Warning 'Unit Valve' not greater than zero. Valuation for row cannot be calculated.");
				else {
					rowValuation = unitValue * sqFt;
					logDebug("Row valuation: " + rowValuation);
					totalValuation += rowValuation;
				}
			}
		}
		if (totalValuation > 0) editAppSpecific('Total Valuation', totalValuation);
	}	
} catch (error){
	logDebug("Javascript Error: " + error.message);
}

