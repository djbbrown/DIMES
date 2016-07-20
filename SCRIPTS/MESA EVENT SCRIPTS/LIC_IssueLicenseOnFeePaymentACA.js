/*===================================================================
// Script Number: 032
// Script Name: LIC_IssueLicenseOnFeePaymentACA
// Script Developer: Kevin Ford
// Script Agency: Accela
// Script Description: See Below
// Script Run Event: PRA:Licenses!General!~!Application
// Criteria:
1.	If record type is Licenses/General/~/Application
2.	AND the payment is being made by a public user, i.e. in ACA
3.	AND the workflow task "Issue License" has a status of "Ready to Issue"
4.	AND the balance due on the record is now zero (after the payment)

Execute Script Actions
1.	Create the license record leveraging script 7 (LIC Create License Record).
2.	Set the workflow task "Issue License" to a status of "Issued"
3.	Generate license report and attach it to the license record. 

// Script Parents:
//            PRA:Licenses!General!~!Application
===================================================================*/
// Get the record type and check
if(
	appTypeArray[0] == 'Licenses'
	&& appTypeArray[1] == 'General'
	&& appTypeArray[3] == 'Application'
	// check the current user/usergroup 
	// && currentUserID == ''
	// && currentUserGroup == ''
	&& publicUser
){
	// get the workflow and set the status
	wfTaskModel = aa.workflow.getTask(capId, 'Issue License').getOutput();	
	tStatus = wfTaskModel.getDisposition();
	if(tStatus == 'Ready to Issue' && balanceDue == 0){
		// Create the license record
		wfTask = "Issue License";
		wfStatus = "Issued";
		include("LIC_CreateLicenseRecord"); // Added by Kevin Ford
		// Set the workflow task "Issue License" to a status of "Issued"
		closeTask("Issue License", "Issued", "Fee's paid online and permit issued", null);
		// Generate license report PDF and attach it to the license record
		var aaReportName = 'License';
		var itemCapId = capId;
		var cId = (capId.getCustomID());
		//runReportAttach(itemCapId,aaReportName,"capId",cId)
	}
}