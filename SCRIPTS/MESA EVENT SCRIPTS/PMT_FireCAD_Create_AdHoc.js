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
			var adt = mesaWorkingDays(aa.util.now(), 1);  //Assigned Date: today 
			var ddt = mesaWorkingDays(aa.util.now(), 4);  //Due Date: today + 3 days based on 4-day work-week
			var xdt = new Date();
			var zdt = convertDate2(xdt);
			var taskObj = aa.workflow.getTasks(thisCap).getOutput()[0].getTaskItem();
			
			logDebug("thisCap:" + thisCap);
			logDebug("thisUser:" + thisUser);
			logDebug("adt:" + adt);
			logDebug("ddt:" + ddt);
			logDebug("xdt:" + xdt);
			logDebug("zdt:" + zdt);
			
			taskObj.setProcessCode("WFADHOC_PROCESS");
			taskObj.setTaskDescription("Fire CAD Review");
			taskObj.setDispositionNote("Fire CAD Document Uploaded");
			taskObj.setProcessID(0);
			taskObj.setAssignmentDate(adt);
			taskObj.setDueDate(ddt);
			taskObj.setAssignedUser(userObj.getOutput());

			wf = aa.proxyInvoker.newInstance("com.accela.aa.workflow.workflow.WorkflowBusiness").getOutput();
			wf.createAdHocTaskItem(taskObj);
	
		}	
  		
	}
}
//functions
function convertDate2(thisDate)
{
	if (typeof(thisDate) == "string")
		{
		var retVal = new Date(String(thisDate));
		if (!retVal.toString().equals("Invalid Date"))
			return retVal;
		}
	if (typeof(thisDate)== "object")
		{
		if (!thisDate.getClass) // object without getClass, assume that this is a javascript date already
			{
			return thisDate;
			}
		if (thisDate.getClass().toString().equals("class com.accela.aa.emse.dom.ScriptDateTime"))
			{
			return new Date(thisDate.getMonth() + "/" + thisDate.getDayOfMonth() + "/" + thisDate.getYear());
			}
		if (thisDate.getClass().toString().equals("class com.accela.aa.emse.util.ScriptDateTime"))
			{
			return new Date(thisDate.getMonth() + "/" + thisDate.getDayOfMonth() + "/" + thisDate.getYear());
			}			
		if (thisDate.getClass().toString().equals("class java.util.Date")
			|| thisDate.getClass().toString().equals("class java.sql.Timestamp")
		)
			{
			return new Date(thisDate.getTime());
			}
		if (thisDate.getClass().toString().equals("class java.lang.String"))
			{
			return new Date(String(thisDate));
			}
		}
	if (typeof(thisDate) == "number")
		{
		return new Date(thisDate);  // assume milliseconds
		}
	logDebug("**WARNING** convertDate2 cannot parse date : " + thisDate);
	return null;
}
//End Script 