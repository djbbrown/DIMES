/*===================================================================
// Script Number: Fee 060
// Script Name: PMT_ONLFee060
// Script Developer: Kevin Ford
// Script Agency: Accela
// Script Description: Auto Assess at application submittal when Type of Work = Construction Noise Permit,
	Auto Invoice at submittal
// Script Run Event: ASA 
// Script Parents:
//            ASA;Permit/Online/NA/NA
===================================================================*/
var sameDayGas = (AInfo["Same Day Turn On - Gas"] != undefined) ? AInfo["Same Day Turn On - Gas"] : AInfo["Same Day Turn On - Gas"];
var sameDayElec = (AInfo["Same Day Turn On - Electric"] != undefined) ? AInfo["Same Day Turn On - Electric"] : AInfo["Same Day Turn On - Electric"];

var Online = ["Construction Noise Permit"];
if(appTypeArray[1]=='Online' && (sameDayGas == 'CHECKED' || sameDayElec == 'CHECKED'))
{
	addFee("ONL060","PMT_ONL", "FINAL",  1, "Y");
}