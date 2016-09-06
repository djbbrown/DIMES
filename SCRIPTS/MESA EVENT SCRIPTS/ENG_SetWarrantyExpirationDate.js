/*===================================================================
// Script Number: 060
// Script Name: ENG_SetWarrantyExpirationDate.js
// Script Developer: Jody Bearden
// Script Agency: Mesa
// Script Description: When the workflow task "LOA" is set to a status
//                     of "Letter Sent" set the ASI field "Warranty
//                     Expiration Date" to 100 days from the status date.
// Script Run Event: WTUA
// Script Parents:
//		WTUA;Engineering!Right of Way!~!~
//             
/*==================================================================*/

/* test with: ROW16-00005 */

try
{
	//mkyOutput += "wfTask.equals(LOA): "+wfTask.equals("LOA")+" \r";
	logDebug("wfTask.equals(LOA): "+wfTask.equals("LOA"));
	//mkyOutput += "wfStatus.equals(Letter Sent):"+wfStatus.equals("Letter Sent")+" \r";
	logDebug("wfStatus.equals(Letter Sent):"+wfStatus.equals("Letter Sent"));

	if (wfTask.equals("LOA") && wfStatus.equals("Letter Sent")) {
		var tsDate = taskStatusDate("LOA");
		// set ASI field for Warranty Expiration Date to 100 days from the status date
		var expDate = dateAdd(tsDate, 100);	
		editAppSpecific("Warranty Expiration Date", expDate);
	}
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}
