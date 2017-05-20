/*===================================================================
// Script Number: 86
// Script Name: PLN_PlanningZoningFees
// Script Developer: Bryan de Jesus
// Script Agency: Woolpert
// Script Description: On application submitttal Assess fee Rezoning  
//		(FP030) at application submittal when Address and Parcel are 
//		located outside of the downtown district (downtown layer 
//		currently exists in GIS)
//		If inside Downtown district, Rezoning Downtown fee should be assessed instead. 
// Script Run Event: ASA
// Script Parents:
//            ASA;Planning!Planning and Zoning!NA!NA 
/*==================================================================*/
try{
	var acres = 0;
	//areas = getGISBufferInfo("Accela/MesaParcels", "Mesa Parcels", -1, "APN", "SHAPE_Area");  //Do not want to use MesaParcels anymore
	//areas = getGISBufferInfo("Accela/Accela_Base", "Parcel Areas", -1, "APN", "SHAPE_Area");  //new usage.
	/*
	for (i in areas) {
		//logDebug("Area " + areas[i]["APN"] + ": " + (areas[i]["SHAPE_Area"] / 43560));
		//acres += (areas[i]["SHAPE_Area"] / 43560);
	}
	*/
	//Note:  switching to use parcel area from parcel ref table due to ACA.
	// this is a temp Accela fix for the parcelArea global variable bug
    loadParcelArea();
	// ACA retriev addtl parcel numbers area 
	var rAddtlPrcNmbrArea = 0;
	if(publicUser){
		var addtlParNmbrs = loadASITable("ADDITIONAL PARCEL NUMBERS");
		if(addtlParNmbrs.length > 0){
		for(xxx in addtlParNmbrs) { 
			rAddtlPrcNmbrArea+=parseFloat(getParcelAreaFromRefParcel(addtlParNmbrs[xxx]["Parcel Number"]));
			//logDebug("rAddtlPrcNmbrArea = " + rAddtlPrcNmbrArea);
		}
	}
	logDebug("rAddtlPrcNmbrArea = " + rAddtlPrcNmbrArea);
	}
	acres = Math.ceil(parcelArea) + Math.ceil(rAddtlPrcNmbrArea);
	//acres = Math.ceil(acres);
	logDebug("Total acres: " + acres);
	var zoning;
	if(publicUser){
		priParcelNbr = getPrimaryParcel();
		zoning = getGISInfoByParcel(priParcelNbr,"MESA", "Zoning Districts", "DSCR");
	}
	else {zoning = getGISInfo("MESA", "Zoning Districts", "DSCR");
	}
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
	if (AInfo["Pre-Plat"] == "CHECKED" && AInfo["Rezone"] != "CHECKED" && AInfo["Site Plan Review/Modification"] != "CHECKED" && AInfo["Combined Rezone and Site Plan Review /Modification"] != "CHECKED" && AInfo["Council Use Permit"] != "CHECKED" && AInfo["Development Unit Plan"] != "CHECKED" && AInfo["Rezone - Infill Development District 2"] != "CHECKED" && AInfo["Rezone - Planned Community Development"] != "CHECKED" && AInfo["Planned Community Minor Amendment"] != "CHECKED" && AInfo["Special Use Permit"] != "CHECKED" && AInfo["Minor General Plan Amendment"] != "CHECKED" && AInfo["Total New Lots, Tracts, Parcels"] != null) {
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
		addFee("PZ090","PLN_PZ","FINAL",acres,"N");
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
		addFee("PZ100","PLN_PZ","FINAL",acres,"N");
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
		addFee("PZ120","PLN_PZ","FINAL",acres,"N");
	}
} catch (err){
	logDebug("A JavaScript Error occured: " + err.message);
}

/*===================================================================
// Script Number: TBD
// Script Name: PLN_PlanningZoningFees
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: If Council Use Permit and no other application types are checked assess Council Use Permit
// Script Run Event: ASA
// Script Parents:
//            ASA;Planning!Planning and Zoning!NA!NA 
/*==================================================================*/
try{
	if (AInfo["Council Use Permit"] == "CHECKED" && AInfo["Pre-Plat"] != "CHECKED" && AInfo["Rezone"] != "CHECKED" && AInfo["Site Plan Review/Modification"] != "CHECKED" && AInfo["Combined Rezone and Site Plan Review /Modification"] != "CHECKED" && AInfo["Development Unit Plan"] != "CHECKED" && AInfo["Rezone - Infill Development District 2"] != "CHECKED" && AInfo["Rezone - Planned Community Development"] != "CHECKED" && AInfo["Planned Community Minor Amendment"] != "CHECKED" && AInfo["Special Use Permit"] != "CHECKED" && AInfo["Minor General Plan Amendment"] != "CHECKED") {
		addFee("PZ130","PLN_PZ","FINAL",1,"N");
	}
} catch (err){
	logDebug("A JavaScript Error occured: " + err.message);
}

/*===================================================================
// Script Number: TBD
// Script Name: PLN_PlanningZoningFees
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: If Council Use Permit and any other application type are checked assess Council Use Permit with another application
// Script Run Event: ASA
// Script Parents:
//            ASA;Planning!Planning and Zoning!NA!NA 
/*==================================================================*/
try{
	if (AInfo["Council Use Permit"] == "CHECKED" && (AInfo["Pre-Plat"] == "CHECKED" || AInfo["Rezone"] == "CHECKED" || AInfo["Site Plan Review/Modification"] == "CHECKED" || AInfo["Combined Rezone and Site Plan Review /Modification"] == "CHECKED" || AInfo["Development Unit Plan"] == "CHECKED" || AInfo["Rezone - Infill Development District 2"] == "CHECKED" || AInfo["Rezone - Planned Community Development"] == "CHECKED" || AInfo["Planned Community Minor Amendment"] == "CHECKED" || AInfo["Special Use Permit"] == "CHECKED" || AInfo["Minor General Plan Amendment"] == "CHECKED")) {
		addFee("PZ135","PLN_PZ","FINAL",1,"N");
	}
} catch (err){
	logDebug("A JavaScript Error occured: " + err.message);
}

/*===================================================================
// Script Number: TBD
// Script Name: PLN_PlanningZoningFees
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: If Minor General Plan Amendment is CHECKED then assess Minor General Plan Amendment fee
// Script Run Event: ASA
// Script Parents:
//            ASA;Planning!Planning and Zoning!NA!NA 
/*==================================================================*/
try{
	if (AInfo["Minor General Plan Amendment"] == "CHECKED") {
		addFee("PZ220","PLN_PZ","FINAL",1,"N");
	}
} catch (err){
	logDebug("A JavaScript Error occured: " + err.message);
}