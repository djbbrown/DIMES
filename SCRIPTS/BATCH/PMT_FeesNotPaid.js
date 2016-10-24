/*===================================================================
// Script Number: 94
// Script Name: PMT - Fees Not Paid
// Script Developer: Bryan de Jesus
// Script Agency: Woolpert
// Script Description:
//			If fees are not paid within 7 days then generate an email to the customer. Run nightly
// Script Run Event: BATCH
// Script Parents: N/A
// Effected record types:
//		Permits/Online/NA/NA
/*==================================================================*/
/*------------------------------------------------------------------------------------------------------/
| Program: PLN_SubstantiveReviewDaysLeft Trigger: Batch    
| Version 1.0 - Base Version. 
| 
| 
/------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------/
|
| START: USER CONFIGURABLE PARAMETERS
|
/------------------------------------------------------------------------------------------------------*/
var showMessage = false;				// Set to true to see results in popup window
var disableTokens = false;	
var showDebug = true;					// Set to true to see debug messages in email confirmation
var maxSeconds = 4 * 60;				// number of seconds allowed for batch processing, usually < 5*60
var useAppSpecificGroupName = false;	// Use Group name when populating App Specific Info Values
var useTaskSpecificGroupName = false;	// Use Group name when populating Task Specific Info Values
var currentUserID = "ADMIN";
var publicUser = null;
var systemUserObj = aa.person.getUser("ADMIN").getOutput();
var GLOBAL_VERSION = 3.0

var cancel = false;

var vScriptName = aa.env.getValue("ScriptCode");
var vEventName = aa.env.getValue("EventName");

var startDate = new Date();
var startTime = startDate.getTime();
var message =	"";						// Message String
var debug = "";							// Debug String
var br = "<BR>";						// Break Tag
var timeExpired = false;
var emailText = "";

var SCRIPT_VERSION = 3.0
var emailText = "";

var useSA = false;
var SA = null;
var SAScript = null;
var bzr = aa.bizDomain.getBizDomainByValue("MULTI_SERVICE_SETTINGS","SUPER_AGENCY_FOR_EMSE"); 
if (bzr.getSuccess() && bzr.getOutput().getAuditStatus() != "I") { 
    useSA = true;   
    SA = bzr.getOutput().getDescription();
    bzr = aa.bizDomain.getBizDomainByValue("MULTI_SERVICE_SETTINGS","SUPER_AGENCY_INCLUDE_SCRIPT"); 
    if (bzr.getSuccess()) { SAScript = bzr.getOutput().getDescription(); }
    }
    
if (SA) {
    eval(getMasterScriptText("INCLUDES_ACCELA_FUNCTIONS",SA));
    eval(getMasterScriptText(SAScript,SA));
    }
else {
    eval(getMasterScriptText("INCLUDES_ACCELA_FUNCTIONS"));
    }

eval(getScriptText("INCLUDES_BATCH"));    
eval(getMasterScriptText("INCLUDES_CUSTOM"));

overRide = "function logDebug(dstr) { emailText += dstr + '<br>'; }";
//overRide = "function logDebug(dstr) { aa.print(dstr); }";

eval(overRide)

function getMasterScriptText(vScriptName)
{
    var servProvCode = aa.getServiceProviderCode();
    if (arguments.length > 1) servProvCode = arguments[1]; // use different serv prov code
    vScriptName = vScriptName.toUpperCase();    
    var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();
    try {
        var emseScript = emseBiz.getMasterScript(aa.getServiceProviderCode(),vScriptName);
        return emseScript.getScriptText() + ""; 
        } 
	catch(err)
		{
		return "";
		}
}

function getScriptText(vScriptName)
{
    var servProvCode = aa.getServiceProviderCode();
    if (arguments.length > 1) servProvCode = arguments[1]; // use different serv prov code
    vScriptName = vScriptName.toUpperCase();    
    var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();
    try {
        var emseScript = emseBiz.getScriptByPK(servProvCode,vScriptName,"ADMIN");
        return emseScript.getScriptText() + ""; 
        } 
	catch(err)
		{
        return "";
		}
}
/*------------------------------------------------------------------------------------------------------/
|
| END: USER CONFIGURABLE PARAMETERS
|
/------------------------------------------------------------------------------------------------------*/

var sysDate = aa.date.getCurrentDate();
var batchJobID = aa.batchJob.getJobID().getOutput();
var batchJobName = "" + aa.env.getValue("batchJobName");
/*----------------------------------------------------------------------------------------------------/
|
| Start: BATCH PARAMETERS
|
/------------------------------------------------------------------------------------------------------*/
/* 
aa.env.setValue("appGroup", "Planning");
aa.env.setValue("appTypeType","*");
aa.env.setValue("appSubtype","*");
aa.env.setValue("appCategory","*")
aa.env.setValue("asiField", "Start/Stop Indicator");
aa.env.setValue("asiValue", "Started");
aa.env.setValue("taskName", "Completeness Review");
aa.env.setValue("taskStatus", "Complete");
*/

var appGroup = getParam("appGroup");							//   app Group to process {Licenses}
var appTypeType = getParam("appTypeType");						//   app type to process {Rental License}
var appSubtype = getParam("appSubtype");						//   app subtype to process {NA}
var appCategory = getParam("appCategory");	
var appStatus = getParam("appStatusStatus");
var taskName = getParam("taskName");
var taskStatus = getParam("taskStatus");
var emailTemplate = getParam("emailTemplate");

/*----------------------------------------------------------------------------------------------------/
|
| End: BATCH PARAMETERS
|-----------------------------------------------------------------------------------------------------*/


if (appGroup=="")
	appGroup="*";
if (appTypeType=="")
	appTypeType="*";
if (appSubtype=="")
	appSubtype="*";
if (appCategory=="")
	appCategory="*";
var appType = appGroup+"/"+appTypeType+"/"+appSubtype+"/"+appCategory

/*------------------------------------------------------------------------------------------------------/
| <===========Main=Loop================>
| 
/-----------------------------------------------------------------------------------------------------*/

logDebug("Start of Job");

if (!timeExpired) mainProcess();

logDebug("End of Job: Elapsed Time : " + elapsed() + " Seconds");

//aa.eventLog.createEventLog("DEBUG", "Batch Process", batchJobName, aa.date.getCurrentDate(), aa.date.getCurrentDate(),"", emailText, batchJobID);
aa.print(emailText);

/*------------------------------------------------------------------------------------------------------/
| <===========End Main=Loop================>
| 
/-----------------------------------------------------------------------------------------------------*/
function mainProcess() {
	
	var capCount = 0;
	var capFilterType = 0;
	var capFilterStatus = 0;
	var applicantEmailNotFound = 0;
	var permitType = appTypeType;
	
	var capResult = aa.cap.getCaps(permitType, taskName, taskStatus, "");
	
	if (capResult.getSuccess()) {
		myCaps = capResult.getOutput();
	}
	else { 
		logDebug("ERROR: Getting records, reason is: " + capResult.getErrorMessage()) ;
		return false
	} 

	for (myCapsXX in myCaps) {
		if (elapsed() > maxSeconds) { // only continue if time hasn't expired
			logDebug("WARNING","A script timeout has caused partial completion of this process.  Please re-run.  " + elapsed() + " seconds elapsed, " + maxSeconds + " allowed.") ;
			timeExpired = true ;
			break; 
		}

		var thisCapId = myCaps[myCapsXX].getCapID();
		capIdResult = aa.cap.getCapID(thisCapId.getID1(), thisCapId.getID2(), thisCapId.getID3());
		if (capIdResult.getSuccess()) capId = capIdResult.getOutput();
		else logDebug(capIdResult.getErrorMessage());

		if (!capId) {
			continue;
		}

		altId = capId.getCustomID();
		cap = aa.cap.getCap(capId).getOutput();		
		appTypeResult = cap.getCapType();
		capStatus = cap.getCapStatus();		
		appTypeString = appTypeResult.toString();	
		appTypeArray = appTypeString.split("/");
		
		// Filter by CAP Type
		if (appType.length && !appMatch(appType))	{
			capFilterType++;
			logDebug(altId + ": Application Type does not match")
			continue;
		}
		
		// Filter by cap status
		if (appStatus != "" && appStatus != capStatus) {
			capFilterStatus++;
			logDebug(altId + ": app status does not match");
			continue;
		}
			
		capCount++;
		logDebug("Processing " + altId);
		
		var tsd = taskStatusDate(taskName, null, capId);
        var feesSevenDaysLate = jsDateToMMDDYYYY(new Date()).localeCompare(dateAdd(tsd, 7)) == 0;
        logDebug("Fees 7 days late?");
        logDebug(feesSevenDaysLate ? "Yes" : "No"); 
        if (feesSevenDaysLate) {
            var vEParams = aa.util.newHashtable(); 
		    addParameter(vEParams,"%%RECORD ID%%", altId);
		    
		    // get applicant email
		    var contactArray = getContactArray(capId),  emailAddress = null;
		    for (contact in contactArray){
		    	if (contactArray[contact]["contactType"] == "Applicant"){
		    		emailAddress = contactArray[contact]["email"];
		    	}
		    }
		    
		    if (emailAddress != null){
		    	logDebug("Sending notification to " + emailAddress);
		    	sendNotification("", emailAddress, "", emailTemplate, vEParams, null, capId);
		    } else {
		    	applicantEmailNotFound++;
		    	logDebug(altId + ": Applicant email address not found");
		    }		    
        }
	}		
		

	
	logDebug("Processed " + capCount + " Records ");	
	logDebug("Skipped " + capFilterType + " due to record type mismatch ");	
	logDebug("Skipped " + capFilterStatus + " due to record status mismatch ");	
	logDebug("Unable to notify " + applicantEmailNotFound + " due to missing applicant email");
	logDebug("End of Job: Elapsed Time : " + elapsed() + " Seconds");
}	

/*------------------------------------------------------------------------------------------------------/
| <===========Custom Functions================>
| 
/-----------------------------------------------------------------------------------------------------*/


/*------------------------------------------------------------------------------------------------------/
| <===========Internal Functions and Classes (Used by this script)
/------------------------------------------------------------------------------------------------------*/
