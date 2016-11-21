/*===================================================================
// Script Number: TBD
// Script Name: PLN_BoardofAdjustmentFees.js
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: Assess the Variance Single Residence and Manufactured Home fee when ASI Variance = CHECKED and Application Type = Single Residence// Script Run Event: ASA
// Script Parents:
//            ASA;Planning!Board of Adjustment!NA!NA
/*==================================================================*/

if (AInfo["Variance"] == "CHECKED" && !(AInfo["Special Use Permit"] == "CHECKED" || AInfo["Modification of Planned Area Development"] == "CHECKED" || AInfo["Interpretation"] == "CHECKED" || AInfo["Development Incentive Permit"] == "CHECKED" || AInfo["Substantial Conformance Improvement Permit"] == "CHECKED") && AInfo["Application Type"] == "Single Residence"){
	updateFee("BOA010","PLN_BOA","FINAL",1,"N");
}

/*===================================================================
// Script Number: TBD
// Script Name: PLN_BoardofAdjustmentFees.js
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: Assess the Variance Commercial/Industrial fee when ASI Variance = CHECKED and Application Type = Commercial/Industrial or Comprehensive Sign Plan
// or Multiple Residence or Wireless Communications Facility
// Script Run Event: ASA
// Script Parents:
//            ASA;Planning!Board of Adjustment!NA!NA
/*==================================================================*/

if (AInfo["Variance"] == "CHECKED" && !(AInfo["Special Use Permit"] == "CHECKED" || AInfo["Modification of Planned Area Development"] == "CHECKED") && matches(AInfo["Application Type"],"Commercial/Industrial","Comprehensive Sign Plan","Multiple Residence","Wireless Communications Facility")){
	updateFee("BOA020","PLN_BOA","FINAL",1,"N");
}

/*===================================================================
// Script Number: TBD
// Script Name: PLN_BoardofAdjustmentFees.js
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: Assess the Special Use Permit Single Residence and manufactured home fee when ASI Special Use Permit = CHECKED and Application Type = Single Residence
// Script Run Event: ASA
// Script Parents:
//            ASA;Planning!Board of Adjustment!NA!NA
/*==================================================================*/

if (AInfo["Special Use Permit"] == "CHECKED" && !(AInfo["Modification of Planned Area Development"] == "CHECKED" || AInfo["Interpretation"] == "CHECKED" || AInfo["Development Incentive Permit"] == "CHECKED" || AInfo["Substantial Conformance Improvement Permit"] == "CHECKED") && AInfo["Application Type"] == "Single Residence"){
	updateFee("BOA050","PLN_BOA","FINAL",1,"N");
}

/*===================================================================
// Script Number: TBD
// Script Name: PLN_BoardofAdjustmentFees.js
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: Assess the Special Use Permit Commercial/Industrial fee when ASI Variance = CHECKED and Application Type = Commercial/Industrial or Comprehensive Sign Plan
// or Multiple Residence or Wireless Communications Facility
// Script Run Event: ASA
// Script Parents:
//            ASA;Planning!Board of Adjustment!NA!NA
/*==================================================================*/

if (AInfo["Special Use Permit"] == "CHECKED" && !(AInfo["Modification of Planned Area Development"] == "CHECKED") && matches(AInfo["Application Type"],"Commercial/Industrial","Comprehensive Sign Plan","Multiple Residence","Wireless Communications Facility")){
	updateFee("BOA060","PLN_BOA","FINAL",1,"N");
}

/*===================================================================
// Script Number: TBD
// Script Name: PLN_BoardofAdjustmentFees.js
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: Assess the Interpretation fee when ASI Interpretation = CHECKED
// Script Run Event: ASA
// Script Parents:
//            ASA;Planning!Board of Adjustment!NA!NA
/*==================================================================*/

if (AInfo["Interpretation"] == "CHECKED" && !((AInfo["Variance"] == "CHECKED" || AInfo["Special Use Permit"] == "CHECKED" || AInfo["Modification of Planned Area Development"] == "CHECKED") && matches(AInfo["Application Type"],"Commercial/Industrial","Comprehensive Sign Plan","Multiple Residence","Wireless Communications Facility") || (AInfo["Development Incentive Permit"] == "CHECKED" || AInfo["Substantial Conformance Improvement Permit"] == "CHECKED"))){
	updateFee("BOA090","PLN_BOA","FINAL",1,"N");
}

/*===================================================================
// Script Number: TBD
// Script Name: PLN_BoardofAdjustmentFees.js
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: Assess the Modification to PAD Single Residence/manufactured home fee when ASI Modification of Planned Area Development = CHECKED and Application Type = Single Residence
// Script Run Event: ASA
// Script Parents:
//            ASA;Planning!Board of Adjustment!NA!NA
/*==================================================================*/

if (AInfo["Modification of Planned Area Development"] == "CHECKED" && (AInfo["Development Incentive Permit"] != "CHECKED" || AInfo["Substantial Conformance Improvement Permit"] != "CHECKED") && AInfo["Application Type"] == "Single Residence"){
	updateFee("BOA100","PLN_BOA","FINAL",1,"N");
}

/*===================================================================
// Script Number: TBD
// Script Name: PLN_BoardofAdjustmentFees.js
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: Assess the Special Use Permit Commercial/Industrial fee when ASI Variance = CHECKED and Application Type = Commercial/Industrial or Comprehensive Sign Plan
// or Multiple Residence or Wireless Communications Facility
// Script Run Event: ASA
// Script Parents:
//            ASA;Planning!Board of Adjustment!NA!NA
/*==================================================================*/

if (AInfo["Modification of Planned Area Development"] == "CHECKED" && matches(AInfo["Application Type"],"Commercial/Industrial","Comprehensive Sign Plan","Multiple Residence","Wireless Communications Facility")){
	updateFee("BOA110","PLN_BOA","FINAL",1,"N");
}

/*===================================================================
// Script Number: TBD
// Script Name: PLN_BoardofAdjustmentFees.js
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: Assess the Development Incentive Permit fee when ASI Development Incentive Permit = CHECKED
// Script Run Event: ASA
// Script Parents:
//            ASA;Planning!Board of Adjustment!NA!NA
/*==================================================================*/

if (AInfo["Development Incentive Permit"] == "CHECKED" && !((AInfo["Special Use Permit"] == "CHECKED" || AInfo["Modification of Planned Area Development"] == "CHECKED") && matches(AInfo["Application Type"],"Commercial/Industrial","Comprehensive Sign Plan","Multiple Residence","Wireless Communications Facility") || (AInfo["Substantial Conformance Improvement Permit"] == "CHECKED"))){
	updateFee("BOA120","PLN_BOA","FINAL",1,"N");
}

/*===================================================================
// Script Number: TBD
// Script Name: PLN_BoardofAdjustmentFees.js
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: Assess the Substantial Conformance Improvement Permit fee when ASI Substantial Conformance Improvement Permit = CHECKED
// Script Run Event: ASA
// Script Parents:
//            ASA;Planning!Board of Adjustment!NA!NA
/*==================================================================*/

if (AInfo["Substantial Conformance Improvement Permit"] == "CHECKED" && !((AInfo["Special Use Permit"] == "CHECKED" || AInfo["Modification of Planned Area Development"] == "CHECKED") && matches(AInfo["Application Type"],"Commercial/Industrial","Comprehensive Sign Plan","Multiple Residence","Wireless Communications Facility"))){
	updateFee("BOA130","PLN_BOA","FINAL",1,"N");
}

/*===================================================================
// Script Number: TBD
// Script Name: PLN_BoardofAdjustmentFees.js
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: Assess the Technology Fee 
// Script Run Event: ASA
// Script Parents:
//            ASA;Planning!Board of Adjustment!NA!NA
// NOTE:  THIS MUST BE THE LAST FEE ASSESSED
/*==================================================================*/

updateFee("BOA160","PLN_BOA","FINAL",1,"N");