/*===================================================================
// Script Number: 181
// Script Name: PAGEFLOW_ValidateRequiredDocs.js
// Script Developer: Bryan de Jesus
// Script Agency: Woolpert
// Script Description: Pageflow script to enforce document requirements based on values of ASI fields. Disallow submittal if required documents not uploaded based on document group and category. Refer to config doc for mapping of ASI fields to document type requirements
// Script Run Event: 
// Script Parents:
//            ASA;Planning!Group Home-Daycare!Application!NA  (example)
//            ASA;Licensing!General!ParkAndSwap!NA  (example)
/*==================================================================*/

/*===================================================================
// Script Number: 181
// Script Name: PAGEFLOW_ValidateRequiredDocs.js
// Script Developer: Bryan de Jesus
// Script Agency: Woolpert
// Script Description: 
// Script Run Event: 
// Script Parents:
//            ASA;Planning!Group Home-Daycare!Application!NA  (example)
//            ASA;Licensing!General!ParkAndSwap!NA  (example)
===================================================================*/

/*------------------------------------------------------------------------------------------------------/
| START User Configurable Parameters
/------------------------------------------------------------------------------------------------------*/
var showMessage = true;							// Set to true to see results in popup window
var showDebug = true;							// Set to true to see debug messages in popup window
var documentOnly = false;						// Document Only -- displays hierarchy of std choice steps
var disableTokens = false;						// turn off tokenizing of std choices (enables use of "{} and []")
var useAppSpecificGroupName = false;			// Use Group name when populating App Specific Info Values
var useTaskSpecificGroupName = false;			// Use Group name when populating Task Specific Info Values
var enableVariableBranching = false;			// Allows use of variable names in branching.  Branches are not followed in Doc Only
var maxEntries = 99;							// Maximum number of std choice entries.  Entries must be Left Zero Padded
/*------------------------------------------------------------------------------------------------------/
| END User Configurable Parameters
/------------------------------------------------------------------------------------------------------*/
var cancel = false;
var startDate = new Date();
var startTime = startDate.getTime();
var message = "";							// Message String
var debug = "";								// Debug String
var br = "<BR>";							// Break Tag
var feeSeqList = new Array();				// invoicing fee list
var paymentPeriodList = new Array();		// invoicing pay periods

var publicUser = false ;
var currentUserID = aa.env.getValue("CurrentUserID");
var publicUserID = aa.env.getValue("CurrentUserID");
if (currentUserID.indexOf("PUBLICUSER") == 0) { currentUserID = "ADMIN" ; publicUser = true } 	// ignore public users
var systemUserObj = aa.person.getUser(currentUserID).getOutput();  								// Current User Object
var currentUserGroup;

var cap = aa.env.getValue("CapModel");
if (cap != null) {
	var capId = cap.getCapID();
	var servProvCode = capId.getServiceProviderCode()       	// Service Provider Code
	var capIDString = capId.getCustomID();						// alternate cap id string
	var appTypeResult = cap.getCapType();
	var appTypeString = appTypeResult.toString();				// Convert application type to string ("Building/A/B/C")
	var appTypeArray = appTypeString.split("/");				// Array of application type string
}
var sysDate = aa.date.getCurrentDate();

/*------------------------------------------------------------------------------------------------------/
| <===========Main=Loop================>
|
/-----------------------------------------------------------------------------------------------------*/
if (!!capId){
	// load ASI fields
	var AInfo = new Array();
	loadAppSpecific4ACA(AInfo);
	
	// load documents
	var docs = cap.getAppRefDocumentModel();
	
	// test for selection
	var missingDocs = [], i = 0, doc = null, docFound = false;
	if (AInfo["Right of Way Usage"] && AInfo["Right of Way Usage"] == "CHECKED"){
		for (i=0; i<docs.size(); i++){
			doc = docs.get(i);
			if (doc.getDocCategory() == "Attachment F - Streets/Traffic/Barricade Plan"){
				docFound = true;
				break;
			}
		}
		if (!docFound) missingDocs.push("Attachment F - Streets/Traffic/Barricade Plan");
		else docFound = false; // reset
		
		for (i=0; i<docs.size(); i++){
			doc = docs.get(i);
			if (doc.getDocCategory() == "Traffic Control Plan"){
				docFound = true;
				break;
			}
		}
		if (!docFound) missingDocs.push("Traffic Control Plan");
		else docFound = false; // reset
	}
	if (AInfo["Parade"] && AInfo["Parade"] == "CHECKED"){
		for (i=0; i<docs.size(); i++){
			doc = docs.get(i);
			if (doc.getDocCategory() == "Attachment D - Parade Questionnaire"){
				docFound = true;
				break;
			}
		}
		if (!docFound) missingDocs.push("Attachment D - Parade Questionnaire");
		else docFound = false; // reset

		for (i=0; i<docs.size(); i++){
			doc = docs.get(i);
			if (doc.getDocCategory() == "Attachment F - Streets/Traffic/Barricade Plan"){
				docFound = true;
				break;
			}
		}
		if (!docFound) missingDocs.push("Attachment F - Streets/Traffic/Barricade Plan");
		else docFound = false; // reset	
	}
	if (AInfo["Temporary Fencing"] && AInfo["Temporary Fencing"] == "CHECKED"){
		for (i=0; i<docs.size(); i++){
			doc = docs.get(i);
			if (doc.getDocCategory() == "Site Plan"){
				docFound = true;
				break;
			}
		}
		if (!docFound) missingDocs.push("Site Plan");
		else docFound = false; // reset	
	}
	if (AInfo["Liquor"] && AInfo["Liquor"] == "CHECKED"){
		for (i=0; i<docs.size(); i++){
			doc = docs.get(i);
			if (doc.getDocCategory() == "Attachment B - Liquor Licensing"){
				docFound = true;
				break;
			}
		}
		if (!docFound) missingDocs.push("Attachment B - Liquor Licensing");
		else docFound = false; // reset	
		
		for (i=0; i<docs.size(); i++){
			doc = docs.get(i);
			if (doc.getDocCategory() == "State Special Event Liquor Application"){
				docFound = true;
				break;
			}
		}
		if (!docFound) {
			for (i=0; i<docs.size(); i++){
				doc = docs.get(i);
				if (doc.getDocCategory() == "State Extension Premise Application"){
					docFound = true;
					break;
				}
			}
			if (!docFound) missingDocs.push("State Special Event Liquor Application or State Extension Premise Application");
			else docFound = false;
		}
		else docFound = false; // reset	
	}
	if (AInfo["Fireworks"] && AInfo["Fireworks"] == "CHECKED"){
		for (i=0; i<docs.size(); i++){
			doc = docs.get(i);
			if (doc.getDocCategory() == "Certificate of Insurance"){
				docFound = true;
				break;
			}
		}
		if (!docFound) missingDocs.push("Certificate of Insurance");
		else docFound = false; // reset	
		
		for (i=0; i<docs.size(); i++){
			doc = docs.get(i);
			if (doc.getDocCategory() == "Attachment C - Fireworks"){
				docFound = true;
				break;
			}
		}
		if (!docFound) missingDocs.push("Attachment C - Fireworks");
		else docFound = false; // reset	

		for (i=0; i<docs.size(); i++){
			doc = docs.get(i);
			if (doc.getDocCategory() == "Pyrotechnics Operators List"){
				docFound = true;
				break;
			}
		}
		if (!docFound) missingDocs.push("Pyrotechnics Operators List");
		else docFound = false; // reset	
	}
	if (AInfo["Entertainment"] && AInfo["Entertainment"] == "CHECKED"){
		for (i=0; i<docs.size(); i++){
			doc = docs.get(i);
			if (doc.getDocCategory() == "Attachment G - Entertainment/Vendors"){
				docFound = true;
				break;
			}
		}
		if (!docFound) missingDocs.push("Attachment G - Entertainment/Vendors");
		else docFound = false; // reset
	}
	if (AInfo["Concessionaires/Vendors"] && AInfo["Concessionaires/Vendors"] == "CHECKED"){
		for (i=0; i<docs.size(); i++){
			doc = docs.get(i);
			if (doc.getDocCategory() == "Attachment G - Entertainment/Vendors"){
				docFound = true;
				break;
			}
		}
		if (!docFound) missingDocs.push("Attachment G - Entertainment/Vendors");
		else docFound = false; // reset
		
		for (i=0; i<docs.size(); i++){
			doc = docs.get(i);
			if (doc.getDocCategory() == "Vendor List"){
				docFound = true;
				break;
			}
		}
		if (!docFound) missingDocs.push("Vendor List");
		else docFound = false; // reset
	}
	if (AInfo["Tax Exempt"] && AInfo["Tax Exempt"] == "CHECKED"){
		for (i=0; i<docs.size(); i++){
			doc = docs.get(i);
			if (doc.getDocCategory() == "IRS Tax Exempt Letter"){
				docFound = true;
				break;
			}
		}
		if (!docFound) missingDocs.push("IRS Tax Exempt Letter");
		else docFound = false; // reset
	}
	if (AInfo["Location"] && (AInfo["Location"] == "Parking Lot" || AInfo["Location"] == "Residential")){
		for (i=0; i<docs.size(); i++){
			doc = docs.get(i);
			if (doc.getDocCategory() == "Letter of Approval"){
				docFound = true;
				break;
			}
		}
		if (!docFound) missingDocs.push("Letter of Approval");
		else docFound = false; // reset
	}
	
	// display message if missing docs and cancel
	if (missingDocs.length > 0){
		cancel = true;
		showMessage = true;
		msg = "Your application requires the following additional documents before proceeding: ";
		for (var index in missingDocs){
			if (index < missingDocs.length-1)
				msg += missingDocs[index] + ", ";
			else
				msg += missingDocs[index];
		}
		comment(msg);
	}
}

/*------------------------------------------------------------------------------------------------------/
| <===========END=Main=Loop================>
/-----------------------------------------------------------------------------------------------------*/

if (debug.indexOf("**ERROR") > 0) {
	aa.env.setValue("ErrorCode", "1");
	aa.env.setValue("ErrorMessage", debug);
}
else {
	if (cancel) {
		aa.env.setValue("ErrorCode", "-2");
		if (showMessage) aa.env.setValue("ErrorMessage", message);
		if (showDebug) 	aa.env.setValue("ErrorMessage", debug);
	}
	else {
		aa.env.setValue("ErrorCode", "0");
		if (showMessage) aa.env.setValue("ErrorMessage", message);
		if (showDebug) 	aa.env.setValue("ErrorMessage", debug);
	}
}

/*------------------------------------------------------------------------------------------------------/
| <===========External Functions (used by Action entries)
/------------------------------------------------------------------------------------------------------*/

function logDebug(dstr) {
	vLevel = 1
	if (arguments.length > 1)
		vLevel = arguments[1];
	if ((showDebug & vLevel) == vLevel || vLevel == 1)
		debug += dstr + br;
	if ((showDebug & vLevel) == vLevel)
		aa.debug(aa.getServiceProviderCode() + " : " + aa.env.getValue("CurrentUserID"), dstr);
}

