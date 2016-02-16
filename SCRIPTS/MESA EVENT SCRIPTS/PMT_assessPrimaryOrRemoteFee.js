/*===================================================================
// Script Number: 118
// Script Name: LIC_AssessLicenseFees.js
// Script Developer: Chris Godwin
// Script Agency: Woolpert
// Script Description: Assess Primary or Remote Site fee at App Submittal and when ASI is updated. If ASI field changes and assess the other fee script removes existing fee or voids and credits if the fee is invoiced.
// Script Run Event: ASIUA
// Script Parents:
//            ASIUA;Permits!Commercial!Annual Facilities!NA
//            ASA;Permits!Commercial!Annual Facilities!NA
/*==================================================================*/

if (AInfo["AFP Type"] == "Primary"){
	if (!feeExists("AFP010", "NEW", "INVOICED")) addFee("AFP010","PMT_AFP","FINAL",1,"N");
	if (feeExists("AFP020", "NEW", "INVOICED")) voidRemoveFee("AFP020");
}

if (AInfo["AFP Type"] == "Remote"){
	if (!feeExists("AFP020", "NEW", "INVOICED")) addFee("AFP020","PMT_AFP","FINAL",1,"N");
	if (feeExists("AFP010", "NEW", "INVOICED")) voidRemoveFee("AFP010");
}

if (AInfo["AFP Type"] == "" || AInfo["AFP Type"] == null){
	if (feeExists("AFP010", "NEW", "INVOICED")) voidRemoveFee("AFP010");
	if (feeExists("AFP020", "NEW", "INVOICED")) voidRemoveFee("AFP020");
}