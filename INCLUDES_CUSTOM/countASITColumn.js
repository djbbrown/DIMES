function countASITColumn(tObj, cNameToCount) {
	// optional params = cFilterType, cNameFilter, cValueFilter
	var retValue = 0;
	if (tObj) {
		if (arguments.length == 2) { // no filters
			for (var ea in tObj) {
				var row = tObj[ea];
				retValue++;
			}
			return retValue;
		}
		if (arguments.length == 5) {
			filterType = arguments[2];
			cNameFilter = arguments[3];
			cValueFilter = arguments[4];
			for (var ea in tObj) {
				var row = tObj[ea];
				var colValue = row[cNameToCount].fieldValue;
				var colFilter = row[cNameFilter].fieldValue;
				if (filterType == "INCLUDE") {
					if (colFilter == cValueFilter) {						
						retValue++;
					}
				}
				if (filterType == "EXCLUDE") {
					if (colFilter != cValueFilter) {
						retValue++;
					}
				}
			}
		}
	}
	return retValue;
}

