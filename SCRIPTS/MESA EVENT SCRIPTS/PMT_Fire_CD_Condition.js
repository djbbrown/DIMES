/*===================================================================
// Script Number: 412 - New Requirement at WTUA
// Script Name: PMT_Fire_CD_Condition.js
// Script Developer: Steve Allred
// Script Agency: Accela
// Script Description:  If record is Commercial add the "Fire CD Required to Issue Permit" standard condition. 
// Script Run Event: WTUA
// Script Parents:
//			WTUA;Permits!Commercial!NA!NA
===================================================================
// MODIFICATIONS:
// DATE      ENGINEER         DESCRIPTION
// 09/20/17  Steve Allred     SP #21 - Changed name of condition.
//
===================================================================
//*/
//showDebug = true;
try{
    var recordAppType = appTypeArray[1];
	
	if  (recordAppType == "Commercial")	addStdCondition("Building Permit","Fire CAD Drawings Required to Issue Permit");
}
catch (err){
	logDebug("A JavaScript Error occured: " + err.message);
}