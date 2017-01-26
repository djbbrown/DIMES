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
//  4.0      |12/14/16  |Steve Veloudos   |Adj to get the correct Inspection date & pass the Inspector when scheduling new inspection
//  5.0      |01/26/17  |Steve Veloudos   |Adj to not do anything if inspResult is Pass-Final Per Derek Castaneda
/*==================================================================*/

try {
     var futureDate
     var MesaDate
     var day
     var diff
     
     //Check if the inspection result is not Pass-Final
     if(inspResult != "Pass-Final")
     {
          //Check the Inspection Type
          if(inspType == "Storm Water Inspection" || inspType == "Air Quality Inspection")
          {
              //Get current inspection object
              var inspObj = aa.inspection.getInspection(capId,inspId).getOutput(); 
              var inspResultKDate = inspObj.getInspectionDate().getMonth() + "/" + inspObj.getInspectionDate().getDayOfMonth() + "/" + inspObj.getInspectionDate().getYear();
              logDebug("inspResultKDate = " + inspResultKDate);
              
              //Split date & create new date variable
              var mdy =  inspResultKDate.split('/');            
              var mon1 = parseInt(mdy[0]);
              var dt1 = parseInt(mdy[1]);
              var yr1 = parseInt(mdy[2]);
              var insResultsD = new Date(yr1, mon1-1, dt1);
              logDebug("insResultsD = " + insResultsD);

              //Check if Inspection passed
              if(inspResult  == "Pass")
              {
                //Get the futureDate  
                futureDate = addDays(insResultsD, 83);
                logDebug("futureDate1 = " + futureDate);
                
                //Add to next Mesa Working day
                MesaDate = new Date(mesaWorkingDays(futureDate, 2));
                var futureDate2 = jsDateToMMDDYYYY(MesaDate);
                logDebug("futureDate2 = " + futureDate2);
                
                //Get Inspector & schedule new inspection
                var inspector = getLastInspector(inspType);
                logDebug("inspector: " + inspector);
                scheduleInspectionDateWithInspector(inspType,futureDate2,inspector);

              }
              //Inspection Failed
              else
              {
                //Add 3 Mesa Working day
                MesaDate = new Date(mesaWorkingDays(insResultsD, 4));
                var futureDate2 = jsDateToMMDDYYYY(MesaDate);
                logDebug("futureDate2 = " + futureDate2);
                
                //Get Inspector & schedule new inspection
                var inspector = getLastInspector(inspType);
                logDebug("inspector: " + inspector);
                scheduleInspectionDateWithInspector(inspType,futureDate2,inspector);
              }
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