/*===================================================================
// Script Number: 175
// Script Name: Pre-Application Fees
// Script Developer: Bryan de Jesus
// Script Agency: Woolpert
// Script Description: On application submittal add pre-application fee and technology fee only when ASI field "Use" is "Multi-Residence" or "Non-Residential". Fee schedule = "PLN_PREAPP", fee codes PA010 and PA010 (both fees have same code in config doc, will need to be changed in config)
// Script Run Event: ASA
// Script Parents:
//            ASA;Planning!Pre-Application!NA!NA
/*==================================================================*/

var use = AInfo["Use"];

if (use == "Multi-Residence" || use == "Non-Residential"){
	if (!feeExists("PA010", "NEW", "INVOICED")) addFee("PA010","PLN_PREAPP","FINAL",1,"N");
	if (!feeExists("PA020", "NEW", "INVOICED")) addFee("PA020","PLN_PREAPP","FINAL",1,"N");
}