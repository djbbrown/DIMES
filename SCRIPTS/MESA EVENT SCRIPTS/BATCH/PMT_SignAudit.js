/*===================================================================
// Script Number: 173
// Script Name: PMT_SignAudit
// Script Developer: Deanna Hoops
// Script Agency: 
// Script Description:
//			If sign permit is expired then create a sign audit inspection so that the inspector can check to see if they completed the work.
// Script Run Event: BATCH
// Script Parents: N/A
// Effected record types:
//		Permits/Sign/NA/NA
/*==================================================================*/
/*------------------------------------------------------------------------------------------------------/
| Program: PMT_SignAudit Trigger: Batch    
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
aa.env.setValue("appGroup", "Permits");
aa.env.setValue("appTypeType","Sign");
aa.env.setValue("appSubtype","NA");
aa.env.setValue("appCategory","NA")
aa.env.setValue("appStatus", "Expired");
aa.env.setValue("newInsp", "Sign Audit");
*/

var appGroup = getParam("appGroup");							//   app Group to process 
var appTypeType = getParam("appTypeType");						//   app type to process 
var appSubtype = getParam("appSubtype");						//   app subtype to process 
var appCategory = getParam("appCategory");	
var appStatus = getParam("appStatus");
var newInsp = getParam("newInsp");

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
	
	
	var capModelResult = aa.cap.getCapModel();
	if (capModelResult.getSuccess()) {
		var capModel = capModelResult.getOutput();
		capModel.setCapStatus(appStatus);
		var capTypeModel = capModel.getCapType();
		if (appGroup != "*") capTypeModel.setGroup("" + appGroup);
		if (appTypeType != "*") capTypeModel.setType("" + appTypeType);
		if (appSubtype != "*") capTypeModel.setSubType("" + appSubtype);
		if (appCategory != "*") capTypeModel.setCategory("" + appCategory);
		capModel.setCapType(capTypeModel);
		capIdResult = aa.cap.getCapIDListByCapModel(capModel);

		if (capIdResult.getSuccess()) {
			capIdArray = capIdResult.getOutput();
		}
		else { 
			logDebug("Error Getting records, reason is: " + capIdResult.getErrorMessage()) ;
		} 
	}
	
	for (cIndex in capIdArray)  {
		if (elapsed() > maxSeconds) // only continue if time hasn't expired
		{
		logDebug("A script timeout has caused partial completion of this process.  Please re-run.  " + elapsed() + " seconds elapsed, " + maxSeconds + " allowed.") ;
		timeExpired = true ;
		break;
		}
		
		var thisCapId = capIdArray[cIndex].getCapID();
		capId = getCapIdLOCAL(thisCapId.getID1(), thisCapId.getID2(), thisCapId.getID3()); 
		altId = capId.getCustomID();
		logDebug(altId);

		if (!capId) {
			continue;
		}

		altId = capId.getCustomID();
		cap = aa.cap.getCap(capId).getOutput();		
		appTypeResult = cap.getCapType();
		capStatus = cap.getCapStatus();		
		appTypeString = appTypeResult.toString();	
		appTypeArray = appTypeString.split("/");
		
		capCount++;
		logDebug("Processing " + altId);		

		if (!doesScheduledInspExist(newInsp) && !doesScheduledInspExist("Sign Final") && !doesScheduledInspExist("Zoning Final")){
			logDebug(altId + ": Scheduling inspection " + newInsp);
			scheduleInspection(newInsp, 0);
			// auto assign inspection based on inspection area - will be done via config
		} else {
			logDebug(altId + ": Inspection already scheduled.");
		}
	}		
		
	
	logDebug("Processed " + capCount + " Records ");	
	logDebug("Skipped " + capFilterType + " due to record type mismatch ");	
	logDebug("Skipped " + capFilterStatus + " due to record status mismatch ");	
	logDebug("End of Job: Elapsed Time : " + elapsed() + " Seconds");
}	

/*------------------------------------------------------------------------------------------------------/
| <===========Custom Functions================>
| 
/-----------------------------------------------------------------------------------------------------*/

function getCapIdLOCAL(s_id1, s_id2, s_id3)  {
    var s_capResult = aa.cap.getCapID(s_id1, s_id2, s_id3);
 if(s_capResult.getSuccess())
   return s_capResult.getOutput();
 return null;
}

/*------------------------------------------------------------------------------------------------------/
| <===========Internal Functions and Classes (Used by this script)
/------------------------------------------------------------------------------------------------------*/
