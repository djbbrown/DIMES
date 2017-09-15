/*===================================================================
// 
// Script Name: TTC - Expire permits
// Script Developer: Mong Ward
// Script Agency: Mesa
// Script Description:
// A batch job to retrieve all record with an ASI field "Permit Expiration Date"
// in a date range and update the currently active task to a status of "Expired",
// deactivate the workflow and set the record status to "Expired".
// Script Run Event: BATCH
// Script Parents: N/A
// Effected record types:
//		Transportation/Temporary Traffic Control/NA/NA
/*==================================================================*/
/*------------------------------------------------------------------------------------------------------/
| Program: TRA_TTC_ExpirePermits Trigger: Batch    
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
var startDate = new Date();
var startTime = startDate.getTime();			// Start timer
var sysDate = aa.date.getCurrentDate();

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


var daySpan = getParam("daySpan");
var lookAheadDays = getParam("lookAheadDays");

var fromDate = dateAdd(null,parseInt(lookAheadDays));
var toDate = dateAdd(null,parseInt(lookAheadDays)+parseInt(daySpan));
var dFromDate = aa.date.parseDate(fromDate);
var dToDate = aa.date.parseDate(toDate);
	
logDebug("Date Range -- fromDate: " + fromDate + ", toDate: " + toDate);


/*----------------------------------------------------------------------------------------------------/
|
| End: BATCH PARAMETERS
|-----------------------------------------------------------------------------------------------------*/

/*


/*------------------------------------------------------------------------------------------------------/
| <===========Main=Loop================>
| 
/-----------------------------------------------------------------------------------------------------*/

logDebug("Start of Job");

// Everything is to be done in the fuction to ensure that a timeout isn't reached.
if (!timeExpired) mainProcess();

logDebug("End of Job: Elapsed Time : " + elapsed() + " Seconds");

//aa.eventLog.createEventLog("DEBUG", "Batch Process", batchJobName, aa.date.getCurrentDate(), aa.date.getCurrentDate(),"", emailText, batchJobID);
aa.print(emailText);

/*------------------------------------------------------------------------------------------------------/
| <===========End Main=Loop================>
| 
/-----------------------------------------------------------------------------------------------------*/
//A batch job to retrieve all record with an ASI field "Permit Expiration Date"
//in a date range and update the currently active task to a status of "Expired",
//deactivate the workflow and set the record status to "Expired".
function mainProcess() {
	// Variables for counting
	var capCount = 0;
	var capProc = 0; // Actual records that were processed

	
	//======================================================
	// A batch job to retrieve all record with an ASI field "Permit Expiration Date"
	// in a date range and update the currently active task to a status of "Expired",
	// deactivate the workflow and set the record status to "Expired".
	// Effected record types:
	//		Transportation/Temporary Traffic Control/NA/NA
	//		
	//======================================================
	var capResult = aa.cap.getCapIDsByAppSpecificInfoDateRange("PERMIT DATES","Permit Expiration Date",dFromDate,dToDate);

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
   		capId = getCapIdBATCH(thisCapId.getID1(), thisCapId.getID2(), thisCapId.getID3()); 

		if (!capId) {
			logDebug("Could not get Cap ID");
			continue;
		}
		
		altId = capId.getCustomID();
		logDebug("Processing: " + altId);
     	capCount++;
		cap = aa.cap.getCap(capId).getOutput();		
		appTypeResult = cap.getCapType();	
		appTypeString = appTypeResult.toString();	
		appTypeArray = appTypeString.split("/");

		if (appTypeString == "Transportation/Temporary Traffic Control/NA/NA" ) {
			var tasks = aa.workflow.getTasks(capId).getOutput();
			for (t in tasks) {
				//aa.print(tasks[t]);
				tName = tasks[t].getTaskDescription();
				tActive = tasks[t].getActiveFlag(); // we will only want to work with the active items, this should do it.
				if (tActive == 'Y') {
					updateTask(tName, "Expired", "set by batch", "");
					setTask(tName, 'N', 'Y');
				}
				closeWorkflow();
				capProc++;
			}	
			updateAppStatus("Expired", "set by batch");	
		}
		else { continue;}
	}
	
	logDebug("Total "+capCount+" records considered");
	logDebug("Processed " +capProc +" Records");
	logDebug("End of Job: Elapsed Time : " + elapsed() + " Seconds");
}	

/*------------------------------------------------------------------------------------------------------/
| <===========Custom Functions================>
| 
/-----------------------------------------------------------------------------------------------------*/


/*------------------------------------------------------------------------------------------------------/
| <===========Internal Functions and Classes (Used by this script)
/------------------------------------------------------------------------------------------------------*/
function getCapIdBATCH(s_id1, s_id2, s_id3)  {

    var s_capResult = aa.cap.getCapID(s_id1, s_id2, s_id3);
    if(s_capResult.getSuccess())
      return s_capResult.getOutput();
    else
    {
      logMessage("**ERROR: Failed to get capId: " + s_capResult.getErrorMessage());
      return null;
    }
  }



