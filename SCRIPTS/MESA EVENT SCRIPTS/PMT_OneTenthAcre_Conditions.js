/*===================================================================
// Script Number: 114 - New Requirement at WTUA
// Script Name: PMT_OneTenthAcre_Conditions.js
// Script Developer: 
// Script Agency: 
// Script Description:  If parcel size is greater than 1/10 of an acre make Maricopa County Flood Control District Permit and Dust Control document required. 
// Script Run Event: WTUA
// Script Parents:
//			WTUA;Permits!Demolition!NA!NA
//			WTUA;Permits!Commercial!NA!NA
//			WTUA;Permits!Residential!NA!NA
===================================================================*/
//showDebug = true;
try{
	if (wfTask == "Plans Coordination" && wfStatus == "Ready to Issue"){
		var acres = parcelArea;
		var docArr = getDocumentList();
		var recordAppType = appTypeArray[1];
		//type of work ASI different naming between Commercial and Residential records 
		var typeOfWork = (AInfo["Type of Work"] != undefined) ? AInfo["Type of Work"] : AInfo["Type of work"]
		var classificationType = AInfo["Classification Type"];
		if (recordAppType == "Demolition" || 
			(recordAppType == "Residential" 
			&& matches(typeOfWork,"Single Family (Detached)","Single Family (Attached)","Two-Family Duplex","Guesthouse","Remodeling With Addition","Additions","Garage/Carport")) 
		||
			(recordAppType == "Commercial" 
			&& ((matches(typeOfWork,"At Risk Grading","Commercial/Industrial Projects")) 
		|| (typeOfWork == "Other Commercial" 
			&& matches(classificationType,"Additions","Carport","Park/Stadium/Outdoor Theatre/Marinas","Parking Garage (Enclosed/Open)","Public Works/Utilities","Remodeling with Addition","Storage Shed/Barn","Swimming Pool","Foundation Permits"))))
			){
			if (!acres) logDebug("ERROR: Unable to get acreage.");
			else{
				logDebug("Parcel acreage: " + acres);
				// determine required doc types
				var reqDocTypes = [];
				if (acres > 0.1) {
					//reqDocTypes.push("Maricopa County Dust Control Permit");  //feedback is that these should be conditions
					//reqDocTypes.push("Maricopa County Dust Control Plan");  //feedback is that these should be conditions
					addStdCondition("Building Permit","Maricopa County Dust Control Permit");
					addStdCondition("Building Permit","Maricopa County Dust Control Plan);
				} 
				
			}
		} 
		else if (!classificationType) logDebug("WARNING: No code classification entered. Cannot add standard conditions.");
	}
} catch (err){
	logDebug("A JavaScript Error occured: " + err.message);
}