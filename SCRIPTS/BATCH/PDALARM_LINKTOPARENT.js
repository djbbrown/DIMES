/*-------------------------------------------------------------------------------------------------------/
| Program:	PDALARM_LINKTOPARENT 
| Client:   Mesa
|
| Version 1.0 - Base Version. 
|
| This daily batch script will link the alarm activity record to a parent permit based on address 
|
/--------------------------------------------------------------------------------------------------------*/
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
var startDate = new Date();
var startJSDate = new Date();
startJSDate.setHours(0,0,0,0);
var timeExpired = false;
var useAppSpecificGroupName = false;
var startTime = startDate.getTime();			// Start timer
var currentUserID = "ADMIN";
var systemUserObj = aa.person.getUser("ADMIN").getOutput();

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

eval(getMasterScriptText("INCLUDES_ACCELA_FUNCTIONS"));
eval(getScriptText("INCLUDES_BATCH"));
eval(getMasterScriptText("INCLUDES_CUSTOM"));
eval(getScriptText("INCLUDES_CUSTOM_GLOBALS"));

override = "function logDebug(dstr){ if(showDebug) { logDebug(dstr); emailText+= dstr + \"<br>\"; } }";
eval(override);

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

/*----------------------------------------------------------------------------------------------------------------------------------------/
|
| Start: BATCH PARAMETERS
|

HH15-00035

/------------------------------------------------------------------------------------------------------------------------------------------*/
/* test parameters */
aa.env.setValue("appGroup", "Permits");
aa.env.setValue("appTypeType", "Police Department");
aa.env.setValue("appSubtype", "Alarms");
aa.env.setValue("appCategory", "Activity");
aa.env.setValue("taskName", "Review");
aa.env.setValue("taskStatus", "noStatus");
aa.env.setValue("appStatusList", "Review");
aa.env.setValue("parentAppType", "Permits/Police Department/Alarms/Commercial");
aa.env.setValue("emailLog", "Y");
aa.env.setValue("emailAddress", "lwacht@accela.com");
aa.env.setValue("sysFromEmail", "noreply@mesa.gov");

//var lookAheadDays = aa.env.getValue("lookAheadDays"); 
//var daySpan = getParam("daySpan");
var appGroup = getParam("appGroup");
var appTypeType = getParam("appTypeType");			// App type to process 
var appSubtype = getParam("appSubtype");
var appCategory = getParam("appCategory");
var parentAppType = getParam("parentAppType");
var taskName = getParam("taskName");
var taskStatus = getParam("taskStatus");
var appStatusList = getParam("appStatusList");
var emailLog = getParam("emailLog");			
var emailAddress = getParam("emailAddress");			// email to send report
var emailTemplate = getParam("emailTemplate");			// email to send report
var reportName = getParam("reportName");			// email to send report
//var asiField = getParam("asiField");
//var asiGroup = getParam("asiGroup");
var sysFromEmail = getParam("sysFromEmail");
var sendEmailToContactTypes = getParam("sendEmailToContactTypes");

/*-----------------------------------------------------------------------------------------------/
|
| End: BATCH PARAMETERS
|
/------------------------------------------------------------------------------------------------*/


//var fromDate =  dateAdd(null,(parseInt(lookAheadDays))) + " 00:00:00";
//logDebug("fromDate: " + fromDate);
//var toDate = dateAdd(null,parseInt(lookAheadDays)+parseInt(daySpan-1)) + " 23:59:59";
//logDebug("toDate: " + toDate);
//var minValidDate =  convertDate(dateAdd(null,(lookAheadDays)) + " 00:00:00");
//var toDay = dateAdd(null,0) + " 00:00:00";

if(appTypeType=="*") appTypeType="";
if(appSubtype=="*")  appSubtype="";
if(appCategory=="*") appCategory="";
/*------------------------------------------------------------------------------------------------/
|
| <===========Main=Loop================>
|
/-------------------------------------------------------------------------------------------------*/

logDebug("Start of Job");

mainProcess();

logDebug("End of Job: Elapsed Time : " + elapsed() + " Seconds");

if (emailAddress.length && emailLog=="Y"){
	logDebug("Email will be sent to: " + emailAddress);
	//logDebug(emailText);
	aa.sendMail(sysFromEmail, emailAddress, "", batchJobName + " Results", emailText);
}
if (showDebug) {
	aa.eventLog.createEventLog("DEBUG", "Batch Process", batchJobName, aa.date.getCurrentDate(), aa.date.getCurrentDate(),"", emailText ,batchJobID);
}
logDebug(emailText);
/*---------------------------------------------------------------------------------------------------------/
| <===========END=Main=Loop================>
/---------------------------------------------------------------------------------------------------------*/

function mainProcess() {
try{
	//1. Process new records
	processNewRecords();
}catch (err){
	logDebug("A JavaScript Error occurred: mainProcess: " + err.message);
	emailText+= "A JavaScript Error occurred: mainProcess: " + err.message + ": " + err.stack + br;
}};

/*---------------------------------------------------------------------------------------------------------------/
| <===========Internal Functions and Classes (Used by this script)
/----------------------------------------------------------------------------------------------------------------*/
function processNewRecords(){
try{
	var capsToInclude = new Array();
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
			capCount++;
			logDebug("++++++Processing " + altId);
			//find an alarm permit on the same address
			appTypeArray = appGroup+"/"+appTypeType+"/"+appSubtype+"/"+appCategory;
			//var parRecord = getCapByAddress_SansZip(parentAppType);
			if(getParent()){
				logDebug("Record has already been processed (parent "+ getParent().getCustomID() + "). Skipping.");
				continue;
			}
			var parRecord = capIdsGetByAddr_sansZip();
			var parentFound = false;
			if(!parRecord){
				addToExceptionRpt("No permit found for the record: " + altId);
				logDebug("No permit found for  the record: " + altId);
			}else{
				for(x in parRecord){
					var capAddressResult = aa.address.getAddressByCapId(parRecord[x]);
					if (capAddressResult.getSuccess()) {
						Address = capAddressResult.getOutput();
						var addr = Address[0];
						parCap = aa.cap.getCap(parRecord[x]).getOutput();
						parAppStatus = parCap.getCapStatus();
						if(parCap.getCapType()=="Permits/Police Department/Alarms/Commercial"){
							var parAltId = parRecord[x].getCustomID();
							if(parAppStatus!="Issued"){
								logDebug("The permit linked to activity  " + altId + " is not in an 'Issued' status: " + parAltId + "(" + parAppStatus + ")");
								addToExceptionRpt("The permit linked to activity  " + altId + " is not in an 'Issued' status: " + parAltId + "(" + parAppStatus + ")");
								var parentFound = true;
							}
							addParent(parRecord[x]);
							logDebug("Parent " + parAltId + " added successfully to " + altId);
						}
					}
				}
				if(!parentFound){
					addToExceptionRpt("No permit found for the record: " + altId);
					logDebug("No permit found for  the record: " + altId);
				}
			}
			capsToInclude.push(capId);
		}
		/* not required
		if (capsToInclude.length > 0) {
			setCreated = createSet();
			if (setCreated) {
				for (capIndex in capsToInclude) {
					aa.set.add(setCreated, capsToInclude[capIndex]);
					updateSetMemberStatus(capsToInclude[capIndex], setCreated, "New");
				}
				var setHeaderSetType = aa.set.getSetByPK(setCreated).getOutput();
				setHeaderSetType.setRecordSetType("DEQ");
				setHeaderSetType.setSetStatus("New");
				updResult = aa.set.updateSetHeader(setHeaderSetType);          
				//var setDetailsScriptModel = aa.set.getSetDetailsScriptModel().getOutput(); 
				//setDetailsScriptModel.setSetID(setCreated); 
				//var resultObj = aa.set.getSetMembers(setDetailsScriptModel).getOutput()
				//var resultObjArray  = resultObj.toArray();
				//for (curRecord in resultObjArray){
				//	updateSetMemberStatus(resultObjArray[curRecord], setCreated, "New");
				//}
			}
		}*/
	}
	logDebug("Processed " + capCount + " record(s).");
}catch (err){
	logDebug("A JavaScript Error occurred: processNewRecords: " + err.message);
	logDebug(err.stack);
	emailText+= "A JavaScript Error occurred: processNewRecords: " + err.message + br + err.stack + br;
}};


function getRecords(){
try{
	//taskItemScriptModel.setAssignedUser(sysUserModel);
	//Setup the workflow task criteria
	var taskItemScriptModel = aa.workflow.getTaskItemScriptModel().getOutput();
	//assign user department
	//var sysUserModel = taskItemScriptModel.getTaskItem().getAssignedUser();
	//sysUserModel.setAgencyCode("DED");
	//sysUserModel.setBureauCode("01");
	//sysUserModel.setDivisionCode("SERVICE");
	//sysUserModel.setGroupCode("NA");
	//sysUserModel.setOfficeCode("NA");
	//sysUserModel.setSectionCode("NA");
	//
	taskItemScriptModel.setActiveFlag("Y");
	taskItemScriptModel.setCompleteFlag("N");
	taskItemScriptModel.setTaskDescription(taskName);
	//taskItemScriptModel.setTaskDescription("");
	//taskItemScriptModel.setDisposition("noStatus");
	//taskItemScriptModel.setDisposition(taskStatus);
	//taskItemScriptModel.setDispositionDate(minValidDate);
	//Setup the cap type criteria
	var capTypeScriptModel = aa.workflow.getCapTypeScriptModel().getOutput();
	capTypeScriptModel.setGroup(appGroup);
	capTypeScriptModel.setType(appTypeType);
	capTypeScriptModel.setSubType(appSubtype);
	capTypeScriptModel.setCategory(appCategory); 
	//Set the date range for the task due date criteria
	//var startDueDate = aa.date.parseDate(dateAdd(null,-2));
	//var endDueDate = aa.date.parseDate(dateAdd(null,20));
	//var startDueDate = aa.date.parseDate(fromDate);
	//var endDueDate = aa.date.parseDate(toDate);
	//logDebug("startDueDate: " + fromDate);
	//logDebug("endDueDate: " + toDate);
	var arrAppStatus = [];
	if(appStatusList.indexOf(",")<0){
		arrAppStatus.push(appStatusList);
	}else{
		arrAppStatus= appStatusList.split(",");
	}	
	//var capRes = aa.workflow.getCapIdsByCriteria(taskItemScriptModel, startDueDate, endDueDate, capTypeScriptModel, appStatusList);
	var capRes = aa.workflow.getCapIdsByCriteria(taskItemScriptModel, null, null, capTypeScriptModel, null);
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

function addToExceptionRpt(excepReason){
try{
	rptException+=altId+": " + excepReason;
}catch (err){
	logDebug("A JavaScript Error occurred: addToExceptionRpt: " + err.message);
	logDebug(err.stack);
	emailText+= "A JavaScript Error occurred: addToExceptionRpt: " + err.message + br + err.stack + br;
}};


function getCapIdByIDs(s_id1, s_id2, s_id3)  {
	var s_capResult = aa.cap.getCapID(s_id1, s_id2, s_id3);
	if(s_capResult.getSuccess())
		return s_capResult.getOutput();
	else{
		return null;
	}
}

function capIdsGetByAddr_sansZip() {
try{
	var addrResult = aa.address.getAddressByCapId(capId);
	if (!addrResult.getSuccess()) {
		logDebug("**ERROR: getting CAP addresses: " + addrResult.getErrorMessage());
		return false;
	}
	var addrArray = new Array();
	var addrArray = addrResult.getOutput();
	if (addrArray.length == 0 || addrArray == undefined) {
		logDebug("The current CAP has no address.  Unable to get CAPs with the same address.")
		return false;
	}
	//use 1st address for comparison
	var streetName = addrArray[0].getStreetName();
	var hseNum = addrArray[0].getHouseNumberStart();
	var streetSuffix = addrArray[0].getStreetSuffix();
	var zip = addrArray[0].getZip();
	var unitNbr = ""+addrArray[0].getUnitStart();
	var streetDir = addrArray[0].getStreetDirection();
	if (streetDir == "")
		streetDir = null;
	if (streetSuffix == "")
		streetSuffix = null;
	if (zip == "")
		zip = null;
	// get caps with same address
	var capAddResult = aa.cap.getCapListByDetailAddress(streetName, parseInt(hseNum), streetSuffix, null, streetDir, null);
	if (capAddResult.getSuccess()){
		var capArray = capAddResult.getOutput();
	}else {
		logDebug("**ERROR: getting similar addresses: " + capAddResult.getErrorMessage());
		return false;
	}
	var capIdArray = new Array();
	//convert CapIDScriptModel objects to CapIDModel objects
	for (i in capArray){
		//go through again to match unit number
		var chkCap = capArray[i].getCapID();
		var capAddrResult = aa.address.getAddressByCapId(chkCap);
		if (capAddrResult.getSuccess()) {
			capAddr = capAddrResult.getOutput();
			if(capAddr[0].getUnitStart()==unitNbr){
				capIdArray.push(capArray[i].getCapID());
			}
		}
	}
	if (capIdArray)
		return (capIdArray);
	else
		return false;
}
catch (err){
	logDebug("A JavaScript Error occurred: getCapByAddress_SansZip: " + err.message);
	logDebug(err.stack);
	emailText+= "A JavaScript Error occurred: getCapByAddress_SansZip: " + err.message + ": " + err.stack + br;
}};


