/*===================================================================
// Script Number: 119
// Script Name: PMT_Annual_Facilities_Expiration.js
// Script Developer: MaryRose Schultz
// Script Agency: Mesa
// Script Description: Update ASI "Permit Expiration Date"  based on WF task/status
// Script Run Event: WTUA
// Script Parents:
//    WTUA;Permits!Commercial!Annual Facilities!NA
//           
// update: jb, 8/8/2016 - update script to fire when WF task "Permit Issuance" status set to "Permit Issued".
//
/*==================================================================*/

if (wfTask.equals("Permit Issuance") && wfStatus.equals("Issued")) {
	
	// get current year from today's date
    var d = new Date();
    var exp_year = d.getFullYear();
    
	// set ASI field for expiration date to last day (Dec 31st) of current year (per email instructions, removed code to add a year if current month was December).
    var exp_date = dateFormatted("12","31", String(exp_year));
    editAppSpecific("Permit Expiration Date", exp_date);
	
}