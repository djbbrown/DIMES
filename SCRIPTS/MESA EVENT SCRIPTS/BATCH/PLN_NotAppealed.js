/*===================================================================
 Script Number: 163
 Script Name: PLN_NotAppealed
 Script Developer: Bryan de Jesus
 Script Agency: Woolpert
 Script Description: 15 calendar day after approval or Denial of Hearing decision the appeal period ends and the appeal period task s needs to default the result to Not Appealed. 
	lwacht: 160908 - updated to have parameters for all values, added email log functionality
 Script Run Event: BATCH
 Script Parents: N/A
 Effected record types:
	Planning/Design Review/NA/NA
	Planning/General Plan Amendment - Major/NA/NA
	Planning/Planning and Zoning/NA/NA

/*==================================================================*/
/*------------------------------------------------------------------------------------------------------/
| Program: PLN_NotAppealed Trigger: Batch    
| Version 1.0 - Base Version. 
| 
| 
/------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------/
|
| START: USER CONFIGURABLE PARAMETERS
|
/------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------/
|
| START: USER CONFIGURABLE PARAMETERS
|
/--------------------------------------------------------------------------------------------------------*/
var emailText = "";
var rptException = "";
var debugText = "";
var showDebug = false;	
var showMessage = false;
var message = "";
var maxSeconds = 4.5 * 60;
var br = "<br>";

/*-------------------------------------------------------------------------------------------------------/
|
| END: USER CONFIGURABLE PARAMETERS
|
/--------------------------------------------------------------------------------------------------------*/
sysDate = aa.date.getCurrentDate();
batchJobResult = aa.batchJob.getJobID()
var batchJobID = aa.batchJob.getJobID().getOutput();
batchJobName = "" + aa.env.getValue("BatchJobName");
wfObjArray = null;
var SCRIPT_VERSION = 3.0;
publicUser = false;

eval(getMasterScriptText("INCLUDES_ACCELA_FUNCTIONS"));
eval(getMasterScriptText("INCLUDES_CUSTOM"));
eval(getScriptText("INCLUDES_BATCH"));
eval(getScriptText("INCLUDES_CUSTOM_GLOBALS"));

//override = "function logDebug(dstr){ if(showDebug) { logDebug(dstr); emailText+= dstr + \"<br>\"; } }";
//eval(override);

function getScriptText(vScriptName){
	vScriptName = vScriptName.toUpperCase();
	var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();
	var emseScript = emseBiz.getScriptByPK(aa.getServiceProviderCode(),vScriptName,"ADMIN");
	return emseScript.getScriptText() + "";
}

function getMasterScriptText(vScriptName) {
    vScriptName = vScriptName.toUpperCase();
    var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();
    var emseScript = emseBiz.getMasterScript(aa.getServiceProviderCode(), vScriptName);
    return emseScript.getScriptText() + "";
}

showDebug = true;
var batchJobID = 0;
if (batchJobResult.getSuccess())
  {
  batchJobID = batchJobResult.getOutput();
  logDebug("Batch Job " + batchJobName + " Job ID is " + batchJobID);
  }
else
  logDebug("Batch job ID not found " + batchJobResult.getErrorMessage());

/*----------------------------------------------------------------------------------------------------/
|
| Start: BATCH PARAMETERS
|
/------------------------------------------------------------------------------------------------------*/
/* 
aa.env.setValue("appGroup", "Planning");
aa.env.setValue("appTypeType","General Plan Amendment - Major");
aa.env.setValue("appSubtype","*");
aa.env.setValue("appCategory","*")
aa.env.setValue("appStatusList", "Denied");
aa.env.setValue("activeTask", "Appeal Period");
aa.env.setValue("checkDateTask", "Hearing(s)");
aa.env.setValue("checkDateStatus", "Denied");
aa.env.setValue("newStatus", "Not Appealed");
aa.env.setValue("lookAheadDays", "-16");
aa.env.setValue("daySpan", "1");
aa.env.setValue("emailAddress", "lwacht@accela.com");
aa.env.setValue("emailLog", "Y");
aa.env.setValue("sysFromEmail", "noreply@mesa.gov");
*/

var appGroup = getParam("appGroup");							//   app Group to process 
var appTypeType = getParam("appTypeType");						//   app type to process 
var appSubtype = getParam("appSubtype");						//   app subtype to process 
var appCategory = getParam("appCategory");	
var appStatusList = getParam("appStatusList");
var activeTask = getParam("activeTask");
var checkDateTask = getParam("checkDateTask");
var checkDateStatus = getParam("checkDateStatus");
var newStatus = getParam("newStatus");
var lookAheadDays = getParam("lookAheadDays");
var daySpan = getParam("daySpan");
var emailAddress = getParam("emailAddress");
var emailLog = getParam("emailLog");
var sysFromEmail = getParam("sysFromEmail");

/*----------------------------------------------------------------------------------------------------/
|
| End: BATCH PARAMETERS
|-----------------------------------------------------------------------------------------------------*/
var startDate = new Date();
var startJSDate = new Date();
startJSDate.setHours(0,0,0,0);
var timeExpired = false;
var useAppSpecificGroupName = false;

var startTime = startDate.getTime();			// Start timer
var currentUserID = "ADMIN";
var systemUserObj = aa.person.getUser("ADMIN").getOutput();

var fromDate =  dateAdd(null,(parseInt(lookAheadDays))) + " 00:00:00";
logDebug("fromDate: " + fromDate);
var jsFromDate = new Date(fromDate);
var toDate = dateAdd(null,parseInt(lookAheadDays)+parseInt(daySpan-1)) + " 23:59:59";
logDebug("toDate: " + toDate);
var jsToDate = new Date(toDate);

if(appTypeType=="*") appTypeType="";
if(appSubtype=="*")  appSubtype="";
if(appCategory=="*") appCategory="";

/*------------------------------------------------------------------------------------------------------/
| <===========Main=Loop================>
| 
/-----------------------------------------------------------------------------------------------------*/

logDebug("Start of Job");

if (!timeExpired) mainProcess();

logDebug("Elapsed Time : " + elapsed() + " Seconds");
if (emailAddress.length && emailLog=="Y"){
	logDebug("Email will be sent to: " + emailAddress);
	//logDebug(emailText);
	aa.sendMail(sysFromEmail, emailAddress, "", batchJobName + " Results", emailText);
}
if (showDebug) {
	aa.eventLog.createEventLog("DEBUG", "Batch Process", batchJobName, aa.date.getCurrentDate(), aa.date.getCurrentDate(),"", emailText ,batchJobID);
}

//aa.eventLog.createEventLog("DEBUG", "Batch Process", batchJobName, aa.date.getCurrentDate(), aa.date.getCurrentDate(),"", emailText, batchJobID);
//aa.print(emailText);

/*------------------------------------------------------------------------------------------------------/
| <===========End Main=Loop================>
| 
/-----------------------------------------------------------------------------------------------------*/
function mainProcess() {
try{	
	var capCount = 0;
	var capFilterType = 0;
	var capFilterStatus = 0;
	var capResult = getRecords();
	if(capResult){
		var capCount = 0;
		myCaps = capResult.getOutput();
		logDebug("Found " + myCaps.length + " records to process");
		for (myCapsXX in myCaps) {
			var emailSent=false;
			if (elapsed() > maxSeconds) { // only continue if time hasn't expired
				logDebug("WARNING: A script timeout has caused partial completion of this process.  Please re-run.  " + elapsed() + " seconds elapsed, " + maxSeconds + " allowed.") ;
				emailText+="WARNING: A script timeout has caused partial completion of this process.  Please re-run.  " + elapsed() + " seconds elapsed, " + maxSeconds + " allowed." + br;
				timeExpired = true ;
				break; 
			}
			var thisCapId = myCaps[myCapsXX].getCapID();
			capId = getCapIdByIDs(thisCapId.getID1(), thisCapId.getID2(), thisCapId.getID3()); 
			altId = capId.getCustomID();
			if (!capId) {
				logDebug("Could not get Cap ID");
				emailText+="Could not get Cap ID" + br;
				continue;
			}
			cap = aa.cap.getCap(capId).getOutput();		
			logDebug(br);
			logDebug("++++++Processing " + altId);						
			if(isTaskStatus(checkDateTask, checkDateStatus)){
				var taskDateFormatted = taskStatusDate(checkDateTask, null, capId);
				if (!matches(taskDateFormatted, null, "", "undefined")) {
					var taskDate = new Date(taskDateFormatted);
					// if the hearing task was set to a status of Denied more than 15 days ago
					if (jsFromDate.getTime() <= taskDate.getTime() < jsToDate.getTime()){
						closeTask(activeTask, newStatus, "Closed by batch PLN_NotAppealed. ", "");
						updateAppStatus(newStatus, "Updated by batch PLN_NotAppealed.")
						capCount++;
					}else{
						logDebug("Task status date (" + taskDateFormatted + ") not in range for " + altId);
						emailText+= "Task status date (" + taskDateFormatted + ") not in range for " + altId + br;
						capFilterStatus++;
					}
				}else{
					logDebug("Error getting task status date for " + altId);
					emailText+= "Error getting task status date for " + altId + br;
				}
			}else{
				logDebug("Wrong task status (" + checkDateTask + ", " + checkDateStatus + ") for " + altId);
				emailText+= "Wrong task status (" + checkDateTask + ", " + checkDateStatus + ") for " + altId + br;
				capFilterStatus++;
			}
		}
		logDebug("++++++ End Processing");
		logDebug("Processed " + capCount + " records.");		
		logDebug("Skipped " + capFilterStatus + " records.");
	}
}catch (err){
	logDebug("A JavaScript Error occurred: mainProcess: " + err.message);
	logDebug(err.stack);
	emailText+= "A JavaScript Error occurred: mainProcess: " + err.message + br + err.stack + br;
}};
/*------------------------------------------------------------------------------------------------------/
| <===========Internal Functions and Classes (Used by this script)
/------------------------------------------------------------------------------------------------------*/
function getRecords(){
try{
	//taskItemScriptModel.setAssignedUser(sysUserModel);
	//Setup the workflow task criteria
	var taskItemScriptModel = aa.workflow.getTaskItemScriptModel().getOutput();
	taskItemScriptModel.setActiveFlag("Y");
	taskItemScriptModel.setCompleteFlag("N");
	taskItemScriptModel.setTaskDescription(activeTask);
	//Setup the cap type criteria
	var capTypeScriptModel = aa.workflow.getCapTypeScriptModel().getOutput();
	capTypeScriptModel.setGroup(appGroup);
	capTypeScriptModel.setType(appTypeType);
	capTypeScriptModel.setSubType(appSubtype);
	capTypeScriptModel.setCategory(appCategory); 
	var arrAppStatus = [];
	if(appStatusList.indexOf(",")<0){
		arrAppStatus.push(appStatusList);
	}else{
		arrAppStatus= appStatusList.split(",");
	}	
	//var capRes = aa.workflow.getCapIdsByCriteria(taskItemScriptModel, startDueDate, endDueDate, capTypeScriptModel, appStatusList);
	var capRes = aa.workflow.getCapIdsByCriteria(taskItemScriptModel, null, null, capTypeScriptModel, arrAppStatus);
 	//var capRes = aa.cap.getCapIDsByAppSpecificInfoDateRange(asiGroup, asiField, dFromDate, dToDate);
	if (capRes.getSuccess()) {
		return capRes;
	}else { 
		logDebug("Error: Getting records, reason is: " + capRes.getErrorMessage()) ;
		emailText+= "Error: Getting records, reason is: " + capRes.getErrorMessage() + br;
		return false;
	} 
}catch (err){
	logDebug("A JavaScript Error occurred: getRecords: " + err.message);
	logDebug(err.stack);
	emailText+= "A JavaScript Error occurred: getRecords: " + err.message + br + err.stack + br;
}};

function getCapIdByIDs(s_id1, s_id2, s_id3)  {
	var s_capResult = aa.cap.getCapID(s_id1, s_id2, s_id3);
	if(s_capResult.getSuccess())
		return s_capResult.getOutput();
	else{
		return null;
	}
 }
