/*===================================================================
// Script Number: 118
// Script Name: LIC_AssessLicenseFees.js
// Script Developer: Chris Godwin
// Script Agency: Woolpert
// Script Description: Assess Primary or Remote Site fee at App Submittal and when ASI is updated
// Script Run Event: ASIUA
// Script Parents:
//            ASIUA;Permits!Commercial!Annual Facilities!NA
/*==================================================================*/

var afpType = getAppSpecific("AFP Type");

if (afpType == "Primary"){
	if (!feeExists("AFP010")) addFee("AFP010","PMT_AFP","FINAL",1,"Y");
	if (feeExists("AFP020")) voidRemoveFee("AFP020");
}

if (afpType == "Remote"){
	if (!feeExists("AFP020")) addFee("AFP020","PMT_AFP","FINAL",1,"Y");
	if (feeExists("AFP010")) voidRemoveFee("AFP010");
}

if (afpType == "" || afpType == null){
	if (feeExists("AFP010")) voidRemoveFee("AFP010");
	if (feeExists("AFP020")) voidRemoveFee("AFP020");
}