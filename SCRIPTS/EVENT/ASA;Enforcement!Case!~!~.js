	
//include("ENF_EnforcementCaseDuplicate");  remarked out since it has been determined that duplicates are wanted
// add by Brian O'Dell (Mesa)
//include("ENF_EnforcementNotificationEmail");  Looks to have been replaced with ENF_Record_Opened

//Created criteria for records submitted internally vs ACA
if (!publicUser){
	include("ENF_Record_Opened");
	include("ENF_AutopopulateZoningDistrict");
	include("ENF_CountyIslandEmail");
}


// added by Vance Smith (Mesa)
include("ENF_NewRecordPriorityNormal"); // 26

//added by Michael Kniskern (Mesa)
include("ENF_AddViolationOrdinanceOnViolationCode");