/*===================================================================
// Script Number: 262
// Script Name: PLN_RegistrationProcessExpiration

// Script Description: Batch script to check ASI Registration 
// Expiration Date, and set record status to "Expired" if today's 
// date is more than 365 days past ASI Registration Expiration Date.

// Planning/Group Home/Registration/NA

// Email Template: none

// Script Run Event: BATCH
// Script Parents: n/a
//
// Version   |Date      |Engineer         |Details
//  1.0      |08/24/16  |Vance Smith      |Initial
/*==================================================================*/


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
    var capFilterExpirationNull = 0; 
    var capFilterExpirationGet = 0; 
    var capFilterNotExpiredYet = 0;
    var capFilterDaysPastExp = 0;
    var queryResultsCount = 0; // note: sometimes we need to do more than one query...

    /***** END INITIALIZE COUNTERS *****/


    /***** BEGIN LOOP DATA *****/

    var capResult = aa.cap.getByAppType(appGroup, appTypeType, appSubType, null);    

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

        /* FILTERING BY CAP TYPE (KEY4) */
        // move to the next record unless we have a match on the key4 we want
        // the key4 we want is passed in to this batch script
        if (appType.length && !appMatch(appType))
        {
            capFilterType++;
            logDebug(altId + ": Application Type does not match.");
            logDebug("--------------moving to next record--------------");
            continue; // move to the next record
        }

        /* FILTERING BY CAP STATUS */
        // move to the next record unless we have a match on the capStatus we want
        if (capStatus == "Expired" ) 
        {
            capFilterStatus++;
            logDebug(altId + ": Application is already marked as expired.");
            logDebug("--------------moving to next record--------------");
            continue; // move to the next record
        }

        /* FILTERING BY EXPIRATION DATE - NULL EXPIRATION
         * THIS INCLUDES TRY/CATCH FOR NULL EXPIRATIONS -- WHICH IS NEEDED DUE TO INTERNAL BUG WHEN YOU ENCOUNTER A NULL EXPIRATION */
        // move to the next record if the expiration date is null
        var expirationDate = getAppSpecific("Registration Expiration Date");//null;
        try 
        {
            //var thisLic = new licenseObject(capId);            
            //expirationDate = thisLic.b1ExpDate;
            if (expirationDate == null)
            {
                capFilterExpirationNull++;
                logDebug(altId + ": Expiration Date is null." );
                logDebug("--------------moving to next record--------------");
                continue; // move to the next record
            }
            else {
                logDebug("Registration Expiration Date: " + expirationDate );
            }
        }
        catch (err)
        {
            capFilterExpirationGet++;
            //logDebug("JavaScript Error getting expiration date: " + err.message); // too many to log!!
            //logDebug("--------------moving to next record--------------");
            continue; // move to the next record
        }

        /* FILTERING BY DAYS PAST EXPIRATION - USE WITH THE NULL EXP CHECK */
        // move to the next record if days since expiration < 365 ("< 365" this is handled by another script)
        // or if days since expiration <= 0
        var daysSinceExpiration = daydiff(parseDate(expirationDate), parseDate(getTodayAsString())); 
        if (daysSinceExpiration < 365 ) 
        {
            capFilterDaysPastExp++;
            logDebug(altId + ": Record expired < 365 days ago. Days Since Expiration: " + daysSinceExpiration );
            logDebug("--------------moving to next record--------------");
            continue; // move to the next record
        }

        /***** END FILTERS *****/


        /***** BEGIN CUSTOM PROCESSING *****/

        capCount++; 
        logDebug("Processing " + altId);

        /* TASKS, WORKFLOW, AND UPDATE STATUS */
        // expire the active tasks, close the workflow, and then set the record status to expired
        var tasks = aa.workflow.getTasks(capId).getOutput();
        for (t in tasks) {
            tName = tasks[t].getTaskDescription();
            tActive = tasks[t].getActiveFlag(); // we will only want to work with the active items, this should do it.
            /*if (tActive == 'Y') {
                updateTask(tName, "Expired", "set by batch", "");
                setTask(tName, 'N', 'Y');
            }*/
            closeWorkflow(); // this is in INCLUDES_CUSTOM
        }	
        updateAppStatus("Expired", "set by batch");

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
    logDebugAndEmail("Skipped " + capFilterExpirationNull + " due to expiration date being null");
    logDebugAndEmail("Skipped " + capFilterExpirationGet + " due to error getting expiration date (object null)");
    logDebugAndEmail("Skipped " + capFilterNotExpiredYet + " due to record not expiring yet");
    logDebugAndEmail("Skipped " + capFilterDaysPastExp + " due to record expiring < 365 days ago");

    logDebugAndEmail(""); // empty line
    logDebugAndEmail("-------------------------");
    logDebugAndEmail("End of Job: Elapsed Time : " + elapsed() + " Seconds");
    aa.sendMail("NoReply@MesaAz.gov", emailAdminTo, emailAdminCc, "Batch Script: PLN_RegistrationProcessExpiration Completion Summary", emailText);

    /***** END ADMIN NOTIFICATION *****/
}

function getBatchScriptTimeOut(jobName) 
{
    var bjb = aa.proxyInvoker.newInstance("com.accela.v360.batchjob.BatchEngineBusiness").getOutput();
    var bj = bjb.getBatchJobByName(aa.getServiceProviderCode(), jobName);
    return bj.getTimeOut();
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

function parseDate(str) {
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[0]-1, mdy[1]);
}

function daydiff(first, second) {
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
        aa.env.setValue("appGroup", "Planning"); 
        aa.env.setValue("appTypeType","Group Home"); 
        aa.env.setValue("appSubType","Registration"); 
        aa.env.setValue("appCategory","*");
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