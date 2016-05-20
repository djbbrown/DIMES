/*===================================================================
// Script Number: 56
// Script Name: ENG,PMT - Expire permits
// Script Developer: Kevin Ford
// Script Agency: Accela
// Script Description:
// A batch job to retrieve all record with an ASI field "Permit Expiration Date"
// in a date range and update the currently active task to a status of "Expired",
// deactivate the workflow and set the record status to "Expired".
// Script Run Event: BATCH
// Script Parents: N/A
// Effected record types:
//		Engineering/ * / * / *
//		Permits/ * / * / * .. excluding Permits/Commercial/Annual Facilities/NA
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

var appGroup = getParam("appGroup");							//   app Group to process {Licenses}
var appTypeType = getParam("appTypeType");						//   app type to process {Rental License}
var appSubtype = getParam("appSubtype");						//   app subtype to process {NA}
var appCategory = getParam("appCategory");	
var asiField = getParam("asiField");							// {Meeting Date}
var appStatus = getParam("appStatusStatus");

// Required to run the delete, this must be entered in a parameter
// and can be any user name that has access to the system.
var delUser = getParam("User");
var delPass = getParam("Password");

// Age
var olderAge = getParam("Age");

/*----------------------------------------------------------------------------------------------------/
|
| End: BATCH PARAMETERS
|-----------------------------------------------------------------------------------------------------*/

/*
//======================================================
// The following are commented due to the fact that I'm not going to be wildcarding
// the Group or Type, subtype is the first wildcards that I'd be using.
//====================================================== 
if (appGroup=="")
	appGroup="*";
if (appTypeType=="")
	appTypeType="*";
//*/
// Resume wildcard replacements.
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
	var capSkipPSD = 0; // records skipped due to not having "Pre-Submittal Date"
	var capSkipAge = 0; // records skipped due to not being older than 2 years.
	var capSkipNoDoc = 0; // records skipped due to not having a document attached.
	var docRemoved = 0; // total documents removed.
	
	//======================================================
	// A batch job to retrieve all record with an ASI field "Permit Expiration Date"
	// in a date range and update the currently active task to a status of "Expired",
	// deactivate the workflow and set the record status to "Expired".
	// Effected record types:
	//		Engineering/ * / * / *
	//		Permits/ * / * / * .. excluding Permits/Commercial/Annual Facilities/NA
	//======================================================
	var fromDate = '01/01/2010'; 
	var toDate =  '01/01/2018';
	var fDate = aa.date.parseDate(fromDate);
	var tDate = aa.date.parseDate(toDate);
	var caps = aa.cap.getCapIDsByAppSpecificInfoDateRange("PERMIT DATES","Permit Expiration Date",fDate,tDate).getOutput();

	// Now process the list returned above
	for (z in caps) {
		capId = caps[z].getCapID(); // Get the CAP ID
		// Turn the capId into a Cap Type
		cap = aa.cap.getCap(capId).getOutput();
		/*
		for(k in cap){
			aa.print(cap[k]);
		}
		//*/
		appTypeResult = cap.getCapType();	
		appTypeString = appTypeResult.toString();
		// Exclude the extra record type that we don't want.
		var modelInfo = aa.cap.getCapTypeModelByCapID(capId).getOutput();
		var appTypeA = appTypeString.split("/");
		if (appTypeString != "Permits/Commercial/Annual Facilities/NA"
			&& (appTypeA[0] == "Permits" || appTypeA[0] == "Engineering")
		) {
			// Now continue to processing.
			//aa.print(modelInfo);
			aa.print(capId+"::"+(caps[z].getCustomID()));
			// Now need to see which workflow items are active and deactivate them.
			//  aa.print("===================================");
			var tasks = aa.workflow.getTasks(capId).getOutput();
			for (t in tasks) {
				//aa.print(tasks[t]);
				tName = tasks[t].getTaskDescription();
				tStatus = tasks[t].getDisposition();
				tActive = tasks[t].getActiveFlag(); // we will only want to work with the active items, this should do it.
				tComment = tasks[t].getDispositionComment();
				if (
					tActive == 'Y'
					//&& capId == 'REC15-00000-0001P'
					&& caps[z].getCustomID() == 'PMT16-00035'
				) {
					aa.print(tName+" is active and needs to be deactivated");
					// The following seems to be updating the workflow, however it's not closing it...
					// seems to be working correctly.
					closeTask(tName,"Expired","Expired set by script","");
					//cap[k].setCapStatus("Expired");
					
					//setCapStatus("Expired");
					// Close the record
					updateAppStatus("Expired","Closed by Script");
					
					tasks[t].setActiveFlag('N');
					closeCap("admin",capId);
				}
			}		
		}
	}
	
	logDebug("Total "+capCount+" records considered");
	logDebug("Processed " +capProc +" Records");
	logDebug("Skipped " + capSkipAge + " Records not yet old enough");
	logDebug("Skipped " + capSkipPSD + " Records not yet having Pre-Submittal Meeting date set");
	logDebug("Sikpped " + capSkipNoDoc + " Records that had no documents attached");
	logDebug("Total "+docRemoved+" documents removed");
	logDebug("End of Job: Elapsed Time : " + elapsed() + " Seconds");
}	

/*------------------------------------------------------------------------------------------------------/
| <===========Custom Functions================>
| 
/-----------------------------------------------------------------------------------------------------*/


/*------------------------------------------------------------------------------------------------------/
| <===========Internal Functions and Classes (Used by this script)
/------------------------------------------------------------------------------------------------------*/
