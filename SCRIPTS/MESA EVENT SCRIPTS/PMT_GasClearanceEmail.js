// ==================================================================
// Script Number: 102
// Script Name: PMT_GasClearanceEmail.js 
// Script Developer: 
// Script Agency: Accela
// Script Description: When Gas Pipe Final inspection is resulted with "Approved - Utility Clearance Required"
// send email to Company named in Utility Service Info ASIT, Clearance To. 
// Script Run Event: IRSA
// Script Parents:
//	IRSA:Permits/Online/NA/NA
//	IRSA:Permits/Residential/NA/NA
//	IRSA:Permits/Residential/Mobile Home/NA/NA
//	IRSA:Permits/Commercial/NA/NA
//
// This script calls the notification template "GAS CLEARANCE"
// ==================================================================
var fromEmail = "noreply@MesaAz.gov";

if (inspType == "Gas Pipe Final" && inspResult == "Approved - Utl Clearance Req"){
	var vEParams = aa.util.newHashtable();
	var tmpTable = loadASITable("UTILITY SERVICE INFORMATION");
	if (!tmpTable) tmpTable = loadASITable("UTILITY SERVICE INFO");
	if (tmpTable && tmpTable!=null && tmpTable.length > 0) {
		for (rowIndex in tmpTable) {
			thisRow = tmpTable[rowIndex];
			cl = "" + thisRow["Clearance To"].fieldValue;
			clDate = "" + thisRow["Clearance Date"].fieldValue;
			if (cl == "City of Mesa" && clDate != "" && clDate != "null" && clDate != "undefined") {
				cDateJS = new Date(clDate);
				if (cDateJS.getTime() == new Date(sysDateMMDDYYYY).getTime()) {
					addParameter(vEParams,"$$RECORD ID$$",capIDString);
					addParameter(vEParams,"$$CLEARANCE TO$$","City of Mesa");
					addParameter(vEParams,"$$CLEARANCE DATE$$", clDate);
					addParameter(vEParams,"$$SERVICE TYPE$$", "" + thisRow["Service Type"].fieldValue);
					addParameter(vEParams,"$$SERVICE SIZE$$", "" + thisRow["Service Size"].fieldValue);
					addParameter(vEParams,"$$METER SIZE$$", "" + thisRow["Meter Size"].fieldValue);
					addParameter(vEParams,"$$BTU LOAD$$", "" + thisRow["BTU Load"].fieldValue);
					addParameter(vEParams,"$$QTY OF METERS$$", "" + thisRow["Qty of Meters"].fieldValue);
					addParameter(vEParams,"$$WARRANTY STATUS$$", "" + thisRow["Warranty Status"].fieldValue);
					addParameter(vEParams,"$$COMMENTS$$", "" + thisRow["Comments"].fieldValue);
					emailAddress = lookup("Email_Recipients", "PMT_Gas_Clearance_Mesa");
					
					conArr = getContactObjs(capId);
					if (conArr && conArr.length > 0) {
						for (cIndex in conArr) {
							thisContact = conArr[cIndex];
							if (thisContact.type == "Applicant") {
								cEmail = thisContact.people.getEmail();
								if (cEmail && cEmail != "") ccAddress = cEmail;
							}
						}
					}
					sendNotification(fromEmail, emailAddress, ccAddress, "GAS CLEARANCE", vEParams, null, capId);
				}

			} 
			if (cl == "Southwest Gas" && clDate != "" && clDate != "null" && clDate != "undefined") {
				cDateJS = new Date(clDate);
				if (cDateJS.getTime() == new Date(sysDateMMDDYYYY).getTime()) {
					addParameter(vEParams,"$$RECORD ID$$",capIDString);
					addParameter(vEParams,"$$CLEARANCE TO$$","Southwest Gas");
					addParameter(vEParams,"$$CLEARANCE DATE$$", clDate);
					addParameter(vEParams,"$$SERVICE TYPE$$", "" + thisRow["Service Type"].fieldValue);
					addParameter(vEParams,"$$SERVICE SIZE$$", "" + thisRow["Service Size"].fieldValue);
					addParameter(vEParams,"$$METER SIZE$$", "" + thisRow["Meter Size"].fieldValue);
					addParameter(vEParams,"$$BTU LOAD$$", "" + thisRow["BTU Load"].fieldValue);
					addParameter(vEParams,"$$QTY OF METERS$$", "" + thisRow["Qty of Meters"].fieldValue);
					addParameter(vEParams,"$$WARRANTY STATUS$$", "" + thisRow["Warranty Status"].fieldValue);
					addParameter(vEParams,"$$COMMENTS$$", "" + thisRow["Comments"].fieldValue);
					emailAddress = lookup("Email_Recipients", "PMT_Gas_Clearance_Mesa");
					
					conArr = getContactObjs(capId);
					if (conArr && conArr.length > 0) {
						for (cIndex in conArr) {
							thisContact = conArr[cIndex];
							if (thisContact.type == "Applicant") {
								cEmail = thisContact.people.getEmail();
								if (cEmail && cEmail != "") ccAddress = cEmail;
							}
						}
					}
					sendNotification(fromEmail, emailAddress, ccAddress, "GAS CLEARANCE", vEParams, null, capId);
				}
			} 
		}
	}
}