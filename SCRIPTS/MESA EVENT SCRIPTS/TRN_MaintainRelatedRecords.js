/*===================================================================
// Script Number: 054
// Script Name:TRN_MaintainRelatedRecords.js
// Script Developer: Raminder Gill
// Script Agency: Accela
// Script Description: Maintain related records - ROW and UTL Permit numbers
// Script Run Event: ASA, ASIUA
// Script Parents:
//	IRSA;Transportation!Temporary Traffic Control!~!~           
/*==================================================================*/

var rowPermit = getAppSpecific("ROW Permit No.");
var UtlPermit = getAppSpecific("UTL Permit No.");
var associatedPermitType = getAppSpecific("Associated Work Permit Type");

if (associatedPermitType == "None") {
	pArr = getParents("Engineering/*/*/*");
	if (pArr && pArr.length > 0) {
		for (pIndex in pArr) 
			removeParent(pArr[pIndex].getCustomID());
	}
}

if (associatedPermitType == "ROW - Right-of-Way") {
	var rowPermitCapId = aa.cap.getCapID(rowPermit).getOutput();
	if (!isParent(rowPermit)) {
   		addParent(rowPermitCapId)
    }
	pArr = getParents("Enginnering/Utilities/*/*");
	if (pArr && pArr.length > 0) {
		for (pIndex in pArr) 
			removeParent(pArr[pIndex].getCustomID());
	}
}

if (associatedPermitType == "UTL - Utility") {
	var UtlPermitCapId = aa.cap.getCapID(UtlPermit).getOutput();
    if (!isParent(UtlPermit)) {
   		addParent(UtlPermitCapId)
    }
    pArr = getParents("Enginnering/Right of Way/*/*");
	if (pArr && pArr.length > 0) {
		for (pIndex in pArr) 
			removeParent(pArr[pIndex].getCustomID());
	}
}






