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
try
{
	if(wfTask == "Inspections")
		{
		//Check if Inspections exist
		var getInspResult = aa.inspection.getInspections(capId);
		var cnt = 0;

		if(getInspResult.getSuccess())
		{
			//Get Inspections
			inspArr = getInspResult.getOutput();
			var unresultedStr = "";
			var unresultedList = new Array();

			//For each Inspection type check for an "Approved" entry
			for(r in inspArr) 
			{
				var outerType = inspArr[r].getInspectionType();
				var approvedCount = 0;

				//If we find an "Approved" entry count it
				for(ir in inspArr)
				{
					innerStatus = inspArr[ir].getInspectionStatus();
					innerType = inspArr[ir].getInspectionType();

					if(outerType == innerType && innerStatus == "Approved")
						approvedCount++;
				}

				//If "Approved" counter is 0 Add Inspection type to list
				if(approvedCount == 0)
				{
					if(unresultedList.indexOf(""+outerType+"") == -1)
					{
						unresultedList.push(""+outerType+"");
						unresultedStr += outerType + ", ";
					}
				}
			}

			//If any inspections dont have a corrispoding "Approved" entry cancel updating Inspections workflow task.
			if(unresultedList.length  > 0)
			{
				//Humanize response
				var pluralize = "";
				if(unresultedList.length  == 1) 
					unresultedStr = unresultedStr.substring(0,unresultedStr.length - 2);
				else
				{
					unresultedStr = unresultedStr.substring(0,unresultedStr.length - 2);
					var pos = unresultedStr.lastIndexOf(",");
					unresultedStr = unresultedStr.substring(0, pos) + " and " + unresultedStr.substring(pos + 1, unresultedStr.length + 4);
					pluralize = "s";
				}
					showMessage = true;
					comment("The " + unresultedStr + " inspection" + pluralize + " must be resulted before the Inspections workflow task can be completed.");
					cancel = true;
			}
		}
	}
}
catch(err)
{
	logDebug("A JavaScript Error occured: " + err.message);
}