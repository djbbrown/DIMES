/*===================================================================
// Script Number: 413
// Script Name: PMT_AFP_Inspectors_Email.js
// Script Description: 	Email to be sent AFP Inspectors when a Commercial Permit that has an AFP parent is issued.
// Script Run Event: WTUA
// Script Parents:WTUA;Permits!Commercial!NA!NA.js
// WTUA;Permits!Commercial!NA!NA.js
// Version   |Date      |Engineer         |Details
//  1.0      |05/11/17  |Steve Allred     |Initial Release
/*==================================================================*/

try {
		//logDebug("parentCapId.customID = " + parentCapId.customID);

		if (parentCapId.customID != "undefined" && parentCapId.customID != null) { 

			var FromEmail = "noreply@mesaaz.gov";
			var ToEmail = "AFPInspectors@mesaaz.gov";
			//var ToEmail = "steve.allred@mesaaz.gov";
			var vEParams = aa.util.newHashtable();

			//Add Params
			addParameter(vEParams,"$$RECORDID$$",capIDString);

			//Send email
			if (wfTask == "Permit Issuance" && wfStatus == "Issued") {
				//check for AFP Parent
				if (parentCapId.customID.substring(0,3) == "AFP") {
					sendNotification(FromEmail, ToEmail, "", "PMT_AFP_INSPECTORS", vEParams, null, capId);    
				}
			}
		}
	}
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }