function generateReportForEmail_Mesa(itemCap, reportName, module, parameters) {
    //returns the report file which can be attached to an email.
    var vAltId;
	var user = currentUserID;   // Setting the User Name
    var report = aa.reportManager.getReportInfoModelByName(reportName);
    report = report.getOutput();
    report.setModule(module);
    report.setCapId(itemCap);
    report.setReportParameters(parameters);
	
    var permit = aa.reportManager.hasPermission(reportName, user);
    if (permit.getOutput().booleanValue()) {
        var reportResult = aa.reportManager.getReportResult(report);
        if (!reportResult.getSuccess()) {
            aa.print("System failed get report: " + reportResult.getErrorType() + ":" + reportResult.getErrorMessage());
            return false;
        }
        else {
            var reportOutput = reportResult.getOutput();
            var reportFile = aa.reportManager.storeReportToDisk(reportOutput);
            reportFile = reportFile.getOutput();
            aa.print("Report " + reportName + " generated for record " + itemCap.getCustomID());
            return reportFile;
        }
    }
    else {
        aa.print("Permissions are not set for report " + reportName + ".");
        return false;
    }
}