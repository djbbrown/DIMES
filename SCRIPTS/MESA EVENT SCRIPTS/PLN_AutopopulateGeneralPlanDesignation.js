/*===================================================================
// Script Number: 74
// Script Name: PLN_AutopopulateGeneralPlanDesignation.js
// Script Developer: Vance Smith
// Script Agency: Mesa
// Script Description: On application submittal, populate the ASI 
// field "General Plan Designation" with the value of the GIS 
// attribute "CharacterArea" on layer "GeneralPlan Labels".

// Script Run Event: ASA

// Script Parents:
//	ASA;Planning!Planning and Zoning!~!~
//  ASA;Planning!Board of Adjustment!~!~
// 	ASA;Planning!General Plan Amendment – Major!~!~
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
	if (
		appMatch("Planning/Planning and Zoning/*/*") ||
		appMatch("Planning/Board of Adjustment/*/*") ||
		appMatch("Planning/General Plan Amendment - Major/*/*")	
	)
	{
		var characterArea = getGISInfo("Accela/Accela_Base", "GeneralPlan Labels", "CharacterArea");  // use "ZONING" field for zoning info only (e.g. "RS-6") or "DSCR" (i.e. description) field for soning info plus a brief description (e.g. "RS-6 Single Residence 6")
		if(characterArea != null)
		{
			logDebug("CharacterArea: " + characterArea);

			// auto-populate ASI "General Plan Designation"
			editAppSpecific("Exist. GP Designation", characterArea);
		}
	}
}
catch (err)
{
  logDebug("A JavaScript error occurred: " + err.message);
}

/* Test Record: ZON16-00205

<B>EMSE Script Results for ZON16-00205</B>

capId = class com.accela.aa.aamain.cap.CapIDModel
cap = class com.accela.aa.emse.dom.CapScriptModel
currentUserID = ADMIN
currentUserGroup = PlanningAdmin
systemUserObj = class com.accela.aa.aamain.people.SysUserModel
appTypeString = Planning/Planning and Zoning/NA/NA
capName = Vance Test # 74
capStatus = Submitted
fileDate = 8/30/2016
fileDateYYYYMMDD = 2016-08-30
sysDate = class com.accela.aa.emse.util.ScriptDateTime
parcelArea = 09.16
estValue = 0
calcValue = 0
feeFactor = CONT
houseCount = 0
feesInvoicedTotal = 0
balanceDue = 0
lookup(EMSE_VARIABLE_BRANCH_PREFIX,ApplicationSubmitAfter) = ASA
{Rezone} = null
{Rezone - Infill Development District 2} = null
{Site Plan Review/Modification} = null
{Rezone - Planned Community District} = null
{Combined Rezone and Site Plan Review /Modification} = null
{Planned Community Minor Amendment} = null
{Pre-Plat} = null
{Special Use Permit} = CHECKED
{Council Use Permit} = null
{Minor General Plan Amendment} = null
{Development Unit Plan} = null
{General Vicinity} = null
{Gross Site Size (sqft)} = null
{Net Site Size (sqft)} = null
{Gross Site Size (acres)} = null
{Net Site Size (acres)} = null
{Total Existing Lots} = null
{Total New Lots, Tracts, Parcels} = null
{Existing Dwelling Units} = null
{Total New Dwelling Units} = 1
{Gross DU/AC} = 0
{Net DU/AC} = 0
{Exist. GP Designation} = null
{Required} = null
{Existing} = null
{Proposed} = null
{Received Date} = null
{Acceptance Date} = null
{Distribution Date} = null
{P&Z Board} = null
{City Council Date} = null
{Decision Date} = null
{Closed Date} = null
{Number of Submittals} = null
{Completeness Review Days Left} = null
{Substantive Review Days Left} = null
{Completeness Review Due Date} = null
{Substantive Review Due Date} = null
{Start/Stop Indicator} = null
{ParcelAttribute.ZONING} = DR-3
{ParcelAttribute.SIZE(ACRES)} = 9.162
{ParcelAttribute.ANNEXATION DATE} = 15-JUL-83
{ParcelAttribute.ASSESSED IMPROVEMENT} = 1242000
{ParcelAttribute.LAND USE} = Public Offices
{ParcelAttribute.NOTES} = MESA PER MCR 23/18 E2 BLOCK 20 EX S 75F RAILROAD  & N 485F OF W2 BLOCK 20 & ALSO TH PT ABAND 2ND    AVE BEING S2 OF PROP DESC AS PARCEL 1 IN DOCKET   15810/11
{ParcelAttribute.OWNER DEED DATE} = 29-JUL-99
{ParcelAttribute.OWNER DEED NUMBER} = 990714556
{ParcelAttribute.PROPERTY USE CODE} = 9790
{ParcelAttribute.QUARTER SECTION MAP} = 29B
{ParcelAttribute.TAX AREA CODE} = 041010
{ParcelAttribute.UPDATED} = 09-APR-15
{ParcelAttribute.UPDATED BY} = LOAD
{ParcelAttribute.ZIP CODE} = 85210
{ParcelAttribute.Block} = 3008
{ParcelAttribute.Book} = null
{ParcelAttribute.CensusTract} = 421400
{ParcelAttribute.CouncilDistrict} = 4
{ParcelAttribute.ExemptValue} = null
{ParcelAttribute.ImprovedValue} = 8280000.0
{ParcelAttribute.InspectionDistrict} = null
{ParcelAttribute.LandValue} = 911600.0
{ParcelAttribute.LegalDesc} = MESA PER MCR 23/18 E2 BLOCK 20 EX S 75F RAILROAD  & N 485F OF W2 BLOCK 20 & ALSO TH PT ABAND 2ND    AVE BEING S2 OF PROP DESC AS PARCEL 1 IN DOCKET   15810/11
{ParcelAttribute.Lot} = null
{ParcelAttribute.MapNo} = null
{ParcelAttribute.MapRef} = null
{ParcelAttribute.ParcelStatus} = A
{ParcelAttribute.SupervisorDistrict} = null
{ParcelAttribute.Tract} = null
{ParcelAttribute.PlanArea} = null

*/