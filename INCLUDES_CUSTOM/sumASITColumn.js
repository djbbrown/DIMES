function sumASITColumn(tObj, cNameToSum) {
	// optional params = cFilterType, cNameFilter, cValueFilter
	var retValue = 0;
	var includeVals = new Array();
	if (tObj) {
		if (arguments.length == 2) { // no filters
			for (var ea in tObj) {
				var row = tObj[ea];
				var colValue = row[cNameToSum].fieldValue;
				if (!isNaN(parseFloat(colValue))) 
					retValue += parseFloat(colValue);
			}
			return retValue;
		}
		if (arguments.length >= 5) {
			filterType = arguments[2];
			cNameFilter = arguments[3];
			//====================================
			// Old code
			//------------------------------------
			// cValueFilter = arguments[4];
			//====================================
			// New Code
			//------------------------------------
			// Parse through each argument that is in position 5 and further
			for(x = 4; x < arguments.length; x++){
				// logDebug("Adding "+arguments[x]+" to array");
				includeVals.push(arguments[x]);
			}
			cValueFilter = includeVals;
			//====================================
			for (var ea in tObj) {
				var row = tObj[ea];
				var colValue = row[cNameToSum].fieldValue;
				var colFilter = row[cNameFilter].fieldValue;
				if (filterType == "INCLUDE") {
					if (exists(colFilter,cValueFilter)) {
						if (!isNaN(parseFloat(colValue))) 
							retValue += parseFloat(colValue);
					}
				}
				if (filterType == "EXCLUDE") {
					if (exists(colFilter,cValueFilter)) {
						if (!isNaN(parseFloat(colValue))) 
							retValue += parseFloat(colValue);
					}
				}
			}
		}
	}
	return retValue;
}