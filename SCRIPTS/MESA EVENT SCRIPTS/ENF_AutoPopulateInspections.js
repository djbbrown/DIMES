/*===================================================================
// Script Number: 361
// Script Name: ENF_AutoPopulateInspection.js
// Script Description: When the record is created an air quality inspection and a storm water inspection should be created automatically, scheduled 3 business days out. 
// Script Run Event: ASA
// Testing Cap: COB16-00010
// Script Parents:ASA;Enforcement/Environmental/Construction/NA
// Version   |Date      |Engineer         |Details
//  1.0      |10/13/16  |Steve Veloudos   |Initial Release
/*==================================================================*/

try {
    var todayDate = new Date();

    //get the futureDate
    var futureDate = new Date(mesaWorkingDays(todayDate, 3));
    
    //Get date difference
    var day = 1000*60*60*24;
    var diff = Math.ceil((futureDate.getTime() - todayDate.getTime())/(day));
    
    //Schedule Air Quality Inspection
    scheduleInspection("Air Quality Inspection", diff);
    //Schedule Storm Water Inspection
    scheduleInspection("Storm Water Inspection", diff);
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }