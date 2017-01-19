/**
 * Returns capIdModel if created or null if not
 * @param pCapId
 * @returns {capIdModel}
 */
function cloneToEnvironmental(pCapId, dateVal){
	var create = false;
	var checkASIT = false;
	var typeOfWork = getAppSpecific("Type of work",pCapId); 
	var classificationType = getAppSpecific("Classification Type",pCapId); 
	
	if(appMatch("Permits/Commercial/NA/NA",pCapId)){
		if(typeOfWork == "At Risk Grading"){
			//if at risk grading ASI doesn't matter just create the child
			create=true;
		}
		else if( typeOfWork == "Commercial/Industrial Projects" || 
			( typeOfWork == "Other Commercial" && 
					exists(classificationType,"Additions","Carport","Park/Stadium/Outdoor Theatre/Marinas",
							"Parking Garage (Enclosed/Opened)","Public Works/Utilities","Remodeling with Addition",
							"Storage Shed/Barn","Swimming Pool","Foundation Permits"))){
			checkASIT = true;	
		} 
	}
	else if(appMatch("Permits/Residential/NA/NA",pCapId)){
		if( exists(typeOfWork,"Single Family (Detached)","Single Family (Attached)","Two-Family Duplex","Guesthouse",
				"Remodeling With Addition","Addition","Garage/Carport") ){
			checkASIT = true;
		}
	}
	else if(appMatch("Permits/Demolition/NA/NA",pCapId)){
		checkASIT = true;
	}
	
	//If we need to check ASIT then check it
	if(checkASIT){
		var prInfoTable = loadASITable("PLAN REVIEW INFORMATION",pCapId);
		for(var r in prInfoTable){
			logDebug("ASIT:" + prInfoTable[r]["Type of Civil Engineering Sheets"])
			if(matches(prInfoTable[r]["Type of Civil Engineering Sheets"],"Cover Sheets","Grading/Site Plans and Details")){
				create=true;
				break; //only care if we find one the break out
			}
		}
	}
	
	//If passed the check
	if(create){
		//Create the record 
		//Copies Address, Parcel, Contacts by default in function
		var envbCapId = createChild("Enforcement","Environmental","Construction","NA","",pCapId);
		//Copy Owners
		copyOwner(pCapId, envbCapId);
		//Copy LPs
		copyLicensedProf(pCapId, envbCapId);
		//edit ASI.Date of Project
		editAppSpecific("Date of Project",dateVal,envbCapId);
		//Create pending inspections
		createPendingInspection("ENF_ENV_CONS","Air Quality Inspection",envbCapId);
		createPendingInspection("ENF_ENV_CONS","Storm Water Inspection",envbCapId);
		
		//Add Notice to existing Permit
		var tcapId = capId;
		capId = pCapId;
		addAppCondition("Environmental Documents Required", "Applied", "Environmental Documents Required", "", "Notice");
		capId = tcapId;
	}
}