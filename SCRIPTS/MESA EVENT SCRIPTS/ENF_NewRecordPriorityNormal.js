/*===================================================================
// Script Number: 26
// Script Name: ENF_NewRecordPriorityNormal.js
// Script Developer: Vance Smith
// Script Agency: Mesa
// Script Description: When Priority field in Record Detail is set 
// to "Normal" on ASA or Record field updated Schedule "Initial 
// Inspection" to the next working day (5-day calendar) and assign 
// to Code Officer based on GIS layer.

// Script Run Event: ASA

// Script Parents:
//	ASA;Enforcement!Case!~!~ 
//            
/*==================================================================*/

/* intellisense references */
/// <reference path="../../AccelaAPI.js" />
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/* reference path="../../INCLUDES_ACCELA_FUNCTIONS_ASB-80100.js" // only for asb events!! */
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

try
{
    var cdScriptObjResult = aa.cap.getCapDetail(capId);
    if (cdScriptObjResult.getSuccess())
    {
        var cdScriptObj = cdScriptObjResult.getOutput();
        if ( cdScriptObj ) 
        {
            var cd = cdScriptObj.getCapDetailModel();
            var priority = cd.getPriority();
            logDebug("Priority: " + priority);
            if (priority == "Normal")
            {
                // schedule initial inspection on the next working day (5 day cal)
                var nextWorkingDay = dateAdd(null, 1, "Y");
                //var inspector = null;
                scheduleInspectDate("Initial Inspection", nextWorkingDay);//, inspector);
                logDebug("Scheduled Inspection Date for " + nextWorkingDay);
            }
        }
        else
        {
            logDebug("Failed to get record priority (cdScriptObj)")
        }
    }
    else 
    {
        logDebug("Failed to get record priority (cdScriptObjResult)")
    }
    /*
    pseudocode
    DONE 1) get Priority field in record detail. 
    DONE 2) see if it is set to "Normal"
    DONE 3) if so, schedule "Initial Inspection" on the next working day (5 day cal)
    4) assign to Code Officer based on GIS layer (?)
    */
}
catch (err)
{
  logDebug("A JavaScript error occurred: " + err.message);
}

/* Test Record: COD16-00086

<B>EMSE Script Results for COD16-00086</B>
capId = class com.accela.aa.aamain.cap.CapIDModel
cap = class com.accela.aa.emse.dom.CapScriptModel
currentUserID = ADMIN
currentUserGroup = EnforcementAdmin
systemUserObj = class com.accela.aa.aamain.people.SysUserModel
appTypeString = Enforcement/Case/Code Compliance/NA
capName = null
capStatus = Received
fileDate = 8/31/2016
fileDateYYYYMMDD = 2016-08-31
sysDate = class com.accela.aa.emse.util.ScriptDateTime
parcelArea = 0
estValue = 0
calcValue = 0
feeFactor = CONT
houseCount = 0
feesInvoicedTotal = 0
balanceDue = 0
lookup(EMSE_VARIABLE_BRANCH_PREFIX,ApplicationSubmitAfter) = ASA
{Notify Complainant} = Yes
{Source of Complaint} = Citizen
{Other Source of Complaint} = null
{Type of Submittal} = Online
{Inspection Interval} = 14 Days
{Location} = null
{Zoning District} = null
{Dummy1 - Do Not Use} = null
{HO Letter Sent Date} = null
{CRL Sent Date} = null
{LFC Complete Date} = null
{Certified Citations?} = null
{Certified Deed?} = null
{AZ Driver's License?} = null
{Supervisor Review Complete Date} = null
{Sent to Prosecutor Date} = null
{Docket Assigned} = null
{Charges Denied?} = null
{Arraignment Date} = null
{Plea Agreement?} = null
{Pre Trial Date} = null
{Criminal Trial Date} = null
{Sentence} = null
{Charges Dismissed?} = null
{Probation Revocation?} = null
{Revocation Hearing Date} = null
{Sentencing Hearing Date} = null
{Warrant Issued Date} = null
{Criminal Comments} = null
{Dummy2 - Do Not Use} = null
{Occupied?} = null
{30 Day Letter Date} = null
{MCADPO Project?} = null
{Special Project?} = null
{Vendor} = null
{Scheduled Date} = null
{Completed Date} = null
{Fee Monitor Date} = null
{Lien Applied Date} = null
{Collections Date} = null
{Abatement Comments} = null
{Dummy3 - Do Not Use} = null


*/