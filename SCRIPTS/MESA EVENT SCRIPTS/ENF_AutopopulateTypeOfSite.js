/*===================================================================
// Script Number: 18
// Script Name: ENF_AutopopulateTypeOfSite
// Script Developer: Jody Bearden
// Script Agency: Mesa
// Script Description: Auto-fill “Type of Site” based on value of Zoning
//                     District retrieved from GIS. When Zoning District
//                     starts with one of the following values (AG,NC,LC,
//                     GC, OC, MX,PE,DB,DC,PS or ID) or is equal to one
//                     of these (T4MS or T5MSF or T5MS or T6MS),
//                     then Type of Site = “Commercial”.
//
//                     When Zoning District starts with (GI,HI or LI) ,
//                     then Type of Site = “Industrial Site”.
//
//                     When Zoning District starts with (RS,RM,DR,PC or
//                     T3C) or is equal to one of these (T3N or T4N or
//                     T4NF or T5N), then Type of Site = “Residential”
//
// Script Run Event: ASA, ASIUA
// Script Parents:
//             ASA;Enforcement!Environmental!Complaint!~
//             ASIUA;Enforcement!Environmental!Complaint!~
/*==================================================================*/
/* test with ENVC16-00118 */

try
{
	var matched = false; //Zoning district one of the ones specified?
	var tos = ""; // Type of Site

	// get Zoning District from GIS
	var zonDist = getGISInfo("Planning/Zoning", "Zoning Districts", "ZONING");
	logDebug("zonDist: " + zonDist);
	if(zonDist and zonDist != "") {
		logDebug("zonDist: " + zonDist);
		var zd = zonDist.slice(0,2) // grab first to chars
		if (matches(zd, "AG", "NC", "LC", "GC", "OC", "MX", "PE", "DB", "DC", "PS", "ID") || matches(zonDist, "T4MS", "T5MSF", "T5MS", "T6MS")) {
			// Type of Site == "Commercial"
			tos = "Commercial";
		}
		if (matches(zd, "GI", "HI", "LI")) {
			// Type of Site == "Industrial Site"
			tos = "Industrial Site";
		}
		if (matches(zd, "RS", "RM", "DR", "PC") || (zonDist.slice(0,3) == "T3C") || matches(zonDist, "T3N", "T4N", "T4NF", "T5N")) {
			// Type of Site == "Residential"
			tos = "Residential";
		}
	}
	
	if (matched == true) {
		// set Type of Site
		logDebug("Type of Site (before): " + getAppSpecific("Type of Site"));
		editAppSpecific("Type of Site", tos);
		logDebug("Type of Site (after): " + getAppSpecific("Type of Site"));
	}
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}
