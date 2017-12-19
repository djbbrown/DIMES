/*===================================================================
// Script Number: 
// Issue Number: 42, 141
// Script Name: TRA_TTC_TechFee.js
// Script Developer: Mong Ward
// Script Agency: Mesa
// Script Description: Auto Assess at application submittal the Technology charge fee. Do not invoice. Fee can be manually removed.
// Script Run Event: WTUA 
// Script Parents:
//            WTUA;Transportation!~!~!~
//  
===================================================================*/
try {

if (capStatus == "Received" && wfTask == "Application Submittal" && wfStatus == "Submitted") 
	{ 
	//This is to assess the Technology Fee - add fee unless one exists with status INVOICED or NEW
	if (!feeExists("TTC040", "NEW", "INVOICED")) addFee("TTC040","TTC_GEN", "FINAL", 1, "N");
		
	}
}

catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}