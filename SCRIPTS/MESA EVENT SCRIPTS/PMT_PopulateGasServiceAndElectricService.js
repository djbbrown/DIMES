/*===================================================================
// Script Number: 347
// Script Name: PMT_PopulateGasServiceAndElectricService.js
// Script Developer: Jody Bearden
// Script Agency: Mesa
// Script Description: 	Retrieve from GIS the following AccelaTags:  COME, COMG, SRPE and SWGA. 
//                      1)  If COME is found, populate field "Electric Service" with the value of 'City of Mesa Electric'. 
//                      2)  If COMG is found, populate field "Gas Service" with the value of 'City of Mesa Gas'.
//                      3)  If SRPE is found, populate field "Electric Service" with the value of 'Salt River Project Electric'. 
//                      4)  If SWGA is found, populate field "Gas Service" with the value of 'Southwest Gas'.
//                      5)  If both COME and SRPE are found, populate field "Electric Service" with the value of 'City of Mesa Electric'. 
//                      6)  If both COMG and SWGA are found, populate field "Gas Service" with the value of 'City of Mesa Gas'.
//                      Fire when address or parcel is selected during application.
// Script Run Event: ASA
// Script Parents:
//		ASA;Permits!Online!NA!NA
//             
/*==================================================================*/

/* test with PMT16-00588 */

try
{
	// init flags to false - these get set to true if their corresponding tags are returned from the map service
	var mesaElectric = false;
	var mesaGas = false;
	var srpElectric = false;
	var swGas = false;
	
	// values we'll be pushing into the ASI fields for "Electric Service" and "Gas Service"
	//	init to empty (if the GIS call succeeds, we'll have good values to push, otherwise,
	//	send an empty string rather than defaulting to something misleading.
	var electService = "";
	var gasService = "";
	
	// get tags from GIS
	var tags = getGISInfoArray("Accela/AccelaTAGS", "Accela_TAGS", "Accela_TAGS.TAG");
	//logDebug("tags: " + tags);
	if (tags) { // success - not null or false, so we've got something
		for (tag in tags) {
			//logDebug("tag: " + tags[tag].toUpperCase());
			var tagVal = tags[tag];
			
			// update vars if tags are matched (tried a switch statement, but doesn't seem to work in Accela ... always went to 'default' branch, even when tag values should have matched)
			if (matches(tagVal, "COME")) { mesaElectric = true; /* logDebug("COME matched"); */ }
			if (matches(tagVal, "COMG")) { mesaGas = true; /* logDebug("COMG matched"); */ }
			if (matches(tagVal, "SRPE")) { srpElectric = true; /* logDebug("SRPE matched */ }
			if (matches(tagVal, "SWGA")) { swGas = true; /* logDebug("SWGA matched"); */ }
			//if (!matches(tagVal, "COME", "COMG", "SRPE", "SWGA")) {/* logDebug("non-matched value: " + tagVal); */ }
		}
	}

	/* if we didn't get a value for either Mesa or other (e.g. error with service) don't set these to anything */
	electService = mesaElectric ? "City of Mesa Electric" : (srpElectric ? "Salt River Project Electric" : "");
	gasService = mesaGas ? "City of Mesa Gas" : (swGas ? "Southwest Gas" : "");
/*	
	logDebug("mesaElectric: " + mesaElectric);
	logDebug("mesaGas: " + mesaGas);
	logDebug("srpElectric: " + srpElectric);
	logDebug("swGas: " + swGas);
	logDebug("electService: " + electService);
	logDebug("gasService: " + gasService);
	
	logDebug("(Pre) Gas Service: " + getAppSpecific("Gas Service"));
	logDebug("(Pre) Electric Service: " + getAppSpecific("Electric Service"));
	
	logDebug("Updating Gas Service to: " + gasService);
	logDebug("Updating Electric Service to: " + electService);
*/
	/* set ASI fields for "Gas Service" and "Electric Service" */
	editAppSpecific("Gas Service", gasService);
	editAppSpecific("Electric Service", electService);
/*	
	logDebug("(Post) Gas Service: " + getAppSpecific("Gas Service"));
	logDebug("(Post) Electric Service: " + getAppSpecific("Electric Service"));
*/	
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}
