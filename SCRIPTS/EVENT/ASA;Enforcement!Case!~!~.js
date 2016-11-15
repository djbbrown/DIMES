var matchesENFCase=0;
include("ENF_EnforcementCaseDuplicate");
// add by Brian O'Dell (Mesa)
include("ENF_EnforcementNotificationEmail");
include("ENF_Record_Opened");
include("ENF_AutopopulateZoningDistrict");
include("ENF_CountyIslandEmail");

// added by Vance Smith (Mesa)
logDebug("matchesENFCase = " + matchesENFCase);
include("ENF_NewRecordPriorityNormal"); // 26

//added by Michael Kniskern (Mesa)
include("ENF_AddViolationOrdinanceOnViolationCode");