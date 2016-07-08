// Script ASA;AnimalControl!Complaint!NA!NA.js
include("ENF_populateCitationNumber");//This script must run before updateViolationInfoCustomList

//ID-199: On ASA and ASIUA, check the rows in the VIOLATION INFORMATION ASIT and create a row in the CITATION CHECKLIST ASIT for each. The column Citation Number in the VIOLATION INFORMATION ASIT should be used to populate the same column in the CITATION CHECKLIST ASIT. This script is dependent on script ENF_populateCitationNumber
try{
	updateViolationInfoCustomList();
}catch (err){
	logDebug("A JavaScript Error occurred: ASA:Enforcement/*/*/*: ID-199: " + err.message);
}