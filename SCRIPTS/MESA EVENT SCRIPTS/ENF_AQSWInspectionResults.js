/*===================================================================
// Script Number: 361
// Script Name: ENF_AQSWInspectionResults.js
// Script Description: When an air quality inspection and a storm water inspection is resulted as FAIL a new respective inspection should be created 3 business days in the future. 
// When an AQ or SW inspection is resulted as PASS a new respective inspection should be created and scheduled for 84 days from the date of the last inspection. 
// Script Run Event: ISRA
// Testing Cap: COB16-00010
// Script Parents:ISRA;Enforcement/Environmental/Construction/NA
// Version   |Date      |Engineer         |Details
//  1.0      |10/18/16  |Steve Veloudos   |Initial Release 
//  2.0      |11/02/16  |Steve Veloudos   |Adjusted to be 86 calendar days not Mesa working days
//  3.0      |12/07/16  |Steve Veloudos   |Changed to 83 days + next business day also get the Inspection date 
//  4.0      |12/13/16  |Steve Veloudos   |Adj to get the correct Inspection date & pass the Inspector Object when scheduling new inspection
/*==================================================================*/

try {
     var futureDate
     var todayDate
     var day
     var diff

     //Check the Inspection Type
      if(inspType == "Storm Water Inspection" || inspType == "Air Quality Inspection")
      {
          //Get current inspection object
          var inspObj = aa.inspection.getInspection(capId,inspId).getOutput(); 
          var inspResultKDate = inspObj.getInspectionDate().getMonth() + "/" + inspObj.getInspectionDate().getDayOfMonth() + "/" + inspObj.getInspectionDate().getYear();
          logDebug("inspResultKDate = " + inspResultKDate);
          
          //Check if Inspection passed
          if(inspResult  == "Pass")
          {
            //Get the futureDate
            var mdy =  inspResultKDate.split('/');            
            var mon1 = parseInt(mdy[0]);
            var dt1 = parseInt(mdy[1]);
            var yr1 = parseInt(mdy[2]);
            var insResultsD = new Date(yr1, mon1-1, dt1);
            logDebug("insResultsD = " + insResultsD);
            
            futureDate = addDays(insResultsD, 84);
            logDebug("futureDate1 = " + futureDate);
            
            //Add to next Mesa Working day
            futureDate = new Date(mesaWorkingDays(futureDate, 1));
            var futureDate2 = jsDateToMMDDYYYY(futureDate);
            logDebug("futureDate2 = " + futureDate2);
            
            //Get Inspector
            var inspectorObject = getInspectorObject();

	          logDebug("inspector: " + CoEmail);
            scheduleInspectionDateWithInspector(inspType,futureDate2,inspectorObject);

          }
          //Inspection Failed
          else
          {
            //Get todays date
            todayDate = new Date();

            //Get the futureDate
            futureDate = new Date(mesaWorkingDays(todayDate, 4));
            
            //Get date difference
            //day = 1000*60*60*24;
            //diff = Math.ceil((futureDate.getTime() - todayDate.getTime())/(day));
            
            //Schedule Inspection
            //scheduleInspection(inspType, diff);
            //Get Inspector
            var inspectorObject = getInspectorObject();

	          logDebug("inspector: " + CoEmail);
            scheduleInspectionDateWithInspector(inspType,ffutureDate,inspectorObject);
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