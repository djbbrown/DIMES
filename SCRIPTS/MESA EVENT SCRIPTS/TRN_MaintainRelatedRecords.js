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

var rowPermitCapId = aa.cap.getCapID(rowPermit).getOutput();
var UtlPermitCapId = aa.cap.getCapID(UtlPermit).getOutput();

//check if these values exist as permits
if (rowPermit != null && rowPermit != "") {
   if (!isParent(rowPermit)) {
   		addParent(rowPermitCapId)
   }
}

if (UtlPermit != null && UtlPermit != "") {
   if (!isParent(UtlPermit)) {
   		addParent(UtlPermitCapId)
   }
}






