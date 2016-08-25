function doesScheduledInspExist() {
	inspType = null;
	if (arguments.length > 0)
		inspType = arguments[0];
    var retValue = false;
	var inspResultObj = aa.inspection.getInspections(capId);
	if (inspResultObj.getSuccess()) {
		var inspList = inspResultObj.getOutput();
		for (xx in inspList) {
			if (inspList[xx].getInspectionStatus().toUpperCase().equals("SCHEDULED") && (!inspType || inspList[xx].getInspectionType() == inspType)) {
				return true;
			}
		}
	}
	return retValue;
}
