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
			//var thisDept = "FIRE";
			var dt = mesaWorkingDays(aa.util.now(), 3);  //today + 3 days based on 4-day work-week
			var userObj = aa.person.getUser(thisUser);
			//var deptObj = aa.people.getDepartmentName(thisDept);
			var taskObj = aa.workflow.getTasks(thisCap).getOutput()[0].getTaskItem();
			
			taskObj.setProcessCode("WFADHOC_PROCESS");
			taskObj.setTaskDescription("Fire CAD Review");
			taskObj.setDispositionNote("Fire CAD Document Uploaded");
			taskObj.setProcessID(0);
			taskObj.setAssignmentDate(aa.util.now());
			taskObj.setDueDate(dt);
			taskObj.setAssignedUser(userObj.getOutput());
			//taskObj.setAssignedDept(deptObj.getOutput());
			wf = aa.proxyInvoker.newInstance("com.accela.aa.workflow.workflow.WorkflowBusiness").getOutput();
			wf.createAdHocTaskItem(taskObj);
	
		}	
  		
	}
}
//End Script 