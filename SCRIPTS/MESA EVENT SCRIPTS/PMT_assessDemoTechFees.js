/*===================================================================
// Script Number: 233
// Script Name: PMT_assessDemoTechFees.js
// Script Developer: Chris Godwin
// Script Agency: Woolpert
// Script Description: Assess and invoice or assess Demo and Tech fees. 
// Script Run Event: ASA, ASIUA
// Script Parents:
//            ASA;Permits!Demolition!NA!NA
//            ASIUA;Permits!Demolition!NA!NA
/*==================================================================*/

if (AInfo["Abatement?"] == "No" || AInfo["Abatement"] == "N" ){//assess and invoice fees
	if (!feeExists("DEMO010", "INVOICED")) updateFee("DEMO010","PMT_DEMO","FINAL",1,"Y");
	if (!feeExists("DEMO030", "INVOICED")) updateFee("DEMO030","PMT_DEMO","FINAL",1,"Y");
}
if (AInfo["Abatement?"] == "Yes" || AInfo["Abatement"] == "Y" ){//no fees - only assess fees
	if (!feeExists("DEMO010", "NEW", "INVOICED")) updateFee("DEMO010","PMT_DEMO","FINAL",1,"N");
	if (!feeExists("DEMO030", "NEW", "INVOICED")) updateFee("DEMO030","PMT_DEMO","FINAL",1,"N");
}