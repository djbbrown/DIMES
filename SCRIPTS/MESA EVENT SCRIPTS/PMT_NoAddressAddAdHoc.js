/*==================================================================*/
// Script Number: 111
// Script Name: PMT_NoAddressAddAdHoc.js
// Script Developer: Chris Godwin
// Script Agency: Woolpert
// Script Description: If, on app submittal the record has no address Add Adhoc task GIS Addressing.
// Script Run Event: ASA
// Script Parents:
//            ASA;Permits!~!~!~
/*==================================================================*/

if(matches(""+appTypeArray[2], "Commercial", "Demolition", "Residential", "Sign") && matches(""+appTypeArray[3], "NA", "Mobile Home")){
	//get address object
	if(true){
		addAdHocTask("WFADHOC_PROCESS", "GIS Addressing", "Added by Script");
	}
}