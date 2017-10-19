/*===================================================================*/
// Script Number: 405
// Script Name: PMT_FireCAD_Create_AdHoc.js
// Script Description: Create Fire CAD Ad Hoc Task when Fire CAD document has been uploaded.   
// Script Run Event: DUA
// Script Parents: DUA;Permits/Commercial/NA/NA
//
// Version   |Date      |Engineer         |Details
//  1.0      |03/28/17  |Steve Allred     |Initial Release 
//  2.0      |10.19.2017|Suzanna Majchrzak|Fix for Issue SP# 93
/*===================================================================*/
//Start Script

//Start Script
var docArray = getDocs();

for (i in docArray){
  if (docArray[i].toUpperCase == "FIRE CAD ORDINANCE" ){
  {
	        try{
				//Create Ad Hoc Task
				var thisCap = capId;
				var thisUser = lookup("PMT_FIRE_CAD_DOC_REVIEWER","Reviewer");
				var adt = dateFormatted(sysDate.getMonth(),sysDate.getDayOfMonth(),sysDate.getYear(),"MM/DD/YYYY");  //Assigned Date: today 
				var ddt = mesaWorkingDays(aa.util.now(), 4);  //Due Date: today + 3 days based on 4-day work-week

				
				var taskObj = aa.workflow.getTasks(thisCap).getOutput()[0].getTaskItem();
				var userObj = aa.person.getUser(thisUser);
				
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
			catch (err){
				logDebug("An error occured created the workflow task for the FIRE CAD Ordinance " + err.message);
			}		
  }
}

//End Script 