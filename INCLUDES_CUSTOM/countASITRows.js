function countASITRows(tObj, cNameFilter, cValueFilter) {
	var retValue = 0;
	if (tObj) {
	if (arguments.length == 3) {
		cNameFilter = arguments[1];
		cValueFilter = arguments[2];
		for (var ea in tObj) {
			var row = tObj[ea];
			if (row[cNameFilter].fieldValue == cValueFilter)
				retValue++;
			}
		}
	}
	return retValue;
}