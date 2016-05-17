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
var asiValue = getParam("asiValue");
var taskStatus = getParam("appStatusStatus");

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
function mainProcess() {
	// Variables for counting
	var capCount = 0;
	var capProc = 0; // Actual records that were processed
	var capSkipPSD = 0; // records skipped due to not having "Pre-Submittal Date"
	var capSkipAge = 0; // records skipped due to not being older than 2 years.
	var capSkipNoDoc = 0; // records skipped due to not having a document attached.
	var docRemoved = 0; // total documents removed.
	// Get a full list of the records that fall under the record type
	var records = aa.cap.getByAppType(appGroup,appTypeType,appSubtype,appCategory);
	if (records.getSuccess()) records = records.getOutput();
	else logDebug(records.getErrorMessage());
	// If there are records then we will continue.
	for (x in records) {
		capCount++;
		// get capId for processing records.
		capId = records[x].getCapModel().getCapID();
		// get the "Pre-Submittal Meeting" date
		var meetingDate = getAppSpecific(asiField);
		//aa.print(records[x].getCapModel().getCapStatus());
		/*
		for (y in records[x]) {
			aa.print(records[x][y])
		};
		//*/
		// we would only want to continue if there was a meeting date
		if (meetingDate != null && records[x].getCapModel().getCapStatus() != "File Purged") {
			// ---------------------------
			// convert the date string to an actual date.
			var mDateArray = meetingDate.split("/");
			var mDate = new Date(mDateArray[2],mDateArray[0]-1,mDateArray[1])
			var age = Date.now() - mDate;
			var age = age / 31536000000; // Divide by 1000*60*60*24*365
			// ----------------------------
			// Only remove documents from records that are greater than 2 years old
			if (age >= olderAge) {
				// Set the record status
				updateAppStatus("File Purged"); // Set Cap Status
				aa.print("Getting ready to remove the documents.");
				var show = getDocumentList();
				if (show.length > 0) {
					capProc ++;
					for(z in show){
						documents = show[z];
						//aa.print(documents.getFileKey());
						//aa.print(documents);
						removeDoc = documents.getDocumentNo();
						// Now I have to get the current user ID Password.
						var deleted= aa.document.removeDocumentByPK(removeDoc,delUser,delPass,appTypeArray[0]);
						//aa.print(deleted);
						if (deleted.getSuccess()) {		
							docListArray = docListResult.getOutput();
							aa.print("Document: "+removeDoc+" "+documents.getDocName()+" has been removed from "+capId.getCustomID());
							logDebug("Document: "+removeDoc+" "+documents.getDocName()+" has been removed from "+capId.getCustomID());
							docRemoved ++;
						}
						else {
							logDebug(deleted.getErrorMessage);
						}
					}
				}
				else{
					// Increment counter for items that are skipped due to no attached documents
					capSkipNoDoc ++;
				}
				// List of documents

			}
			// Else nothing is going to be done.
			else {
				aa.print("Documents for "+capId.getCustomID()+" will not be removed");
				capSkipAge ++;
			}
		}
		else {
			aa.print("Pre-Submittal Date not yet set.")
			capSkipPSD ++;
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
