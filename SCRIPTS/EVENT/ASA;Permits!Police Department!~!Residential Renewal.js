// Begin Core Renewal Scripts
if (parentCapId == "undefined" || parentCapId == null) {
	parentCapId = aa.env.getValue("ParentCapID");
}

var vGoodToRenew;
var vOrgCapId;

//Setup/Check renewal
vGoodToRenew = prepareRenewal();
if (parentCapId != null && vGoodToRenew) {
		
	//Copy Parcels from license to renewal
	copyParcels(parentCapId,capId);
	
	//Copy addresses from license to renewal
	copyAddress(parentCapId,capId);
	
	//Copy ASI from license to renewal
	//Using updated function that uses SC for ASI exceptions - EMSE:ASI Copy Exceptions
	/*vOrgCapId = capId; //Save original capId
	capId = parentCapId; //Set global capId variable to parent License. 
	loadAppSpecific(AInfo); //Load license ASI values to array
	copyAppSpecific(vOrgCapId);  //Copy ASI to child renewal record
	capId = vOrgCapId;  //Reset the global capId back to the child renewal records
	AInfo = new Array(); //Resetablish the renewal records ASI array
	loadAppSpecific(AInfo); //Repopulate the renewal records ASI array (now with license information)
	*/
	copyASIInfo(parentCapId,capId);

	//Copy ASIT from license to renewal
	copyASITables(parentCapId,capId);
	
	//Copy Contacts from license to renewal
	copyContacts3_0(parentCapId,capId);
	
	//Copy Work Description from license to renewal
	aa.cap.copyCapWorkDesInfo(parentCapId,capId);

	//Copy application name from license to renewal
	editAppName(getAppName(parentCapId),capId);
}
// End Core Renewal Scripts