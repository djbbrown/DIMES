/*===================================================================
// Script Number: 
// Script Name: LIC_CompleteRenewalOnWorkflow
// Script Developer: DMH
// Script Agency: Mesa
// Script Description: Completes a renewal on workflow
// Script Run Event: PRA
/*==================================================================*/
var capID = getCapId();
var parentLicenseCAPID = getParentCapIDForReview(capID)
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

function updateExpirationStatus(licCapId) {
	licObject = new licenseObject(null, licCapId);
	if (licObject != null) {
		currExpDate=licObject.b1ExpDate;
		newExpDate = dateAddMonths(currExpDate, 12);
		licObject.setExpiration(newExpDate);
		// status should already be "Active"
	}
}
 
function getParentCapIDForReview(capid) {
	// for Longmont licensing, renewals may/may not have payments. Need to look for
	// project status of Review and Incomplete
	if (capid == null || aa.util.instanceOfString(capid)) {
		return null;
	}
	//1. Get parent license for review
	var result = aa.cap.getProjectByChildCapID(capid, "Renewal", "Review");
    	if(result.getSuccess()) {
		projectScriptModels = result.getOutput();
		if (!(projectScriptModels == null || projectScriptModels.length == 0)) {
			projectScriptModel = projectScriptModels[0];
			return projectScriptModel.getProjectID();
		}
	}  
	var result = aa.cap.getProjectByChildCapID(capid, "Renewal", "Incomplete");
    	if(result.getSuccess()) {
		projectScriptModels = result.getOutput();
		if (!(projectScriptModels == null || projectScriptModels.length == 0)) {
			projectScriptModel = projectScriptModels[0];
			return projectScriptModel.getProjectID();
		}
	}  
	var result = aa.cap.getProjectByChildCapID(capid, "Renewal", "");
    	if(result.getSuccess()) {
		projectScriptModels = result.getOutput();
		if (!(projectScriptModels == null || projectScriptModels.length == 0)) {
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
		if (taskItemScriptModel.getTaskDescription().equals(wfTask) && "Renewal Submittal".equals(wfTask) && ( "Renewed".equals(taskStatus)) ) {
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
    	else { logDebug("ERROR: Failed to get workflow task(" + capID + ") for review: " + result.getErrorMessage()); }
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