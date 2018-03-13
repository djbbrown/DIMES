/*===================================================================
// Script Number: 
// Script Name: LIC_CompleteRenewalOnWorkflow
// Script Developer: DMH
// Script Agency: Mesa
// Script Description: Completes a renewal on workflow
// Script Run Event: PRA
//
//  Updates:
//  | M VanWie|  02/16/2018  |  renamed getParentCapIDForReviewCustom to remove naming conflict with global version
//  | M VanWie|  03/13/2018  |  Added Peddler expiration calculation based on ASI data
/*==================================================================*/

try {
	if (wfTask == "Renewal Submittal" || wfTask == "Renew License"){
		var capID = getCapId();
		var parentLicenseCAPID = getParentCapIDForReviewCustom(capID)

		if (parentLicenseCAPID != null) {
		
			if (isWorkflowApproveForReview(capID, aa.env.getValue("WorkflowTask"), aa.env.getValue("SD_STP_NUM"), aa.env.getValue("ProcessID"), aa.env.getValue("WorkflowStatus"))) {
				var partialCapID = getPartialCapID(capID);
				if (isReadyRenew(parentLicenseCAPID)) {
					renewalCapProject = getRenewalCapByParentCapIDForReview(parentLicenseCAPID);
					if (renewalCapProject != null) {
						aa.cap.updateAccessByACA(capID, "N");			
						if (activeLicense(parentLicenseCAPID)) {
							renewalCapProject.setStatus("Complete");
							logDebug("license(" + parentLicenseCAPID + ") is activated.");
							updateExpirationStatus(parentLicenseCAPID);
							aa.cap.updateProject(renewalCapProject);
							copyKeyInfo(capID, parentLicenseCAPID);
							aa.cap.transferRenewCapDocument(partialCapID, parentLicenseCAPID, false);
							logDebug("Transfer document for renew cap. Source Cap: " + partialCapID + ", target Cap: " + parentLicenseCAPID);
						//	if (sendLicEmails) aa.expiration.sendApprovedNoticEmailToCitizenUser(parentLicenseCAPID);
						}
					}
				}
			}
			if (isWorkflowDenyForReview(capID, aa.env.getValue("WorkflowTask"), aa.env.getValue("SD_STP_NUM"), aa.env.getValue("ProcessID"),  aa.env.getValue("WorkflowStatus"))) {
				if (isReadyRenew(parentLicenseCAPID)) {
					renewalCapProject = getRenewalCapByParentCapIDForReview(parentLicenseCAPID);
					//if (renewalCapProject != null) {
					//	if (sendLicEmails) aa.expiration.sendDeniedNoticeEmailToCitizenUser(parentLicenseCAPID)
					//}
				}
			}
		}
	}
}
catch (err){
	logDebug('Error in LIC_CompleteRenewalOnWorkflow: ' + err.message + "   ***StackTrace: " + err.stack);
}

function updateExpirationStatus(licCapId) {
	licObject = new licenseObject(null, licCapId);
	if (licObject != null) {
		currExpDate=licObject.b1ExpDate;


		// Added calculation for Q/A Peddlers
		// Set EXP config to add 0 days so we will set it for all other
		// licenses via this script.
		// MV - 03/13/2018
		if(appTypeArray[2] == "Peddler"){
			var RFreq = AInfo["Renewal Frequency"];
			if(RFreq == 'Quarterly')
			{
				newExpDate = dateAdd(currExpDate, 90); 
				licObject.setExpiration(newExpDate);
				licObject.setStatus("Active");
			}
			else
			{
				newExpDate = dateAdd(currExpDate, 365);
				licObject.setExpiration(newExpDate);
				licObject.setStatus("Active");
			}
		}
		else{
			newExpDate = dateAdd(currExpDate, 365);
			licObject.setExpiration(newExpDate);
			licObject.setStatus("Active");
		}
		}
	}

 
function getParentCapIDForReviewCustom(capid) {
	if (capid == null || aa.util.instanceOfString(capid)) {
		return null;
	}
	//1. Get parent license for review
	var result = aa.cap.getProjectByChildCapID(capid, "Renewal", "Review");
    	if(result.getSuccess()) {
		projectScriptModels = result.getOutput();
		if (!(projectScriptModels == null || projectScriptModels.length == 0)) {
			logDebug("Found project by renewal status review");
			projectScriptModel = projectScriptModels[0];
			return projectScriptModel.getProjectID();
		}
	}  
	var result = aa.cap.getProjectByChildCapID(capid, "Renewal", "Incomplete");
    	if(result.getSuccess()) {
		projectScriptModels = result.getOutput();
		if (!(projectScriptModels == null || projectScriptModels.length == 0)) {
			logDebug("Found project by renewal status incomplete");
			projectScriptModel = projectScriptModels[0];
			return projectScriptModel.getProjectID();
		}
	}  
	var result = aa.cap.getProjectByChildCapID(capid, "Renewal", "");
    	if(result.getSuccess()) {
		projectScriptModels = result.getOutput();
		if (!(projectScriptModels == null || projectScriptModels.length == 0)) {
			logDebug("Found project by renewal status nothing");
			projectScriptModel = projectScriptModels[0];
			return projectScriptModel.getProjectID();
		}
	}  
	LogDebug("Error:  Failed to get Parent Cap ID");
	return null;
}


function isWorkflowApproveForReview(capID, wfTask, stepNum, processID, taskStatus) {
	if (capID == null || aa.util.instanceOfString(capID) || stepNum == null || processID == null || wfTask == null || taskStatus == null) {
		return false;
	}
	//if (wfTask.length()  == 0) { return false; } //MV removed for testing 02/16/2018
	//1. Get workflow task item
	var result = aa.workflow.getTask(capID, stepNum, processID);
	if(result.getSuccess()) 
	{
		taskItemScriptModel = result.getOutput();
		if (taskItemScriptModel == null) {
			logDebug("ERROR: Failed to get workflow task with CAPID(" + capID + ") for review - (taskItemScriptModel is null)");
			return false;
		}
		//2. Check to see if the agency user approve renewal application .
		if (taskItemScriptModel.getTaskDescription().equals(wfTask) && "Renewal Submittal".equals(wfTask) && ( "Renewed".equals(taskStatus)) ) {
			return true;
		}	
		if (taskItemScriptModel.getTaskDescription().equals(wfTask) && "Renew License".equals(wfTask) && ( "Issued".equals(taskStatus) || "Issued with Suspension".equals(taskStatus)) ) {
			return true;
		}	
		if (taskItemScriptModel.getTaskDescription().equals(wfTask) && "Renewal Status".equals(wfTask) && ( "Approved".equals(taskStatus) || "Approved Inactive".equals(taskStatus) || "Approved Active".equals(taskStatus)) ) {
			return true;
		}	
		if (taskItemScriptModel.getTaskDescription().equals(wfTask) && "Application Review".equals(wfTask) && ( "Approved".equals(taskStatus) || "Approved - Complete".equals(taskStatus)) ) {
			return true;
		}	
		if (taskItemScriptModel.getTaskDescription().equals(wfTask) && "Issuance".equals(wfTask) && ( "Complete".equals(taskStatus)) ) {
			return true;
		}
	}  
	else 
	{ 
		logDebug("ERROR: Failed to get workflow task(" + capID + ") for review: " + result.getErrorMessage()); 
	}
	return false;
}


function isWorkflowDenyForReview(capID, wfTask, stepNum, processID, taskStatus) {
	return false; // STUB - not used for Mesa
	if (capID == null || aa.util.instanceOfString(capID) || stepNum == null || processID == null || wfTask == null || taskStatus == null) {
		return false;
	}
	if (wfTask.length()  == 0) { return false; }
	//1. Get workflow task item
	var result = aa.workflow.getTask(capID, stepNum, processID);
    	if(result.getSuccess()) {
		taskItemScriptModel = result.getOutput();
		if (taskItemScriptModel == null) {
			logDebug("ERROR: Failed to get workflow task with CAPID(" + capID + ") for review");
			return false;
		}
		//2. Check to see if the agency user approve renewal application .
		if (taskItemScriptModel.getTaskDescription().equals(wfTask) && "Renewal Status".equals(wfTask) && "Denied".equals(taskStatus)) {
			return true;
		}	
	}  
    	else { logDebug("ERROR: Failed to get workflow task(" + capID + ") for review: " + result.getErrorMessage()); }
	return false;
}

