/*===================================================================
// Script Number: Fee 030 After-Hours Work Permit
// Script Name: PMT_ONLFee030
// Script Developer: Kevin Ford
// Script Agency: Accela
// Script Description: Auto Assess at application submittal when Type of Work = Construction Noise Permit,
	Auto Invoice at submittal
// Script Run Event: ASA 
// Script Parents:
//            ASA;Permit/Online/NA/NA
===================================================================*/
var typeOfWork = (AInfo["Type of Work"] != undefined) ? AInfo["Type of Work"] : AInfo["Type of Work"];
var Online = ["Construction Noise Permit"];
if(appTypeArray[1]=='Online' && exists(typeOfWork,Online))
{
	// Get the value for the total number of inspections
	// tNumInsp = parseFloat(AInfo["Required Number of Inspections"]);
	addFee("ONL030","PMT_ONL", "FINAL",  1, "Y");
}