/*===================================================================
// Script Number: 
// Script Name: TRA_TTC_ClosePermit.js
// Script Description: 	Update WF Task Inspections with WF Status "Final Inspection Compelte" when the Final Inspection is status as "OK".  This will close the record. 
// Script Parents:IRSA;Transportation!~!~!~.js
// Test Record:       
// Version   |Date      |Engineer         |Details
//  1.0      |11/14/17  |Mong Ward	      |Initial Release
//  
/*==================================================================*/

try {
        
		
		if (inspType == "Final Inspection" && inspResult == "OK") 
		{
			var getInspectionsResult = aa.inspection.getInspections(capId);

                //Test if script can get an inspection
            if (getInspectionsResult.getSuccess()) 
            {
                var inspectionScriptModels = getInspectionsResult.getOutput();
                var inspectionScriptModel = null;
                
            //Iterate through the inspections & look for OK
                for (inspectionScriptModelIndex in inspectionScriptModels)
                {
                    inspectionScriptModel = inspectionScriptModels[inspectionScriptModelIndex];
                        if (inspectionScriptModel.getInspectionStatus().toUpperCase() == "OK")
                        {
                        //Get the Inspection Notes
                        var InspectionNotes = inspectionScriptModel.getInspection().getResultComment();
						}
				}
			
			
			}
			updateTask("Inspections", "Final Inspection Complete", InspectionNotes, "Updated by IRSA event");
			showMessage = true;
            comment("The Permit is Closed.");
			//potentially send email
			
		}

		
}
    
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }