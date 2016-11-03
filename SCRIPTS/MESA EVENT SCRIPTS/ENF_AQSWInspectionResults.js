/*===================================================================
// Script Number: 361
// Script Name: ENF_AQSWInspectionResults.js
// Script Description: When an air quality inspection and a storm water inspection is resulted as FAIL a new respective inspection should be created. 
// When an AQ or SW inspection is resulted as PASS a new respective inspection should be created and scheduled for 85 days from the date of the last inspection. 
// Script Run Event: ISRA
// Testing Cap: COB16-00010
// Script Parents:ISRA;Enforcement/Environmental/Construction/NA
// Version   |Date      |Engineer         |Details
//  1.0      |10/18/16  |Steve Veloudos   |Initial Release 
//  2.0      |11/02/16  |Steve Veloudos   |Adjusted to be 86 calendar days not Mesa working days
/*==================================================================*/

try {
     var futureDate
     var todayDate
     var day
     var diff
        //Check for Inspection Type
        if(inspType == "Storm Water Inspection" || inspType == "Air Quality Inspection")
        {
            //Check if Pass/Fail
            if(inspResult == "Pass")
            {
            
            //get the futureDate
            var mon1   = parseInt(inspResultDate.substring(0,2));
            var dt1  = parseInt(inspResultDate.substring(3,5));
            var yr1   = parseInt(inspResultDate.substring(6,10));
            var insResultsD = new Date(yr1, mon1-1, dt1);
            futureDate = addDays(insResultsD, 85);
            
            //Get date difference
            day = 1000*60*60*24;
            diff = Math.ceil((futureDate.getTime() - insResultsD.getTime())/(day));
            
            //Schedule Inspection
            scheduleInspection(inspType, diff);

            }
            else if(inspResult == "Fail")
            {
            todayDate = new Date();

            //get the futureDate
            futureDate = new Date(mesaWorkingDays(todayDate, 4));
            
            //Get date difference
            day = 1000*60*60*24;
            diff = Math.ceil((futureDate.getTime() - todayDate.getTime())/(day));
            
            //Schedule Air Quality Inspection
            scheduleInspection(inspType, diff); 
            }
        }
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }

    function addDays(date, days) 
    {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
    }