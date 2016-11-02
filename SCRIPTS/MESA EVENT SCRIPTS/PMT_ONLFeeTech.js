/*===================================================================
// Script Number: TBD
// Script Name: PMT_ONLFeeTech
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: Auto Assess at application submittal the Technology charge fee since other fees are being scripted in the ASA event
	Auto Invoice at submittal
// Script Run Event: ASA 
// Script Parents:
//            ASA;Permit/Online/NA/NA
===================================================================*/
if ((AInfo["Property Type"] == "Residential" && AInfo["Required Number of Inspections"] != null) || AInfo["Type of Work"] == "Construction Noise Permit") { 
	//This is to assess the Technology Fee
	updateFee("ONL020","PMT_ONL", "FINAL", 1, "Y");
}