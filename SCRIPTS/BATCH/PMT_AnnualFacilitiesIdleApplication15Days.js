/*===================================================================
// Script Number: 122
// Script Name: PMT_AnnualFacilitiesIdleApplication15Days.js

// Script Description: 
// If permit has been submitted, and fees have not been paid or documents 
// are incomplete after 15 days, email the Applicant to complete or 
// withdraw their application via ACA. City will void the application 
// if not complete within 30 days of submittal. (Voiding done in script 123)

// Template : PMT_AnnualFacilitiesIdleApplication15Day
  
// All permits in the following: Permits/Commercial/Annual Facilities/NA

// Script Run Event: BATCH
// Script Parents: n/a
//
// Version   |Date      |Engineer         |Details
//  1.0      |08/18/16  |Vance Smith      |Initial
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
    var capFilterStatus = 0;
    var capFilterFeesOrDocs = 0;
    //var capFilterFileDate = 0;
    var capFilterDaysIdle = 0;
    var applicantEmailNotFound = 0;
    var queryResultsCount = 0; // note: sometimes we need to do more than one query...

    /***** END INITIALIZE COUNTERS *****/


    /***** BEGIN LOOP DATA *****/

    
    //var capResult = aa.cap.getCaps(appTypeType, taskName, "Note", ""); // Permits - filter down to "Annual Facilities" below
    var capResult = aa.cap.getByAppType(appGroup, appTypeType, appSubType, null);    

    if (capResult.getSuccess())
    {
        myCaps = capResult.getOutput();
        queryResultsCount += myCaps.length;
        logDebugAndEmail("Permits count: " + myCaps.length);
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
            logDebugAndEmail("WARNING - SCRIPT TIMEOUT REACHED","A script timeout has caused partial completion of this process.  Please re-run.  " + elapsed() + " seconds elapsed, " + maxSeconds + " allowed.");
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

        /* EXAMPLE OF FILTERING BY CAP TYPE (KEY4) */
        // move to the next record unless we have a match on the key4 we want
        // the key4 we want is passed in to this batch script
        if (appType.length && !appMatch(appType))
        {
            capFilterType++;
            //logDebug(altId + ": Application Type does not match.");
            //logDebug("--------------moving to next record--------------");
            continue; // move to the next record
        }

        /* EXAMPLE OF FILTERING BY FILE DATE 
        // move to the next record if the file date is not "numDaysOut" days out
        var fileDateObj = cap.getFileDate();
        var fileDate =  fileDateObj.getMonth() + "/" + fileDateObj.getDayOfMonth() + "/" + fileDateObj.getYear();
        var daysSinceSubmittal = daydiff(parseDate(fileDate), parseDate(getTodayAsString())); 
        if (daysSinceSubmittal != numDaysOut) 
        {
            capFilterFileDate++;
            logDebug(altId + ": File Date is not " + numDaysOut + " days out. Days Since Submittal: " + daysSinceSubmittal );
            continue; // move to the next record
        }*/

        /* EXAMPLE OF FILTERING BY AUDIT DATE */
        // move to the next record if the audit date is not "numDaysOut" days out
        var auditDate = getLastRecordDateInWorkflowHistory(capId);
        var daysIdle = daydiff(auditDate, parseDate(getTodayAsString()));
        if (daysIdle != numDaysOut )
        {
            capFilterDaysIdle++;
            logDebug(altId + ": Audit Date is not " + numDaysOut + " days out. Days idle: " + daysIdle );
            continue; // move to the next record
        }

        /* EXAMPLE OF FILTERING BY FEES PAID AND REQUIRED DOCUMENTS */
        // move to the next record if this cap has paid all of its fees
        var missingDocs = new Array();
        var feesOrDocsNeeded = false;
        var balanceDue = getUnpaidFeeBalance(capId); // getRecordBalanceDue(capId); 
        if (balanceDue > 0) 
        {
            feesOrDocsNeeded = true;
        }
        else
        {
            // see if there are any missing documents
            var reqDocsArray = new Array();
            reqDocsArray.push("Engineer Letter"); // setup for future in case there is more than one 
            var docList = new Array();
            docList = getDocumentList(capId,currentUserID);
            var findDoc;
            for (rD in reqDocsArray)
            {
                findDoc = reqDocsArray[rD];
                isMatch = false;

                for (dl in docList)
                {    
                    var thisDoc = docList[dl];
                    var docCategory = thisDoc.getDocCategory();

                    if (findDoc.equals(docCategory))
                    {
                        isMatch = true;
                    }
                }

                if (!(isMatch))
                {
                    missingDocs.push(findDoc);
                }
            }
            if ( missingDocs.length > 0 )
            {
                feesOrDocsNeeded = true;
            }
        }
        if (!feesOrDocsNeeded ) 
        {
            capFilterFeesOrDocs++;
            logDebug(altId + ": no fees or docs needed.");
            logDebug("--------------moving to next record--------------");
            continue; // move to the next record
        }

        /***** END FILTERS *****/


        /***** BEGIN CUSTOM PROCESSING *****/

        capCount++; 
        logDebug("Processing " + altId);
        
         /* EMAIL EXAMPLE */
        // get applicant email
        var contactArray = getContactArray(capId), emailAddress = null;
        for (contact in contactArray)
        {
            if (contactArray[contact]["contactType"] == "Applicant")
            {
                emailAddress = contactArray[contact]["email"];
            }
        }
        
        // if emailAddress is not null then send the notification
        if (emailAddress != null)
        {
            var vEParams = aa.util.newHashtable();

            addParameter(vEParams, "$$RECORD ID$$", altId);
            addParameter(vEParams, "$$URL$$", lookup("Agency_URL","ACA"));
            
            var mDocsString = "";
            if ( missingDocs.length > 0)
            {
                mDocsString = "Missing Documents:<br/><ul>";
                for (mD in missingDoc)
                {
                    mDocsString = mDocsString + "<li>" + missingDoc[mD] + "</li>";
                }
                mDocsString = mDocsString + "</ul>";
            }
            addParameter(vEParams, "$$MISSING DOCUMENTS$$", mDocString);

            logDebug("Sending notification to " + emailAddress);
            sendNotificationAndSaveInRecord("NoReply@MesaAz.gov", emailAddress, "", emailTemplate, vEParams, null, capId);
            // method signature: sendNotification(emailFrom, emailTo, emailCC, templateName, params, reportFile)
        } 
        else 
        {
            applicantEmailNotFound++;
            logDebug(altId + ": Applicant email address not found");
        }

        /***** END CUSTOM PROCESSING *****/
    }

    /***** END LOOP DATA *****/


    /***** BEGIN ADMIN NOTIFICATION *****/

    logDebugAndEmail("");// empty line
    logDebugAndEmail("Results of this Session");
    logDebugAndEmail("-------------------------");
    logDebugAndEmail("");// empty line
    logDebugAndEmail("Query count: " + queryResultsCount);
    logDebugAndEmail("Processed count:" + capCount);	
    logDebugAndEmail("Skipped " + capFilterType + " due to record type mismatch - filter on key4");
    logDebugAndEmail("Skipped " + capFilterStatus + " due to record status mismatch");	
    logDebugAndEmail("Skipped " + capFilterFeesOrDocs + " due to no fees or required docs needed")
    logDebugAndEmail("Skipped " + capFilterDaysIdle + " due to audit date not being " + numDaysOut + " days out");
    logDebugAndEmail("Unable to notify " + applicantEmailNotFound + " due to missing applicant email");
    logDebugAndEmail(""); // empty line
    logDebugAndEmail("-------------------------");
    logDebugAndEmail("End of Job: Elapsed Time : " + elapsed() + " Seconds");
    aa.sendMail("NoReply@MesaAz.gov", emailAdminTo, emailAdminCc, "Batch Script: PMT_AnnualFacilitiesIdleApplication15Days Completion Summary", emailText);

    /***** END ADMIN NOTIFICATION *****/
}

function getBatchScriptTimeOut(jobName) 
{
    //var jobName = "Licenses About to Expire";
    var bjb = aa.proxyInvoker.newInstance("com.accela.v360.batchjob.BatchEngineBusiness").getOutput();
    var bj = bjb.getBatchJobByName(aa.getServiceProviderCode(), jobName);
    return bj.getTimeOut();
}

function daydiff(first, second) 
{
    return Math.round((second-first)/(1000*60*60*24));
}

function getTodayAsString(){
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

function getDocumentList(capId, currentUserID) {
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


/*function parseDate(str) {
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[0]-1, mdy[1]);
}*/

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

function exploreObject(objExplore) {
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
        aa.env.setValue("appGroup", "Permits"); 
        aa.env.setValue("appTypeType","Commercial"); 
        aa.env.setValue("appSubType","Annual Facilities"); 
        aa.env.setValue("appCategory","*"); 
        //aa.env.setValue("taskName", "Application Submittal");
        aa.env.setValue("numDaysOut", "15");
        aa.env.setValue("emailTemplate", "PMT_AnnualFacilitiesIdleApplication15Day");
        aa.env.setValue("emailAdminTo", "lauren.lupica@mesaaz.gov")
        aa.env.setValue("emailAdminCc", "vance.smith@mesaaz.gov")
    }    
    
    // this is the start of the body of the summary email
    logDebugAndEmail("Parameters");
    logDebugAndEmail("-------------------------");
    logDebugAndEmail("");// empty line

    // NOTE: calling getParam() will add the param name and value to the summary email
    var appGroup = getParam("appGroup"); // app Group to process
    var appTypeType = getParam("appTypeType"); // app type to process
    var appSubType = getParam("appSubType"); // app subtype to process
    var appCategory = getParam("appCategory"); // app category to process
    //var taskName = getParam("taskName"); // the taskname to filter by from the workflow
    var numDaysOut = getParam("numDaysOut"); // the number of days out to check since file date
    var emailTemplate = getParam("emailTemplate"); // the email template to use for notifications
    var emailAdminTo = getParam("emailAdminTo"); // who to send the admin summary email to
    var emailAdminCc = getParam("emailAdminCc"); // who to cc on the admin summary email

    /*----------------------------------------------------------------------------------------------------/
    |
    | End: BATCH PARAMETERS
    |-----------------------------------------------------------------------------------------------------*/


    if (appGroup == "")
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


    /*------------------------------------------------------------------------------------------------------/
    | <===========Internal Functions and Classes (Used by this script)
    /------------------------------------------------------------------------------------------------------*/
}
catch (err) 
{
    logDebugAndEmail("A JavaScript Error occurred: " + err.message);
}