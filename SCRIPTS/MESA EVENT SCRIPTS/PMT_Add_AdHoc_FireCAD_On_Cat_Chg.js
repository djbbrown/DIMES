/*===================================================================*/
// Script Number: 405
// Script Name: PMT_Add_AdHoc_FireCAD_On_Cat_Chg.js
// Script Description: Create Fire CAD Ad Hoc Task when a document category has changed to Fire CAD Ordinance.   
// Script Run Event: DUPDA  (Document Update After)
// Script Parents: DUPDA;Permits/Commercial/NA/NA
//
// Version   |Date      |Engineer         |Details
//  1.0      |10/18/17  |Steve Allred     |Initial Release 
/*===================================================================*/
//Start Script
/*
var docCount = 0;  //Document count
var ahtCount = 0;  //Ad Hoc Task count

//count the Fire CAD Ordinance documents
var docArray = getDocs();
if (docArray)
{
	//logDebug("docArray length = " + String(docArray.length));
	for (var i = 0; i < docArray.length; i++) 
	{
		logDebug("Document:" + docArray[i]);
		if (docArray[i] == "Fire CAD Ordinance") 
		{
			docCount += 1;
		}
	}
}
logDebug("docCount:" + docCount);

//count the Fire CAD Review getTasks
var arrReviews = ["Fire CAD Review"];
var tasks = loadTasks(capId);
for(task in tasks)	
{
	//If task is Fire CAD Review, increment counter
	if(IsStrInArry(task, arrReviews))
	{
		ahtCount += 1;
	}
}
logDebug("ahtCount:" + ahtCount);

//add adhoc task(s) if there are not enough to match the documents
if (docCount > ahtCount)	
{  
	//Create Ad Hoc Task
	var thisUser = lookup("PMT_FIRE_CAD_DOC_REVIEWER","Reviewer");
	for(var index = 0; index < (docCount - ahtCount); index++)
	{
		logDebug("index:" + index);
		var thisCap = capId;
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
}
//End Script */