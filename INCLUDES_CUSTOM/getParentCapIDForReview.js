
function getParentCapIDForReview(capid) {
	if (capid == null || aa.util.instanceOfString(capid))
	{
		return null;
	}
	//1. Get parent license for review
	var result = aa.cap.getProjectByChildCapID(capid, "Renewal", "Review");
    if(result.getSuccess())
	{
		var projectScriptModels = result.getOutput();
		if (projectScriptModels == null || projectScriptModels.length == 0)
		{
			aa.print("ERROR: Failed to get parent CAP with CAPID(" + capid + ") for review");
			return null;
		}
		//2. return parent CAPID.
		var projectScriptModel = projectScriptModels[0];
		return projectScriptModel.getProjectID();
	}  
    else 
    {
      aa.print("ERROR: Failed to get parent CAP by child CAP(" + capid + ") for review: " + result.getErrorMessage());
      return null;
    }
}
