/*===================================================================
// Script Number: 38
// Script Name: ENF_EnforcementCaseDuplicate.js
// Script Developer: Bryan de Jesus
// Script Agency: Woolpert
// Script Description: On record submittal, If the current record is determined to be a duplicate (address, record type). then deactivate the workflow, set the record status to closed and send a email notification to the contact of type Complainant using email template "Duplicate records". 
// Script Run Event: ASA 
// Script Parents:
//            ASA;Enforcement!Case!~!~
/*==================================================================*/
// check for same record type and address to this one
try {

	var capIds = capIdsGetByAddr();
	var matches=0;
	if (capIds && capIds.length > 1){
		logDebug(capIds.length);
		for (i in capIds){
			if (capId.toString() == capIds[i].toString()) continue;
			if (appMatch(appTypeString, capIds[i])){
				matches++;
				var table = loadASITable("VIOLATION INFORMATION", capIds[i]);
				for (row in table){
					if (table[row]["Status"] == "Open"){
						logDebug("Violation " + table[row]["Violation Description"] + " is open");
						// deactivate entire workflow
						var tasksResult = aa.workflow.getTasks(capId);
						if (tasksResult.getSuccess()){
							var tasks = tasksResult.getOutput();
							for (task in tasks){
								deactivateTask(tasks[task].getTaskDescription());
							}
						}
						
						// set app status to 'Closed'
						updateAppStatus("Closed", "Potential duplicate");
						
						// send notification to Complaintant
						var contacts = getContactArray(), emailAddress = "";
						for (contact in contacts){					
							if (contacts[contact]["contactType"] == "Complaintant"){
								emailAddress = contacts[contact]["email"];
								break;
							}
						}
						if (!!emailAddress){
							logDebug("Notifying " + emailAddress);
							var vEParams = aa.util.newHashtable();
							var addressResult = aa.address.getAddressByCapId(capId);
							if (addressResult.getSuccess()){
								var address = addressResult.getOutput();
								addParameter(vEParams,"$$Address$$", address.toString());
							}
							var searchUrl = "https://aca.supp.accela.com/mesa/Cap/GlobalSearchResults.aspx?QueryText=" + capId.getCustomID();
							addParameter(vEParams, "$$URL of the active case$$", searchUrl);
							sendNotification("", emailAddress, "", "Duplicate records", vEParams, null, capId);
						}
						
						// create new entry in communication log of existing record
						var newLogEntry = new Array();
						var currentDate = new Date();
						var currentTime = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
						
						newLogEntry["Communication Date"] = new asiTableValObj("Communication Date", jsDateToMMDDYYYY(currentDate), "N");
						newLogEntry["Communication Time"] = new asiTableValObj("Communication Time", currentTime, "N");
						newLogEntry["Communication Type"] = new asiTableValObj("Communication Type", "Email", "N");
						newLogEntry["Code Staff Initials"] = new asiTableValObj("Code Staff Initials", "EMSE", "N");
						newLogEntry["Contact Name"] = new asiTableValObj("Contact Name", emailAddress, "N");
						
						var workDescResult = aa.cap.getCapWorkDesByPK(capId);
						if (workDescResult.getSuccess()){
							var workDesc = workDescResult.getOutput();
							newLogEntry["Summary of Communication"] = new asiTableValObj("Summary of Communication", workDesc.getDescription(), "N");
						}
						addToASITable("COMMUNICATION LOG", newLogEntry); 
						
						break;
					}
				}
			}
		}
		logDebug(appTypeString + " Matches: " + matches);
	}
}
catch (err) {
		logDebug("A JavaScript Error occured: " + err.message);
}