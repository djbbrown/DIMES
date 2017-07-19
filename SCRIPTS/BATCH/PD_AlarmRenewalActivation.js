// testing parameters, uncomment to use in script test

//aa.env.setValue("paramStdChoice","PDAlarms Renewal Activation");

/*------------------------------------------------------------------------------------------------------/
| Program: License Expirations.js  Trigger: Batch
| Client:
|
| Version 1.0 - Base Version. 11/01/08 JHS
| Version 2.0 - Updated for Masters Scripts 2.0  02/13/14 JHS
| Version 3.0 - Updated for 3.0, new features 9/30/15 JHS
|
/------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------/
|
| START: USER CONFIGURABLE PARAMETERS
|
/------------------------------------------------------------------------------------------------------*/
emailText = "";
message = "";
br = "<br>";
/*------------------------------------------------------------------------------------------------------/
| BEGIN Includes
/------------------------------------------------------------------------------------------------------*/
SCRIPT_VERSION = 3.0;

eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS"));
eval(getScriptText("INCLUDES_ACCELA_GLOBALS"));
eval(getScriptText("INCLUDES_BATCH"));
eval(getScriptText("INCLUDES_CUSTOM"));

function getScriptText(vScriptName) {
	vScriptName = vScriptName.toUpperCase();
	var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();
	var emseScript = emseBiz.getScriptByPK(aa.getServiceProviderCode(), vScriptName, "ADMIN");
	return emseScript.getScriptText() + "";
}

/*------------------------------------------------------------------------------------------------------/
|
| END: USER CONFIGURABLE PARAMETERS
|
/------------------------------------------------------------------------------------------------------*/

try {

showDebug = true;
if (String(aa.env.getValue("showDebug")).length > 0) {
	showDebug = aa.env.getValue("showDebug").substring(0, 1).toUpperCase().equals("Y");
}

sysDate = aa.date.getCurrentDate();
batchJobResult = aa.batchJob.getJobID();
batchJobName = "" + aa.env.getValue("BatchJobName");
batchJobID = 0;
if (batchJobResult.getSuccess()) {
	batchJobID = batchJobResult.getOutput();
	logDebug("Batch Job " + batchJobName + " Job ID is " + batchJobID);
} else {
	logDebug("Batch job ID not found " + batchJobResult.getErrorMessage());
}

/*----------------------------------------------------------------------------------------------------/
|
| Start: BATCH PARAMETERS
|
/------------------------------------------------------------------------------------------------------*/

var paramStdChoice = getJobParam("paramStdChoice")  // use this standard choice for parameters instead of batch jobs
var fromDate = getJobParam("fromDate"); // Hardcoded dates.   Use for testing only
var toDate = getJobParam("toDate"); // ""
var dFromDate = aa.date.parseDate(fromDate); //
var dToDate = aa.date.parseDate(toDate); //
var lookAheadDays = aa.env.getValue("lookAheadDays"); // Number of days from today
var daySpan = aa.env.getValue("daySpan"); // Days to search (6 if run weekly, 0 if daily, etc.)
var appGroup = getJobParam("appGroup"); //   app Group to process {Licenses}
var appTypeType = getJobParam("appTypeType"); //   app type to process {Rental License}
var appSubtype = getJobParam("appSubtype"); //   app subtype to process {NA}
var appCategory = getJobParam("appCategory"); //   app category to process {NA}
var expStatus1 = getJobParam("expirationStatus1"); //   test for this expiration status active
var expStatus2 = getJobParam("expirationStatus2"); //   test for this expiration status about to expire
var newExpStatus = getJobParam("newExpirationStatus"); //   update to this expiration status
var newExpStatus60 = getJobParam("newRecStatus60"); //   update to this expiration status
var newExpStatus0 = getJobParam("newRecStatus0"); //   update to this expiration status
var newAppStatus = getJobParam("newApplicationStatus"); //   update the CAP to this status
var newRecStatus60 = getJobParam("newRecStatus60"); //   update the CAP to this 60 day status
var newRecStatus0 = getJobParam("newRecStatus0"); //   update the CAP to this 60 day status
var gracePeriodDays = getJobParam("gracePeriodDays"); //	bump up expiration date by this many days
var setPrefix = getJobParam("setPrefix"); //   Prefix for set ID
var inspSched = getJobParam("inspSched"); //   Schedule Inspection
var skipAppStatusArray = getJobParam("skipAppStatus").split(","); //   Skip records with one of these application statuses
var emailAddress = getJobParam("emailAddress"); // email to send report
var sendEmailToContactTypes = getJobParam("sendEmailToContactTypes"); // ALL,PRIMARY, or comma separated values
var emailTemplatePD60 = getJobParam("emailTemplatePD60"); // email Template 60 day notice
var emailTemplatePD30 = getJobParam("emailTemplatePD30"); // email Template 30 day notice
var emailTemplatePD0 = getJobParam("emailTemplatePD0"); // email Template 0 day notice
var deactivateLicense = getJobParam("deactivateLicense").substring(0, 1).toUpperCase().equals("Y"); // deactivate the LP
var lockParentLicense = getJobParam("lockParentLicense").substring(0, 1).toUpperCase().equals("Y"); // add this lock on the parent license
var createRenewalRecord = getJobParam("createTempRenewalRecord").substring(0, 1).toUpperCase().equals("Y"); // create a temporary record
var feeSched = getJobParam("feeSched"); //
var feeList = getJobParam("feeList"); // comma delimted list of fees to add to renewal record
var feePeriod = getJobParam("feePeriod"); // fee period to use {LICENSE}
var parentFeeSched = getJobParam("parentFeeSched"); //
var parentFeeList = getJobParam("parentFeeList"); // comma delimted list of fees to add to renewal record
var parentFeePeriod = getJobParam("parentFeePeriod"); // fee period to use {LICENSE}
var respectNotifyPrefs = getJobParam("respectNotifyPrefs").substring(0, 1).toUpperCase().equals("Y"); // respect contact notification preferences
var createNotifySets = getJobParam("createNotifySets").substring(0, 1).toUpperCase().equals("Y") ; // different sets based on notification preferences
var setType = getJobParam("setType"); // Sets will be created with this type
var setStatus = getJobParam("setStatus"); // Sets will be created with this initial status
var setParentWorkflowTaskAndStatus = getJobParam("setParentWorkflowTaskAndStatus").split(","); // update workflow task/status, comma separated.
var filterExpression = getJobParam("filterExpression"); // JavaScript used to filter records.   Evaluating to false will skip the record, for example:   getAppSpecific("FieldName").toUpperCase() == "TEST"
var actionExpression = getJobParam("actionExpression"); // JavaScript used to perform custom action, for example:   addStdCondition(...)
/*----------------------------------------------------------------------------------------------------/
|
| End: BATCH PARAMETERS
|
/------------------------------------------------------------------------------------------------------*/
var startDate = new Date();

if (!fromDate.length) { // no "from" date, assume today + number of days to look ahead
	fromDate = dateAdd(null, parseInt(lookAheadDays))
}
if (!toDate.length) { // no "to" date, assume today + number of look ahead days + span
	toDate = dateAdd(null, parseInt(lookAheadDays) + parseInt(daySpan))
}
var mailFrom = lookup("ACA_EMAIL_TO_AND_FROM_SETTING", "RENEW_LICENSE_AUTO_ISSUANCE_MAILFROM");
var acaSite = lookup("ACA_CONFIGS", "ACA_SITE");
acaSite = acaSite.substr(0, acaSite.toUpperCase().indexOf("/ADMIN"));

logDebug("Date Range -- fromDate: " + fromDate + ", toDate: " + toDate)

var startTime = startDate.getTime(); // Start timer
var systemUserObj = aa.person.getUser("ADMIN").getOutput();

appGroup = appGroup == "" ? "*" : appGroup;
appTypeType = appTypeType == "" ? "*" : appTypeType;
appSubtype = appSubtype == "" ? "*" : appSubtype;
appCategory = appCategory == "" ? "*" : appCategory;
var appType = appGroup + "/" + appTypeType + "/" + appSubtype + "/" + appCategory;



/*------------------------------------------------------------------------------------------------------/
| <===========Main=Loop================>
|
/-----------------------------------------------------------------------------------------------------*/

logDebug("Start of Job");

} catch (err) {
	logDebug("ERROR: " + err.message + " In " + batchJobName + " Line " + err.lineNumber);
	logDebug("Stack: " + err.stack);
}

try {
	mainProcess();

logDebug("End of Job: Elapsed Time : " + elapsed() + " Seconds");

if (emailAddress.length)
	aa.sendMail("noreply@accela.com", emailAddress, "", batchJobName + " Results", emailText);

} catch (err) {
	logDebug("ERROR: " + err.message + " In " + batchJobName + " Line " + err.lineNumber);
	logDebug("Stack: " + err.stack);
}

/*------------------------------------------------------------------------------------------------------/
| <===========END=Main=Loop================>
/-----------------------------------------------------------------------------------------------------*/

function mainProcess() {
	var capFilterType = 0;
	var capFilterInactive = 0;
	var capFilterError = 0;
	var capFilterStatus = 0;
	var capFilterExpression = 0;
	var capDeactivated = 0;
	var capCount = 0;
	var curDate = new Date();
	var setName;
	var setDescription;
	
	// Set Notification Template Values
		
		//template for 60 day notice
		var tmplPD60 = aa.communication.getNotificationTemplate(emailTemplatePD60).getOutput();
		var ebodyPD60 = tmplPD60.getEmailTemplateModel().getContentText();
		var esubPD60 = tmplPD60.getEmailTemplateModel().getTitle();
		var efromPD60 = tmplPD60.getEmailTemplateModel().getFrom();
		
		//template for 30 day notice
		var tmplPD30 = aa.communication.getNotificationTemplate(emailTemplatePD30).getOutput();
		var ebodyPD30 = tmplPD30.getEmailTemplateModel().getContentText();
		var esubPD30 = tmplPD30.getEmailTemplateModel().getTitle();
		var efromPD30 = tmplPD30.getEmailTemplateModel().getFrom();
		
		//template for 0 day notice
		var tmplPD0 = aa.communication.getNotificationTemplate(emailTemplatePD0).getOutput();
		var ebodyPD0 = tmplPD0.getEmailTemplateModel().getContentText();
		var esubPD0 = tmplPD0.getEmailTemplateModel().getTitle();
		var efromPD0 = tmplPD0.getEmailTemplateModel().getFrom();

	
	// Obtain the array of records to loop through.   This can be changed as needed based on the business rules
	
	//var recResult = aa.cap.getByAppType(appGroup,appTypeType,appSubtype,appCategory);
	var recResult1 = aa.expiration.getLicensesByDate(expStatus1, fromDate, toDate);
	//var recResult2 = aa.expiration.getLicensesByDate(expStatus2, fromDate, toDate);

	if (recResult1.getSuccess()) {
		myRec = recResult1.getOutput();
		logDebug("Processing " + myRec.length + " active expiration records");
	}
	/*
	if (recResult2.getSuccess()) {
		myRec2 = recResult2.getOutput();
		logDebug("Processing " + myRec2.length + " about to expire expiration records");
	}
	*/
	//myRec = myRec1.concat(myRec2);
	//logDebug("Processing " + myRec.length + " all records");
	
	/*
	var recResult = aa.expiration.getLicensesByDate(expStatus, fromDate, toDate);

	if (recResult.getSuccess()) {
		myRec = recResult.getOutput();
		logDebug("Processing " + myRec.length + " expiration records");
	} else {
		logDebug("ERROR: Getting Expirations, reason is: " + recResult.getErrorType() + ":" + recResult.getErrorMessage());
		return false
	}
	*/
	
	for (thisExp in myRec) // for each b1expiration (effectively, each license app)
	{
		b1Exp = myRec[thisExp];
		
		capId = aa.cap.getCapID(b1Exp.getCapID().getID1(), b1Exp.getCapID().getID2(), b1Exp.getCapID().getID3()).getOutput();

		if (!capId) {
			logDebug("Could not get a Cap ID for " + b1Exp.getCapID().getID1() + "-" + b1Exp.getCapID().getID2() + "-" + b1Exp.getCapID().getID3());
			continue;
		}

		altId = capId.getCustomID();

		logDebug("==========: " + altId + " :==========");
		
		var capResult = aa.cap.getCap(capId);

		if (!capResult.getSuccess()) {
			logDebug("     " +"skipping, Record is deactivated");
			capDeactivated++;
			continue;
		} else {
			var cap = capResult.getOutput();
		}

		var capStatus = cap.getCapStatus();

		appTypeResult = cap.getCapType(); //create CapTypeModel object
		appTypeString = appTypeResult.toString();
		appTypeArray = appTypeString.split("/");
		
		var capDetailObjResult = aa.cap.getCapDetail(capId);		
		if (capDetailObjResult.getSuccess())
		{
			capDetail = capDetailObjResult.getOutput();
			var houseCount = capDetail.getHouseCount();
			var feesInvoicedTotal = capDetail.getTotalFee();
			var balanceDue = capDetail.getBalance();
		}

		// Filter by CAP Type
		if (appType.length && !appMatch(appType)) {
			capFilterType++;
			logDebug("     " +"skipping, Application Type does not match")
			continue;
		}
		
		// Filter by CAP Status
		if (!matches(capStatus,"Issued","About to Expire")){
			capFilterStatus++;
			logDebug("     " +"skipping, due to application status of " + capStatus)
			continue;
		}
		
		// Calculate Expiration Date Difference
		lic = new licenseObject(null);
		leDate = new Date(lic.b1ExpDate)
		leDaysDiff = Math.ceil(dateDiff(curDate,leDate));
		leDaysDifftxt = leDaysDiff.toString();
		//logDebug("leDaysDiff = " + leDaysDiff);
		if(!matches(leDaysDiff,"60","30","0")) 
			continue;		
						
		// done filtering, so increase the record count to include this record.
		
		capCount++;


		// Actions start here:
		logDebug("PD Alarm Record " + altId + " has been processed");
		
		// Update Alarm Permit records status and expiration status
		
		if (leDaysDiff == "60" && newExpStatus60.length > 0) {
			//licEditExpInfo(newExpStatus60,null);  //Modifying to not allow renewal link or renewal button to be activated
			//update the record status
			updateAppStatus(newRecStatus60);
			//add renewal fee
			var burglaryAlarm = getAppSpecific("Burglary Function",capId);
			var panicRobbHoldup = getAppSpecific("Panic/Robbery/Hold-Up Function");
			//logDebug("burglaryAlarm = " + burglaryAlarm);
			//logDebug("panicRobbHoldup = " + panicRobbHoldup);
			if (burglaryAlarm == "Yes"){
				addFee("PD_ALARM_01","PMT_PD_ALARM_010","FINAL",1,"N",capId);
				}
			if (panicRobbHoldup == "Yes"){
				addFee("PD_ALARM_02","PMT_PD_ALARM_010","FINAL",1,"N",capId);
				}
				
			//Invoice the fees
			invoiceFeeAllNew(capId);
			
			//send email notification to Billing Contact if email address associated to contact
			conArr = new Array();
			conArr = getContactArray(capId);
			for (c in conArr) {
				if (conArr[c]["contactType"] == "Billing Contact" && !matches(conArr[c]["email"], null, "", undefined)){
				params = aa.util.newHashtable();
				addParameter(params,"$$BillingContactName$$",conArr[c]["firstName"] + " " + conArr[c]["lastName"]);
				addParameter(params, "$$altid$$", altId);
				addParameter(params, "$$acaUrl$$", acaSite + getACAUrl());
				addParameter(params, "$$daysLicExpires$$", leDaysDifftxt);
				sendNotification(efromPD60,conArr[c]["email"],"",emailTemplatePD60,params,null);
				}
			}
		}
		
		if (leDaysDiff == "30" && balanceDue > 0) {
			conArr = new Array();
			conArr = getContactArray(capId);
			for (c in conArr) {
				if (conArr[c]["contactType"] == "Billing Contact" && !matches(conArr[c]["email"], null, "", undefined)){
				params = aa.util.newHashtable();
				addParameter(params,"$$BillingContactName$$",conArr[c]["firstName"] + " " + conArr[c]["lastName"]);
				addParameter(params, "$$altid$$", altId);
				addParameter(params, "$$acaUrl$$", acaSite + getACAUrl());
				addParameter(params, "$$daysLicExpires$$", leDaysDifftxt);
				sendNotification(efromPD30,conArr[c]["email"],"",emailTemplatePD30,params,null);
				}
			}
		}
		
		if (leDaysDiff == "0") {
			licEditExpInfo(newExpStatus0,null);
			//updateTask("Closed","Expired","updated via script","",capId);
			updateAppStatus(newRecStatus0);
			if (balanceDue > 0){
				conArr = new Array();
				conArr = getContactArray(capId);
				for (c in conArr) {
					if (conArr[c]["contactType"] == "Billing Contact" && !matches(conArr[c]["email"], null, "", undefined)){
					params = aa.util.newHashtable();
					addParameter(params,"$$BillingContactName$$",conArr[c]["firstName"] + " " + conArr[c]["lastName"]);
					addParameter(params, "$$altid$$", altId);
					addParameter(params, "$$acaUrl$$", acaSite + getACAUrl());
					addParameter(params, "$$daysLicExpires$$", leDaysDifftxt);
					sendNotification(efromPD0,conArr[c]["email"],"",emailTemplatePD00,params,null);
					}
				}
			}
		}
				
	}

	logDebug("========================================");
	logDebug("Total CAPS qualified date range: " + myRec.length);
	logDebug("Ignored due to application type: " + capFilterType);
	logDebug("Ignored due to CAP Status: " + capFilterStatus);
	logDebug("Ignored due to Deactivated CAP: " + capDeactivated);
	logDebug("Ignored due to Custom Filter Expression: " + capFilterExpression);
	
	logDebug("Total CAPS processed: " + capCount);
}

function getJobParam(pParamName) //gets parameter value and logs message showing param value
{
	var ret;
	if (aa.env.getValue("paramStdChoice") != "") {
		var b = aa.bizDomain.getBizDomainByValue(aa.env.getValue("paramStdChoice"),pParamName);
		if (b.getSuccess()) {
			ret = b.getOutput().getDescription();
			}	

		ret = ret ? "" + ret : "";   // convert to String
		
		logDebug("Parameter (from std choice " + aa.env.getValue("paramStdChoice") + ") : " + pParamName + " = " + ret);
		}
	else {
			ret = "" + aa.env.getValue(pParamName);
			logDebug("Parameter (from batch job) : " + pParamName + " = " + ret);
		}
	return ret;
}
