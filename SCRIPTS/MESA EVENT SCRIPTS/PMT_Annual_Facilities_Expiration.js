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
//            
/*==================================================================*/

if (wfTask.equals("Application Submittal") && wfStatus.equals("Ready to Issue")) {
    
    // set ASI field
    var d = new Date();
	var curr_month = d.getMonth;
    var Exp_day = 31;
    // curr_month =  11 is for December because the month starts with zero.
    var exp_month = 12;
    var exp_year = d.getFullYear();
	if curr_month = 12 then
	   exp_year = dateAdd(exp_year,1);
    var exp_date = String(exp_month) + "/" + String(exp_day) + "/" + String(exp_year);
   
    editAppSpecific("Permit Expiration Date", exp_date);


}