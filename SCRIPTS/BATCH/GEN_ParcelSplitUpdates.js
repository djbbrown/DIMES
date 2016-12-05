/*===================================================================
// Script Number: 338
// Script Name: GEN_ParcelSplitUpdates.js
// Script Description: 
// Run when County update comes in (need to check with GIS on frequency/timing of this):
// 1. Check all AA records:  verify if parcel number exists in parcel table.
// 2. If not, then get the new parcel # based on the address
// 3. If address match can't be found, email Permit Supervisor 

// Script Run Event: Batch - Run when County update comes in. 

// Email Template: 

// Script Run Event: BATCH
// Script Parents: n/a
//
// Version   |Date      |Engineer         |Details
//  1.0      |08/28/16  |Vance Smith      |Initial Release
//  1.1      |12/05/16  |Vance Smith      |Revised to accumulate into 1 email (temp)
/*==================================================================*/

/* intellisense references */
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/// <reference path="../../INCLUDES_BATCH.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

/*------------------------------------------------------------------------------------------------------/
| <===========Custom Functions================>
| 
/-----------------------------------------------------------------------------------------------------*/

function mainProcess() 
{
    /***** BEGIN INITIALIZE COUNTERS *****/

    /* UNCOMMENT NEEDED COUNTER VARIABLES
     * THESE ARE INCREMENTED BY THE FILTERS 
     * AND THEN USED TO GENERATE THE ADMIN SUMMARY EMAIL */
    var capCount = 0;
    var capFilterType = 0;
    var capFilterParcelExists = 0;
    var capFailedUpdateParcelAndFailedGetAddress = 0;
    var capFailedUpdateParcelAndFailedAddParcel = 0;
    var capFailedUpdateParcelAndFailedGetRefAddress = 0;
    var queryResultsCount = 0; // note: sometimes we need to do more than one query...
    var myCaps = null;
    var emailBody = "<ol>";

    /***** END INITIALIZE COUNTERS *****/


    /***** BEGIN LOOP DATA *****/

    var includeAppGroups = "Licenses,Permits,Planning,Transportation,Animal Control,Enforcement,Engineering"; 
    var includeAppGroupsArray = includeAppGroups.split(","); // include records in this app group 

    for (i = 0; i < includeAppGroupsArray.length; i++)
    {
        // get the records to process
        var capResult = aa.cap.getByAppType(includeAppGroupsArray[i], null, null, null); // get all caps in this group   

        if (capResult.getSuccess())
        {
            myCaps = capResult.getOutput();
            queryResultsCount += myCaps.length;
            logDebugAndEmail("Records count: " + myCaps.length);
        }   
        else 
        { 
            logDebugAndEmail("ERROR: Getting records, reason is: " + capResult.getErrorMessage());
        }

        for (var myCap in myCaps) 
        {
            /***** BEGIN GET NEEDED CAP DATA *****/

            // only continue if time hasn't expired
            if (elapsed() > maxSeconds) 
            { 
                logDebugAndEmail("WARNING - SCRIPT TIMEOUT REACHED", "A script timeout has caused partial completion of this process. Please re-run. " + elapsed() + " seconds elapsed, " + maxSeconds + " allowed.");
                timeExpired = true;
                break; // stop everything
            }

            // this next section will get the altId (which is the same as "cap id" and "record id")
            // if this fails we will move to the next record
            var thisCapId = myCaps[myCap].getCapID();
            capIdResult = aa.cap.getCapID(thisCapId.getID1(), thisCapId.getID2(), thisCapId.getID3());
            if (capIdResult.getSuccess()) 
            {
                capId = capIdResult.getOutput();
            }
            if (!capId) 
            {
                logDebugAndEmail("Failed getting altID: " + capIdResult.getErrorMessage());
                logDebugAndEmail("--------------moving to next record--------------");
                continue; // move to the next record
            }
            altId = capId.getCustomID();

            // get the CAP record, and set some variables
            // notice that these variables are not declared in this method, they
            // are likely declared in referenced master scripts its best to leave
            // them even if you dont think they are needed
            cap = aa.cap.getCap(capId).getOutput();		
            appTypeResult = cap.getCapType();
            capStatus = cap.getCapStatus();
            appTypeString = appTypeResult.toString();
            appTypeArray = appTypeString.split("/");

            /***** END GET NEEDED CAP DATA *****/
            
            /***** BEGIN FILTERS *****/

            /* FILTER BY PARCELS ON CAP */
            if (!parcelExistsOnCap())
            {
                capFilterParcelExists++;
                logDebug(altId + ": no parcels on cap" );
                logDebug("--------------moving to next record--------------");
                continue; // move to the next record
            }

            /***** END FILTERS *****/


            /***** BEGIN CUSTOM PROCESSING *****/

            capCount++; 
            logDebug("Processing " + altId);

            // this is a customization of updateRefParcelToCap that I made to return a status I can pivot logic on
            var updateStatus = updateRefParcelToCapReturnStatus(capId); 

            if ( updateStatus != "SUCCESS")
            {
                // need to search by address and try to find the parcel                
                var capAddResult = aa.address.getAddressByCapId(capId);
                if (capAddResult.getSuccess())
                {
                    var addresses = capAddResult.getOutput();
                    if ( addresses.length == 0 )
                    {
                        capFailedUpdateParcelAndFailedGetAddress++;
                        // if no addresses returned then notify permit supervisor                    
                        var etext = "Failed to automatically update the referenced parcel for " + altId + ". Also failed to get the address information to do a search for the parcel. (addresses.length = 0)";
                        // TEMP REMOVED aa.sendMail("NoReply@MesaAz.gov", lookup("EMAIL_RECIPIENTS", "Permits_Supervisor"), "", "Accela Parcel Update Failed: " + altId, etext);
                        emailBody = emailBody + "<li>" + etext + "</li>"; // TEMP ADDED
                    }
                    for (i in addresses)
                    {                            
                        if (addresses[i].getRefAddressId())
                        {
                            var refAddressId = addresses[i].getRefAddressId();
                            var addParcelResult = addParcelAndOwnerFromRefAddressWithEmailBody(refAddressId, emailBody); // TEMP REMOVED addParcelAndOwnerFromRefAddress(refAddressId);
                            if (!addParcelResult)
                            {
                                capFailedUpdateParcelAndFailedAddParcel++;
                                // if failed then notify permit supervisor                    
                                var etext = "Failed to automatically update the referenced parcel for " + altId + ". Also failed to add the parcel using the address information. RefAddressId: " + refAddressId;
                                // TEMP REMOVED aa.sendMail("NoReply@MesaAz.gov", lookup("EMAIL_RECIPIENTS", "Permits_Supervisor"), "", "Accela Parcel Update Failed: " + altId, etext);
                                emailBody = emailBody + "<li>" + etext + "</li>"; // TEMP ADDED
                            }
                        }
                        else 
                        {
                            capFailedUpdateParcelAndFailedGetRefAddress++;
                            // if not found by address then notify permit supervisor                    
                            var etext = "Failed to automatically update the referenced parcel for " + altId + ". Also failed to get the address information to do a search for the parcel. (refAddressId = null)";
                            // TEMP REMOVED aa.sendMail("NoReply@MesaAz.gov", lookup("EMAIL_RECIPIENTS", "Permits_Supervisor"), "", "Accela Parcel Update Failed: " + altId, etext);
                            emailBody = emailBody + "<li>" + etext + "</li>"; // TEMP ADDED
                        }
                    }
                }
            }
            
            logDebug("--------------moving to next record--------------");

            /***** END CUSTOM PROCESSING *****/
        }
    }

    /***** END LOOP DATA *****/


    /***** BEGIN ADMIN NOTIFICATION *****/

    logDebugAndEmail("");// empty line
    logDebugAndEmail("Results of this Session");
    logDebugAndEmail("-------------------------");
    logDebugAndEmail("");// empty line
    logDebugAndEmail("Query count: " + queryResultsCount);
    logDebugAndEmail("Processed count:" + capCount);

    /* UNCOMMENT THE APPROPRIATE LINES BELOW TO BUILD THE ADMIN EMAIL SECTION FOR "COUNTS" */
    logDebugAndEmail("Skipped " + capFilterType + " due to record type mismatch - filter on key4");
    logDebugAndEmail("Skipped " + capFilterParcelExists + " due to no parcels existing on the record")
    logDebugAndEmail("Skipped " + capFailedUpdateParcelAndFailedGetAddress + " due to failure to get address information. (addresses.length = 0)");
    logDebugAndEmail("Skipped " + capFailedUpdateParcelAndFailedAddParcel + " due to failure to add the parcel using the address information");
    logDebugAndEmail("Skipped " + capFailedUpdateParcelAndFailedGetRefAddress + " due to failure to get the address information to do a search for the parcel. (refAddressID = null)");

    logDebugAndEmail(""); // empty line
    logDebugAndEmail("-------------------------");
    logDebugAndEmail("End of Job: Elapsed Time : " + elapsed() + " Seconds");
    aa.sendMail("NoReply@MesaAz.gov", "vance.smith@mesaaz.gov", "vance.smith@mesaaz.gov", "Batch Script: GEN_ParcelSplitUpdates Completion Summary", emailText + emailBody); // TEMP ADDED emailBody, changed to email vfs onlyemailAdminTo, emailAdminCc,

    /***** END ADMIN NOTIFICATION *****/
}

function addParcelAndOwnerFromRefAddressWithEmailBody(refAddress, emailBody) // optional capID
{

	var itemCap = capId
		if (arguments.length > 2)
			itemCap = arguments[2]; // use cap ID specified in args

		// first add the primary parcel
		//
		var primaryParcelResult = aa.parcel.getPrimaryParcelByRefAddressID(refAddress, "Y");
	if (primaryParcelResult.getSuccess())
		var primaryParcel = primaryParcelResult.getOutput();
	else {
		logDebug("**ERROR: Failed to get primary parcel for ref Address " + refAddress + " , " + primaryParcelResult.getErrorMessage());
        emailBody = emailBody + "<br>**ERROR: Failed to get primary parcel for ref Address " + refAddress + " , " + primaryParcelResult.getErrorMessage();
		return false;
	}

	var capParModel = aa.parcel.warpCapIdParcelModel2CapParcelModel(itemCap, primaryParcel).getOutput()

		var createPMResult = aa.parcel.createCapParcel(capParModel);
	if (createPMResult.getSuccess())
		logDebug("created CAP Parcel");
	else {
		logDebug("**WARNING: Failed to create the cap Parcel " + createPMResult.getErrorMessage());
        emailBody = emailBody + "<br>**WARNING: Failed to create the cap Parcel " + createPMResult.getErrorMessage();
	}

	// Now the owners
	//

	var parcelListResult = aa.parcel.getParcelDailyByCapID(itemCap, null);
	if (parcelListResult.getSuccess())
		var parcelList = parcelListResult.getOutput();
	else {
		logDebug("**ERROR: Failed to get Parcel List " + parcelListResult.getErrorMessage());
        emailBody = emailBody + "<br>**ERROR: Failed to get Parcel List " + parcelListResult.getErrorMessage();
		return false;
	}

	for (var thisP in parcelList) {
		var ownerListResult = aa.owner.getOwnersByParcel(parcelList[thisP]);
		if (ownerListResult.getSuccess())
			var ownerList = ownerListResult.getOutput();
		else {
			logDebug("**ERROR: Failed to get Owner List " + ownerListResult.getErrorMessage());
            emailBody = emailBody + "<br>**ERROR: Failed to get Owner List " + ownerListResult.getErrorMessage();
			return false;
		}

		for (var thisO in ownerList) {
			ownerList[thisO].setCapID(itemCap);
			createOResult = aa.owner.createCapOwnerWithAPOAttribute(ownerList[thisO]);

			if (createOResult.getSuccess())
				logDebug("Created CAP Owner");
			else {
				logDebug("**WARNING: Failed to create CAP Owner " + createOResult.getErrorMessage());
                emailBody = emailBody + "<br>**WARNING: Failed to create CAP Owner " + createOResult.getErrorMessage();
			}
		}
	}
}

function updateRefParcelToCapReturnStatus(capId)
{
    var capPrclArr = aa.parcel.getParcelDailyByCapID(capId, null).getOutput();
    if (capPrclArr != null) 
    {
        for (x in capPrclArr) 
        {
            var prclObj = aa.parcel.getParceListForAdmin(capPrclArr[x].getParcelNumber(), null, null, null, null, null, null, null, null, null);
            if (prclObj.getSuccess()) 
            {
                var prclArr = prclObj.getOutput();
                if (prclArr.length) 
                {
                    var prcl = prclArr[0].getParcelModel();
                    var refParcelNumber = prcl.getParcelNumber();
                    var capPrclObj = aa.parcel.warpCapIdParcelModel2CapParcelModel(capId, prcl);

                    if (capPrclObj.getSuccess()) 
                    {
                        var capPrcl = capPrclObj.getOutput();
                        capPrcl.setL1ParcelNo(refParcelNumber);
                        aa.parcel.updateDailyParcelWithAPOAttribute(capPrcl);
                        logDebug("Updated Parcel " + capPrclArr[x].getParcelNumber() + " with Reference Data");
                        return "SUCCESS";
                    }
                    else 
                    {
                        logDebug("Failed to Wrap Parcel Model for " + capPrclArr[x].getParcelNumber());
                        return "FAILED_TO_WRAP_PARCEL_MODEL";
                    }
                }
                else 
                {
                    logDebug("No matching reference Parcels found for " + capPrclArr[x].getParcelNumber());
                    return "FAILED_NO_MATCHING_REF_PARCELS";
                }
            }
            else {
                logDebug("Failed to get reference Parcel for " + capPrclArr[x].getParcelNumber());
                return "FAILED_GET_REF_PARCEL";
            }
        }
    }
    else
    {
        return "FAILED_GET_PARCEL_DAILY";
    }
}

function getDaysInMonthByName(dayName) 
{
    var d = new Date(),
        month = d.getMonth(),
        dayNames = [];

    d.setDate(1);

    var dayOrdinal = 0;

    switch (dayName)
    {
        case "Sunday":
            dayOrdinal = 0;
            break;
        case "Monday":
            dayOrdinal = 1;
            break;
        case "Tuesday":
            dayOrdinal = 2;
            break;
        case "Wednesday":
            dayOrdinal = 3;
            break;
        case "Thursday":
            dayOrdinal = 4;
            break;
        case "Friday":
            dayOrdinal = 5;
            break;
        case "Saturday":
            dayOrdinal = 6;
            break;
    }

    // get the first one in the month
    while (d.getDay() !== dayOrdinal) {
        d.setDate(d.getDate() + 1);
    }

    // get all the other ones in the month
    while (d.getMonth() === month) {
        dayNames.push(new Date(d.getTime()));
        d.setDate(d.getDate() + 7);
    }

    return dayNames;
}

function getPrimaryOwnerName(capId) 
{
	var capOwnerResult = aa.owner.getOwnerByCapId(capId);
    var ownerName = "";
	if (capOwnerResult.getSuccess()) {
		var owner = capOwnerResult.getOutput();
		for (o in owner) {
			var thisOwner = owner[o];
			if (thisOwner.getPrimaryOwner() == "Y") {
				ownerName = thisOwner.getOwnerFullName();
				break;
			}
		}
	}
	return ownerName;
}

function getBatchScriptTimeOut(jobName) 
{
    var bjb = aa.proxyInvoker.newInstance("com.accela.v360.batchjob.BatchEngineBusiness").getOutput();
    var bj = bjb.getBatchJobByName(aa.getServiceProviderCode(), jobName);
    return bj.getTimeOut();
}

function getTodayAsString()
{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    } 

    if(mm<10) {
        mm='0'+mm
    } 

    return mm + '/' + dd + '/' + yyyy;
}

function getDocumentList(capId, currentUserID) 
{
    // Returns an array of documentmodels if any
    // returns an empty array if no documents

    var docListArray = new Array();

    docListResult = aa.document.getCapDocumentList(capId,currentUserID);

    if (docListResult.getSuccess()) {        
        docListArray = docListResult.getOutput();
    }
    return docListArray;
}

function getRecordBalanceDue(capId)
{
   var capDetailObjResult = aa.cap.getCapDetail(capId);
   if (capDetailObjResult.getSuccess())
   {
      capDetail = capDetailObjResult.getOutput();
      var balanceDue = capDetail.getBalance();
      return balanceDue;
   }
   else
   {
      return 0;
   }
}

function parseDate(str) 
{
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[0]-1, mdy[1]);
}

function daydiff(first, second) 
{
    return Math.round((second-first)/(1000*60*60*24));
}

function getMasterScriptText(vScriptName)
{
    var servProvCode = aa.getServiceProviderCode();
    if (arguments.length > 1) {
        servProvCode = arguments[1]; // use different serv prov code
    }
    vScriptName = vScriptName.toUpperCase();    
    var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();
    try 
    {
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
    if (arguments.length > 1) {
        servProvCode = arguments[1]; // use different serv prov code
    }
    vScriptName = vScriptName.toUpperCase();    
    var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();
    try 
    {
        var emseScript = emseBiz.getScriptByPK(servProvCode,vScriptName,"ADMIN");
        return emseScript.getScriptText() + ""; 
    } 
    catch(err)
    {
        return "";
    }
}

function exploreObject(objExplore) 
{
    aa.print("Class Name: " + objExplore.getClass());
    aa.print("Methods:");
    for (var x in objExplore) {
        if (typeof(objExplore[x]) == "function")
        aa.print("   " + x);
    }

    aa.print("");
    aa.print("Properties:");
    for (var y in objExplore) {
        if (typeof(objExplore[y]) != "function")
        aa.print("   " + y + " = " + objExplore[y]);
    }
}

/*------------------------------------------------------------------------------------------------------/
| <===========End Custom Functions================>
| 
/-----------------------------------------------------------------------------------------------------*/

// this is the "beginning"... the following code in the try/catch will configure and initialize needed 
// variables before calling the "mainProcess" function defined above... 
try 
{

    /*------------------------------------------------------------------------------------------------------/
    |
    | START: USER CONFIGURABLE PARAMETERS
    |
    /------------------------------------------------------------------------------------------------------*/
    var showMessage = false;				// Set to true to see results in popup window
    var disableTokens = false;	
    var showDebug = true;					// Set to true to see debug messages in email confirmation
    
    // this is the default value
    // if a timeout value is defined in the batch job then maxSeconds will be dynamically adjusted to that time - 1 minute
    // it is changed to 1 minute less because if this script is able to time itself out internally (gracefully)
    // then it can still send out the summary email to admins
    var maxSeconds = 59 * 60;

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
    var message = "";						// Message String
    var debug = "";							// Debug String
    var br = "<BR>";						// Break Tag
    var timeExpired = false;
    var emailText = "";

    var SCRIPT_VERSION = 3.0

    var useSA = false;
    var SA = null;
    var SAScript = null;
    var bzr = aa.bizDomain.getBizDomainByValue("MULTI_SERVICE_SETTINGS", "SUPER_AGENCY_FOR_EMSE"); 
    if (bzr.getSuccess() && bzr.getOutput().getAuditStatus() != "I") 
    { 
        useSA = true;   
        SA = bzr.getOutput().getDescription();
        bzr = aa.bizDomain.getBizDomainByValue("MULTI_SERVICE_SETTINGS", "SUPER_AGENCY_INCLUDE_SCRIPT"); 
        if (bzr.getSuccess()) 
        { 
            SAScript = bzr.getOutput().getDescription(); 
        }        
    }
        
    if (SA) 
    {
        eval(getMasterScriptText("INCLUDES_ACCELA_FUNCTIONS", SA));
        eval(getMasterScriptText(SAScript,SA));
    }
    else 
    {
        eval(getMasterScriptText("INCLUDES_ACCELA_FUNCTIONS"));
    }

    eval(getScriptText("INCLUDES_BATCH"));    
    eval(getMasterScriptText("INCLUDES_CUSTOM"));


    // NOTE: the logDebug function is defined in "INCLUDES_BATCH"
    // the following lines can be used to override this function

    //var overRideLogDebug = "function logDebug(dstr) { emailText += dstr + '<br>'; }";
    //var overRideLogDebug = "function logDebug(dstr) { aa.print(dstr);  emailText += dstr + '<br>'; }"; // use for debugging    
    //eval(overRideLogDebug);

    // NOTE: the elapsed() function is defined in "INCLUDES_BATCH"
    // the following function can be used to override the elapsed function.

    // this override causes the script to never time out
    // however, if a time out is defined in the batch job scheduler then the script will still time out
    //var overrideElapsed = "function elapsed() { return 0; }"; 
    //eval(overrideElapsed);

    function logDebug(dstr) 
    {
        if ( batchJobName == "" ) // batchJobName will be empty string when using the script tester
        {
            aa.print(dstr)
            aa.debug(aa.getServiceProviderCode() + " : " + aa.env.getValue("CurrentUserID"), dstr);
            aa.eventLog.createEventLog("DEBUG", "Batch Process", batchJobName, aa.date.getCurrentDate(), aa.date.getCurrentDate(), "", dstr, batchJobID);
        }        
    }
    function logEmail(dstr)
    {
        emailText += dstr + "<br>";
    }

    function logDebugAndEmail(dstr)
    {
        logDebug(dstr);
        logEmail(dstr);
    }

    function getParam(pParamName) // overridden from INCLUDES_BATCH
    {
        var ret = "" + aa.env.getValue(pParamName);
        logDebugAndEmail("Parameter : " + pParamName + " = " + ret);
        return ret;
    }

    /*------------------------------------------------------------------------------------------------------/
    |
    | END: USER CONFIGURABLE PARAMETERS
    |
    /------------------------------------------------------------------------------------------------------*/

    var sysDate = aa.date.getCurrentDate();
    var batchJobID = aa.batchJob.getJobID().getOutput();
    var batchJobName = "" + aa.env.getValue("batchJobName");

    /*--- attempt to dynamically set the maxSeconds variable from what is configured as the timeout of the batch job --- */
    if ( batchJobName == "" ) // batchJobName will be empty string when using the script tester
    {
        maxSeconds = 4 * 60;
        logDebug("!!! TESTING IN SCRIPT TESTER !!! " + maxSeconds + " seconds");
        logDebug("-------------------------");
        logDebug("");// empty line
    }
    else
    {
        var bjTimeOut = 0;
        try 
        { 
            bjTimeOut = parseInt(getBatchScriptTimeOut(batchJobName));
            logDebugAndEmail("Batch Job Time Out: " + bjTimeOut + " seconds");
        }
        catch (err)
        {
            logDebugAndEmail("bjTimeOut error: " + err.message);
            bjTimeOut = 0;
        }
        if ( bjTimeOut != 0 && typeof bjTimeOut == "number" && bjTimeOut > 60 )
        {
            // remove 1 minute from the number so that script will time itself out gracefully before Batch Job does
            var newMaxSeconds = bjTimeOut - 60;
            if ( newMaxSeconds >= 240 ) // lets not shrink maxseconds to less than the default value
            {
                maxSeconds = newMaxSeconds;
            }
        }
        logDebugAndEmail("Batch Script Internal Time Out: " + maxSeconds + " seconds");
        logDebugAndEmail("");// empty line
    }

    /*----------------------------------------------------------------------------------------------------/
    |
    | Start: BATCH PARAMETERS
    |
    /------------------------------------------------------------------------------------------------------*/    
    
    // TODO: have all of these passed in as variables to this batch script
    if ( batchJobName == "" ) // batchJobName will be empty string when using the script tester
    {
        // set testing values
        //aa.env.setValue("appGroup", "Permits"); 
        //aa.env.setValue("appTypeType","Commercial"); 
        //aa.env.setValue("appSubType","Annual Facilities"); 
        //aa.env.setValue("appCategory","*"); 
        //aa.env.setValue("taskName", "Application Submittal");
        //aa.env.setValue("numDaysOut", "30");
        //aa.env.setValue("emailTemplate", "PMT_AnnualFacilitiesIdleApplication15Day");
        aa.env.setValue("emailAdminTo", "lauren.lupica@mesaaz.gov")
        aa.env.setValue("emailAdminCc", "vance.smith@mesaaz.gov")
    }    
    
    // this is the start of the body of the summary email
    logDebugAndEmail("Parameters");
    logDebugAndEmail("-------------------------");
    logDebugAndEmail("");// empty line

    // NOTE: calling getParam() will add the param name and value to the summary email
    //var appGroup = getParam("appGroup"); // app Group to process
    //var appTypeType = getParam("appTypeType"); // app type to process
    //var appSubType = getParam("appSubType"); // app subtype to process
    //var appCategory = getParam("appCategory"); // app category to process
    //var taskName = getParam("taskName"); // the taskname to filter by from the workflow
    //var numDaysOut = getParam("numDaysOut"); // the number of days out to check since file date
    //var emailTemplate = getParam("emailTemplate"); // the email template to use for notifications
    var emailAdminTo = getParam("emailAdminTo"); // who to send the admin summary email to
    var emailAdminCc = getParam("emailAdminCc"); // who to cc on the admin summary email

    /*----------------------------------------------------------------------------------------------------/
    |
    | End: BATCH PARAMETERS
    |-----------------------------------------------------------------------------------------------------*/


    /*if (appGroup == "")
    {
        appGroup = "*";
    }
    if (appTypeType == "")
    {
        appTypeType = "*";
    }
    if (appSubType == "")
    {
        appSubType = "*";
    }
    if (appCategory == "")
    {
        appCategory = "*";
    }
    var appType = appGroup + "/" + appTypeType + "/" + appSubType + "/" + appCategory;
    */
    /*------------------------------------------------------------------------------------------------------/
    | <===========Main=Loop================>
    | 
    /-----------------------------------------------------------------------------------------------------*/

    logDebugAndEmail("");// empty line
    logDebugAndEmail("Logs Generated By This Session");
    logDebugAndEmail("-------------------------");
    logDebugAndEmail("");// empty line

    logDebugAndEmail("Start of Job: " + startTime);

    if (!timeExpired) 
    {
        mainProcess();
    }

    aa.eventLog.createEventLog("DEBUG", "Batch Process", batchJobName, aa.date.getCurrentDate(), aa.date.getCurrentDate(),"", emailText, batchJobID);

    /*------------------------------------------------------------------------------------------------------/
    | <===========End Main=Loop================>
    | 
    /-----------------------------------------------------------------------------------------------------*/
}
catch (err) 
{
    logDebugAndEmail("A JavaScript Error occurred: " + err.message);
}