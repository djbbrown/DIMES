/*===================================================================
// Script Number: 172
// Script Name: PMT_SignFees.js
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: SGN050 Banner Fee If Type of Work = "Grand Opening Banners"
// 	$110 where ASIT Type of Work = "Grand Opening Banners" Enter 1 TECH
// 	SGN060 Subdivision Sign If Type of Work = "Subdivision Sign"
//	$110 where ASIT Type of Work = "Subdivision Sign" Enter 1 TECH
// 	SGN070 Weekend Directional Sign Fee If Type of Work = "Subdivision Weekend Sign"
//
//	$550 where ASIT Type of Work = "Subdivision Weekend Sign" Enter 1 TECH
//	SGN080 Subdivision Directional Signs If Type of Work = "Subdivision Directional Sign"
//
//	$110 where ASIT Type of Work = "Subdivision Directional Sign" Enter 1 TECH
//	SGN090 Downtown Directional A-Frames If Type of Work = "Downtown Directional A-Frames"
//
//	$25 where ASIT Type of Work = "Downtown Directional A-Frames" Enter 1 TECH
// Script Run Event: ASA
// Script Parents:
//            ASA;Permits!Sign!NA!NA
/*==================================================================*/
// load ASIT
var signTypeInfo = loadASITable("SIGN INFO");  
	if (signTypeInfo) {
		var countBanners = countASITRows(signTypeInfo, "Type of Work", "Grand Opening Banners");
		var countDowntownDirA = countASITRows(signTypeInfo, "Type of Work", "Downtown Directional A-Frames");
		var countSubdivisionDir = countASITRows(signTypeInfo, "Type of Work", "Subdivision Directional Sign" );
		var countSubdivisionSgn = countASITRows(signTypeInfo, "Type of Work", "Subdivision Sign" );
		var countSubdivisionWkEnd = countASITRows(signTypeInfo, "Type of Work", "Subdivision Weekend Sign");
		var countSign = countASITRows(signTypeInfo, "Type of Work", "Sign");
		var countFreewayLandmark = countASITRows(signTypeInfo, "Type of Work", "Freeway Landmark Monument");
				
		//Check to assess Grand Opening Banner fee
		if(countBanners > 0) {
			updateFee("SGN050", "PMT_SIGNS", "FINAL", 1, "N");
		}
		
		//Check to assess Downtown Directional A-Frams fee
		if(countDowntownDirA > 0) {
			updateFee("SGN090", "PMT_SIGNS", "FINAL", 1, "N");
		}
		
		//Check to assess Subdivision Directional Sign
		if(countSubdivisionDir > 0) {
			updateFee("SGN080", "PMT_SIGNS", "FINAL", 1, "N");
		}
		
		//Check to assess Subdivision Sign
		if(countSubdivisionSgn > 0) {
			updateFee("SGN060", "PMT_SIGNS", "FINAL", 1, "N");
		}
		
		//Check to assess Subdivision Weekend Sign
		if(countSubdivisionWkEnd > 0) {
			updateFee("SGN070", "PMT_SIGNS", "FINAL", 1, "N");
		}
		
		if (countDowntownDirA > 0 || countSubdivisionDir > 0 || countSubdivisionSgn > 0 || countSubdivisionWkEnd > 0 && (countSign == 0 && countFreewayLandmark == 0)) {
			var totalFeeExp = getSubGrpFeeAmt("EXPIDITE");
			var totalFeeSupExp = (getSubGrpFeeAmt("SUPEXP") * 2);
			
			// Expedite Fee
			if(AInfo["Expedite"]=="Expedite"){
			// Add the extra fee for expedite
			updateFee("SGN110", "PMT_SIGNS", "FINAL", totalFeeExp, "N");
			}
			// Super Expedite Fee
			if(AInfo["Expedite"]=="Super Expedite"){
			// Add the extra fee for expedite
			updateFee("SGN120", "PMT_SIGNS", "FINAL", totalFeeSupExp, "N");
			}
		}
		
}