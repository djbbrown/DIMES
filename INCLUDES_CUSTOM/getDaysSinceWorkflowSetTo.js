/*--------------------------------------------------------------------------/
|	Returns number of days since the most recent worflow task (wtask) set to any status in the array (wStatusList)
/--------------------------------------------------------------------------*/
function getDaysSinceWorkflowSetTo(wTask, wStatusList) {
	var wfHistObj = aa.workflow.getHistory(capId)
	if (!wfHistObj.getSuccess()) {
		logDeubg("Could not load Worflow History for record " +capIDString)
		return 0
	}
	var wfHist = wfHistObj.getOutput()
	var today = new Date()
	today.setHours(0,0,0,0)
	var mostRecent = null
	
	for (h in wfHist) {
		if (wfHist[h].getTaskDescription() == wTask && wStatusList.indexOf(String(wfHist[h].getDisposition())) > -1) {
			dateStamp = String(wfHist[h].getStatusDate())
			dateStampStr = dateStamp.substring(5,7)+"/"+dateStamp.substring(8,10)+"/"+dateStamp.substring(0,4)
			//logDebug("Processing: " +wfHist[h].getTaskDescription() +": "+ wfHist[h].getDisposition() + " - " + dateStampStr  )
			tmpDate = new Date(dateStampStr)
			if ( mostRecent == null || tmpDate > mostRecent) mostRecent = tmpDate
		}
	}
	
	if (mostRecent == null) return 0
	
	return Math.ceil((today - mostRecent) / 86400000)
}