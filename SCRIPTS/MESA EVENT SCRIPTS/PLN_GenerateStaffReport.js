/*===================================================================
// Script Number: 235
// Script Name: PLN_GenerateStaffReport.js
// Script Developer: Bryan de Jesus
// Script Agency: Woolpert
// Script Description: When both Workflow Tasks "Planning Review" and "Development Planning Review" have been updated to a status of "Comments"; then generate and attach the report named "Staff Report"
// Script Run Event: WTUA
// Script Parents:
//            WTUA;Planning!Pre-Submittal!NA!NA 
/*==================================================================*/
function generateReport(itemCap,reportName,module,parameters) {

	//returns the report file which can be attached to an email.
	var user = "ADMIN";   // Setting the User Name
	var report = aa.reportManager.getReportInfoModelByName(reportName);
	report = report.getOutput();
	report.setModule(module);
	report.setCapId(itemCap.getCustomID());
	report.setReportParameters(parameters); 

	var permit = aa.reportManager.hasPermission(reportName,user);

	if (permit.getOutput().booleanValue()) {
		var reportResult = aa.reportManager.getReportResult(report);
		if(reportResult.getSuccess()) {
			reportOutput = reportResult.getOutput();
			var reportFile=aa.reportManager.storeReportToDisk(reportOutput);
			reportFile=reportFile.getOutput();
			return reportFile;
		}  
		else {
			logDebug("System failed get report: " + reportResult.getErrorType() + ":" +reportResult.getErrorMessage());
			return false;
		}
	} 
	else {
		logDebug("You have no permission.");
		return false;
	}
}

function sendNotification(emailFrom, emailTo, emailCC, templateName, params, reportFile) {
    var itemCap = capId;
    if (arguments.length == 7) itemCap = arguments[6]; // use cap ID specified in args

    var id1 = itemCap.ID1;
    var id2 = itemCap.ID2;
    var id3 = itemCap.ID3;

    var capIDScriptModel = aa.cap.createCapIDScriptModel(id1, id2, id3);


    var result = null;
    result = aa.document.sendEmailAndSaveAsDocument(emailFrom, emailTo, emailCC, templateName, params, capIDScriptModel, reportFile);
    if (result.getSuccess()) {
        logDebug("Sent email successfully to " + emailTo);
        return true;
    }
    else {
        logDebug("Failed to send mail. - " + result.getErrorType());
        return false;
    }
}

try {
	showDebug = true;
	var planningReviewTaskResult = aa.workflow.getTask(capId, "Planning Review");
	var devPlanningReviewTaskResult = aa.workflow.getTask(capId, "Development Planning Review");
	if (planningReviewTaskResult.getSuccess() && devPlanningReviewTaskResult.getSuccess()){
		var planningReviewTask = planningReviewTaskResult.getOutput();
		var devPlanningReviewTask = devPlanningReviewTaskResult.getOutput();
		var planningReviewTaskAssignStaff = planningReviewTask.getAssignedStaff();
		var devPlanningReviewTaskAssignStaff = devPlanningReviewTask.getAssignedStaff();
		for (t in devPlanningReviewTaskAssignStaff){
			if (typeof(t) == "function")
				logDebug(t);
			else
				logDebug(t + ": " + devPlanningReviewTaskAssignStaff[t]);
		}
		var emailAddress = "bryan.dejesus@woolpert.com";
		var firstName = "Bryan";
		var lastName = "de Jesus";
		if (isTaskStatus("Planning Review", "Comments") && isTaskStatus("Development Planning Review", "Comments")){
			var parameters = aa.util.newHashtable();
			addParameter(parameters,"RecordNumber", capId.getCustomID());
			var reportFileName = generateReport(capId,"Staff Shell Report","AMS",parameters);
			logDebug(reportFileName);
			var emailParams = aa.util.newHashtable();
			addParameter(emailParams,"$$email$$", emailAddress);
			addParameter(emailParams,"$$CAPID$$", capId.getCustomID());
			addParameter(emailParams,"$$firstName$$", firstName);
			addParameter(emailParams,"$$lastname$$", lastName);
			sendNotification("", emailAddress, "", "MESSAGE_REPORT", emailParams, [reportFileName]);
		}
	}

	}
catch (err) {
	logDebug("A JavaScript Error occured: " + err.message);
	}