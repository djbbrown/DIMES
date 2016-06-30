/*===================================================================
// Script Number: 240
// Script Name: PLN - Case Purge
// Script Developer: Kevin Ford
// Script Agency: Accela
// Script Description:
//		Every month, run a batch script that will check records with
//		the ASI "Meeting Date" having a value of more than 2 years in
//		the past. For those records, update the record status to
//		"File Purged" and delete all attached documents.
// Script Run Event: BATCH
// Script Parents: N/A
// Effected record types:
//		Planning/Pre Submittal/NA/NA
/*==================================================================*/
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
aa.env.setValue("appTypeType",  "Pre-Submittal");
aa.env.setValue("appSubtype", "*");
aa.env.setValue("appCategory", "*");
aa.env.setValue("asiField", "Pre-Submittal Meeting")
aa.env.setValue("asiGroup", "KEY DATES");
aa.env.setValue("lookAheadDays", "-1");
aa.env.setValue("daySpan", "0");
aa.env.setValue("appStatus", "File Purged");
 */
var appGroup = getParam("appGroup");							//   app Group to process {Licenses}
var appTypeType = getParam("appTypeType");						//   app type to process {Rental License}
var appSubtype = getParam("appSubtype");						//   app subtype to process {NA}
var appCategory = getParam("appCategory");	
var asiField = getParam("asiField");							// {Meeting Date}
var asiGroup = getParam("asiGroup");
var lookAheadDays = getParam("lookAheadDays");
var daySpan = getParam("daySpan");
var appStatus = getParam("appStatus");

/*----------------------------------------------------------------------------------------------------/
|
| End: BATCH PARAMETERS
|-----------------------------------------------------------------------------------------------------*/


if (appGroup == "")
	appGroup = "*";
if (appTypeType == "")
	appTypeType = "*";
if (appSubtype == "")
	appSubtype = "*";
if (appCategory == "")
	appCategory = "*";
var appType = appGroup + "/" + appTypeType + "/" + appSubtype + "/" + appCategory;

var daySpan = getParam("daySpan");
var lookAheadDays = getParam("lookAheadDays");

var fromDate = dateAdd(null,parseInt(lookAheadDays));
var toDate = dateAdd(null,parseInt(lookAheadDays)+parseInt(daySpan));
var dFromDate = aa.date.parseDate(fromDate);
var dToDate = aa.date.parseDate(toDate);
	
logDebug("Date Range -- fromDate: " + fromDate + ", toDate: " + toDate);

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
function mainProcess() {
	// Variables for counting
	var capCount = 0;
	var capProc = 0; // Actual records that were processed

	var capResult = aa.cap.getCapIDsByAppSpecificInfoDateRange(asiGroup, asiField,dFromDate,dToDate);
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
     	capCount++;
		cap = aa.cap.getCap(capId).getOutput();		
		appTypeResult = cap.getCapType();	
		appTypeString = appTypeResult.toString();	
		appTypeArray = appTypeString.split("/");		
		
		// Filter by CAP Type
		if (appType.length && !appMatch(appType)) {
			capFilterType++;
			logDebug(altId + ": Application Type does not match")
			continue;
		}
		var capStatus = cap.getCapStatus();
		if (capStatus == appStatus) {
			capFilterStatus++;
			continue;
		}

		logDebug("Processing: " + altId);
		capProc++;
		updateAppStatus(appStatus); // Set Cap Status
		aa.print("Getting ready to remove the documents.");
		var capDocResult = aa.document.getDocumentListByEntity(capId,"CAP"); 
		if(capDocResult.getSuccess()) { 
			if(capDocResult.getOutput().size() > 0)  { 
				for(index = 0; index < capDocResult.getOutput().size(); index++)  { 
					var tmpDoc = capDocResult.getOutput().get(index); 
					//remove the document first 
					aa.document.removeDocumentByPK(""+tmpDoc.getDocumentNo(),null,null,appGroup); 
					logDebug("Documents removed"); 
				} 
			} 
		} 
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
