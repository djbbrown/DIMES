/*===================================================================
// Script Number: 369   **TESTING FOR BROWN BAG - SCRIPT TRAINING
// Script Name: PMT_WorkFlowTaskInspections.js
// Script Developer: Michael VanWie
// Script Agency: Mesa
// Script Description: 
//
// If there are unresulted pending or scheduled inspections then the 
//   "Inspection" Workflow task should not be allowed to be completed.
//
// Script Run Event: WTUB
//
// Script Parents:
//
//	WTUB;Permits!~!~!~
/*==================================================================*/
//test : PMT16-01604
try
{
	//Limit check to just saving of Inspections Task
	if(wfTask == "Inspections")
	{
		//Get Inspections
		var getInspResult = aa.inspection.getInspections(capId);
		var cnt = 0;
		
		if(getInspResult.getSuccess())
		{
			//Inspections to array
			inspArr = getInspResult.getOutput();

			for(idx in inspArr)
			{
				var inspObj = inspArr[idx];
				var inspStatus = inspObj.getInspectionStatus();
				if(inspStatus == "Scheduled" || inspStatus == "Rescheduled")
				{
					cnt++;
					var inspType = inspObj.getInspectionType();
					logDebug("InspStatus: " + inspStatus);
					logDebug("InspType: " + inspType);
					logDebug("Insp Scheduled: " + convertDate(inspObj.getScheduledDate()));
					logDebug(" ---------------------------------------------");
				}
			}
			if(cnt > 0)
			{
				showMessage = true;
				comment("All inspections must be completed before finisalizing Inspections workflow task.");
				cancel = true;
			}
		}
	}
}
catch(err)
{
		logDebug("Error:" + err.message)
}