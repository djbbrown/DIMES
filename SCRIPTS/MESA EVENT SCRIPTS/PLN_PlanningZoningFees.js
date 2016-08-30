/*===================================================================
// Script Number: 86
// Script Name: PLN_PlanningZoningFees
// Script Developer: Bryan de Jesus
// Script Agency: Woolpert
// Script Description: On application submitttal Assess fee “Rezoning”  
//		(FP030) at application submittal when Address and Parcel are 
//		located outside of the “downtown” district (downtown layer 
//		currently exists in GIS)
//		If inside Downtown district, “Rezoning Downtown” fee should be assessed instead. 
// Script Run Event: ASA
// Script Parents:
//            ASA;Planning!Planning and Zoning!NA!NA 
/*==================================================================*/
showDebug = false;
try{
	var acres = 0;
	areas = getGISBufferInfo("Accela/MesaParcels", "Mesa Parcels", -1, "APN", "SHAPE_Area");
	
	for (i in areas) {
		//logDebug("Area " + areas[i]["APN"] + ": " + (areas[i]["SHAPE_Area"] / 43560));
		acres += (areas[i]["SHAPE_Area"] / 43560);
	}
	acres = Math.ceil(acres);
	logDebug("Total acres: " + acres);
	var zoning = getGISInfo("Accela/Accela_Base", "Zoning Districts", "DSCR");
	if (!zoning) logDebug("Zoning data not found for parcel.");
	else {
		isDowntown = (zoning == "DC - Downtown Core")
		
		if( AInfo["Rezone"] == "CHECKED" ) {
			if (isDowntown){
				// inside downtown
				addFee("PZ040","PLN_PZ","FINAL",acres,"N");
			} else {
				// outside downtown
				addFee("PZ030","PLN_PZ","FINAL",acres,"N");	
			}
		
		}
		if( AInfo["Site Plan Review/Modification"] == "CHECKED" ) {
			if (isDowntown){
				// inside downtown
				addFee("PZ060","PLN_PZ","FINAL",acres,"N");
			} else {
				// outside downtown
				addFee("PZ050","PLN_PZ","FINAL",acres,"N");	
			}
		
		}
		if( AInfo["Combined Rezone and Site Plan Review /Modification"] == "CHECKED" ) {
			if (isDowntown){
				// inside downtown
				addFee("PZ080","PLN_PZ","FINAL",acres,"N");
			} else {
				// outside downtown
				addFee("PZ070","PLN_PZ","FINAL",acres,"N");	
			}
		
		}
	}
} catch (err){
	logDebug("A JavaScript Error occured: " + err.message);
}