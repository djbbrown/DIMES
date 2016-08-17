/*===================================================================
// Script Number: 
// Script Name: LIC_ProcessRenewalPayment
// Script Developer: DMH
// Script Agency: Mesa
// Script Description: Processes a renewal payment!
// Script Run Event: PRA
/*==================================================================*/
var capID = getCapId();
var partialCapID = getPartialCapID(capID);
var parentLicenseCAPID = getParentLicenseCapID(capID)
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
	if (capid == null || aa.util.instanceOfString(capid)) { return null; }
	var result = aa.cap.getProjectByChildCapID(capid, "Renewal", "Incomplete");
	if(result.getSuccess() ) {
		projectScriptModels = result.getOutput();
		projectScriptModel = projectScriptModels[0];
		return projectScriptModel.getProjectID();
	}
	else {
		return getParentCapVIAPartialCap(capid);
	}
}
function getParentCapVIAPartialCap(capid) {
	var result2 = aa.cap.getProjectByChildCapID(capid, "Renewal", "Incomplete");
	if(result2.getSuccess()) {
		licenseProjects = result2.getOutput();
		if (licenseProjects == null || licenseProjects.length == 0) {
			logDebug("ERROR: Failed to get parent CAP with partial CAPID(" + capid + ")");
			return null;
		}
		licenseProject = licenseProjects[0];
		// update renewal relationship from partial cap to real cap
		updateRelationship2RealCAP(licenseProject.getProjectID(), capid);
		//Return parent license CAP ID.
		return licenseProject.getProjectID();
	}
	else { return null; }
}


