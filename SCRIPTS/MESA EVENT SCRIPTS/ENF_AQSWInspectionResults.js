/*===================================================================
// Script Number: 361
// Script Name: ENF_AQSWInspectionResults.js
// Script Description: When an air quality inspection and a storm water inspection is resulted as FAIL a new respective inspection should be created. 
// When an AQ or SW inspection is resulted as PASS a new respective inspection should be created and scheduled for 84 days from the date of the last inspection. 
// Script Run Event: ISRA
// Testing Cap: COB16-00010
// Script Parents:ISRA;Enforcement/Environmental/Construction/NA
// Version   |Date      |Engineer         |Details
//  1.0      |10/18/16  |Steve Veloudos   |Initial Release 
//  2.0      |11/02/16  |Steve Veloudos   |Adjusted to be 86 calendar days not Mesa working days
//  3.0      |12/07/16  |Steve Veloudos   |Changed to 83 days + next business day also get the Inspection date
/*==================================================================*/

try {
     var futureDate
     var todayDate
     var day
     var diff

      //Get the Inspection results
      var getInspectionsResult = aa.inspection.getInspections(capId);

      //Test if script can get an inspection
      if (getInspectionsResult.getSuccess()) 
      {
	    var inspectionScriptModels = getInspectionsResult.getOutput();
	    var inspectionScriptModel = null;
        
        //Iterate through the inspections & look for Pass
	    for (inspectionScriptModelIndex in inspectionScriptModels)
           {
                inspectionScriptModel = inspectionScriptModels[inspectionScriptModelIndex];
                if(inspectionScriptModel.getInspectionType() == "Storm Water Inspection" || inspectionScriptModel.getInspectionType() == "Air Quality Inspection")
                    {
                        if (inspectionScriptModel.getInspectionStatus().toUpperCase() == "PASS")
                        {
                        //Get the Inspection Date
                            var thedate = inspectionScriptModel.getInspectionStatusDate();
                            var InDate =   new Date(thedate.getMonth() + "/" + thedate.getDayOfMonth() + "/" + thedate.getYear());
                            InspectionDate = jsDateToASIDate(InDate);

                            //Get the futureDate
                            var mon1   = parseInt(InspectionDate.substring(0,2));
                            var dt1  = parseInt(InspectionDate.substring(3,5));
                            var yr1   = parseInt(InspectionDate.substring(6,10));
                            var insResultsD = new Date(yr1, mon1-1, dt1);
                            futureDate = addDays(insResultsD, 83);
                            
                            //Get day of week
                            var dayofweek = futureDate.getDay();

                            //if day of week is Sunday, Friday or Saturday Set to next Mesa Working day
                            if (dayofweek == 0 || dayofweek == 5 || dayofweek == 6)
                            {
                                futureDate = new Date(mesaWorkingDays(futureDate, 1));
                            }
                            //Get date difference
                            day = 1000*60*60*24;
                            diff = Math.ceil((futureDate.getTime() - insResultsD.getTime())/(day));
                         
                            //Schedule Inspection
                            scheduleInspection(inspType, diff);
                            break;
                        }
                        else if(inspectionScriptModel.getInspectionStatus().toUpperCase() == "Fail")
                        {
                        todayDate = new Date();

                        //get the futureDate
                        futureDate = new Date(mesaWorkingDays(todayDate, 4));
                        
                        //Get date difference
                        day = 1000*60*60*24;
                        diff = Math.ceil((futureDate.getTime() - todayDate.getTime())/(day));
                        
                        //Schedule Air Quality Inspection
                        scheduleInspection(inspType, diff); 
                         break;
                        }
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