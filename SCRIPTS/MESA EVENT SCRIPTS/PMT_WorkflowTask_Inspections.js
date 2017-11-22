/*===================================================================
// Script Name: PMT_WorkFlowTaskInspections.js
// Script Developer: Suzanna Majchrzak
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
	    if(wfTask == "Inspections") {
	
		    var inspResultObj = aa.inspection.getInspections(capId);
		    if (inspResultObj.getSuccess()){
	
			    var inspList = inspResultObj.getOutput();
			    for (xx in inspList){
			  
		    	if (inspList[xx].getInspectionStatus().matches("Scheduled") || 
		    	    inspList[xx].getInspectionStatus().matches("Pending")) {
				    showMessage = true;
				    comment("All Inspections must be resulted before the Inspections workflow task can be completed.");
			    	cancel = true;
				    return true;
		    	}
			
		    }
    	  }
        }
}
catch(err)
{
	logDebug("A JavaScript Error occured: " + err.message);
}

