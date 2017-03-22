/*===================================================================*/
// Script Number: 405
// Script Name: PMT_FireCD_Create_Activity.js
// Script Description: Create Fire CD Activity when Fire CAD document has been uploaded.   
// Script Run Event: DUA
// Script Parents: DUA;Permits/Commercial/NA/NA
//
// Version   |Date      |Engineer         |Details
//  1.0      |03/24/17  |Steve Allred     |Initial Release
/*===================================================================*/
//Start Script

if (documentModelArray.size() > 0) 	{
	for(var index = 0; index < documentModelArray.size(); index++){
		
		// Create a Fire CD Activity

		if (documentModelArray.get(index).getDocCategory()=="Fire CAD Ordinance") {
			//Create Activity
			var act = aa.activity.getNewActivityModel().getOutput();
			var dt = mesaWorkingDays(aa.util.now(), 3);  //today + 3 days based on 4-day work-week
			act.setServiceProviderCode(aa.getServiceProviderCode());
			act.setCapID(parentId);
			act.setActivityType("Correspondence");
			act.setDueDate(dt);  
			act.setStatusDate(dt);
			act.setActDate(dt);
			//act.setAuditDate(dt);
			//act.setAuditID("ADMIN");
			//act.setAuditStatus("A");
			//act.setAssignedDeparment("MESA/FIRE/NA/NA/NA/NA/NA");
			//act.setAssignedStaff("RPEREZ3");
			act.setInternalOnly("Y");
			act.setActStatus("Not Started");
			act.setActivityName("Fire CAD");
			act.setActivityDescription("Fire CAD document has been uploaded.");
			var actObj = aa.activity.createActivity(act);

		}	
  		
	}
}
//End Script 