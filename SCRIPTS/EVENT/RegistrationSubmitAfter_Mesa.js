/*------------------------------------------------------------------------------------------------------/
| Program : RegistrationSubmitAfter_Mesa.js
| Event   : RegistrationSubmitAfter
|
| Usage   : To auto-create a trust account for new public users.
|
| Client  : N/A
| Action# : N/A
|
| Notes   :
|
|
/------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------/
| START Configurable Parameters
|	The following script code will attempt to read the assocaite event and invoker the proper standard choices
|
/------------------------------------------------------------------------------------------------------*/
var triggerEvent = aa.env.getValue("EventName");
var controlString = null;
var documentOnly = false; // Document Only -- displays hierarchy of std choice steps


var preExecute = "PreExecuteForAfterEvents"; //Assume after event unless before decected
var eventType = "After"; //Assume after event
if (triggerEvent != "") {
	controlString = triggerEvent; // Standard choice for control
	if (triggerEvent.indexOf("Before") > 0) {
		preExecute = "PreExecuteForBeforeEvents";
		eventType = "Before";
	}
}

/*------------------------------------------------------------------------------------------------------/
| END User Configurable Parameters
/------------------------------------------------------------------------------------------------------*/
var SCRIPT_VERSION = 3.0;
var useCustomScriptFile = true; // if true, use Events->Custom Script, else use Events->Scripts->INCLUDES_CUSTOM
var useSA = false;
var SA = null;
var SAScript = null;
var bzr = aa.bizDomain.getBizDomainByValue("MULTI_SERVICE_SETTINGS", "SUPER_AGENCY_FOR_EMSE");
if (bzr.getSuccess() && bzr.getOutput().getAuditStatus() != "I") {
	useSA = true;
	SA = bzr.getOutput().getDescription();
	bzr = aa.bizDomain.getBizDomainByValue("MULTI_SERVICE_SETTINGS", "SUPER_AGENCY_INCLUDE_SCRIPT");
	if (bzr.getSuccess()) {
		SAScript = bzr.getOutput().getDescription();
	}
}

if (SA) {
	eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS", SA, useCustomScriptFile));
	eval(getScriptText("INCLUDES_ACCELA_GLOBALS", SA, useCustomScriptFile));
	eval(getScriptText(SAScript, SA));
} else {
	eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS", null, useCustomScriptFile));
	eval(getScriptText("INCLUDES_ACCELA_GLOBALS", null, useCustomScriptFile));
}

eval(getScriptText("INCLUDES_CUSTOM", null, useCustomScriptFile));

if (documentOnly) {
	doStandardChoiceActions(controlString, false, 0);
	aa.env.setValue("ScriptReturnCode", "0");
	aa.env.setValue("ScriptReturnMessage", "Documentation Successful.  No actions executed.");
	aa.abortScript();
}

var prefix = lookup("EMSE_VARIABLE_BRANCH_PREFIX", vEventName);

var controlFlagStdChoice = "EMSE_EXECUTE_OPTIONS";
var doStdChoices = false; // compatibility default
var doScripts = false;
var bzr = aa.bizDomain.getBizDomain(controlFlagStdChoice).getOutput().size() > 0;
if (bzr) {
	var bvr1 = aa.bizDomain.getBizDomainByValue(controlFlagStdChoice, "STD_CHOICE");
	doStdChoices = bvr1.getSuccess() && bvr1.getOutput().getAuditStatus() != "I";
	var bvr1 = aa.bizDomain.getBizDomainByValue(controlFlagStdChoice, "SCRIPT");
	doScripts = bvr1.getSuccess() && bvr1.getOutput().getAuditStatus() != "I";
}

function getScriptText(vScriptName, servProvCode, useProductScripts) {
	if (!servProvCode)
		servProvCode = aa.getServiceProviderCode();
	vScriptName = vScriptName.toUpperCase();
	var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();
	try {
		if (useProductScripts) {
			var emseScript = emseBiz.getMasterScript(aa.getServiceProviderCode(), vScriptName);
		} else {
			var emseScript = emseBiz.getScriptByPK(aa.getServiceProviderCode(), vScriptName, "ADMIN");
		}
		return emseScript.getScriptText() + "";
	} catch (err) {
		return "";
	}
}

/*------------------------------------------------------------------------------------------------------/
| BEGIN Event Specific Variables
/------------------------------------------------------------------------------------------------------*/
//Log All Environmental Variables as  globals
var params = aa.env.getParamValues();
var keys = params.keys();
var key = null;
while (keys.hasMoreElements()) {
	key = keys.nextElement();
	eval("var " + key + " = aa.env.getValue(\"" + key + "\");");
	logDebug("Loaded Env Variable: " + key + " = " + aa.env.getValue(key));
}

/*------------------------------------------------------------------------------------------------------/
| END Event Specific Variables
/------------------------------------------------------------------------------------------------------*/

if (preExecute.length)
	doStandardChoiceActions(preExecute, true, 0); // run Pre-execution code

logGlobals(AInfo);

/*------------------------------------------------------------------------------------------------------/
| <===========Main=Loop================>
|
/-----------------------------------------------------------------------------------------------------*/
//
//  Get the Standard choices entry we'll use for this App type
//  Then, get the action/criteria pairs for this app
//

if (doStdChoices)
	doStandardChoiceActions(controlString, true, 0);

//
//  Next, execute and scripts that are associated to the record type
//

if (doScripts)
	doScriptActions();

//
// Do MESA Specifc Code
// 
//cancel = true;
//showMessage = true;
//showDebug = 3;

var vPUModel = aa.env.getValue('PublicUserModel');
var vPeople = vPUModel.getPeoples().toArray();
var vPerson;
var vPersonSeqNbr;

for (y in vPeople) {
	vPerson = vPeople[y];
	vPersonSeqNbr = vPerson.getContactSeqNumber();
	vPersonSeqNbr = parseInt(vPersonSeqNbr);

	if (vPersonSeqNbr != null && vPersonSeqNbr != "") {
		var vTrustAccount = aa.trustAccount.createTrustAccountScriptModel();
		var vTAM = vTrustAccount.getTrustAccountModel();

		vTAM.setAcctID(vPersonSeqNbr);
		vTAM.setServProvCode('MESA');
		vTAM.setRecDate(new Date());
		vTAM.setRecStatus('A');
		vTAM.setRecFulName('ADMIN');
		vTAM.setThresholdAmount(0.0);
		vTAM.setAcctBalance(0.0);
		vTAM.setAcctStatus('Active');
		vTAM.setOverdraft('N');
		vTAM.setOverdraftLimit(0.0);

		var vTAMResult = aa.trustAccount.createTrustAccount(vTAM).getSuccess();
		
		if (vTAMResult == true) { 
			var vPeopleAccount = aa.trustAccount.createTrustAccountPeopleScriptModel();
			var vTAPM = vPeopleAccount.getTrustAccountPeopleModel();

			vTAPM.setAcctNBR(vTAM.getAcctSeq());
			vTAPM.setAcctID(vPersonSeqNbr);
			vTAPM.setPeopleNBR(vPersonSeqNbr);
			vTAPM.setServProvCode('MESA');
			vTAPM.setPeopleType('Contact');
			vTAPM.setRecStatus('A');
			vTAPM.setRecDate(new Date());
			vTAPM.setRecFulName('ADMIN')

			vPeopleAccount.setTrustAccountPeopleModel(vTAPM);

			var vTAPMResult = aa.trustAccount.createTrustAccountPeople(vTAPM).getSuccess();
			
			if (vTAPMResult == true) {
				logDebug("Created Trust Account ID: " + vPersonSeqNbr);
			}
		}
		else {
			logDebug("Failed to create trust account: " + vPersonSeqNbr + ".");
		}
	}
	else {
		logDebug("Failed to create trust account: " + vPersonSeqNbr + ". No sequence number to use.");
	}
}



//
// Check for invoicing of fees
//
if (feeSeqList.length) {
	invoiceResult = aa.finance.createInvoice(capId, feeSeqList, paymentPeriodList);
	if (invoiceResult.getSuccess())
		logMessage("Invoicing assessed fee items is successful.");
	else
		logMessage("**ERROR: Invoicing the fee items assessed to app # " + capIDString + " was not successful.  Reason: " + invoiceResult.getErrorMessage());
}

/*------------------------------------------------------------------------------------------------------/
| <===========END=Main=Loop================>
/-----------------------------------------------------------------------------------------------------*/
if (eventType == "After") {
	if (debug.indexOf("**ERROR") > 0) {
		aa.env.setValue("ScriptReturnCode", "1");
		aa.env.setValue("ScriptReturnMessage", debug);
	} else {
		aa.env.setValue("ScriptReturnCode", "0");
		if (showMessage)
			aa.env.setValue("ScriptReturnMessage", message);
		if (showDebug)
			aa.env.setValue("ScriptReturnMessage", debug);
	}
} else { //Process Before Event with cancel check
	if (debug.indexOf("**ERROR") > 0) {
		aa.env.setValue("ScriptReturnCode", "1");
		aa.env.setValue("ScriptReturnMessage", debug);
	} else {
		if (cancel) {
			aa.env.setValue("ScriptReturnCode", "1");
			if (showMessage)
				aa.env.setValue("ScriptReturnMessage", "<font color=red><b>Action Cancelled</b></font><br><br>" + message);
			if (showDebug)
				aa.env.setValue("ScriptReturnMessage", "<font color=red><b>Action Cancelled</b></font><br><br>" + debug);
		} else {
			aa.env.setValue("ScriptReturnCode", "0");
			if (showMessage)
				aa.env.setValue("ScriptReturnMessage", message);
			if (showDebug)
				aa.env.setValue("ScriptReturnMessage", debug);
		}
	}
}

/*------------------------------------------------------------------------------------------------------/
| <===========External Functions (used by Action entries)
/------------------------------------------------------------------------------------------------------*/
