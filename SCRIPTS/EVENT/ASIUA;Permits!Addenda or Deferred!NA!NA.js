include("PMT_RelateToPlanningRecord");

// added by Vance Smith (Mesa)
include("PMT_CodeModificationRecordNumber"); // 308
include("PMT_ParentNumberCreateChildRelation"); // 356 

if(matches(AInfo["Expedite"],"Expedite","Super Expedite") && (!feeExists("PMT090","NEW","INVOICED") || !feeExists("PMT100","NEW","INVOICED"))) {
	include("PMT_AddendaFeesDeposit");
}