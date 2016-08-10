function setWFDueDate_Mesa(stdChoice, vHearingDate) {
	var strControl;
	var bizDomScriptResult = aa.bizDomain.getBizDomain(stdChoice);
	
   	if (bizDomScriptResult.getSuccess())
   		{
		var bizDomScriptObj = bizDomScriptResult.getOutput().toArray();
		for (x in bizDomScriptObj) {
			var bizDomain = bizDomScriptObj[x];
			var vBizDesc = bizDomain.getDispBizdomainValue();
			var vBizValue = bizDomain.getDescription();
			if (vBizDesc.indexOf('WF-') != -1) {
				var vWFTask = vBizDesc.substr(3,vBizDesc.length());
				var vBizValueArry = vBizValue.split(',');
				if (vBizValueArry[0] == "Today") {
					var vTaskDueDate = dateAdd(new Date(), vBizValueArry[1]);
					editTaskDueDate(vWFTask, vTaskDueDate);
				}
				else if (vBizValueArry[0] == "Hearing") {
					var vTaskDueDate = dateAdd(vHearingDate, vBizValueArry[1]);
					editTaskDueDate(vWFTask, vTaskDueDate);
				}
			}
		}
		return true;
	}
	else {
		logDebug("lookup(" + stdChoice + ") does not exist");
	}
	return false;
}