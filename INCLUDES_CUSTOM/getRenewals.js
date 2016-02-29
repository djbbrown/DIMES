function getRenewals(pcapId) {
    var vRenewalStatus = null;
    if (arguments.length > 1) {
        vRenewalStatus = arguments[1]; // use renewal status specified in args
    }
    //Get the project from the parent capId
    var PrjResult = aa.cap.getProjectByMasterID(pcapId, "Renewal", vRenewalStatus);
    if (PrjResult.getSuccess()) {
        projectScriptModels = PrjResult.getOutput();
        if (projectScriptModels == null || projectScriptModels.length == 0) {
            logDebug("ERROR: Failed to get renewal project by parent CAPID(" + pcapId + ")");
            return null;
        }
        //return  the array of renewal records
        return projectScriptModels;

    }
    else {
        logDebug("ERROR: Failed to get renewal project by parent CAPID(" + pcapId + "). " + PrjResult.getErrorMessage());
        return null;
    }
}
