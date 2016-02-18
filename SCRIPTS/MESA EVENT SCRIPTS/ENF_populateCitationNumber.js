/*===================================================================
// Script Number: 24
// Script Name: ENF_populateCitationNumber.js
// Script Developer: Chris Godwin
// Script Agency: Woolpert
// Script Description: Populate Citation Number from next sequence Agency Mask "Citation Number Mask".
// Script Run Event: ASA, ASIUA
// Script Parents:
//            ASA;Enforcement!~!~!~
//            ASIUA;Enforcement!~!~!~
/*==================================================================*/

eval( aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput().getScriptByPK(aa.getServiceProviderCode(),"INCLUDES_WEB_SERVICES","ADMIN").getScriptText() + "");

if(matches(""+appTypeArray[1], "Case") && !matches(""+appTypeArray[2], "Building Issues")){//update citation number on ASIT/ENF_COD,ENF_COR,ENF_COS/VIOLATION INFORMATION/
	violationInfoTable = loadASITable("VIOLATION INFORMATION");
	newTable = new Array();
	for(var eachRow in violationInfoTable){
		thisRow = violationInfoTable[eachRow];
		newRow = new Array();
		newRow["Violation Type"] = new asiTableValObj("Violation Type", thisRow["Violation Type"].fieldValue, "N");
		newRow["Violation Description"] = new asiTableValObj("Violation Description", thisRow["Violation Description"].fieldValue, "N");
		newRow["Violation Code"] = new asiTableValObj("Violation Code", thisRow["Violation Code"].fieldValue, "N");
		newRow["Violation Ordinance"] = new asiTableValObj("Violation Ordinance", thisRow["Violation Ordinance"].fieldValue, "N");
		newRow["Corrective Action"] = new asiTableValObj("Corrective Action", thisRow["Corrective Action"].fieldValue, "N");
		newRow["Status"] = new asiTableValObj("Status", thisRow["Status"].fieldValue, "N");
		newRow["Date Opened"] = new asiTableValObj("Date Opened", thisRow["Date Opened"].fieldValue, "N");
		newRow["Date Closed"] = new asiTableValObj("Date Closed", thisRow["Date Closed"].fieldValue, "N");
		if(thisRow["Citation Number"] == null || thisRow["Citation Number"] == ""){
			sessID = getSessionID();
			nextNumber = getNextMaskedSeq(sessID, "Citation Number Mask", "Citation Number Sequence", "Agency");
			newRow["Citation Number"] = new asiTableValObj("Citation Number", "" + nextNumber, "N");
		}
		else{
			newRow["Citation Number"] = new asiTableValObj("Citation Number", thisRow["Citation Number"].fieldValue, "N");
		}
		newRow["Dispostion"] = new asiTableValObj("Dispostion", thisRow["Dispostion"].fieldValue, "N");
		newRow["Inspection Notes"] = new asiTableValObj("Inspection Notes", thisRow["Inspection Notes"].fieldValue, "N");
		newRow["Fine Amount"] = new asiTableValObj("Fine Amount", thisRow["Fine Amount"].fieldValue, "N");
		newRow["Date of Violation"] = new asiTableValObj("Date of Violation", thisRow["Date of Violation"].fieldValue, "N");
		newRow["Responsible Party"] = new asiTableValObj("Responsible Party", thisRow["Responsible Party"].fieldValue, "N");
		newTable.push(newRow);
	}
	removeASITable("VIOLATION INFORMATION");
	addASITable("VIOLATION INFORMATION", newTable);
}

if(matches(""+appTypeArray[1], "Environmental")){//update citation number on ASIT/ENF_ENV/VIOLATION INFORMATION
	violationInfoTable = loadASITable("VIOLATION INFORMATION");
	newTable = new Array();
	for(var eachRow in violationInfoTable){
		thisRow = violationInfoTable[eachRow];
		newRow = new Array();
		newRow["Violation Type"] = new asiTableValObj("Violation Type", thisRow["Violation Type"].fieldValue, "N");
		newRow["Violation Description"] = new asiTableValObj("Violation Description", thisRow["Violation Description"].fieldValue, "N");
		newRow["Violation Code"] = new asiTableValObj("Violation Code", thisRow["Violation Code"].fieldValue, "N");
		newRow["Violation Ordinance"] = new asiTableValObj("Violation Ordinance", thisRow["Violation Ordinance"].fieldValue, "N");
		newRow["Status"] = new asiTableValObj("Status", thisRow["Status"].fieldValue, "N");
		newRow["Date Opened"] = new asiTableValObj("Date Opened", thisRow["Date Opened"].fieldValue, "N");
		newRow["Date Closed"] = new asiTableValObj("Date Closed", thisRow["Date Closed"].fieldValue, "N");
		newRow["Issue Citation"] = new asiTableValObj("Issue Citation", thisRow["Issue Citation"].fieldValue, "N");
		if(thisRow["Citation Number"] == null || thisRow["Citation Number"] == ""){
			sessID = getSessionID();
			nextNumber = getNextMaskedSeq(sessID, "Citation Number Mask", "Citation Number Sequence", "Agency");
			newRow["Citation Number"] = new asiTableValObj("Citation Number", "" + nextNumber, "N");
		}
		else{
			newRow["Citation Number"] = new asiTableValObj("Citation Number", thisRow["Citation Number"].fieldValue, "N");
		}
		newRow["Dispostion"] = new asiTableValObj("Dispostion", thisRow["Dispostion"].fieldValue, "N");
		newRow["Required Corrective Actions"] = new asiTableValObj("Required Corrective Actions", thisRow["Required Corrective Actions"].fieldValue, "N");
		newRow["Corrective Actions Taken"] = new asiTableValObj("Corrective Actions Taken", thisRow["Corrective Actions Taken"].fieldValue, "N");
		newRow["Date of Corrective Actions"] = new asiTableValObj("Date of Corrective Actions", thisRow["Date of Corrective Actions"].fieldValue, "N");
		newTable.push(newRow);
	}
	removeASITable("VIOLATION INFORMATION");
	addASITable("VIOLATION INFORMATION", newTable);
}