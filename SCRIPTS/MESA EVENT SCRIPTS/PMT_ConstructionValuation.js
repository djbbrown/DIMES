/********** CANCELLED ***********/

/*===================================================================
// Script Number: 104
// Script Name: PMT_ConstructionValuation.js
// Script Developer: Vance Smith
// Script Agency: Mesa
// Script Description: If ASI field "Property Type" has a value of 
// "Commercial", calculate the construction Valuation using the 
// customer valuation provided in the Additional Info intake tab.

// clarified from script tracker comments:
// "as this is online/demo, use the customer valuation only (no comparison to ICC)"

// Script Run Event: ASA, ASIUA

// Script Parents:
//	ASA;Permits!Online!NA!NA 
//  ASA;Permits!Demolition!NA!NA
//	ASIUA;Permits!Online!NA!NA 
//  ASIUA;Permits!Demolition!NA!NA
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
    if (appMatch("Permits/Online/NA/NA") || appMatch("Permits/Demolition/NA/NA"))
    {
        logDebug("Found matching record type.");
        if (AInfo["Property Type"] == "Commercial")
        {
            logDebug("Found Property Type = 'Commercial'.");
            var totalValuation = Number(AInfo["Total Valuation"]);
            if (totalValuation > 0)
            {
                editAppSpecific("Total Valuation", estValue + totalValuation);
            }
            else
            {
                editAppSpecific("Total Valuation", estValue);
            }
            logDebug("Total Valuation successfully set")
        }
        else {
            logDebug("Property Type: " + AInfo["Property Type"]);
        }
    }
    else
    {
        logDebug("Matching record type not found.")
    }
	/*
    --pseudocode--    
    DONE 1) check ASI field "Property Type" for value of "Commercial"
    DONE 2) if found, get valuation from the Additional Info intake tab
    DONE 3) if found, set calculatedvalue = estValue
    */
}
catch (err)
{
  logDebug("A JavaScript error occurred: " + err.message);
}

/* test record: 

<B>EMSE Script Results for PMT16-00510</B>
capId = class com.accela.aa.aamain.cap.CapIDModel
cap = class com.accela.aa.emse.dom.CapScriptModel
currentUserID = ADMIN
currentUserGroup = PermitsAdmin
systemUserObj = class com.accela.aa.aamain.people.SysUserModel
appTypeString = Permits/Online/NA/NA
capName = GAS PERMIT
capStatus = Ready To Issue
fileDate = 8/31/2016
fileDateYYYYMMDD = 2016-08-31
sysDate = class com.accela.aa.emse.util.ScriptDateTime
parcelArea = 00.16
estValue = 0
calcValue = 0
feeFactor = CONT
houseCount = 0
feesInvoicedTotal = 0
balanceDue = 0
lookup(EMSE_VARIABLE_BRANCH_PREFIX,ApplicationSpecificInfoUpdateAfter) = ASIUA
{Property Type} = Residential
{Type of Work} = Residential Gas Line Repair/Replace
{Classification Code} = 986
{Are You the Owner/Builder?} = Yes
{Code Edition} = 2006
{Required Number of Inspections} = 1
{Flood Control Permit} = null
{Related Permit} = null
{Same Day Turn On - Gas} = null
{Same Day Turn On - Electric} = null
{Gas Service} = null
{Electric Service} = null
{Permit Issued Date} = null
{Permit Expiration Date} = null
{ParcelAttribute.ZONING} = RS-6
{ParcelAttribute.SIZE(ACRES)} = .164
{ParcelAttribute.ANNEXATION DATE} = 05-JAN-49
{ParcelAttribute.ASSESSED IMPROVEMENT} = 6970
{ParcelAttribute.LAND USE} = Small Lot Residential (SF)
{ParcelAttribute.NOTES} = WESTERN HOMESITES
{ParcelAttribute.OWNER DEED DATE} = 09-MAY-95
{ParcelAttribute.OWNER DEED NUMBER} = 950263442
{ParcelAttribute.PROPERTY USE CODE} = 0131
{ParcelAttribute.QUARTER SECTION MAP} = 30C
{ParcelAttribute.TAX AREA CODE} = 041000
{ParcelAttribute.UPDATED} = 09-APR-15
{ParcelAttribute.UPDATED BY} = LOAD
{ParcelAttribute.ZIP CODE} = 85210
{ParcelAttribute.Block} = 1008
{ParcelAttribute.Book} = null
{ParcelAttribute.CensusTract} = 422001
{ParcelAttribute.CouncilDistrict} = 4
{ParcelAttribute.ExemptValue} = null
{ParcelAttribute.ImprovedValue} = 69700.0
{ParcelAttribute.InspectionDistrict} = null
{ParcelAttribute.LandValue} = 17400.0
{ParcelAttribute.LegalDesc} = WESTERN HOMESITES
{ParcelAttribute.Lot} = 110
{ParcelAttribute.MapNo} = null
{ParcelAttribute.MapRef} = null
{ParcelAttribute.ParcelStatus} = A
{ParcelAttribute.SupervisorDistrict} = null
{ParcelAttribute.Tract} = null
{ParcelAttribute.PlanArea} = null

*/