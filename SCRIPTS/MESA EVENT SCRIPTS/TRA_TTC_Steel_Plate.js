/*===================================================================
// Script Number: 282
// Script Name: TRA_TTC_Steel_Plate.js
// Script Description: 	If wfTask Inspections is resulted with Steel Plate in ROW, add Condition Steel Plate in ROW to record.
// Script Parents:IRSA;Transportation!~!~!~.js
// Test Record: TTC16-00024
// Version   |Date      |Engineer         |Details
//  1.0      |09/19/16  |Steve Veloudos   |Initial Release
/*==================================================================*/

try {
      //Get the Inspection results
      var getInspectionsResult = aa.inspection.getInspections(capId);

      //Test if script can get an inspection
      if (getInspectionsResult.getSuccess()) 
      {
	    var inspectionScriptModels = getInspectionsResult.getOutput();
	    var inspectionScriptModel = null;

            //Check if Inspection is Final Inspection
            for (inspectionScriptModelIndex in inspectionScriptModels)
                {
                    //Get each inspection 
                    inspectionScriptModel = inspectionScriptModels[inspectionScriptModelIndex];
                    
                    //Add Condition if Steel Plate in Row
                    if (inspectionScriptModel.getInspectionStatus().toUpperCase() == "STEEL PLATE IN ROW")
                    {
                        addAppCondition("Transportation","Applied(Applied)","Steel Plate in ROW","","Required");
                    }                  
                }
      }
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }