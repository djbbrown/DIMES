/*===================================================================
// Script Number: 132
// Script Name: PMT_TotalSqFt.js
// Script Developer: Bryan de Jesus
// Script Agency: Woolpert
// Script Description: When any is entered into ASIT field “Classification” in ASIT subgroup “Occupancy”, Then auto-fill the ASI field “Total SqFt” with the sum of all the ASIT “Sq Ft” fields.
// Script Run Event: ASIUA
// Script Parents:
//          ASIUA;Permitting!Residential!NA!NA
//			ASIUA;Permitting!Residential!Mobile Home!NA
//			ASIUA;Permitting!Commercial!NA!NA
/*==================================================================*/
//loadASITables();
var OCCUPANCYINFORMATION = loadASITable("OCCUPANCY INFORMATION");
//if (!OCCUPANCYINFORMATION) OCCUPANCYINFORMATION = loadASITable("OCCUPANCY INFO");
if (typeof(OCCUPANCYINFORMATION) == "object"){
	editAppSpecific("Total Sq Ft", sumASITColumn(OCCUPANCYINFORMATION, "Sq Ft"));
} 
else {
	logDebug("Could not get OCCUPANCYINFORMATION table");
}