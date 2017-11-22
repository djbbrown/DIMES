/*===================================================================
// Script Name: PMT_WorkFlowTask_Inspections.js
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
			
			logDebug("Inspection Status: "+capId);
			
		    if (inspResultObj.getSuccess()){

				logDebug("Inspection Status: "+capId);
				
			    var inspList = inspResultObj.getOutput();
			    for (i in inspList){
			  
				logDebug("Inspection Status: "+inspList[xx].getInspectionStatus());
		    	if (inspList[i].getInspectionStatus().matches("Scheduled") || 
		    	    inspList[i].getInspectionStatus().matches("Pending")) {
				    showMessage = true;
				    comment("All Inspections must be resulted before the Inspections workflow task can be completed.");
			    	cancel = true;
		    	}
			
		    }
    	  }
        }
}
catch(err)
{
	logDebug("A JavaScript Error occured: " + err.message);
}

