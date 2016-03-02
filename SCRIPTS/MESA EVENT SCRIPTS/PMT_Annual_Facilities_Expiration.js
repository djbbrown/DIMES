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
    var curr_day = 31;
    // curr_month =  11 is for December because the month starts with zero.
    var curr_month = 12;
    var curr_year = d.getFullYear();
    var exp_date = String(curr_year) + String(curr_month) + String(curr_day);
        //curr_month + "/" + curr_day + "/" + curr_year;
   
    //    editAppSpecific("Permit Expiration Date", jsDateToMMDDYYYY(exp_date));
    editAppSpecific("Permit Expiration Date",exp_date;

}