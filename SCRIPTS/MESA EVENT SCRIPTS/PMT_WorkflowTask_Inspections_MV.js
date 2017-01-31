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
				var Otype = inspArr[r].getInspectionType();
				var approved = 0;
					
				//If we find an "Approved" entry count it
				for(ir in inspArr)
				{
					iStatus = inspArr[ir].getInspectionStatus();
					iType = inspArr[ir].getInspectionType();
					
					if(Otype == iType && iStatus == "Approved")
							approved++;
				}
				//If "Approved" counter is 0 Add Inspection type to list
				if(approved == 0)
				{
					if(unresultedList.indexOf(""+Otype+"") == -1)
                    {
						unresultedList.push(""+Otype+"");
                        unresultedStr += Otype + ", ";
                    }
				}
			}

			//If any inspections dont have a corrispoding "Approved" entry cancel updating Inspections workflow task.
			if(unresultedList.length  > 0)
			{
				//Humanize responce
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
				comment("The " + unresultedStr + " inspection" + pluralize + " need to be resulted before the Inspections workflow task can be completed.");
				cancel = true;
			}
		}
    }
}
catch(err)
{
		comment("Error:" + err.message)
}