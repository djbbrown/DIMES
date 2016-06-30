/*===================================================================
// Script Number: 114
// Script Name: PMT_OneTenthAcre.js
// Script Developer: Bryan de Jesus
// Script Agency: Woolpert
// Script Description:  If parcel size is greater than 1/10 of an acre make ADEQ  and Dust Control document required. 
// Script Run Event: ASB
// Script Parents:
//			ASB;Permits!Demolition!NA!NA
//			ASB;Permits!Commercial!NA!NA
//			ASB;Permits!Residential!NA!NA
===================================================================*/
showDebug = true;
try{
	logDebug("testing...");
	var s_id1 = aa.env.getValue("PermitId1");
	var s_id2 = aa.env.getValue("PermitId2");
	var s_id3 = aa.env.getValue("PermitId3");
	logDebug(s_id1);
	logDebug(s_id2);
	logDebug(s_id3);

	var result = aa.cap.getCapIDModel(s_id1, s_id2, s_id3);
	var partialCapId;
	if(result.getSuccess()) {
		partialCapId = result.getOutput();
	}  
	else { logDebug("ERROR: Failed to get capId: " + result.getErrorType() + " " + result.getErrorMessage()); }
	if (!!partialCapId){
		var parcelResult = aa.parcel.getParcelByCapId(partialCapId, null);
		if (parcelResult.getSuccess()){
			var parcels = parcelResult.getOutput();
			for (var i=0; i<parcels.size(); i++){
				var parcel = parcels.get(i);
				logDebug("Parcel Area " + i + ": " + parcel.getParcelArea());
			}
		} else {
			logDebug("ERROR: " + parcelResult.getErrorType() + " " + parcelResult.getErrorMessage());
		}
	}
//	var classificationCode = AInfo["Classification Code"];
//	if (
//		classificationCode == 101 ||
//		classificationCode == 102 ||
//		classificationCode == 103 ||
//		classificationCode == 104 ||
//		classificationCode == 105 ||
//		classificationCode == 106 ||
//		classificationCode == 107 ||
//		classificationCode == 109 ||
//		classificationCode == 110 ||
//		classificationCode == 113 ||
//		classificationCode == 213 ||
//		classificationCode == 214 ||
//		classificationCode == 315 ||
//		classificationCode == 317 ||
//		classificationCode == 318 ||
//		classificationCode == 319 ||
//		classificationCode == 320 ||
//		classificationCode == 321 ||
//		classificationCode == 322 ||
//		classificationCode == 323 ||
//		classificationCode == 324 ||
//		classificationCode == 325 ||
//		classificationCode == 326 ||
//		classificationCode == 327 ||
//		classificationCode == 328 ||
//		classificationCode == 329 ||
//		classificationCode == 330 ||
//		classificationCode == 340 ||
//		classificationCode == 341 ||
//		classificationCode == 430 ||
//		classificationCode == 431 ||
//		classificationCode == 434 ||
//		classificationCode == 436 ||
//		classificationCode == 437 ||
//		classificationCode == 438 ||
//		classificationCode == 439 ||
//		classificationCode == 440 ||
//		classificationCode == 600 ||
//		classificationCode == 644 ||
//		classificationCode == 645 ||
//		classificationCode == 646 ||
//		classificationCode == 647 ||
//		classificationCode == 648 ||
//		classificationCode == 650 ||
//		classificationCode == 652 ||
//		classificationCode == 755 ||
//		classificationCode == 804 ||
//		classificationCode == 988 ||
//		classificationCode == 989 ||
//		classificationCode == 990 ||
//		classificationCode == 991 ||
//		classificationCode == 992 ||
//		classificationCode == 993 ||
//		classificationCode == 998 ||
//		classificationCode == 999
//	){
//		// get parcel acreage
//		var info = getGISBufferInfo("Accela/MesaParcels", "Mesa Parcels", -1, "SHAPE_Area");
//		for (var p in info){
//			
//		}
//		if (!acres) logDebug("ERROR: Unable to get acreage.");
//		else{
//			logDebug("Parcel acreage: " + acres);
//			// determine required doc types
//			var reqDocTypes = [];
//			if (acres > 0.1) {
//				reqDocTypes.push("Maricopa County Dust Control Permit");
//				reqDocTypes.push("Maricopa County Dust Control Plan");
//			} 
//			else logDebug("Parcel is under 0.1 acres. No additional documents are required.");
//			if (acres > 1.0) reqDocTypes.push("ADEQ");
//			
//			// get attached docs
//			if (reqDocTypes.length > 0){
//				var docListResult = aa.document.getCapDocumentList(capId, currentUserID);
//				if (docListResult.getSuccess()){
//					var docList = docListResult.getOutput();
//					if (!docList || docList.length == 0) {
//						showMessage = true;
//						// build message
//						var msg1 = "The following document types are required for submittal of this application: ";
//						for (var l in reqDocTypes){
//							if (l == reqDocTypes.length-1) msg1 += reqDocTypes[l];
//							else msg1 += reqDocTypes[l] + ", ";
//						}
//						comment(msg1);
//						cancel = true;
//					} else {
//						for (var i in reqDocTypes){
//							var found = false;
//							var reqDocType = reqDocTypes[i];
//							for (var k in docList){
//								var doc = docList[k];
//								var docGroup = doc.getDocGroup();
//								if (doc.getDocCategory() == reqDocType && 
//									(docGroup == "PMT_COMM" || docGroup == "PMT_RES" || docGroup == "PMT_DEMOLITION")
//								){
//									found = true;
//									break;
//								}
//							}
//							if (!found){
//								showMessage = true;
//								// build message
//								var msg = "The following document types are required for submittal of this application: ";
//								for (var m in reqDocTypes){
//									if (m == reqDocTypes.length-1) msg += reqDocTypes[m];
//									else msg += reqDocTypes[m] + ", ";
//								}
//								comment(msg);
//								cancel = true;
//								break;
//							}
//						}
//					}
//				} 
//				else logDebug("ERROR: Unable to get document list. " + docListResult.getErrorType() + " " + docListResult.getErrorMessage());
//			}
//		}
//	} 
//	else if (!classificationCode) logDebug("WARNING: No code classification entered. Cannot determine if additional documents are required.");
//	else logDebug("No additional documents required for this code classification.");
} catch (err){
	logDebug("A JavaScript Error occured: " + err.message);
}

function getIncompleteCapId()  {
	var s_id1 = aa.env.getValue("PermitId1");
	var s_id2 = aa.env.getValue("PermitId2");
	var s_id3 = aa.env.getValue("PermitId3");

	var result = aa.cap.getCapIDModel(s_id1, s_id2, s_id3);
	if(result.getSuccess()) {
		return result.getOutput();
}  
	else { logDebug("ERROR: Failed to get capId: " + result.getErrorMessage()); return null; }
}