/*===================================================================
// Script Number: 242
// Script Name: PLN_ParcelNoAddress.js 
// Script Developer: Raminder Gill
// Script Agency: Accela
// Script Description:  On application submittal, if there is no address associated to the parcel on the record; 
//     add the adhoc workflow task "GIS Addressing"
// Script Run Event: ASA
// Script Parents:
//  ASA: Planning/Pre-Submittal/NA/NA
//	ASA: Planning/Planning and Zoning/NA/NA
//	ASA: Planning/Board of Adjustment/NA/NA
//	ASA: Planning/Application/Design Review/NA
//
/*==================================================================*/

//var hasPrimaryAddressInCap = hasPrimaryAddressInCap(capIDString)  ;
//var hasPrimaryAddressInCap = hasPrimaryAddressInCap(capId);
//var parcelExistsOnCap = parcelExistsOnCap(capIDString);

if (!hasPrimaryAddressInCap(capId) && parcelExistsOnCap()) {
	//var adHocTask = "GIS Addressing";
	//var adHocNote = "No Address associated with the parcel";
	//var adHocProcess = "WFADHOC_PROCESS";
	 addAdHocTask("WFADHOC_PROCESS", "GIS Addressing", "No Address associated with the parcel");

}



