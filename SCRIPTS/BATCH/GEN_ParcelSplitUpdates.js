/*===================================================================
// Script Number: 338
// Script Name: GEN_ParcelSplitUpdates.js
// Script Description: 
// Run when County update comes in (need to check with GIS on frequency/timing of this):
//  1. Check all AA records:  verify if parcel number exists in parcel table.
//  2. If not, then get the new parcel # based on the address
//  3. If address match can't be found, email Permit Supervisor 

// Script Run Event: Batch - Run when County update comes in. 
// Script Parents: n/a
// Email Template: 
// Version   |Date      |Engineer         |Details
//  1.0      |08/28/16  |Vance Smith      |Initial Release
//  1.1      |12/05/16  |Vance Smith      |Revised to accumulate into 1 email (temp)
//  1.2      |04/04/17  |Michael VanWie   |Revised to use SQL to get stating 'Pool' of records
                                          |Added parcel search by address
/*==================================================================*/
/* intellisense references */
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/// <reference path="../../INCLUDES_BATCH.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

/*------------------------------------------------------------------------------------------------------/
| <===========Custom Functions================>
/-----------------------------------------------------------------------------------------------------*/
function mainProcess() 
{
    logDebug('Starting...');
    /***** BEGIN INITIALIZE COUNTERS *****/
    /* UNCOMMENT NEEDED COUNTER VARIABLES THESE ARE INCREMENTED BY THE FILTERS 
     * AND THEN USED TO GENERATE THE ADMIN SUMMARY EMAIL */
    var capProcessedCount = 0;
    var capFailedOnGetAddress = 0;
    var parcelSearchErrored = 0;
    var capFailedUpdateParcelAndFailedGetAddress = 0;
    var addressProcessedCount = 0;
    //var capFailedUpdateParcelAndFailedAddParcel = 0;
    //var capFailedUpdateParcelAndFailedGetRefAddress = 0;
    var capUpdateSuccess = 0;
    //var queryResultsCount = 0;
    //var myCaps = null;
    var emailBody = "<ol>";

    /***** END INITIALIZE COUNTERS *****/

    /***** BEGIN LOOP DATA *****/
    var capsToCheck = getRecordsToCheck();

    for(strCapID in capsToCheck)
    {
        var altId = capsToCheck[strCapID];  //Store Alt ID
        if(stopCheck()) break;              //Exit loop if time has elapsed
        capProcessedCount++;                //Update Process Count

        /***** BEGIN GET NEEDED CAP DATA *****/
        var capResult = aa.cap.getCapID(altId);

        if(!capResult.getSuccess())
        {
            logDebugAndEmail("Failed getting altID: " + altId + " Error: " + capResult.getErrorMessage());
            continue; // move to the next record
        }

        capId = capResult.output;
        cap = aa.cap.getCap(capId).output;
        
        if(cap == null)
        {
            logDebugAndEmail("Failed getting altID: " + altId + " Error: " + capResult.getErrorMessage());
            continue; // move to the next record
        }
        /***** END GET NEEDED CAP DATA *****/

        /***** BEGIN CUSTOM PROCESSING *****/
        var updateStatus = updateRefParcelToCapReturnStatus(capId); 

        if(updateStatus != "SUCCESS")
        {
            //Get address to search by
            var capAddressResult = aa.address.getAddressByCapId(capId);
            if(capAddressResult.getSuccess())
            {
                var capAddress = capAddressResult.getOutput();
                if(capAddress.length == 0)
                {
                    capFailedOnGetAddress++;
                    // if no addresses returned then notify permit supervisor                    
                    var etext = altId + " - No address found on record. " + updateStatus + ", addresses.length = 0";
                    logDebug(altId + " - No address found on record. " + updateStatus + ", addresses.length = 0");
                    // TEMP REMOVED aa.sendMail("NoReply@MesaAz.gov", lookup("EMAIL_RECIPIENTS", "Permits_Supervisor"), "", "Accela Parcel Update Failed: " + altId, etext);
                    emailBody = emailBody + "<li>" + etext + "</li>"; // TEMP ADDED
                    continue;
                }

                for(i in capAddress)
                {
                    addressProcessedCount++;

                    var refAddressId = capAddress[i].getRefAddressId();
                    var addParcelResult;

                    if(refAddressId != null)
                    {
                        addParcelResult = addParcelAndOwnerFromRefAddressWithEmailBody(refAddressId, emailBody);
                    }

                    if(!addParcelResult)
                    {
                        var hseNum = capAddress[i].getHouseNumberStart();
                        var streetDir = capAddress[i].getStreetDirection();
                        var streetName = capAddress[i].getStreetName();
                        var streetSuffix = capAddress[i].getStreetSuffix();
                        var city = capAddress[i].getCity();
                        var state = capAddress[i].getState();
                        var zip = capAddress[i].getZip();

                        var foundParcels = aa.parcel.getParceListForAdmin(null, hseNum, null, streetDir, streetName, streetSuffix, null, null, city, null, null, null, null, null, null);
                        var addr = hseNum + ' ' + streetDir + ' ' + streetName;

                        if(foundParcels.getSuccess())
                        {
                            var parcels = foundParcels.getOutput();
                            if(parcels.length > 0)
                            {
                                var parcel = parcels[0];
                                var addparcel = aa.parcel.getCapParcelModel().getOutput();

                                addparcel.setCapIDModel(capId);
                                addparcel.setL1ParcelNo(parcel.parcelModel.getParcelNumber());
                                addparcel.setParcelNo(parcel.parcelModel.getParcelNumber());

                                var addParcelResult = aa.parcel.createCapParcel(addparcel);
                                
                                if(!addParcelResult.getSuccess())
                                {
                                    if(addParcelResult.getErrorMessage())
                                    {
                                        //nothing work - notify permit supervisor
                                        capFailedUpdateParcelAndFailedGetAddress++;
                                        logDebugAndEmail(altId + " Parcel: " + parcel.parcelModel.getParcelNumber() + " Error: " + addParcelResult.getErrorMessage());
                                    }
                                }
                                else
                                {
                                    //Add parcel by Record Address was successful
                                    logDebugAndEmail(altId + " Parcel: " + parcel.parcelModel.getParcelNumber() +' - Added via : Address Search - ' + addr);
                                    capUpdateSuccess++;
                                    continue;
                                }
                            }
                            else
                            {
                                //Parcel search return 0 results
                                capFailedUpdateParcelAndFailedGetAddress++;
                                logDebugAndEmail(altId + ' - No parcel found for ' + capAddress[i].displayAddress);
                            }
                        }
                        else
                        {
                            //Parcel Search Via getParcelListForAdmin() errored out
                            logDebugAndEmail(altId + ' - getParcelListForAdmin() errored : ' + foundParcels.getErrorMessage());
                            parcelSearchErrored++;
                        }
                    }
                    else
                    {
                        //addParcelAndOwnerFromRefAddressWithEmailBody was successful
                        logDebugAndEmail(altId + " Parcel: " + parcel.parcelModel.getParcelNumber() + ' - Added via : addParcelAndOwnerFromRefAddress()');
                        capUpdateSuccess++;
                        continue;
                    }
                }
            }
            else
            {
                logDebugAndEmail(altId + " - getAddressByCapId: " + capAddressResult.getErrorMessage());
                capFailedOnGetAddress++
                continue;
            }
        }
        else
        {
            //updateRefParcelToCapReturnStatus was successful
            logDebugAndEmail(altId + " Parcel: " + parcel.parcelModel.getParcelNumber() + ' - Added via : updateRefParcelToCapReturnStatus');
            capUpdateSuccess++;
        }
        /***** END CUSTOM PROCESSING *****/
    }
    /***** END LOOP DATA *****/

    /***** BEGIN ADMIN NOTIFICATION *****/
    logDebugAndEmail("");
    logDebugAndEmail("Results of this Session");
    logDebugAndEmail("-------------------------");
    logDebugAndEmail("");
    logDebugAndEmail("Query count: " + capsToCheck.length);
    logDebugAndEmail("Processed count:" + capProcessedCount);

    /* UNCOMMENT THE APPROPRIATE LINES BELOW TO BUILD THE ADMIN EMAIL SECTION FOR "COUNTS" */ 
    logDebugAndEmail( "Successfully updated " + capUpdateSuccess + " Parcel(s) from " + addressProcessedCount + " addresses on " + capProcessedCount + " record(s).")
    logDebugAndEmail("Skipped " + capFailedOnGetAddress + " due to getCapAddress() causing an error.");
    logDebugAndEmail("Skipped " + capFailedUpdateParcelAndFailedGetAddress + " due to records not having an address.");
    logDebugAndEmail("Parcel Search Errored: " +  parcelSearchErrored)
    logDebugAndEmail("");
    logDebugAndEmail("-------------------------");
    logDebugAndEmail("End of Job: Elapsed Time : " + elapsed() + " Seconds");
    //aa.sendMail("NoReply@MesaAz.gov", "vance.smith@mesaaz.gov", "vance.smith@mesaaz.gov", "Batch Script: GEN_ParcelSplitUpdates Completion Summary", emailText + emailBody); // TEMP ADDED emailBody, changed to email vfs onlyemailAdminTo, emailAdminCc,
    aa.sendMail("michael.vanwie@mesaaz.gov", "", "", "Batch Script: GEN_ParcelSplitUpdates Completion Summary", emailText + emailBody);

    /***** END ADMIN NOTIFICATION *****/
}

function getRecordsToCheck()
{
    var returnArray = new Array();
    //Get list of Alt_IDs of records that have a parcel without a ref-parcel
    var iniContext = aa.proxyInvoker.newInstance('javax.naming.InitialContext', null).getOutput();
    var ds = iniContext.lookup('java:/AA');
    var conn = ds.getConnection();

    var ss = "WITH INIT AS ( \
                SELECT  \
                    A.B1_ALT_ID, \
                    COUNT(C.L1_PARCEL_NBR) AS PAR_CNT,\
                    COUNT(D.B1_ADDRESS_NBR) AS ADD_CNT\
                FROM B1PERMIT A \
                JOIN B3PARCEL B \
                    ON A.SERV_PROV_CODE = B.SERV_PROV_CODE \
                    AND A.B1_PER_ID1 = B.B1_PER_ID1 \
                    AND A.B1_PER_ID2 = B.B1_PER_ID2 \
                    AND A.B1_PER_ID3 = B.B1_PER_ID3 \
                    AND B.REC_STATUS = 'A' \
                LEFT JOIN L3PARCEL C \
                    ON  B.B1_PARCEL_NBR = C.L1_PARCEL_NBR \
                    AND C.REC_STATUS = 'A' \
                LEFT JOIN B3ADDRES D\
                    ON  A.SERV_PROV_CODE = D.SERV_PROV_CODE\
                    AND A.B1_PER_ID1 = D.B1_PER_ID1 \
                    AND A.B1_PER_ID2 = D.B1_PER_ID2 \
                    AND A.B1_PER_ID3 = D.B1_PER_ID3\
                WHERE \
                    A.SERV_PROV_CODE = 'MESA' \
                    AND A.B1_PER_GROUP IN ('Permits', 'Licenses', 'Planning', 'Transportation', 'Enforcement', 'AnimalControl', 'Engineering') \
                    AND A.B1_ALT_ID NOT LIKE '%TMP-%' \
                    AND A.REC_STATUS = 'A' \
                    AND SUBSTR(B.B1_PARCEL_NBR, 1, 1) IN ('0','1','2','3','4','5','6','7','8','9') \
                GROUP BY A.B1_ALT_ID) \
                SELECT B1_ALT_ID FROM INIT WHERE PAR_CNT = 0 AND ADD_CNT > 0";
    
    var sstmt = conn.prepareStatement(ss);

    //Add alt_ids to array
    var rSet = sstmt.executeQuery();
    while(rSet.next())
        { returnArray.push(rSet.getString('B1_ALT_ID')); };

    return returnArray;
}

function addParcelAndOwnerFromRefAddressWithEmailBody(refAddress, emailBody) // optional capID
{

	var itemCap = capId
    if (arguments.length > 2)
        itemCap = arguments[2]; // use cap ID specified in args

	// first add the primary parcel
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
                        return "SUCCESS";
                    }
                    else 
                    {
                        return "FAILED_TO_WRAP_PARCEL_MODEL";
                    }
                }
                else 
                {
                    return "FAILED_NO_MATCHING_REF_PARCELS";
                }
            }
            else {
                return "FAILED_GET_REF_PARCEL";
            }
        }
    }
    else
    {
        return "FAILED_GET_PARCEL_DAILY";
    }
}

function stopCheck()
{
    if(elapsed() > maxSeconds)
    { 
        logDebugAndEmail("WARNING - SCRIPT TIMEOUT REACHED : " + elapsed() + " seconds / "  + maxSeconds + " allowed.", "A script timeout has caused partial completion of this process. Please re-run. " + elapsed() + " seconds elapsed, " + maxSeconds + " allowed.");
        timeExpired = true;
        return true;
    }
    return false;
}

function getBatchScriptTimeOut(jobName) 
{
    var bjb = aa.proxyInvoker.newInstance("com.accela.v360.batchjob.BatchEngineBusiness").getOutput();
    var bj = bjb.getBatchJobByName(aa.getServiceProviderCode(), jobName);
    return bj.getTimeOut();
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

/*------------------------------------------------------------------------------------------------------/
| <===========End Custom Functions================>
/-----------------------------------------------------------------------------------------------------*/
try 
{

    /*------------------------------------------------------------------------------------------------------/
    | START: USER CONFIGURABLE PARAMETERS
    /------------------------------------------------------------------------------------------------------*/
    var showMessage = false;		    // Set to true to see results in popup window
    var disableTokens = false;	
    var showDebug = true;			// Set to true to see debug messages in email confirmation
    
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
    var emailTemplate = aa.env.getValue("emailTemplate");

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


    // NOTE: the logDebug function is defined in "INCLUDES_BATCH" the following lines can be used to override this function
    //      var overRideLogDebug = "function logDebug(dstr) { emailText += dstr + '<br>'; }";
    //      var overRideLogDebug = "function logDebug(dstr) { aa.print(dstr);  emailText += dstr + '<br>'; }"; // use for debugging    
    //      eval(overRideLogDebug);

    // NOTE: the elapsed() function is defined in "INCLUDES_BATCH" the following function can be used to override the elapsed function.
    // this override causes the script to never time out however, if a time out is defined in the batch job scheduler then the script will still time out
    //      var overrideElapsed = "function elapsed() { return 0; }"; 
    //      eval(overrideElapsed);

    var logDebugOverride = 'function logDebug(dstr) { \
        if ( batchJobName == "" ) { \
            aa.print(dstr); \
            aa.debug(aa.getServiceProviderCode() + " : " + aa.env.getValue("CurrentUserID"), dstr); \
            aa.eventLog.createEventLog("DEBUG", "Batch Process", batchJobName, aa.date.getCurrentDate(), aa.date.getCurrentDate(), "", dstr, batchJobID); } } '
    var logEmailOverride = 'function logEmail(dstr) { emailText += dstr + "<br>"; } '
    var logDebugAndEmailOverride = 'function logDebugAndEmail(dstr) { logDebug(dstr); logEmail(dstr); }'
    var getParamOverride = 'function getParam(pParamName) { \
        var ret = "" + aa.env.getValue(pParamName); \
        logDebugAndEmail("Parameter : " + pParamName + " = " + ret); \
        return ret;} '
    
    eval(logDebugOverride);
    eval(logEmailOverride);
    eval(logDebugAndEmailOverride);
    eval(getParamOverride);
    /*------------------------------------------------------------------------------------------------------/
    | END: USER CONFIGURABLE PARAMETERS
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
    | Start: BATCH PARAMETERS
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
        //aa.env.setValue("emailAdminTo", "lauren.lupica@mesaaz.gov")
        //aa.env.setValue("emailAdminCc", "vance.smith@mesaaz.gov")
        aa.env.setValue("emailAdminTo", "michael.vanwie@mesaaz.gov")
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
    | End: BATCH PARAMETERS
    |-----------------------------------------------------------------------------------------------------*/
    // if (appGroup == "") appGroup = "*";
    // if (appTypeType == "") appTypeType = "*";
    // if (appSubType == "") appSubType = "*";
    // if (appCategory == "") appCategory = "*";
    // var appType = appGroup + "/" + appTypeType + "/" + appSubType + "/" + appCategory;

    /*------------------------------------------------------------------------------------------------------/
    | <===========Main=Loop================>
    /-----------------------------------------------------------------------------------------------------*/
    logDebugAndEmail("");// empty line
    logDebugAndEmail("Logs Generated By This Session");
    logDebugAndEmail("-------------------------");
    logDebugAndEmail("");// empty line
    logDebugAndEmail("Start of Job: " + startTime);

    if (!timeExpired) 
        mainProcess();

    aa.eventLog.createEventLog("DEBUG", "Batch Process", batchJobName, aa.date.getCurrentDate(), aa.date.getCurrentDate(),"", emailText, batchJobID);

    /*------------------------------------------------------------------------------------------------------/
    | <===========End Main=Loop================>
    /-----------------------------------------------------------------------------------------------------*/
}
catch (err) 
{
    aa.print("A JavaScript Error occurred: " + err.message);
}