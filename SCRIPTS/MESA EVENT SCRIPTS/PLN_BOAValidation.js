/*===================================================================
// Script Number: 333
// Script Name: PLN_BOAValidation.js
// Script Developer: Jody Bearden
// Script Agency: Mesa
// Script Description: At application submittal in AA or ACA:
//                       Record id found in ASI field "Pre-App Record"
//                       must exist in the database and Pre-App record
//                       creation date must be less than 2 years old.
//
// Script Run Event: ASB
// Script Parents:
//            ASB;Planning!Board of Adjustment!NA!NA
===================================================================*/
/* test with BOA16-00329 */

try
{
	var preAppExists = false;
	var preAppNewerThan2YearsAgo = false;
	var twoYearsAgo = getTwoYearsAgo();	// comparison date
	var recID = getAppSpecific("Pre-App Record");
	
	if (recID) {  // got ASI value - see if record exists
		var preAppCapID = aa.cap.getCapID(recID).getOutput();

		if (preAppCapID != null) { // record exists
			preAppExists = true;
			var preAppRec = aa.cap.getCap(preAppCapID).getOutput();
			
			if (preAppRec != null) {
				var recDate = convertDate(preAppRec.getFileDate()); // get creation date
				if (recDate > twoYearsAgo) { preAppNewerThan2YearsAgo = true; } // is record newer than 2 years ago?
			}
		}
	}
	
/*
	logDebug("recID: " + recID);
	logDebug("preAppCapID: " + preAppCapID);
	logDebug("preAppExists: " + preAppExists);
	logDebug("preAppNewerThan2YearsAgo: " + preAppNewerThan2YearsAgo);
	logDebug("recDate: " + recDate);
*/
	
	if (!(preAppExists && preAppNewerThan2YearsAgo)) {
		showMessage = true;
		comment("Pre-App Record must exist, and be less than 2 years old.");
		cancel = true;
	}
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}

function getTwoYearsAgo() {
	var date = new Date();
	date.setFullYear(date.getFullYear() - 2);
	return date;
}