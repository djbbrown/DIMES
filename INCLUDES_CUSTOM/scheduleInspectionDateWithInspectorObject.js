//*===================================================================
//
// Script Name: scheduleInspectionDateWithInspectorObject.js 
// Script Developer: Vance Smith
// Script Agency: City of Mesa
// Script Description:  
//		Will schedule an inspection date and auto assign the inspector.
//      There are similar functions, but this one has better logging.
// 
//==================================================================*/
function scheduleInspectionDateWithInspectorObject(iType, dateToSched, inspectorObj )
{
	var inspTime = null;

	//Workaround Fix recommended by Accela for Error received for sync issue
	//Can't get the Service Provider Code from the I18NModel 
	com.accela.aa.util.WebThreadLocal.setServiceProviderCode("MESA");
	
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