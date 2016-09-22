/*===================================================================
// Script Number: 341
// Script Name: ALR_SetWFToFeesDue.js
// Script Developer: Jody Bearden
// Script Agency: Mesa
// Script Description: When a fee has been invoiced, set the workflow
//                     task "Review" to "Fees Due"
//
// Script Run Event: ASA, ASIUA
// Script Parents:
//             ASA;Permits!Police Department!Alarms!Activity
//             ASIUA;Permits!Police Department!Alarms!Activity
/*==================================================================*/
/* test with 20162550524 */

try
{
	var invFound = false; // do we have a fee with a status of "INVOICED"?
	
	// get fee(s) - if one or more have a status of invoiced, set wfTask "Review" to status of "Fees Due"
	var result = aa.fee.getFeeItems(capId);
	if(result.getSuccess()) {
		var feeObjArr = result.getOutput();
		
		// check fees - break on first one that has a status of "INVOICED" - set wfTask "Review" to wfStatus of "Fees Due"
		for (fee in feeObjArr) {
			//logDebug("fee[" + fee + "]: feeDescription: " + feeObjArr[fee].getFeeDescription() + "\nfeeitemStatus: " + feeObjArr[fee].getFeeitemStatus() ); // we've got a collection of FeeItemScriptModel objects
			if(feeObjArr[fee].getFeeitemStatus() == "INVOICED") {
				invFound = true;
				break;
			}
		}

		// activate wfTask "Review" if necessary and set status to "Fees Due"
		//logDebug("invFound: " + invFound);
		if (invFound) {
			var wfResult = aa.workflow.getTaskItems(capId, "Review", "PMT_PD_ALARM_ACTIVITY", null, null, "Y");
			if (wfResult.getSuccess()) {
				var wfObj = wfResult.getOutput();
				//logDebug("wfObj.length: " + wfObj.length);
				for (i in wfObj) {
					/*
					logDebug("wfObj[" + i + "]: " + wfObj[i]);
					logDebug("taskDescription: " + wfObj[i].getTaskDescription());
					logDebug("isActive: " + wfObj[i].getActiveFlag());
					logDebug("disposition: " + wfObj[i].getDisposition());
					*/
					if (wfObj[i].getTaskDescription() == "Review") {
						if (wfObj[i].getActiveFlag() != "Y") {
							//logDebug("wfTask active (before): " + wfObj[i].getActiveFlag());
							wfObj[i].setActiveFlag("Y");
							//logDebug("wfTask active (after): " + wfObj[i].getActiveFlag());
						}
						if (wfObj[i].getDisposition() != "Fees Due") {
							//logDebug("wfTask status (before): " + wfObj[i].getDisposition());
							wfObj[i].setDisposition("Fees Due");
							//logDebug("wfTask status (after): " + wfObj[i].getDisposition());
						}
						break;
					}
				}
			}
		}
	}
	else
	{
		logDebug("***Unable to get fee items for capId(" + capId + "): " + result.getErrorMessage());
	}
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}
