// Script ASIUA;Enforcement!~!~!~.js
include("ENF_populateCitationNumber");

//ID-199: On ASA and ASIUA, check the rows in the VIOLATION INFORMATION ASIT and create a row in the CITATION CHECKLIST ASIT for each. The column Citation Number in the VIOLATION INFORMATION ASIT should be used to populate the same column in the CITATION CHECKLIST ASIT.
try{
	updateViolationInfoCustomList();
}catch (err){
	logDebug("A JavaScript Error occurred: ASA:Enforcement/*/*/*: ID-199: " + err.message);
}