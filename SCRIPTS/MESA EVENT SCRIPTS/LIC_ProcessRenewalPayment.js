/*===================================================================
// Script Number: 
// Script Name: LIC_ProcessRenewalPayment
// Script Developer: DMH
// Script Agency: Mesa
// Script Description: Processes a renewal payment!
// Script Run Event: PRA
/*==================================================================*/
var capID = getCapId();
logDebug("capID = " + capID);
var partialCapID = getPartialCapID(capID);
logDebug("PartialCapID = " + partialCapID);
var parentLicenseCAPID = getParentLicenseCapID(capID);
if (typeof(parentLicenseCAPID) == "String") {
	logDebug("Got a string for a cap Id");
	tLicArray = String(parentLicenseCAPID).split("-");
	parentLicenseCAPID = aa.cap.getCapID(tLicArray[0], tLicArray[1], tLicArray[2]).getOutput();
}
if (parentLicenseCAPID != null) {
	logDebug("Parent CAP ID :" + parentLicenseCAPID);
	// 2. Check to see if license is ready for renew, and check for full paying 
	if (isReadyRenew(parentLicenseCAPID) && isRenewalCap(capID) && (checkFullPaying(capID)=="true")) {
		if (isRenewalCompleteOnPayment(capID)) {
			//3. Associate current CAP with parent license CAP.
			var result = aa.cap.updateRenewalCapStatus(parentLicenseCAPID, capID);
			if (result.getSuccess()) {
				projectScriptModel = result.getOutput();
				aa.cap.updateAccessByACA(capID, "N");			
				if (projectScriptModel.RENEWAL_COMPLETE.equals(projectScriptModel.getStatus())) {
					if (activeLicense(parentLicenseCAPID)) {
						copyKeyInfo(capID, parentLicenseCAPID);
						aa.cap.transferRenewCapDocument(partialCapID, parentLicenseCAPID, true);
						logDebug("Transfer document for renew cap. Source Cap: " + partialCapID + ", target Cap:" + parentLicenseCAPID);
	
						//5.1.3. Send auto-issurance license email to public user
						//if (sendLicEmails) aa.expiration.sendAutoIssueLicenseEmail(parentLicenseCAPID);
						logDebug("send auto-issuance license email to citizen user.");
						aa.env.setValue("isAutoIssuanceSuccess", "Yes");
					}
					logDebug("CAP(" + parentLicenseCAPID + ") renewal is complete.");
				}
				else {
					//Send new license application notice agency user for approval
					//if (sendLicEmails) aa.expiration.sendNoAutoIssueLicenseEmail(parentLicenseCAPID);
					//logDebug("send no-auto-issuance license email to citizen user and agency user.");
					//logDebug("CAP(" + parentLicenseCAPID + ") is ready for review.");
				}
			}	
			else { logDebug("ERROR: Failed to create renewal CAP : MasterCAP(. " + parentLicenseCAPID + ")  renewal CAP(" + capID + ")" + result.getErrorMessage()); }
		}
		else {
			var reviewResult = aa.cap.getProjectByChildCapID(capID, "Renewal", "Incomplete");
			if(reviewResult.getSuccess()) {
				projectScriptModels = reviewResult.getOutput();
				projectScriptModel = projectScriptModels[0];
				projectScriptModel.setStatus("Review");
				var updateResult = aa.cap.updateProject(projectScriptModel);
				if (updateResult.getSuccess()) {
					logDebug("Updated project status to review");
				}
				else { logDebug("Error updating project status to review: " + updateResult.getErrorMessage()); }
			}
			else { logDebug("Error getting Project By Child CapID"); }
		}
	}
	else { logDebug("Either not readyRenew or not a renewal CAP"); }
}
else { logDebug("Parent CapID is null"); }


function isRenewalCompleteOnPayment(capID) { // stub for now - all licenses complete on workflow
	return false;
}
function isReadyRenew(capid) {
	if (capid == null || aa.util.instanceOfString(capid)) {
		return false;
	}
	var result = aa.expiration.isExpiredLicenses(capid);
    	if(result.getSuccess()) {
		return true;
	}  
    	else { logDebug("ERROR: Failed to get expiration with CAP(" + capid + "): " + result.getErrorMessage()); }
	return false;
}
function isRenewalCap(capid)
{
	if (capid == null || aa.util.instanceOfString(capid))
	{
		return false;
	}
	//1. Check to see if it is renewal CAP. 
	var result = aa.cap.getProjectByChildCapID(capid, "Renewal", null);
	if(result.getSuccess())
	{
		projectScriptModels = result.getOutput();
		if (projectScriptModels != null && projectScriptModels.length > 0)
		{
			return true;
		}
	}
	return false;
}
function checkFullPaying(capid){
	var checkResult = aa.fee.isFullPaid4Renewal(capid);
	if (!checkResult.getSuccess()) {
		logDebug("ERROR: Failed to check full paying, renewal CAP(" + capid + "). " + result.getErrorMessage());
		return false;
	}
	var fullPaid = checkResult.getOutput();
	if(fullPaid == "false") {
		logDebug("The fee items is not full paid, please pay and apply the Fee items in the renewal CAP "+capid);
	}
	return "true";
}
function getParentLicenseCapID(capid) {
	logDebug("getParentLicenseCapID");
	if (capid == null || aa.util.instanceOfString(capid)) { return null; }
	var result = aa.cap.getProjectByChildCapID(capid, "Renewal", "Incomplete");
	if(result.getSuccess() ) {
		projectScriptModels = result.getOutput();
		projectScriptModel = projectScriptModels[0];
		return projectScriptModel.getProjectID();
	}
	else {
		retVal =  getParentCapVIAPartialCap(capid);
		if (retVal == null) {
			retVal = getParentLicenseByCompleteRenewal(capid);
			if (retVal == null) {
				retVal = getParentLicenseByAnyRenewal(capId);
				if (retVal != null) return retVal;
			}
			else return retVal;
		}
		else return retVal;
	}
	return null;
}
function getParentCapVIAPartialCap(capid) {
	logDebug("getParentCapVIAPartialCap");
	var partialCapID = getPartialCapID(capid);
	logDebug("partialCapID " + partialCapID);
	var result2 = aa.cap.getProjectByChildCapID(partialCapID, "Renewal", "Incomplete");
	if(result2.getSuccess()) {
		licenseProjects = result2.getOutput();
		if (licenseProjects == null || licenseProjects.length == 0) {
			logDebug("ERROR: Failed to get parent CAP with partial CAPID(" + capid + ")");
			return null;
		}
		licenseProject = licenseProjects[0];
		// update renewal relationship from partial cap to real cap
		//updateRelationship2RealCAP(licenseProject.getProjectID(), capid);
		//Return parent license CAP ID.
		logDebug("Returning project ID of " + licenseProject.getProjectID());
		return licenseProject.getProjectID();
	}
	else { 
		logDebug("Error in getParentCapVIAPartialCap " + result2.getErrorMessage());
		tempCapID = getParentLicenseByCompleteRenewal(capid);
		if (tempCapID != null) {
			tLicArray = String(tempCapID).split("-");
			var tempCapID2 = aa.cap.getCapID(tLicArray[0], tLicArray[1], tLicArray[2]).getOutput();
			logDebug("tempCapID2 = " + tempCapID2.getCustomID());
			return tempCapID2; 
		}
		else {
			logDebug("Did not find complete renewal "); 
			return null;
		}
	}
}


function updateRelationship2RealCAP(parentLicenseCAPID, capID) {
	logDebug("updateRelationship2RealCAP")
	var result = aa.cap.createRenewalCap(parentLicenseCAPID, capID, false);
	if (result.getSuccess()) {
		var projectScriptModel = result.getOutput();
		projectScriptModel.setStatus("Incomplete");
		var result1 = aa.cap.updateProject(projectScriptModel);
		if (!result1.getSuccess()) {
			logDebug("ERROR: Failed update relationship status CAPID(" + capID + "): " + result1.getErrorMessage());
		}
	}
	else { logDebug("ERROR: Failed to create renewal relationship parentCAPID(" + parentLicenseCAPID + "),CAPID(" + capid + "): " + result.getErrorMessage()); }
}

function getParentLicenseByCompleteRenewal(capid) {
	logDebug("getParentLicenseByCompleteRenewal");
	if (capid == null || aa.util.instanceOfString(capid)) { return null; }
	var result = aa.cap.getProjectByChildCapID(capid, "Renewal", "Complete");
	if(result.getSuccess() ) {
		logDebug("Found Complete renewal")
		projectScriptModels = result.getOutput();
		projectScriptModel = projectScriptModels[0];
		logDebug("project ID = " + projectScriptModel.getProjectID());
		return projectScriptModel.getProjectID();
	}
	return null;
}

function getParentLicenseByAnyRenewal(capid) {
	logDebug("getParentLicenseByAnyRenewal");
	if (capid == null || aa.util.instanceOfString(capid)) { return null; }
	logDebug("Looking for renewal without a status")
	var result = aa.cap.getProjectByChildCapID(capid, "Renewal", "");
	if(result.getSuccess() ) {
		logDebug("Found renewal with empty status");
		projectScriptModels = result.getOutput();
		projectScriptModel = projectScriptModels[0];
		logDebug("project ID = " + projectScriptModel.getProjectID());
		if (projectScriptModel.getProjectID() == null) {
			var result = aa.cap.getProjectByChildCapID(capid, "Renewal", null);
			if(result.getSuccess() ) {
				logDebug("Found renewal with null status");
				projectScriptModels = result.getOutput();
				projectScriptModel = projectScriptModels[0];
				logDebug("project ID = " + projectScriptModel.getProjectID());
			}
		}
		logDebug("Returnning " + projectScriptModel.getProjectID());
		return projectScriptModel.getProjectID();
	}
	return null;
}
