if (wfTask == "Application Submittal" && wfStatus == "Approved") {
	//get ParentID
	parentCapId = getParentLicenseCapID(capId);
	if (parentCapId != "undefined" && parentCapId != null) {
		tmpCapA = String(parentCapId).split("-"); 
		parentCapId = aa.cap.getCapID(tmpCapA[0],tmpCapA[1],tmpCapA[2]).getOutput();	
	}

	stdChoiceEntry = "WTUA:Permits/Police Department/*/Commercial Renewal";
	
	//Copy Parcels from renewal to license
	copyParcels(capId, parentCapId);
	
	//Copy addresses from renewal to license
	copyAddress(capId, parentCapId);
	
	//Copy ASI from renewal to license
	copyAppSpecific(parentCapId);
	
	//Copy ASIT from  renewal to license
	copyASITables(capId, parentCapId);
	
	//Copy Contacts from  renewal to license
	copyContacts3_0(capId, parentCapId);
	
	//Copy Work Description from  renewal to license
	aa.cap.copyCapWorkDesInfo(capId, parentCapId);

	//Copy application name from  renewal to license
	editAppName(getAppName(capId),parentCapId);
	
	//Copy documements from renewal to license
	aa.cap.transferRenewCapDocument(capId, parentCapId, false);
	
	//Activate license record
	aa.expiration.activeLicensesByCapID(parentCapId);	
	
	//Set renewal to complete
	renPrj = getRenewals(parentCapId,"Incomplete")[0];
	renPrj.setStatus("Complete");
	aa.cap.updateProject(renPrj);
	
	//Set Application Status for license
	updateAppStatus("Issued","Updated by EMSE: " + stdChoiceEntry,parentCapId);
	
	//Close renewal workflow
	closeTask("Issued","Closed","Updated by EMSE: " + stdChoiceEntry,"Updated by EMSE: " + stdChoiceEntry);
	
	//Update license workflow
	var renCapId = capId; capId = parentCapId;
	updateTask("Issued", "Issued", "Updated by EMSE: " + stdChoiceEntry, null);
	capId = renCapId;
	
	/*
	//Set Expiration Dates
	tmpNewDate = dateAddMonths(null, '12');
	thisLic = new licenseObject(parentCapIdString,parentCapId) ; 
	thisLic.setExpiration(dateAdd(tmpNewDate,0));
	thisLic.setStatus("Active");	
	*/
}
