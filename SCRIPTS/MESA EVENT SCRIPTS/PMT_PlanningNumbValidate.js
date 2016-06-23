/*===================================================================
// Script Number: 177
// Script Name: PMT_PlanningNumbValidate.js
// Script Developer: Bryan de Jesus
// Script Agency: Woolpert
// Script Description: Validate that the value entered in the asi field "PLN Number" is a valid number. It is not valid, the Planning Approval Letter is required.It is is valid, then related the planning record as a child to this record.
// Script Run Event: ASA, ASIUA
// Script Parents:
//            ASA;Permits!Commercial!NA!NA
//			ASIUA;Permits!Commercial!NA!NA
//			ASA;Permits!Residential!NA!NA
//			ASIUA;Residential!NA!NA
//			ASA;Permits!Master Plan!NA!NA
//			ASIUA;Permits!Master Plan!NA!NA
/*==================================================================*/
try{
	var planningNumber = "";
	if (appMatch("Permits/Master Plan/NA/NA"))
		planningNumber = AInfo["PLN Number"];
	else
		planningNumber = AInfo["Planning Number"];
	
	if (!!planningNumber){
		var capIdResult = aa.cap.getCapID(planningNumber);
		if (capIdResult.getSuccess()){
			var planningCapId = capIdResult.getOutput();
			var planningCapResult = aa.cap.getCap(planningCapId);
			if (planningCapResult.getSuccess()){
				var planningCapModel = planningCapResult.getOutput().getCapModel();
				planningCapModel.setParentCapID(capId);
			} else {
				logDebug("Unable to get Planning cap");
			}
		} else {
			showMessage = true; 
			comment("You have entered an invalid Planning Record ID.  Please correct your entry."); 
			cancel = true;
		}
	}
} catch (error){
	logDebug("Error: " + error.message);
}