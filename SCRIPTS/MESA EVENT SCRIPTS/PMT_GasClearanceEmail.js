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
//
// Version   |Date      |Engineer         |Details
//  1.0      |Unknown   |Accela   		  |Initial Release
//  2.0      |09/27/16  |Steve Veloudos   |Added Address
// ==================================================================
var fromEmail = "noreply@MesaAz.gov";

if (inspType == "Gas Pipe Final" && inspResult == "Approved - Utl Clearance Req"){

	//Get the address
	var capAddResult = aa.address.getAddressByCapId(capId);
	if (capAddResult.getSuccess())
	{
	var addrArray = new Array();
	var addrArray = capAddResult.getOutput();
	if (addrArray.length==0 || addrArray==undefined)
		{
		logDebug("The current CAP has no address.")
		}

	//Break Out each element of the address
	var hseNum = addrArray[0].getHouseNumberStart();
	var streetDir = addrArray[0].getStreetDirection();
	var streetName = addrArray[0].getStreetName();
	var streetSuffix = addrArray[0].getStreetSuffix();
	var zip = addrArray[0].getZip();

	var theAddress = hseNum + " " + streetDir + " " + streetName + " " + streetSuffix;
	}	
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
					addParameter(vEParams,"$$ADDRESS$$",theAddress);
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

					//Get the address
					var capAddResult = aa.address.getAddressByCapId(capId);
					if (capAddResult.getSuccess())
					{
					var addrArray = new Array();
					var addrArray = capAddResult.getOutput();
					if (addrArray.length==0 || addrArray==undefined)
						{
						logDebug("The current CAP has no address.")
						}

					//Break Out each element of the address
					var hseNum = addrArray[0].getHouseNumberStart();
					var streetDir = addrArray[0].getStreetDirection();
					var streetName = addrArray[0].getStreetName();
					var streetSuffix = addrArray[0].getStreetSuffix();
					var zip = addrArray[0].getZip();

					var theAddress = hseNum + " " + streetDir + " " + streetName + " " + streetSuffix;
					}
					addParameter(vEParams,"$$RECORD ID$$",capIDString);
					addParameter(vEParams,"$$ADDRESS$$",theAddress);
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