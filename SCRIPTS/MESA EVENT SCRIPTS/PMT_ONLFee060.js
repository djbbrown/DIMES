/*===================================================================
// Script Number: Fee 060
// Script Name: PMT_ONLFee060
// Script Developer: Kevin Ford
// Script Agency: Accela
// Script Description: Auto Assess and auto invoice at application submittal
// Script Run Event: ASA
// Script Parents:
//            ASA;Permit/Online/NA/NA
// =========================================================================================================== 
// MODIFICATION HISTORY
// Date          Analyst              Description
// 07/03/2017    Steve Allred         Added elecService criteria.  Commented out var sameDayGas and var Online.
==============================================================================================================*/
//var sameDayGas = (AInfo["Same Day Turn On - Gas"] != undefined) ? AInfo["Same Day Turn On - Gas"] : AInfo["Same Day Turn On - Gas"];
var sameDayElec = (AInfo["Same Day Turn On - Electric"] != undefined) ? AInfo["Same Day Turn On - Electric"] : AInfo["Same Day Turn On - Electric"];
var elecService = (AInfo["Electric Service"] != undefined) ? AInfo["Electric Service"] : AInfo["Electric Service"];

//var Online = ["Construction Noise Permit"];
//if(appTypeArray[1]=='Online' && (sameDayGas == 'CHECKED' || sameDayElec == 'CHECKED'))
	
if(appTypeArray[1]=='Online' && (sameDayElec == 'CHECKED') && (elecService == 'City of Mesa Electric')
{
	addFee("ONL060","PMT_ONL", "FINAL",  1, "Y");
}