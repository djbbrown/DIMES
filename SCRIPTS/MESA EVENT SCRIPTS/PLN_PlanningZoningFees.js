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

/*===================================================================
// Script Number: TBD
// Script Name: PLN_PlanningZoningFees
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: If Pre-Plat Box is checked assess Preliminary Plat Approval
using ASI field Total New Lots, Tracts, Parcels.
// Script Run Event: ASA
// Script Parents:
//            ASA;Planning!Planning and Zoning!NA!NA 
/*==================================================================*/
try{
	if (AInfo["Pre-Plat"] == "CHECKED" && AInfo["Total New Lots, Tracts, Parcels"] != null) {
		addFee("PZ010","PLN_PZ","FINAL",AInfo["Total New Lots, Tracts, Parcels"],"N");
	}
} catch (err){
	logDebug("A JavaScript Error occured: " + err.message);
}

/*===================================================================
// Script Number: TBD
// Script Name: PLN_PlanningZoningFees
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: If Infill Development District 2 is checked assess Rezoning to the Infill Development District 2
// Script Run Event: ASA
// Script Parents:
//            ASA;Planning!Planning and Zoning!NA!NA 
/*==================================================================*/
try{
	if (AInfo["Rezone - Infill Development District 2"] == "CHECKED" && AInfo["Total New Lots, Tracts, Parcels"] != null) {
		addFee("PZ090","PLN_PZ","FINAL",AInfo["Total New Lots, Tracts, Parcels"],"N");
	}
} catch (err){
	logDebug("A JavaScript Error occured: " + err.message);
}

/*===================================================================
// Script Number: TBD
// Script Name: PLN_PlanningZoningFees
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: If Rezone - Planned Community District is checked assess Rezoning to the Planned Community District
// Script Run Event: ASA
// Script Parents:
//            ASA;Planning!Planning and Zoning!NA!NA 
/*==================================================================*/
try{
	if (AInfo["Rezone - Planned Community District"] == "CHECKED" && AInfo["Total New Lots, Tracts, Parcels"] != null) {
		addFee("PZ100","PLN_PZ","FINAL",AInfo["Total New Lots, Tracts, Parcels"],"N");
	}
} catch (err){
	logDebug("A JavaScript Error occured: " + err.message);
}

/*===================================================================
// Script Number: TBD
// Script Name: PLN_PlanningZoningFees
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: If Planned Community Minor Admendment is checked assess Minor Planned Community Amendment
// Script Run Event: ASA
// Script Parents:
//            ASA;Planning!Planning and Zoning!NA!NA 
/*==================================================================*/
try{
	if (AInfo["Planned Community Minor Amendment"] == "CHECKED") {
		addFee("PZ110","PLN_PZ","FINAL",1,"N");
	}
} catch (err){
	logDebug("A JavaScript Error occured: " + err.message);
}

/*===================================================================
// Script Number: TBD
// Script Name: PLN_PlanningZoningFees
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: If Development Unit Plan is checked assess Development Unit Plans
// Script Run Event: ASA
// Script Parents:
//            ASA;Planning!Planning and Zoning!NA!NA 
/*==================================================================*/
try{
	if (AInfo["Planned Community Minor Amendment"] == "CHECKED" && AInfo["Total New Lots, Tracts, Parcels"] != null) {
		addFee("PZ120","PLN_PZ","FINAL",AInfo["Total New Lots, Tracts, Parcels"],"N");
	}
} catch (err){
	logDebug("A JavaScript Error occured: " + err.message);
}

/*===================================================================
// Script Number: TBD
// Script Name: PLN_PlanningZoningFees
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: If Council Use Permit is checked assess Council Use Permit
// Script Run Event: ASA
// Script Parents:
//            ASA;Planning!Planning and Zoning!NA!NA 
/*==================================================================*/
try{
	if (AInfo["Planned Community Minor Amendment"] == "CHECKED") {
		addFee("PZ130","PLN_PZ","FINAL",1,"N");
	}
} catch (err){
	logDebug("A JavaScript Error occured: " + err.message);
}