function updateInspectionDate(iNumber,iDate)
	{
	// optional capId
	// updates the inspection date
	// requires the inspection id and schedule Date
	
	var itemCap = capId
	if (arguments.length > 2)
		itemCap = arguments[2]; // use cap ID specified in args
	
	iObjResult = aa.inspection.getInspection(itemCap,iNumber);
	if (!iObjResult.getSuccess())
		{ logDebug("**WARNING retrieving inspection " + iNumber + " : " + iObjResult.getErrorMessage()) ; return false ; }
	
	iObj = iObjResult.getOutput();
	
	logDebug("assigning inspection " + iNumber + " to date " + iDate);		
	
	// set date to correct type to be scheduled
	var newSchedInspDate = aa.date.parseDate(iDate); // need to convert iDate
	iObj.setScheduledDate(newSchedInspDate);

	aa.inspection.editInspection(iObj)
	}