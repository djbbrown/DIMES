/*------------------------------------------------------------------------------------------------------/
| Program: Batch Expiration.js  
| Trigger: Batch
| 
| Version | Date     | By   | Notes
| ----------------------------------------------------------------------------------------------------
|   1.0   | 11/01/08 | JHS  | Base Version.
|   2.0   | 11/14/17 | MTV  | Start with the widest 'Active' -> 'About to Expire' window and dynamically apply new 
|                           |  expiration date based on License Types
|
| Flip at 30 Days: FortuneTeller, Livestock, ParkandSwap, Peddler
| Flip at 60 Days: ExtensionOfPremise-Permanent, Liquor
| Flip at 90 Days: AntiqueDealer, Auction House, Auctioneer, MassageEstablishment, OffTrackBetting, PawnBroker, ScrapMetal, SecondHand
| Ignore: BingoHall, Fireworks, SpecialEvent, ExtensionOfPremise-Temporary, LiquorSpecialEvent
/------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------/
|
| START: USER CONFIGURABLE PARAMETERS
|
/------------------------------------------------------------------------------------------------------*/
emailText = "";
maxSeconds = 4.5 * 60;                  // number of seconds allowed for batch processing, usually < 5*60
message = "";
br = "<br>";
/*------------------------------------------------------------------------------------------------------/
| BEGIN Includes
/------------------------------------------------------------------------------------------------------*/
SCRIPT_VERSION = 2.0


eval(getMasterScriptText("INCLUDES_ACCELA_FUNCTIONS"));
eval(getScriptText("INCLUDES_BATCH"));
eval(getMasterScriptText("INCLUDES_CUSTOM"));


function getScriptText(vScriptName){
      vScriptName = vScriptName.toUpperCase();
      var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();
      var emseScript = emseBiz.getScriptByPK(aa.getServiceProviderCode(),vScriptName,"ADMIN");
      return emseScript.getScriptText() + "";
}

function getMasterScriptText(vScriptName){
      vScriptName = vScriptName.toUpperCase();
      var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();
      var emseScript = emseBiz.getMasterScript(aa.getServiceProviderCode(),vScriptName);
      return emseScript.getScriptText() + "";
}

/*------------------------------------------------------------------------------------------------------/
|
| END: USER CONFIGURABLE PARAMETERS
|
/------------------------------------------------------------------------------------------------------*/
// showDebug = aa.env.getValue("showDebug").substring(0,1).toUpperCase().equals("Y");
showDebug = true;

sysDate = aa.date.getCurrentDate();
batchJobResult = aa.batchJob.getJobID()
batchJobName = "" + aa.env.getValue("BatchJobName");
wfObjArray = null;


batchJobID = 0;
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

if ( batchJobName == "" )
{
  //TESTING PARAMS
  aa.env.setValue("lookAheadDays", "0");
  aa.env.setValue("daySpan", "0");
  aa.env.setValue("appGroup", "Licenses");
  aa.env.setValue("appTypeType", "*");
  aa.env.setValue("appSubtype", "*");
  aa.env.setValue("appCategory", "License");
  aa.env.setValue("expirationStatus", "Active");
  aa.env.setValue("newExpirationStatus", "About to Expire");
  aa.env.setValue("newApplicationStatus", "About to Expire");
  aa.env.setValue("gracePeriodDays", "0");
  //aa.env.setValue("setPrefix", "");
  //aa.env.setValue("inspSched", "");
  //aa.env.setValue("skipAppStatus", "");
  aa.env.setValue("emailAddress", "DIMES-Alert-Supp@MesaAZ.gov");
  //aa.env.setValue("sendEmailToContactTypes", "");
  //aa.env.setValue("emailTemplate", "");
  aa.env.setValue("deactivateLicense", "N");
  aa.env.setValue("lockParentLicense", "N");
  aa.env.setValue("createTempRenewalRecord", "N");
  //aa.env.setValue("feeSched", "");
  //aa.env.setValue("feeList", "");
  //aa.env.setValue("feePeriod", "");
}

var fromDate = getParam("fromDate");                                // 01 Hardcoded dates.   Use for testing only
var toDate = getParam("toDate");                                    // 05 Hardcoded dates.   Use for testing only
var lookAheadDays = getParam("lookAheadDays");                      // 10 Number of days from today
var daySpan = getParam("daySpan");                                  // 20 Days to search (6 if run weekly, 0 if daily, etc.)
var appGroup = getParam("appGroup");                                // 30 app Group to process {Licenses}
var appTypeType = getParam("appTypeType");                          // 40 app type to process {Rental License}
var appSubtype = getParam("appSubtype");                            // 50 app subtype to process {NA}
var appCategory = getParam("appCategory");                          // 60 app category to process {NA}
var expStatus = getParam("expirationStatus");                       // 70 test for this expiration status
var newExpStatus = getParam("newExpirationStatus");		              // 80 update to this expiration status
var newAppStatus = getParam("newApplicationStatus");	              // 90 update the CAP to this status
var gracePeriodDays = getParam("gracePeriodDays");		              // 100 bump up expiration date by this many days
var setPrefix = getParam("setPrefix");					                    // 110 Prefix for set ID
var inspSched = getParam("inspSched");					                    // 120 Schedule Inspection
var skipAppStatusArray = getParam("skipAppStatus").split(",");      // 130 Skip records with one of these application statuses
var emailAddress = getParam("emailAddress");			                  // 140 email to send report
var sendEmailToContactTypes = getParam("sendEmailToContactTypes");  // 150 send out emails?
var emailTemplate = getParam("emailTemplate");			                // 160 email Template
var deactivateLicense = getParam("deactivateLicense");	            // 170 deactivate the LP
var lockParentLicense = getParam("lockParentLicense");	            // 180 add this lock on the parent license
var createRenewalRecord = getParam("createTempRenewalRecord");      // 190 create a temporary record
var feeSched = getParam("feeSched");					                      // 200
var feeList = getParam("feeList");						                      // 210 comma delimted list of fees to add
var feePeriod = getParam("feePeriod");					                    // 220 fee period to use {LICENSE}

var dFromDate = aa.date.parseDate(fromDate);                        // --
var dToDate = aa.date.parseDate(toDate);                            // --
/*----------------------------------------------------------------------------------------------------/
|
| End: BATCH PARAMETERS
|
/------------------------------------------------------------------------------------------------------*/
var startDate = new Date();
var timeExpired = false;

if (!fromDate.length) // no "from" date, assume today + number of days to look ahead
                fromDate = dateAdd(null,parseInt(lookAheadDays))

if (!toDate.length)  // no "to" date, assume today + number of look ahead days + span
                toDate = dateAdd(null,parseInt(lookAheadDays)+parseInt(daySpan))

var mailFrom = lookup("ACA_EMAIL_TO_AND_FROM_SETTING","RENEW_LICENSE_AUTO_ISSUANCE_MAILFROM");
var acaSite = lookup("ACA_CONFIGS","ACA_SITE");
acaSite = acaSite.substr(0,acaSite.toUpperCase().indexOf("/ADMIN"));

logDebug("Date Range -- fromDate: " + fromDate + ", toDate: " + toDate)

var startTime = startDate.getTime();                                       // Start timer
var systemUserObj = aa.person.getUser("ADMIN").getOutput();

if (appGroup=="")
                appGroup="*";
if (appTypeType=="")
                appTypeType="*";
if (appSubtype=="")
                appSubtype="*";
if (appCategory=="")
                appCategory="*";
var appType = appGroup+"/"+appTypeType+"/"+appSubtype+"/"+appCategory;

/*------------------------------------------------------------------------------------------------------/
| <===========Main=Loop================>
|
/-----------------------------------------------------------------------------------------------------*/

logDebug("Start of Job");

if (!timeExpired) mainProcess();

logDebug("End of Job: Elapsed Time : " + elapsed() + " Seconds");

if (emailAddress.length)
                aa.sendMail("noreply@accela.com", emailAddress, "", batchJobName + " Results", emailText);


/*------------------------------------------------------------------------------------------------------/
| <===========END=Main=Loop================>
/-----------------------------------------------------------------------------------------------------*/


function mainProcess()
{
  var capFilterType = 0
  var capFilterInactive = 0;
  var capFilterError = 0;
  var capFilterStatus = 0;
  var capDeactivated = 0;
  var capCount = 0;
  var inspDate;
  var setName;
  var setDescription;

  var expResult = aa.expiration.getLicensesByDate(expStatus,fromDate,toDate);
  
  var at30 = ['FortuneTeller', 'Livestock', 'ParkandSwap', 'Peddler'];
  var at60 = ['ExtensionOfPremise-Permanent', 'Liquor'];
  var at90 = ['AntiqueDealer', 'Auction House', 'Auctioneer', 'MassageEstablishment', 'OffTrackBetting', 'PawnBroker', 'ScrapMetal', 'SecondHand'];

  if (expResult.getSuccess())
  {
    myExp = expResult.getOutput();
    logDebug("Processing " + myExp.length + " expiration records");
  }
  else
  { 
    logDebug("ERROR: Getting Expirations, reason is: " + expResult.getErrorType() + ":" + expResult.getErrorMessage()) ; 
    return false 
  }

  //=========================================================
  // Loop through all B1EXPIRATION records found (effectively, each license record)
  //=========================================================
  for (thisExp in myExp)  
  {
    if (elapsed() > maxSeconds) // only continue if time hasn't expired
    {
      logDebug("A script timeout has caused partial completion of this process.  Please re-run.  " + elapsed() + " seconds elapsed, " + maxSeconds + " allowed.") ;
      timeExpired = true ;
      break;
    }

    b1Exp = myExp[thisExp];

    //=========================================================
    // Set global 'cap', 'capId', 'altId' & appTypeArray variable to current record
    //=========================================================
      var capResult = aa.cap.getCap(b1Exp.capID);

      if (!capResult.getSuccess()) 
        continue;
      else {
        cap = capResult.getOutput();
        capId = cap.capModel.capID;
        altId = cap.capModel.altID;
        capStatus = cap.capModel.capStatus;
        appTypeArray = cap.capType.value.split("/");
      }

    //=========================================================
    // Filter by Cap Type & Cap Status
    //=========================================================
      

      if (appType.length && !appMatch(appType))
      {
        capFilterType++;
        //logDebug(cap.capModel.altID + ": Application Type does not match")
        continue;
      }

      if (exists(capStatus,skipAppStatusArray))
      {
        capFilterStatus++;
        //logDebug(altId + ": skipping due to application status of " + capStatus)
        continue;
      }

    
    var expDate = b1Exp.getExpDate();
    if (expDate) var b1ExpDate = expDate.getMonth() + "/" + expDate.getDayOfMonth() + "/" + expDate.getYear();
    var b1Status = b1Exp.getExpStatus();
    var renewalCapId = null;

    //logDebug(altId + ": Renewal Status : " + b1Status + ", Expires on " + b1ExpDate);
    capCount++;
    
    //=========================================================
    // Get capId from b1Exp Object
    // No need for capId object as it is in the cap Object - MVanWie 10/31/2017
    //=========================================================
          // capId = aa.cap.getCapID(b1Exp.getCapID().getID1(),b1Exp.getCapID().getID2(),b1Exp.getCapID().getID3()).getOutput();
          // if (!capId)
          // {
          //   logDebug("Could not get a Cap ID for " + b1Exp.getCapID().getID1() + "-" + b1Exp.getCapID().getID2() + "-" + b1Exp.getCapID().getID3());
          //   continue;
          // }



    //=========================================================
    // Create Set
    // Not used by Licensing - MVanWie 10/31/2017
    //=========================================================
          // if (setPrefix != "" && capCount == 1)
          // {
          //   var yy = startDate.getFullYear().toString().substr(2,2);
            
          //   var mm = (startDate.getMonth()+1).toString();
          //   if (mm.length<2)  mm = "0"+mm;

          //   var dd = startDate.getDate().toString();
          //   if (dd.length<2)  dd = "0"+dd;
            
          //   var hh = startDate.getHours().toString();
          //   if (hh.length<2) hh = "0"+hh;

          //   var mi = startDate.getMinutes().toString();
          //   if (mi.length<2) mi = "0"+mi;

          //   var setName = setPrefix.substr(0,5) + yy + mm + dd + hh + mi;

          //   setDescription = setPrefix + " : " + startDate.toLocaleString()
          //   var setCreateResult= aa.set.createSet(setName,setDescription)

          //   if (setCreateResult.getSuccess())
          //     logDebug("Set ID "+setName+" created for CAPs processed by this batch job.");
          //   else
          //     logDebug("ERROR: Unable to create new Set ID "+setName+" created for CAPs processed by this batch job.");
          // }

    // Actions start here:

    //=========================================================
    // Deactivate License
    // Not used by Licensing - MVanWie 10/31/2017
    //=========================================================
          // var refLic = getRefLicenseProf(altId) // Load the reference License Professional
          // if (refLic && deactivateLicense.substring(0,1).toUpperCase().equals("Y"))
          // {
          //   refLic.setAuditStatus("I");
          //   aa.licenseScript.editRefLicenseProf(refLic);
          //   logDebug(altId + ": deactivated linked License");
          // }

    //=========================================================
    // update expiration status
    //=========================================================
    if (newExpStatus.length > 0)
    {
      if(IsStrInArry(capTypeArray[2], at30))
      {
        b1Exp.setExpStatus(newExpStatus);
        aa.expiration.editB1Expiration(b1Exp.getB1Expiration());
        logDebug(altId + ": Update expiration status: " + newExpStatus);
      }
      if(IsStrInArry(capTypeArray[2], at60))
      {
        b1Exp.setExpStatus(newExpStatus);
        aa.expiration.editB1Expiration(b1Exp.getB1Expiration());
        logDebug(altId + ": Update expiration status: " + newExpStatus);
      }
      if(IsStrInArry(capTypeArray[2], at90))
      {
        b1Exp.setExpStatus(newExpStatus);
        aa.expiration.editB1Expiration(b1Exp.getB1Expiration());
        logDebug(altId + ": Update expiration status: " + newExpStatus);
      }
    }

    //=========================================================
    // update expiration date based on interval
    // Not used by Licensing - MVanWie 10/31/2017
    //=========================================================
          // if (parseInt(gracePeriodDays) != 0)
          // {
          //   newExpDate = dateAdd(b1ExpDate,parseInt(gracePeriodDays));
          //   b1Exp.setExpDate(aa.date.parseDate(newExpDate));
          //   aa.expiration.editB1Expiration(b1Exp.getB1Expiration());

          //   logDebug(altId + ": updated CAP expiration to " + newExpDate);
          //   if (refLic)
          //   {
          //     refLic.setLicenseExpirationDate(aa.date.parseDate(newExpDate));
          //     aa.licenseScript.editRefLicenseProf(refLic);
          //     logDebug(altId + ": updated License expiration to " + newExpDate);
          //   }
          // }
    //=========================================================
    // Send Email to Contact of Type <type> using an Email Template
    // Not used by Licensing - MVanWie 10/31/2017
    //=========================================================
          // if (sendEmailToContactTypes.length > 0 && emailTemplate.length > 0) 
          // {
          //   var conTypeArray = sendEmailToContactTypes.split(",");
          //   var conArray = getContactArray(capId);

          //   logDebug("Have the contactArray");

          //     for (thisCon in conArray)
          //     {
          //       conEmail = null;
          //       b3Contact = conArray[thisCon];

          //       if (exists(b3Contact["contactType"],conTypeArray))
          //         conEmail = b3Contact["email"];

          //       if (conEmail) 
          //       {
          //         emailParameters = aa.util.newHashtable();
          //         addParameter(emailParameters,"$$altid$$",altId);
          //         addParameter(emailParameters,"$$acaUrl$$",acaSite + getACAUrl());
          //         addParameter(emailParameters,"$$businessName$$",cap.getSpecialText());
          //         addParameter(emailParameters,"$$expirationDate$$",b1ExpDate);

          //         var capId4Email = aa.cap.createCapIDScriptModel(capId.getID1(),capId.getID2(),capId.getID3());

          //         var fileNames = [];

          //         aa.document.sendEmailAndSaveAsDocument(mailFrom,conEmail,"" , emailTemplate, emailParameters, capId4Email, fileNames);
          //         logDebug(altId + ": Sent Email template " + emailTemplate + " to " + b3Contact["contactType"] + " : " + conEmail);
          //       }
          //     }
          //   }


    //=========================================================
    // update CAP status
    //=========================================================
    if (newAppStatus.length > 0)
    {
      updateAppStatus(newAppStatus,"");
      //logDebug(altId + ": Updated Application Status to " + newAppStatus);
    }
    

    //=========================================================
    // schedule Inspection
    // Not used by Licensing - MVanWie 10/31/2017
    //=========================================================
          // if (inspSched.length > 0)
          // {
          //   scheduleInspection(inspSched,"1");
          //   inspId = getScheduledInspId(inspSched);
          //   if (inspId) autoAssignInspection(inspId);
          //   logDebug(altId + ": Scheduled " + inspSched + ", Inspection ID: " + inspId);
          // }


    //=========================================================
    // Add to Set
    // Not used by Licensing - MVanWie 10/31/2017
    //=========================================================
          //if (setPrefix != "") aa.set.add(setName,capId)


    //=========================================================
    // lock Parent License
    // Not used by Licensing - MVanWie 10/31/2017
    //=========================================================
          // if (lockParentLicense != "")
          // {
          //   licCap = getLicenseCapId("*/*/*/*");

          //   if (licCap)
          //   {
          //     logDebug(licCap + ": adding Lock : " + lockParentLicense);
          //     addStdCondition("Suspension",lockParentLicense,licCap);
          //   }
          //   else
          //     logDebug(altId + ": Can't add Lock, no parent license found");
          // }
    
    //=========================================================
    // create renewal record and add fees
    // Not used by Licensing - MVanWie 10/31/2017
    //=========================================================
          // if (createRenewalRecord && createRenewalRecord.substring(0,1).toUpperCase().equals("Y"))
          // {
          //   createResult = aa.cap.createRenewalRecord(capId)

          //   if (!createResult.getSuccess) 
          //     logDebug("Could not create renewal record : " + createResult.getErrorMessage());
          //   else 
          //   {
          //     renewalCapId = createResult.getOutput();

          //     renewalCap = aa.cap.getCap(renewalCapId).getOutput();
          //     if (renewalCap.isCompleteCap()) 
          //     {
          //       logDebug(altId + ": Renewal Record already exists : " + renewalCapId.getCustomID());
          //     }
          //     else 
          //     {          
          //       logDebug(altId + ": created Renewal Record " + renewalCapId.getCustomID());

          //       // add fees 

          //       if (feeList.length > 0) 
          //       {
          //         for (var fe in feeList.split(","))
          //           var feObj = addFee(feeList.split(",")[fe],feeSched,feePeriod,1,"Y",renewalCapId);
          //       }
          //     }
          //   }
          // }
  }

  logDebug("Total CAPS qualified date range: " + myExp.length);
  logDebug("Ignored due to application type: " + capFilterType);
  logDebug("Ignored due to CAP Status: " + capFilterStatus);
  logDebug("Ignored due to Deactivated CAP: " + capDeactivated);
  logDebug("Total CAPS processed: " + capCount);
}