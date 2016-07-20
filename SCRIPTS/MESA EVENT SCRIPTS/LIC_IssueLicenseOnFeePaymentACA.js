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
		//wfTask = "Issue License";
		//wfStatus = "Issued";
		//include("LIC_CreateLicenseRecord"); // Added by Kevin Ford
		logDebug("Creating License Record");
		// Create a child record of type License/*/*/License (where the record type and subtype are the same as the parent application record)
		// Need to get the type and sub-type broken out, the following format can be used appTypeArray[1]
		/*
		license = createChild(appTypeArray[0],appTypeArray[1],appTypeArray[2],"License","License");
		// Convert the Contact of type "Applicant" (This should be "License Applicant")
		// to "Licensee" ("Licensee" is in configuration and should be no issue.)
		var capContactResult = aa.people.getCapContactByCapID(license);
		if (capContactResult.getSuccess()) {
			var Contacts = capContactResult.getOutput();
			
			for (aContact in Contacts) {
				var updateContact = Contacts[aContact].getCapContactModel();
				var newPeople = updateContact.getPeople();
				var cType = newPeople.getContactType();
				if( (cType == "License Applicant") || (cType == "Applicant")) {
					var ContactName = newPeople.getContactName();
					var businessName = newPeople.getBusinessName();
					//ContactName += " "+newPeople.businessName();
					aa.print("Updating Contact "+ContactName+" "+businessName);
					newPeople.setContactType("Licensee");
				}
				else {
					newPeople.setContactType(cType);
				}
				aa.people.editCapContactWithAttribute(updateContact); // Commit the changes with contact ASI Attributes, this is safer to use.
			}
		}
		
		newLicIdString = license.getCustomID(); 
		logDebug("newLicIdString" + newLicIdString);
		lic = new licenseObject(null,license) ; 	
		
		// Set the expiration status to Active and the expiration date according to the expiration code. 
		// all the expiration_interval_unit are set to either one year or 12 months so using 365 days
		lic.setStatus("Active");		
		lic.setExpiration(dateAdd(null,365));
		
		// Copy info from application to "License" according to standard choice EMSE:ASI Copy Exceptions.
		// EMSE:ASI Copy Exceptions - contains the record type (in the "Standard Choices Value" field)
		// along with a "|" delimited list ASI fields to exclude when copying the ASI (in the "Value Desc" field).
		
		var ignore = lookup("EMSE:ASI Copy Exceptions",appTypeString); 
		var ignoreArr = new Array(); 
		if(ignore != null) ignoreArr = ignore.split("|");
		copyASIFields(capId,license,ignoreArr); // Copy the actual ASI Fields
		copyAppSpecific(license,ignoreArr); // Copy the values
		// no need for ASIT table as it is only for Denial
		//copyASITables(capId,license);
		
		// Update the License DBA with the "Business Name" ASI from the Application Record
		// Note that this is not in the spec.
		// The following has been edited by request of Janet Evelan to use "Application Name" for dba
		// the request was specifically for Massage License and may not apply to other types so we're being careful
		// If "Business Name" is blank, then we're going to get the capName(Appliaciton Name)
		var dba = getAppSpecific("Business Name",capId);
		if (dba == null) {
			dba = capName;
		}
		var desc = aa.cap.getCap(license).getOutput().getCapModel();
		desc.setSpecialText(dba); // This is the capName record Name
		aa.print(desc.getSpecialText());
		setNameResult = aa.cap.editCapByPK(desc);
		if (!setNameResult.getSuccess())
			{ logDebug("**WARNING: error setting cap name : " + setNameResult.getErrorMessage()) ;}
		// Set the workflow task "Issue License" to a status of "Issued"
		//*/
		closeTask("Issue License", "Issued", "Fee's paid online and permit issued", null);
		// Generate license report PDF and attach it to the license record
		var aaReportName = 'License';
		var itemCapId = capId;
		var cId = (capId.getCustomID());
		//runReportAttach(itemCapId,aaReportName,"capId",cId)
	}
}