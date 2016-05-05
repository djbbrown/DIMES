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

    var curr_month = d.getMonth();
    var exp_day = 31;
    var exp_month = 12;
    var exp_year = d.getFullYear();
    
    	if (curr_month == 12) 
	       {
           Number(exp_year) =  exp_year + 1; 
           var exp_date = String(exp_month) + "/" + String(exp_day) + "/" + String(exp_year);
           }
        else
           {
           var exp_date = String(exp_month) + "/" + String(exp_day) + "/" + String(exp_year);
           }

   
    editAppSpecific("Permit Expiration Date", exp_date);


}