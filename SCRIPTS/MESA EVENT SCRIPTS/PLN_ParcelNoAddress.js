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
//var capId = aa.cap.getCapID(myCapId).getOutput();
var addressA = aa.address.getAddressByCapId(capId).getOutput();

for(z in addressA) {
	var houseNbrStart = addressA[z].getHouseNumberStart();
}

if (
		(!hasPrimaryAddressInCap(capId) && parcelExistsOnCap())
		|| (houseNbrStart == null && parcelExistsOnCap())
) {
	 addAdHocTask("WFADHOC_PROCESS", "GIS Addressing", "No Address associated with the parcel");
}