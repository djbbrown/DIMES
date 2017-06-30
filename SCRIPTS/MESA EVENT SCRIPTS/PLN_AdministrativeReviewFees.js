/*===================================================================
// Script Number: TBD
// Script Name: PLN_AdministrativeReviewFees.js
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: Assess the LandSplit Application Fee when ASI Type of Process = Land Division and Sub process type = Land Split
// Script Run Event: ASA, ASIUA
// Script Parents:
//            ASA;Planning!Admin Review!NA!NA
/*==================================================================*/

if (AInfo["Type of Process"] == "Land Division" && AInfo["Sub process type"] == "Land Split"){
	updateFee("ADM010","PLN_ADM","FINAL",1,"N");
}

/*===================================================================
// Script Number: TBD
// Script Name: PLN_AdministrativeReviewFees.js
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: Assess the Administrative Application Fee when 
// ASI Type of Process matches Board of Adjustment/Zoning Admin, Desert Uplands Development Standards, Design Review, Product Approval, Zoning/Site Plan
// and when ASI Type of Process with Subprocess Type of the following:
//
// Development Unit Plan and Amendment to Development Unit Plan
// Development Unit Plan and Other
//
// Land Division and Addition to or modification of amenity package
// Land Division and Amendment to Lot layout/street system
// Land Division and Change to Wall Design or Entry Feature
// Land Division and Other
// Land Division and Preliminary Plat Extension
//
// Wireless Communication Facilities and Modifications to existing
// Wireless Communication Facilities and Other
// Script Run Event: ASA
// Script Parents:
//            ASA;Planning!Admin Review!NA!NA
/*==================================================================*/

var adminAppFee = false;

if (matches(AInfo["Type of Process"],"Board of Adjustment/Zoning Admin","Deser Uplands Development Standards","Product Approval")) {
	adminAppFee = true;
}
if (AInfo["Type of Process"] == "Development Unit Plan" && matches(AInfo["Sub process type"],"Amendment to Development Unit Plan","Other")) {
	adminAppFee = true;
}
if (AInfo["Type of Process"] == "Land Division" && matches(AInfo["Sub process type"],"Addition to or modification of amenity package","Amendment to Lot layout/street system","Change to Wall Design or Entry Feature","Other","Preliminary Plat Extension")) {
	adminAppFee = true;
}
if (AInfo["Type of Process"] == "Wireless Communication Facilities" && matches(AInfo["Sub process type"],"Modifications to existing","Other")) {
	adminAppFee = true;
}
if (adminAppFee) {
	updateFee("ADM020","PLN_ADM","FINAL",1,"N");
}

/*===================================================================
// Script Number: TBD
// Script Name: PLN_AdministrativeReviewFees.js
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: Assess the Affidavit of Change/Correction Fee when ASI Type of Process = Land Division and Sub process type = Affidavit of Change/Correction
// Script Run Event: ASA
// Script Parents:
//            ASA;Planning!Admin Review!NA!NA
/*==================================================================*/

if (AInfo["Type of Process"] == "Subdivision" && AInfo["Sub process type"] == "Affidavit of Change/Correction"){
	updateFee("ADM030","PLN_ADM","FINAL",1,"N");
}

/*===================================================================
// Script Number: TBD
// Script Name: PLN_AdministrativeReviewFees.js
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: Assess the Special Use Permit - Commercial/Industrial Fee when ASI Type of Process = Wireless Communication Facilities and Sub process type = New by Right 
// Script Run Event: aASA
// Script Parents:
//            ASA;Planning!Admin Review!NA!NA
/*==================================================================*/

if (AInfo["Type of Process"] == "Wireless Communication Facilities" && AInfo["Sub process type"] == "New by Right"){
	updateFee("ADM050","PLN_ADM","FINAL",1,"N");
}

/*===================================================================
// Script Number: TBD
// Script Name: PLN_AdministrativeReviewFees.js
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: Assess the Design Review Fee when ASI Type of Process = Design Review 
// Script Run Event: aASA
// Script Parents:
//            ASA;Planning!Admin Review!NA!NA
/*==================================================================*/

if (AInfo["Type of Process"] == "Design Review"){
	updateFee("ADM060","PLN_ADM","FINAL",1,"N");
}
	
/*===================================================================
// Script Number: TBD
// Script Name: PLN_AdministrativeReviewFees.js
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: Assess the Preliminary Plat Extension Fee when ASI Type of Process = Land Division and Sub process type = Preliminary Plat Extension 
// Script Run Event: aASA
// Script Parents:
//            ASA;Planning!Admin Review!NA!NA
/*==================================================================*/

if (AInfo["Type of Process"] == "Land Division" && AInfo["Sub process type"] == "Preliminary Plat Extension"){
	updateFee("ADM035","PLN_ADM","FINAL",1,"N");
}

/*===================================================================
// Script Number: TBD
// Script Name: PLN_AdministrativeReviewFees.js
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: Assess the Historic Preservation Section 106 Review Fee when ASI Type of Process = Historic Preservation and Sub process type = Section 106 Review 
// Script Run Event: aASA
// Script Parents:
//            ASA;Planning!Admin Review!NA!NA
/*==================================================================*/

if (AInfo["Type of Process"] == "Historic Preservation" && AInfo["Sub process type"] == "Section 106 Review"){
	updateFee("ADM070","PLN_ADM","FINAL",1,"N");
}

/*===================================================================
// Script Number: TBD
// Script Name: PLN_AdministrativeReviewFees.js
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: Assess the Historic Preservation Certificate of Appropriateness Fee when ASI Type of Process = Historic Preservation and Sub process type = Certificat of Appropriateness or Demolition Permit 
// Script Run Event: aASA
// Script Parents:
//            ASA;Planning!Admin Review!NA!NA
/*==================================================================*/

if (AInfo["Type of Process"] == "Historic Preservation" && matches(AInfo["Sub process type"],"Certificate of Appropriateness","Demolition Permit")){
	updateFee("ADM080","PLN_ADM","FINAL",1,"N");
}

/*===================================================================
// Script Number: TBD
// Script Name: PLN_AdministrativeReviewFees.js
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: Assess the Medical Marijuana Registration Fee when ASI Type of Process = Medical Marijuana 
// Script Run Event: ASA
// Script Parents:
//            ASA;Planning!Admin Review!NA!NA
/*==================================================================*/

if (AInfo["Type of Process"] == "Medical Marijuana"){
	updateFee("ADM090","PLN_ADM","FINAL",1,"N");
}

/*===================================================================
// Script Number: TBD
// Script Name: PLN_AdministrativeReviewFees.js
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: Assess the Board of Adjustment Fee when ASI Type of Process = Board of Adjustment/Zoning Admin and Sub process type = Addition to or modification of cell towers or 
// Addition to or modification of sign plan or Amendment of Substantial Conformance Improvement Permit or Amendment of development incentive permit or Other 
// Script Run Event: ASA
// Script Parents:
//            ASA;Planning!Admin Review!NA!NA
/*==================================================================*/

if (AInfo["Type of Process"] == "Historic Preservation" && matches(AInfo["Sub process type"],"Addition to or modification of cell towers","Addition to or modification of sign plan","Amendment of Substantial Conformance Improvement Permit","Amendment of development incentive permit","Other")){
	updateFee("ADM110","PLN_ADM","FINAL",1,"N");
}

/*===================================================================
// Script Number: TBD
// Script Name: PLN_AdministrativeReviewFees.js
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: Assess the Subdivision Administrative Review Fee when ASI Type of Process = Subdivision  
// Script Run Event: ASA
// Script Parents:
//            ASA;Planning!Admin Review!NA!NA
/*==================================================================*/

if (AInfo["Type of Process"] == "Desert Uplands Development Standards" || (AInfo["Type of Process"] == "Subdivision" && AInfo["Sub process type"] != "Affidavit of Change/Correction")){
	updateFee("ADM120","PLN_ADM","FINAL",1,"N");
}

/*===================================================================
// Script Number: TBD
// Script Name: PLN_AdministrativeReviewFees.js
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: Assess the Zoning Administrative Review Fee when ASI Type of Process = Zoning/Site Plan 
// Script Run Event: ASA
// Script Parents:
//            ASA;Planning!Admin Review!NA!NA
/*==================================================================*/

if (AInfo["Type of Process"] == "Zoning/Site Plan"){
	updateFee("ADM130","PLN_ADM","FINAL",1,"N");
}

/*===================================================================
// Script Number: TBD
// Script Name: PLN_AdministrativeReviewFees.js
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: Assess the Development Unit Plans fee when ASI Type of Process = Development Unit Plan and Sub process type = Development Unit Plan
// Script Run Event: ASA
// Script Parents:
//            ASA;Planning!Admin Review!NA!NA
/*==================================================================*/
/* var acres = 0;
	areas = getGISBufferInfo("Accela/MesaParcels", "Mesa Parcels", -1, "APN", "SHAPE_Area");
	
	for (i in areas) {
		//logDebug("Area " + areas[i]["APN"] + ": " + (areas[i]["SHAPE_Area"] / 43560));
		acres += (areas[i]["SHAPE_Area"] / 43560);
	}
	acres = Math.ceil(acres);
	//logDebug("Total acres: " + acres);
*/
//new fee schedule is flat fee of 648
if (AInfo["Type of Process"] == "Development Unit Plan" && AInfo["Sub process type"] == "Development Unit Plan"){
	updateFee("ADM140","PLN_ADM","FINAL",1,"N");
}

/*===================================================================
// Script Number: TBD
// Script Name: PLN_AdministrativeReviewFees.js
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: Assess the Design Review Admin Paint Change when ASI Type of Process = Design Review and Sub process type = Change to Colors
// Script Run Event: ASA, ASIUA
// Script Parents:
//            ASA;Planning!Admin Review!NA!NA
/*==================================================================*/

if (AInfo["Type of Process"] == "Design Review" && AInfo["Sub process type"] == "Change to Colors"){
	updateFee("ADM160","PLN_ADM","FINAL",1,"N");
}

/*===================================================================
// Script Number: TBD
// Script Name: PLN_AdministrativeReviewFees.js
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: Assess the Technology Fee 
// Script Run Event: ASA
// Script Parents:
//            ASA;Planning!Admin Review!NA!NA
// NOTE:  THIS MUST BE THE LAST FEE ASSESSED
/*==================================================================*/

updateFee("ADM040","PLN_ADM","FINAL",1,"N");