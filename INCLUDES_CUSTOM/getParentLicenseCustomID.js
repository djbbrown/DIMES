function getParentLicenseCustomID(capIDModel)
{
	var customID = null;
	if (capIDModel.getCustomID() != null && capIDModel.getCustomID() != "")
	{
		return capIDModel.getCustomID();
	}

	var capResult = aa.cap.getCapByPK(capIDModel, false);
	if (capResult.getSuccess())
	{
		customID = capResult.getOutput().getCapID().getCustomID();
	}
	else
	{
		aa.log("Cannot found out custom ID for given CAP: " + capIDModel.toString());
	}
	
	return customID;
}