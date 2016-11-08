/*===================================================================
// Script Number: 114
// Script Name: PMT_OneTenthAcre.js
// Script Developer: 
// Script Agency: 
// Script Description:  If parcel size is greater than 1/10 of an acre make Maricopa County Flood Control District Permit and Dust Control document required. 
// Script Run Event: WTUB
// Script Parents:
//			WTUB;Permits!Demolition!NA!NA
//			WTUB;Permits!Commercial!NA!NA
//			WTUB;Permits!Residential!NA!NA
===================================================================*/
//showDebug = true;
try{
	if (wfTask == "Permit Issuance" && wfStatus == "Issued"){
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
					reqDocTypes.push("Maricopa County Dust Control Permit");
					reqDocTypes.push("Maricopa County Dust Control Plan");
				} 
				else logDebug("Parcel is under 0.1 acres. No additional documents are required.");
				if (acres > 1.0) reqDocTypes.push("Maricopa County Flood Control District Permit");
				
				// get attached docs
				if (reqDocTypes.length > 0){
					if (!docArr || docArr.length == 0) {
						logDebug("No documents found.");
						showMessage = true;
						// build message
						var msg1 = "The following document types are required for submittal of this application: ";
						for (var l in reqDocTypes){
							if (l == reqDocTypes.length-1) msg1 += reqDocTypes[l];
							else msg1 += reqDocTypes[l] + ", ";
						}
						comment(msg1);
						cancel = true;
					} else {
						for (var i in reqDocTypes){
							var found = false;
							var reqDocType = reqDocTypes[i];
	
							for (var k=0; k<docArr.length; k++){
								var doc = docArr[k];
								var docGroup = doc.getDocGroup();
								var docCategory = doc.getDocCategory();
								logDebug("Document: " + docGroup + " " + docCategory);
								if (docCategory == reqDocType && 
									(docGroup == "PMT_COMM" || docGroup == "PMT_RES" || docGroup == "PMT_DEMOLITION")
								){
									found = true;
									logDebug("Document found: " + reqDocType);
									break;
								}
							}
							if (!found){
								logDebug("Document not found: " + reqDocType);
								showMessage = true;
								// build message
								var msg = "The following document types are required for submittal of this application: ";
								for (var m in reqDocTypes){
									if (m == reqDocTypes.length-1) msg += reqDocTypes[m];
									else msg += reqDocTypes[m] + ", ";
								}
								comment(msg);
								cancel = true;
								break;
							}
						}
					}
				}
			}
		} 
		else if (!classificationType) logDebug("WARNING: No code classification entered. Cannot determine if additional documents are required.");
		else logDebug("No additional documents required for this code classification.");
	}
} catch (err){
	logDebug("A JavaScript Error occured: " + err.message);
}