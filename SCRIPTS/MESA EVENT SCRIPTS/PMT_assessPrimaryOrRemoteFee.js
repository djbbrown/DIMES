/*===================================================================
// Script Number: 118
// Script Name: LIC_AssessLicenseFees.js
// Script Developer: Chris Godwin
// Script Agency: Woolpert
// Script Description: Assess Primary or Remote Site fee at App Submittal and when ASI is updated
// Script Run Event: ASIUA
// Script Parents:
//            ASIUA;Permits!Commercial!Annual Facilities!NA
//            ASA;Permits!Commercial!Annual Facilities!NA
/*==================================================================*/

if (AInfo["AFP Type"] == "Primary"){
	if (!feeExists("AFP010")) addFee("AFP010","PMT_AFP","FINAL",1,"N");
	if (feeExists("AFP020")) voidRemoveFee("AFP020");
}

if (AInfo["AFP Type"] == "Remote"){
	if (!feeExists("AFP020")) addFee("AFP020","PMT_AFP","FINAL",1,"N");
	if (feeExists("AFP010")) voidRemoveFee("AFP010");
}

if (AInfo["AFP Type"] == "" || AInfo["AFP Type"] == null){
	if (feeExists("AFP010")) voidRemoveFee("AFP010");
	if (feeExists("AFP020")) voidRemoveFee("AFP020");
}