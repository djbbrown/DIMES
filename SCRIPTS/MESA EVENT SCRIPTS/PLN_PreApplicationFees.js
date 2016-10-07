/*===================================================================
// Script Number: 175
// Script Name: Pre-Application Fees
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: On application submittal add pre-application fee and technology fee only when ASI field "Use" is "Multi-Residence" or "Non-Residential". Fee schedule = "PLN_PREAPP", fee codes PA010 and PA010 (both fees have same code in config doc, will need to be changed in config)
// Script Run Event: ASA
// Script Parents:
//            ASA;Planning!Pre-Application!NA!NA
/*==================================================================*/

var use = AInfo["Use"];

if (use == "Multi-Residence" || use == "Non-Residential"){
	updateFee("PA010","PLN_PREAPP","FINAL",1,"N");
	updateFee("PA020","PLN_PREAPP","FINAL",1,"N");
}