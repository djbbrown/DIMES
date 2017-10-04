/*===================================================================
// Script Number: TBD
// Issue Number: 42
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

if (wfTask == "Application Submittal" && wfStatus == "Submitted") 
	{ 
	//This is to assess the Technology Fee
	updateFee("TTC040","TTC_GEN", "FINAL", 1, "N");
	
	}
}

catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}