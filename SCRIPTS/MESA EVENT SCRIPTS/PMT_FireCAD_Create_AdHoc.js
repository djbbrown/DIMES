/*===================================================================*/
// Script Number: 405
// Script Name: PMT_FireCAD_Create_AdHoc.js
// Script Description: Create Fire CAD Ad Hoc Task when Fire CAD document has been uploaded.   
// Script Run Event: DUA
// Script Parents: DUA;Permits/Commercial/NA/NA
//
// Version   |Date      |Engineer         |Details
//  1.0      |03/28/17  |Steve Allred     |Initial Release 
/*===================================================================*/
//Start Script

if (documentModelArray.size() > 0) 	{
	for(var index = 0; index < documentModelArray.size(); index++){
		
		// Create a Fire CD Activity

		if (documentModelArray.get(index).getDocCategory()=="Fire CAD Ordinance") {
			//Create Ad Hoc Task
			var thisCap = capId;
			var thisUser = "RPEREZ3";
			var adt = dateFormatted(sysDate.getMonth(),sysDate.getDayOfMonth(),sysDate.getYear(),"MM/DD/YYYY");  //Assigned Date: today 
			var ddt = mesaWorkingDays(aa.util.now(), 4);  //Due Date: today + 3 days based on 4-day work-week
			var taskObj = aa.workflow.getTasks(thisCap).getOutput()[0].getTaskItem();
			var userObj = aa.person.getUser(thisUser);
			
/*			logDebug("thisCap:" + thisCap);
			logDebug("thisUser:" + thisUser);
			logDebug("adt:" + new Date(adt));
			logDebug("ddt:" + new Date(ddt));
*/			
			taskObj.setProcessCode("WFADHOC_PROCESS");
			taskObj.setTaskDescription("Fire CAD Review");
			taskObj.setDispositionNote("Fire CAD Document Uploaded");
			taskObj.setProcessID(0);
			taskObj.setAssignmentDate(new Date(adt));
			taskObj.setDueDate(new Date(ddt));
			taskObj.setAssignedUser(userObj.getOutput());

			wf = aa.proxyInvoker.newInstance("com.accela.aa.workflow.workflow.WorkflowBusiness").getOutput();
			wf.createAdHocTaskItem(taskObj);
	
		}	
  		
	}
}

//End Script 