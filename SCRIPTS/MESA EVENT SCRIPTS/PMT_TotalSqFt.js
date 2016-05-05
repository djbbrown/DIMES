/*===================================================================
// Script Number: 132
// Script Name: PMT_TotalSqFt.js
// Script Developer: Bryan de Jesus
// Script Agency: Woolpert
// Script Description: If ASI field "Is the structure attached in any 
// 		way to another structure?" is "Yes" then applicant should not 
//		be allowed to submit application. Instead they would need to 
//		apply for a Remodel permit.
// Script Run Event: ASIUA
// Script Parents:
//          ASIUA;Permitting!Residential!NA!NA
//			ASIUA;Permitting!Residential!Mobile Home!NA
//			ASIUA;Permitting!Commercial!NA!NA
/*==================================================================*/
showDebug = true;
var tObj = loadASITable("OCCUPANCY INFORMATION");
if (tObj){
	logDebug(tObj);
} else {
	logDebug("Could not get table");
}
//for (var i=0; i<tObj.length; i++){
//	logDebug("Row: " + i);
//	for (key in tObj[i]){
//		logDebug(key + ": " + tObj[i][key]);
//	}
//}
//logDebug(sumASITColumn(tObj, "Sq Ft"));