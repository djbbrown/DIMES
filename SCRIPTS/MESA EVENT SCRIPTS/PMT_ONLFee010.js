/*===================================================================
// Script Number: Fee 010
// Script Name: PMT_ONLFee010
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: Auto Assess at application submittal when Property Type = Residential
	Auto Invoice at submittal
// Script Run Event: ASA 
// Script Parents:
//            ASA;Permit/Online/NA/NA
===================================================================*/
if(AInfo["Property Type"] == "Residential" && AInfo["Required Number of Inspections"] != null)
{
	addFee("ONL010","PMT_ONL", "FINAL",  AInfo["Required Number of Inspections"], "Y");
}