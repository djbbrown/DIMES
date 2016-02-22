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

if (wfTask.equals("Application Submittal") && wfStatus.equals("Ready to Issue" )) {
    // set ASI field
    var d = new Date();
    var curr_date = 31;
    var curr_month = 12;
    //var curr_year = d.getFullYear();
	var curr_year = 16;
    
    editAppSpecific("Permit Expiration Date", new Date(curr_year, curr_month, curr_date));
}
