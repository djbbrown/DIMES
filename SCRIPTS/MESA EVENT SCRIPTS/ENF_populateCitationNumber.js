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
//            ASA;AnimalControl!Complaint!NA!NA
//            ASIUA;AnimalControl!Complaint!NA!NA
/*==================================================================*/


if(matches(""+appTypeArray[1], "Case") && matches(""+appTypeArray[2], "Code Compliance", "Code Rental Issue", "Code Sign Issue"))
{
  //update citation number on ASIT/ENF_COD,ENF_COR,ENF_COS/VIOLATION INFORMATION/
  violationInfoTable = loadASITable("VIOLATION INFORMATION");
  newTable = new Array();
  for(var eachRow in violationInfoTable){
    thisRow = violationInfoTable[eachRow];
    newRow = new Array();
    newRow["Violation Type"] = new asiTableValObj("Violation Type", thisRow["Violation Type"].fieldValue, "Y");
    newRow["Violation Description"] = new asiTableValObj("Violation Description", thisRow["Violation Description"].fieldValue, "Y");
    newRow["Violation Code"] = new asiTableValObj("Violation Code", thisRow["Violation Code"].fieldValue, "Y");
    newRow["Violation Ordinance"] = new asiTableValObj("Violation Ordinance", thisRow["Violation Ordinance"].fieldValue, "N");
    newRow["Corrective Action"] = new asiTableValObj("Corrective Action", thisRow["Corrective Action"].fieldValue, "N");
    newRow["Status"] = new asiTableValObj("Status", thisRow["Status"].fieldValue, "N");
    newRow["Date Opened"] = new asiTableValObj("Date Opened", thisRow["Date Opened"].fieldValue, "N");
    newRow["Date Closed"] = new asiTableValObj("Date Closed", thisRow["Date Closed"].fieldValue, "N");
    newRow["Issue Citation?"] = new asiTableValObj("Issue Citation?", thisRow["Issue Citation?"].fieldValue, "N");

    if(
      (thisRow["Citation Number"] == null || thisRow["Citation Number"] == "") 
      && 
      (thisRow["Issue Citation?"] == "Yes" || thisRow["Issue Citation?"] == "Y"))
    {
			nextNumber = getNextSequence("Agency", "Citation Number Sequence", "Citation Number Mask");
			newRow["Citation Number"] = new asiTableValObj("Citation Number", "" + nextNumber, "N");
		}
		else{
			newRow["Citation Number"] = new asiTableValObj("Citation Number", thisRow["Citation Number"].fieldValue, "N");
		}
		newRow["Disposition"] = new asiTableValObj("Disposition", thisRow["Disposition"].fieldValue, "N");
		newRow["Inspection Notes"] = new asiTableValObj("Inspection Notes", thisRow["Inspection Notes"].fieldValue, "N");
		newRow["Fine Amount"] = new asiTableValObj("Fine Amount", thisRow["Fine Amount"].fieldValue, "N");
		newRow["Date of Violation"] = new asiTableValObj("Date of Violation", thisRow["Date of Violation"].fieldValue, "N");
		newRow["Responsible Party"] = new asiTableValObj("Responsible Party", thisRow["Responsible Party"].fieldValue, "N");
		newTable.push(newRow);
	}
	removeASITable("VIOLATION INFORMATION");
	addASITable("VIOLATION INFORMATION", newTable);
}

if(matches(""+appTypeArray[1], "Environmental") && matches(""+appTypeArray[2], "Complaint")){//update citation number on ASIT/ENF_ENV/VIOLATION INFORMATION
	violationInfoTable = loadASITable("VIOLATION INFORMATION");
	newTable = new Array();
	for(var eachRow in violationInfoTable){
		thisRow = violationInfoTable[eachRow];
		newRow = new Array();
		newRow["Violation Type"] = new asiTableValObj("Violation Type", thisRow["Violation Type"].fieldValue, "Y");
		newRow["Violation Description"] = new asiTableValObj("Violation Description", thisRow["Violation Description"].fieldValue, "Y");
		newRow["Violation Code"] = new asiTableValObj("Violation Code", thisRow["Violation Code"].fieldValue, "Y");
		newRow["Violation Ordinance"] = new asiTableValObj("Violation Ordinance", thisRow["Violation Ordinance"].fieldValue, "N");
		newRow["Status"] = new asiTableValObj("Status", thisRow["Status"].fieldValue, "N");
		newRow["Date Opened"] = new asiTableValObj("Date Opened", thisRow["Date Opened"].fieldValue, "N");
		newRow["Date Closed"] = new asiTableValObj("Date Closed", thisRow["Date Closed"].fieldValue, "N");
		newRow["Issue Citation?"] = new asiTableValObj("Issue Citation", thisRow["Issue Citation?"].fieldValue, "N");
		if((thisRow["Citation Number"] == null || thisRow["Citation Number"] == "") && (thisRow["Issue Citation?"] == "Yes" || thisRow["Issue Citation?"] == "Y")){
			nextNumber = getNextSequence("Agency", "Citation Number Sequence", "Citation Number Mask");
			newRow["Citation Number"] = new asiTableValObj("Citation Number", "" + nextNumber, "N");
		}
		else{
			newRow["Citation Number"] = new asiTableValObj("Citation Number", thisRow["Citation Number"].fieldValue, "N");
		}
		newRow["Disposition"] = new asiTableValObj("Disposition", thisRow["Disposition"].fieldValue, "N");
		newRow["Required Corrective Actions"] = new asiTableValObj("Required Corrective Actions", thisRow["Required Corrective Actions"].fieldValue, "N");
		newRow["Corrective Actions Taken"] = new asiTableValObj("Corrective Actions Taken", thisRow["Corrective Actions Taken"].fieldValue, "N");
		newRow["Date of Corrective Actions"] = new asiTableValObj("Date of Corrective Actions", thisRow["Date of Corrective Actions"].fieldValue, "N");
		newRow["Enforcement Action"] = new asiTableValObj("Enforcement Action", thisRow["Enforcement Action"].fieldValue, "N");
		newRow["Date of Enforcement Action"] = new asiTableValObj("Date of Enforcement Action", thisRow["Date of Enforcement Action"].fieldValue, "N");
		newRow["Enforcement Action Result"] = new asiTableValObj("Enforcement Action Result", thisRow["Enforcement Action Result"].fieldValue, "N");
		newTable.push(newRow);
	}
	removeASITable("VIOLATION INFORMATION");
	addASITable("VIOLATION INFORMATION", newTable);
}

if(matches(""+appTypeArray[0], "AnimalControl") && matches(""+appTypeArray[1], "Complaint")){//update citation number on ASIT/ENF_ANIMAL/VIOLATION INFORMATION
	violationInfoTable = loadASITable("VIOLATION INFORMATION");
	newTable = new Array();
	for(var eachRow in violationInfoTable){
		thisRow = violationInfoTable[eachRow];
		newRow = new Array();
		newRow["Violation Type"] = new asiTableValObj("Violation Type", thisRow["Violation Type"].fieldValue, "Y");
		newRow["Violation Description"] = new asiTableValObj("Violation Description", thisRow["Violation Description"].fieldValue, "Y");
		newRow["Violation Code"] = new asiTableValObj("Violation Code", thisRow["Violation Code"].fieldValue, "Y");
		newRow["Violation Detail"] = new asiTableValObj("Violation Detail", thisRow["Violation Detail"].fieldValue, "N");
		newRow["Violation Ordinance"] = new asiTableValObj("Violation Ordinance", thisRow["Violation Ordinance"].fieldValue, "N");
		newRow["Status"] = new asiTableValObj("Status", thisRow["Status"].fieldValue, "N");
		newRow["Date Opened"] = new asiTableValObj("Date Opened", thisRow["Date Opened"].fieldValue, "N");
		newRow["Date Closed"] = new asiTableValObj("Date Closed", thisRow["Date Closed"].fieldValue, "N");
		newRow["Issue Citation?"] = new asiTableValObj("Issue Citation", thisRow["Issue Citation?"].fieldValue, "N");
		newRow["Citation Category"] = new asiTableValObj("Citation Category", thisRow["Citation Category"].fieldValue, "N");
		if((thisRow["Citation Number"] == null || thisRow["Citation Number"] == "") && (thisRow["Issue Citation?"] == "Yes" || thisRow["Issue Citation?"] == "Y") && thisRow["Citation Category"] == "Title 8"){
			nextNumber = getNextSequence("Agency", "Citation Number Sequence", "Citation Number Mask");
			newRow["Citation Number"] = new asiTableValObj("Citation Number", "" + nextNumber, "N");
		}
		else{
			newRow["Citation Number"] = new asiTableValObj("Citation Number", thisRow["Citation Number"].fieldValue, "N");
		}
		newRow["Disposition"] = new asiTableValObj("Disposition", thisRow["Disposition"].fieldValue, "N");
		newRow["Inspection Notes"] = new asiTableValObj("Required Corrective Actions", thisRow["Required Corrective Actions"].fieldValue, "N");
		newRow["Date of Violation"] = new asiTableValObj("Date of Corrective Actions", thisRow["Date of Corrective Actions"].fieldValue, "N");
		newRow["Citation Issued To"] = new asiTableValObj("Citation Issued To", thisRow["Citation Issued To"].fieldValue, "N");
		newTable.push(newRow);
	}
	removeASITable("VIOLATION INFORMATION");
	addASITable("VIOLATION INFORMATION", newTable);
}
