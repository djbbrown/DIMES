//*===================================================================
//
// Script Name: scheduleInspectionDateWithInspector.js 
// Script Developer: Vance Smith
// Script Agency: City of Mesa
// Script Description:  
//		Will schedule an inspection date and auto assign the inspector.
//      There are similar functions, but this one has better logging.
// 
//==================================================================*/
function scheduleInspectionDateWithInspector(iType, dateToSched, inspectorID )
{
	var inspectorObj = null;
	var inspTime = null;
	
	var inspRes = aa.person.getUser(inspectorID);
	if (inspRes.getSuccess())
	{
		inspectorObj = inspRes.getOutput();
	}
	else
	{
		logDebug("Inspector with ID = " + inspectorID + " not found!");
	}

	var schedRes = aa.inspection.scheduleInspection(capId, inspectorObj, aa.date.parseDate(dateToSched), inspTime, iType, "Scheduled via Script");

	if (schedRes.getSuccess())
	{
		logDebug("Successfully scheduled inspection: " + iType + " for " + dateToSched);
	}
	else
	{
		logDebug( "**ERROR: adding scheduling inspection (" + iType + "): " + schedRes.getErrorMessage());

	}
}