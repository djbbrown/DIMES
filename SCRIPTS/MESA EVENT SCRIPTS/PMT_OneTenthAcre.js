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
	var classificationCode = AInfo["Classification Code"];
	if (
		classificationCode == 101 ||
		classificationCode == 102 ||
		classificationCode == 103 ||
		classificationCode == 104 ||
		classificationCode == 105 ||
		classificationCode == 106 ||
		classificationCode == 107 ||
		classificationCode == 109 ||
		classificationCode == 110 ||
		classificationCode == 113 ||
		classificationCode == 213 ||
		classificationCode == 214 ||
		classificationCode == 315 ||
		classificationCode == 317 ||
		classificationCode == 318 ||
		classificationCode == 319 ||
		classificationCode == 320 ||
		classificationCode == 321 ||
		classificationCode == 322 ||
		classificationCode == 323 ||
		classificationCode == 324 ||
		classificationCode == 325 ||
		classificationCode == 326 ||
		classificationCode == 327 ||
		classificationCode == 328 ||
		classificationCode == 329 ||
		classificationCode == 330 ||
		classificationCode == 340 ||
		classificationCode == 341 ||
		classificationCode == 430 ||
		classificationCode == 431 ||
		classificationCode == 434 ||
		classificationCode == 436 ||
		classificationCode == 437 ||
		classificationCode == 438 ||
		classificationCode == 439 ||
		classificationCode == 440 ||
		classificationCode == 600 ||
		classificationCode == 644 ||
		classificationCode == 645 ||
		classificationCode == 646 ||
		classificationCode == 647 ||
		classificationCode == 648 ||
		classificationCode == 650 ||
		classificationCode == 652 ||
		classificationCode == 755 ||
		classificationCode == 804 ||
		classificationCode == 988 ||
		classificationCode == 989 ||
		classificationCode == 990 ||
		classificationCode == 991 ||
		classificationCode == 992 ||
		classificationCode == 993 ||
		classificationCode == 998 ||
		classificationCode == 999
	){
		// get parcel acreage
		var acres = AInfo["ParcelAttribute.SIZE(ACRES)"];
		
		// determine required doc types
		var reqDocTypes = [];
		if (acres > 0.1) {
			reqDocTypes.push("Maricopa County Dust Control Permit");
			reqDocTypes.push("Maricopa County Dust Control Plan");
		}
		if (acres > 1.0) reqDocTypes.push("ADEQ");
		
		// get attached docs
		var docListResult = aa.document.getCapDocumentList(capId, currentUserID);
		if (docListResult.getSuccess()){
			var docList = docListResult.getOutput();
			for (var i in reqDocTypes){
				var found = false;
				var reqDocType = reqDocTypes[i];
				for (var k in docList){
					var doc = docList[k];
					if (doc.getDocCategory() == reqDocType){
						found = true;
						break;
					}
				}
				if (!found){
					showMessage = true;
					// build message
					var msg = "The following document types are required for submittal of this application: ";
					for (var m in reqDocTypes){
						msg += reqDocTypes[m] + ", ";
					}
					comment(msg);
					cancel = true;
				}
			}
		}
	}
} catch (err){
	logDebug("A JavaScript Error occured: " + err.message);
}