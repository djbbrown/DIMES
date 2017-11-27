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
        if  (inspType == "Final Inspection" && inspResult.toUpperCase() == "OK")
		{
		//Get the Inspection results
          var getResultComment = aa.inspection.getInspections(capId);

                //Test if script can get an inspection
            if (getResultComment.getSuccess() && (capStatus == "Issued" || capStatus == "Expired")) 
			{
				var InspectionNotes = getResultComment.getOutput();
                updateTask("Inspections", "Final Inspection Complete", InspectionNotes, "Updated by IRSA event");
				
				updateAppStatus("Closed","Set via script")
				showMessage = true;
				comment("The Permit is Closed.");
				
				
            
			}

		}
		
}

		

    
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }