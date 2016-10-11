/*===================================================================
// Script Number: 97
// Script Name: PMT_AssessTechFee.js
// Script Developer: Bryan de Jesus
// Script Agency: Woolpert
// Script Description:  4% of all fees combined excluding impact fees with an $800 cap. Fee code = ONL020,  fee schedule = PMT_ONL 
// Script Run Event: WTUA
// Script Parents:
//         	WTUA;Permits!Commercial!NA!NA
//			WTUA;Permits!Residential!NA!NA
//			WTUA;Permits!Sign!NA!NA
//			WTUA;Permits!Online!NA!NA
===================================================================*/
/*if (appMatch("Permits/Online/NA/NA") && wfTask == "Application Submittal" && wfStatus == "Ready To Issue"){
	updateFee("ONL020", "PMT_ONL", "FINAL", 1, "N");
} else //*/
	if (appMatch("Permits/Sign/NA/NA") && (wfTask == "Application Submittal" && wfStatus == "Accepted - Plan Review Not Req") || (wfTask == "Plans Coordination" && wfStatus == "Ready to Issue")){
	updateFee("SGN040", "PMT_SIGNS", "FINAL", 1, "N");
} else if (appMatch("Permits/Residential/NA/NA") && wfTask == "Plans Coordination" && wfStatus == "Ready to Issue"){
	updateFee("RES160", "PMT_RES", "FINAL", 1, "N");
} else if (appMatch("Permits/Commercial/NA/NA") && wfTask == "Plans Coordination" && wfStatus == "Ready to Issue"){
	updateFee("COM120", "PMT_COM", "FINAL", 1, "N");
}